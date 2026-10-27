---
name: meta-ads-duplicate-campaign
description: Duplicar campanha completa no Meta Ads via Graph API — campanha + conjuntos + anúncios, mantendo status original. Inclui pitfalls descobertos na prática.
tags: [meta-ads, facebook, duplicar, campanha, api, graph-api]
---

# Duplicar Campanha Completa — Meta Ads API

## Quando usar
Quando solicitado a "duplicar campanha completa" no Meta Ads. Sempre duplicar **3 níveis**: Campanha → Conjuntos → Anúncios.

---

## Definição: "Campanha Completa"
Quando solicitado "duplicar campanha completa", sempre duplicar **3 níveis obrigatórios**:
1. Campanha
2. Todos os conjuntos de anúncios (ativos e inativos, mantendo status original)
3. Todos os anúncios de cada conjunto

Nunca duplicar só a campanha sem os conjuntos e anúncios.

## Limitação conhecida — Reels do Instagram
Criativos do tipo Reel (object_type: PRIVACY_CHECK_FAIL) **não podem ser duplicados via API** quando o app está em modo de desenvolvimento. Solução: orientar o usuário a duplicar os anúncios manualmente no Gerenciador de Anúncios (2 minutos).

## Pitfalls críticos descobertos na prática

### 1. `special_ad_categories` — campo obrigatório
Ao criar campanha, passar como string `'[]'`, não lista Python:
```python
'special_ad_categories': '[]'
```

### 2. `is_adset_budget_sharing_enabled` — obrigatório quando não usa CBO
Buscar o valor do original e passar explicitamente:
```python
'is_adset_budget_sharing_enabled': 'false'  # ou 'true'
```

### 3. `bid_strategy` — não repetir no adset quando campanha usa `LOWEST_COST_WITHOUT_CAP`
Se a campanha tem `bid_strategy: LOWEST_COST_WITHOUT_CAP`, o adset herda automaticamente.
**Não passar `bid_strategy` no adset** — causa erro `1815857` ("bid_amount obrigatório").

### 4. `image_url` + `image_hash` no `video_data` — conflito
A API retorna ambos ao consultar um criativo, mas na criação aceita **apenas um**.
Remover `image_url` antes de recriar:
```python
story_spec['video_data'].pop('image_url', None)
```

### 5. Reels/Instagram — bloqueio de app em modo desenvolvimento
Criativos com reels do Instagram (`object_type: PRIVACY_CHECK_FAIL`) **não podem ser recriados via API** quando o app está em modo de desenvolvimento.
- Erro `2446289`: "reel não disponível" — aparece ao tentar `creative_id` direto
- Erro `1885183`: "app em modo de desenvolvimento" — aparece ao recriar via `object_story_spec`
- **Solução**: app precisa estar em modo produção no Meta for Developers, OU duplicar esses anúncios manualmente pelo Gerenciador.

### 6. Endpoint nativo `/copies` com `deep_copy=true` — limitado por tier
```
POST /{campaign_id}/copies?deep_copy=true
```
Falha com erro `1885194` ("cópia muito grande") em contas com tier de desenvolvimento da API.

---

## Fluxo correto (quando criativos não são reels problemáticos)

### Passo 1 — Inspecionar campanha original
```python
orig = requests.get(f'{BASE}/{campaign_id}', params={
    'fields': 'name,objective,status,special_ad_categories,bid_strategy,buying_type,is_adset_budget_sharing_enabled,daily_budget,lifetime_budget',
    'access_token': token
}).json()
```

### Passo 2 — Criar nova campanha
```python
payload = {
    'name': orig['name'] + ' — Cópia',
    'objective': orig['objective'],
    'status': 'PAUSED',  # sempre rascunho
    'special_ad_categories': '[]',
    'buying_type': orig.get('buying_type', 'AUCTION'),
    'is_adset_budget_sharing_enabled': str(orig.get('is_adset_budget_sharing_enabled', False)).lower(),
    'bid_strategy': orig.get('bid_strategy'),
    'access_token': token
}
if orig.get('daily_budget'):
    payload['daily_budget'] = orig['daily_budget']
```

### Passo 3 — Buscar conjuntos (todos — ativos e inativos)
```python
adsets = requests.get(f'{BASE}/{orig_campaign_id}/adsets', params={
    'fields': 'id,name,status,targeting,billing_event,optimization_goal,bid_amount,daily_budget,lifetime_budget,destination_type,promoted_object,pacing_type,attribution_spec',
    'limit': 100,
    'access_token': token
}).json()['data']
```

### Passo 4 — Criar conjuntos mantendo status original
```python
adset_payload = {
    'name': adset['name'],
    'campaign_id': new_campaign_id,
    'status': adset['status'],  # mantém ACTIVE ou PAUSED
    'targeting': json.dumps(adset['targeting']),
    'billing_event': adset['billing_event'],
    'optimization_goal': adset['optimization_goal'],
    # NÃO passar bid_strategy se campanha é LOWEST_COST_WITHOUT_CAP
    'access_token': token
}
# promoted_object: remover campo 'smart_pse_enabled' antes de passar
if adset.get('promoted_object'):
    po = adset['promoted_object'].copy()
    po.pop('smart_pse_enabled', None)
    adset_payload['promoted_object'] = json.dumps(po)
```

### Passo 5 — Duplicar anúncios
Tentar primeiro via endpoint de cópia nativa (mais simples):
```python
r = requests.post(f'{BASE}/{ad_id}/copies', data={
    'adset_id': new_adset_id,
    'status_option': 'ACTIVE' if ad['status'] == 'ACTIVE' else 'PAUSED',
    'access_token': token
})
```

Se falhar com erro de reel/privacidade → **avisar o usuário para duplicar manualmente** esses anúncios pelo Gerenciador.

---

## Caso especial: anúncios com reels (limitação de API)

Quando criativos têm `object_type: PRIVACY_CHECK_FAIL` (reels do Instagram):
- A duplicação via API **não é possível** com app em modo desenvolvimento
- Estrutura (campanha + conjuntos) pode ser criada normalmente via API
- Anúncios devem ser duplicados **manualmente no Gerenciador de Anúncios**
- Informar ao usuário: conjuntos de destino prontos, basta selecionar anúncios originais → duplicar → mover para o novo conjunto

---

## Rollback
Se conjunto falhar após campanha criada, deletar campanha antes de retornar erro:
```python
requests.delete(f'{BASE}/{new_campaign_id}', params={'access_token': token})
```
