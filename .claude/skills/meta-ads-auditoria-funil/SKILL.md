---
name: meta-ads-auditoria-funil
description: Auditoria completa de campanhas Meta Ads com análise de criativos, métricas de vídeo (hook rate, body rate) e cálculo de impacto por melhoria de funil. Gera checklist com CPL projetado para cada ação.
version: 1.0.0
platforms: [linux, macos]
prerequisites:
  env_vars: [META_ACCESS_TOKEN]
metadata:
  tags: [meta, facebook, ads, auditoria, funil, cpl, hook-rate, body-rate, connect-rate]
---

# Meta Ads — Auditoria de Funil com Impacto Calculado

## Quando usar

- Cliente pede auditoria de campanhas ativas com diagnóstico e recomendações
- O gestor quer saber o que melhorar e qual o impacto no CPL
- Antes de escalar budget — entender gargalos do funil primeiro

## Regra de escopo (IMPORTANTE)

**Analisar SOMENTE as campanhas que o gestor especificou.** Se pediu "ativas", ignorar pausadas/arquivadas completamente — nem como referência histórica. Não extrapolar escopo.

---

## Passo 1 — Puxar dados da conta

### Campanhas + status

```python
url = f"https://graph.facebook.com/v21.0/{AD_ACCOUNT}/campaigns"
params = {
    "fields": "id,name,status,objective,daily_budget,lifetime_budget",
    "filtering": '[{"field":"effective_status","operator":"IN","value":["ACTIVE"]}]',  # só ativas
    "access_token": TOKEN,
    "limit": 50
}
```

### Insights de campanha (abril ou período solicitado)

```python
fields = "impressions,reach,clicks,inline_link_clicks,cpc,ctr,cpp,cpm,spend,actions,cost_per_action_type,frequency,unique_clicks,unique_ctr"
params = {
    "fields": fields,
    "time_range": '{"since":"YYYY-MM-DD","until":"YYYY-MM-DD"}',
    "access_token": TOKEN
}
```

### Insights por adset (level=adset)

```python
params["level"] = "adset"
```

### Insights por anúncio com métricas de vídeo

```python
fields_video = "ad_name,impressions,spend,actions,cost_per_action_type,video_avg_time_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,video_p100_watched_actions,video_play_actions,video_thruplay_watched_actions"
params["level"] = "ad"
```

---

## Passo 2 — Puxar criativos

### Via API (thumbnails dos vídeos e hashes das imagens)

```python
url = f"https://graph.facebook.com/v21.0/{campaign_id}/ads"
params = {
    "fields": "id,name,status,creative{id,name,title,body,image_url,thumbnail_url,video_id,object_story_spec}",
    "access_token": TOKEN
}
```

### Baixar imagens para análise visual

As URLs de thumbnail do `t45.1600-4` expiram rapidamente — **usar a API de adimages com hash** para URLs mais estáveis:

```python
url = f"https://graph.facebook.com/v21.0/{AD_ACCOUNT}/adimages"
params = {
    "fields": "url,url_128,permalink_url,hash,name",
    "hashes": '["hash1","hash2"]',
    "access_token": TOKEN
}
```

Depois baixar com curl e analisar com vision_analyze:

```bash
curl -s -L "URL_DA_IMAGEM" -o /tmp/criativo.jpg
```

**Nota:** URLs `scontent.ffor7-1.fna.fbcdn.net` com parâmetros `_nc_*` expiram em minutos e retornam 403 se acessadas depois. Sempre baixar antes de analisar.

---

## Passo 3 — Calcular métricas do funil

### Métricas-chave a extrair

| Métrica | Fórmula | Benchmark webinário |
|---|---|---|
| **Connect Rate** | LPVs / Cliques no link | > 70% |
| **Conv LP** | Leads / LPVs | > 20% |
| **Hook Rate** | P25 / Plays | > 25% |
| **Body Rate** | P50 / P25 | > 50% |
| **Hold Rate** | P75 / P25 | > 40% |
| **ThruPlay Rate** | ThruPlay / Plays | > 15% |
| **CPL** | Gasto / Leads | < R$25 webinário |

### Cálculo de impacto por melhoria

```python
budget_dia = X  # orçamento diário
cpm = Y
ctr_link = inline_link_clicks / impressions
connect_rate = lpv / link_clicks
conv_lp = leads / lpv

# Baseline
imp = (budget_dia / cpm) * 1000
clicks = imp * ctr_link
lpv = clicks * connect_rate
leads = lpv * conv_lp
cpl_base = budget_dia / leads

# Para cada melhoria, trocar a variável e recalcular leads e CPL
# Ex: connect rate 66% → 85%
cr_novo = 0.85
lpv_new = clicks * cr_novo
leads_new = lpv_new * conv_lp
cpl_new = budget_dia / leads_new
reducao = (1 - cpl_new/cpl_base) * 100
```

---

## Passo 4 — Estrutura do checklist de melhorias

Entregar sempre com:
1. **Métrica atual → meta** (ex: Connect Rate 66% → 85%)
2. **O que fazer** (ação concreta, não genérica)
3. **Impacto calculado** (leads/dia antes e depois, CPL antes e depois, % de redução)
4. **Prioridade** (🔴 alto impacto baixo custo → 🟢 médio prazo)

Ordenar por: impacto/esforço — LP e connect rate primeiro (zero custo de mídia), criativos depois, hooks depois.

---

## Pitfalls aprendidos

- **Thumbnails expiram**: URLs `scontent.ffor7-1.fna.fbcdn.net` com `_nc_*` expiram em minutos. Baixar imediatamente após puxar ou usar endpoint `adimages` com hash para URL mais estável.
- **Escalar budget em aprendizado**: campanhas com < 50 eventos de otimização não suportam aumento abrupto de budget — CPL sobe. Criar novas campanhas com budget alto é mais seguro que escalar uma em aprendizado.
- **Mesmo criativo em COLD e WARM**: cria competição interna no leilão e eleva CPM. Cada campanha deve ter pelo menos 1 criativo exclusivo.
- **Criativos estáticos vs vídeo por temperatura**: público frio (BROAD) tende a responder melhor a estáticos — param o scroll mais rápido. Público quente (seguidores, engajamento) responde melhor a vídeos de talking head por familiaridade com o rosto.
- **Hook rate baixo (< 10%)**: não adianta escalar budget no vídeo — o problema está nos primeiros 3 segundos. Refilmar o hook antes de aumentar investimento.
