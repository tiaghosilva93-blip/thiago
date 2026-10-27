---
name: meta-ads-funil-diagnostico
description: >
  Diagnosticar campanhas Meta Ads com zero ou queda brusca de conversões.
  Combina consulta à Graph API (métricas de funil) com teste real do checkout
  via browser. Usado quando há gasto ativo mas Purchase = 0.
tags: [meta-ads, diagnostico, funil, conversao, pixel, checkout]
---

# Meta Ads — Diagnóstico de Zero Conversão

## Quando usar
- Campanha com gasto ativo mas Purchase = 0 (ou queda brusca)
- InitiateCheckout registrado mas compras sumindo
- ROAS caiu de repente sem mudança na campanha
- Suspeita de página quebrada, pixel errado ou checkout com problema

## Abordagem (ordem de execução)

### 1. Puxar métricas da campanha via Graph API (últimos 3-5 dias)
```python
import os, requests
from dotenv import load_dotenv
load_dotenv(os.path.expanduser('~/.claude/secrets.env'))
token = os.environ['META_ACCESS_TOKEN']
campaign_id = '<CAMPAIGN_ID>'

url = f"https://graph.facebook.com/v21.0/{campaign_id}/insights"
params = {
    'access_token': token,
    'fields': 'spend,impressions,clicks,actions,action_values',
    'date_preset': 'last_7d',
    'time_increment': 1,
    'level': 'campaign'
}
r = requests.get(url, params=params)
```

**Métricas chave a mapear por dia:**
- `spend` | `view_content` | `landing_page_view` | `initiate_checkout` | `purchase`

**Sinal de problema:** InitiateCheckout positivo + Purchase = 0 → funil quebrado no meio

---

### 2. Identificar adsets e anúncios ativos
```python
url = f"https://graph.facebook.com/v21.0/{campaign_id}/adsets"
params = {'access_token': token, 'fields': 'id,name,status,daily_budget,optimization_goal'}

# Para cada adset ativo, puxar ads:
url = f"https://graph.facebook.com/v21.0/{adset_id}/ads"
params = {'access_token': token, 'fields': 'id,name,status,creative{object_story_spec}'}
```
- Extrair URL de destino de `object_story_spec.link_data.link` ou `video_data`
- Verificar se tem anúncio com status diferente de ACTIVE

---

### 3. Verificar link de destino (curl)
```bash
curl -s -o /dev/null -w "%{http_code} | Final URL: %{url_effective}" -L "URL_DO_ANUNCIO"
```
- HTTP 200 = página no ar
- Redirect para URL diferente = possível problema (checar destino final)

---

### 4. Teste real do funil via browser
1. Navegar para a URL de destino
2. Verificar estrutura da página (CTAs presentes, preço correto)
3. **Verificar o que os botões de CTA fazem:**
   - Alguns funis têm popup intermediário (captura de lead antes do checkout) — isso adiciona uma etapa de atrito e pode distorcer o dado de InitiateCheckout
4. Preencher formulário/popup (se houver) e seguir até o checkout
5. Confirmar que o checkout abre (plataforma: Hubla, Hotmart, Kiwify, etc.)

**⚠️ Pitfall detectado:** O evento `InitiateCheckout` pode estar disparando no clique do CTA (antes do popup), não no checkout real. Isso faz os dados de funil parecerem piores do que são e dificulta comparar taxa de conversão real.

---

### 5. Diagnóstico do Pixel via Console do Browser

**Sempre ler o console do navegador após navegar para a página e tentar clicar num CTA.** O console revela problemas de pixel que o Pixel Helper não mostraria sem extensão instalada.

**Alertas críticos a procurar:**
```
[Meta pixel] PIXEL_ID is unavailable on this website due to it's traffic permission settings.
```
→ O domínio da landing page **não está autorizado** nesse pixel. Solução: Gerenciador de Negócios → Pixel → Configurações → Domínios autorizados → adicionar o domínio.

**Verificar também:**
- Quantos pixels estão inicializados (lovable.app costuma ter 4-6 pixels de plataformas parceiras)
- Quais eventos estão sendo disparados: ViewContent ✅, AddToCart ✅, InitiateCheckout ✅, Purchase ✅
- Erros de React (`Minified React error #418, #422`) → indicam falha de hidratação JS que pode impedir o CTA de funcionar
- Erros cross-origin com `pay.hub.la` → checkout Hubla com problema de carregamento no iframe

**Sobre o pixel de Purchase na página de obrigado:**
- O problema mais comum com Purchase = 0 é **pixel não configurado na página de obrigado** da plataforma de checkout
- Para Hubla: verificar integração Hubla → Meta Pixel (webhook ou pixel nativo)
- Para Hotmart: verificar se o pixel de conversão está no evento `purchase` da página de obrigado
- Solicitar ao cliente: **screenshot do Meta Pixel Helper na página de obrigado**

**Padrão suspeito:** Compras funcionam em dias esporádicos mas com inconsistência → pixel depende de event match por email, não de disparo direto.

---

### 6. Classificação do problema

| Sintoma | Diagnóstico provável |
|---------|---------------------|
| HTTP 4xx/5xx na URL | Página fora do ar |
| Página carrega, CTA não abre nada | JS quebrado no popup/CTA |
| Popup abre mas não redireciona | Formulário com erro (validação, webhook) |
| Checkout não carrega | Plataforma de pagamento fora do ar |
| Checkout carrega normalmente | Problema no pixel de Purchase |
| Tudo funciona + compras esporádicas | Flutuação estatística (volume baixo) |

---

## Regras operacionais
- **Nunca pausar campanha ou mexer em orçamento sem aprovação do gestor**
- Campanha com 2-3 compras/dia naturalmente terá dias zero — aguardar 24-48h antes de agir
- Relatório sempre entrega: diagnóstico + hipóteses rankeadas + ações corretivas com aprovação necessária

## Contexto específico — exemplo de um cliente de concursos (Cliente A)
- Conta: `act_SEU_ID`
- Perpétuos ativos: Funil 1 (`<CAMPAIGN_ID_1>`), Funil 2 original (`<CAMPAIGN_ID_2>`), Funil 2 PV NOVA (`<CAMPAIGN_ID_3>`), Funil 3 (`<CAMPAIGN_ID_4>`)
- **Funil 1 e Funil 2 original:** funis em `<DOMINIO_DO_CLIENTE>` — usam popup Elementor (nome+WhatsApp) antes do checkout Hubla
- **Funil 3 e Funil 2 PV NOVA:** funis em `lovable.app` — popup próprio (nome+WhatsApp) antes do checkout Hubla
- Checkout via **Hubla** em todos — verificar integração pixel sempre que Purchase sumir
- Pixel de InitiateCheckout pode estar no clique do CTA (antes do popup), não no checkout real
- **Funil 2 (PV NOVA) — alerta:** página `<SUBDOMINIO>.lovable.app` tem 2 pixels bloqueados por permissão de tráfego (IDs: `<PIXEL_ID_1>` e `<PIXEL_ID_2>`). Domínio lovable.app precisa ser autorizado nesses pixels.
- Páginas lovable.app inicializam 4-6 pixels automaticamente da plataforma — nem todos pertencem ao cliente; verificar qual é o pixel da conta do cliente antes de tentar corrigir
