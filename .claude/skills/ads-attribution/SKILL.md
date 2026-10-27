---
name: ads-attribution
description: >
  Atribuição de conversões em Meta Ads pra infoproduto/concursos. Cobre UTMs,
  divergência Meta vs Hubla/Hotmart, last-click vs view-through, janelas de
  atribuição, e como calcular CAC real cruzando dado da plataforma com a fonte
  de venda. Use quando o número da plataforma não bate com o CRM/checkout.
tags: [meta-ads, atribuicao, cac, utm, hubla, hotmart, conversion-api]
---

# Meta Ads — Atribuição e CAC Real

A atribuição da plataforma Meta é **liberal por design** — eles querem provar que entregaram a venda. O número real está no checkout (Hubla, Hotmart, Kiwify). Esta skill define como cruzar os dois e diagnosticar a diferença.

## Quando esta habilidade é acionada

- Meta diz X vendas, Hubla diz Y. Qual é o real?
- Cliente pergunta "CAC tá quanto?" e você precisa do número certo
- Comparar CPL/CAC entre canais (Meta vs Google vs orgânico)
- Decidir escalar ou matar campanha
- Auditar a divergência entre plataforma e checkout antes de relatório mensal

## Conceito-chave: as 3 fontes do mesmo número

Pra **uma venda** acontecer no checkout, ela passou por:

1. **Plataforma de ads** (Meta) — viu o ad, clicou, é atribuído por **última interação** dentro da janela
2. **Pixel + Conversion API** — o evento foi enviado de volta ao Meta com `event_id` único
3. **Checkout** (Hubla/Hotmart) — registrou a venda com email/UTM no pedido

Quando os 3 batem, o tracking está saudável. Quando divergem, tem buraco em algum lugar.

## Janelas de atribuição Meta (padrão 2026)

| Tipo | Janela default | O que significa |
|---|---|---|
| **Click 7d / View 1d** | Default ABO/CBO | Clique até 7 dias antes da venda OU view até 1 dia |
| **Click 7d** | Mais conservador | Só atribui se clicou em até 7 dias |
| **Click 1d / View 1d** | Mais conservador | Só venda em 24h pós-impressão |

**Padrão pra infoproduto:** Click 7d / View 1d. Não muda sem motivo — se mudar, perde comparabilidade histórica.

## Por que o número Meta nunca bate com Hubla/Hotmart

| Razão | Lado que infla | Como diagnosticar |
|---|---|---|
| **View-through** (Meta credita view, Hubla nem viu) | Meta ↑ | Compara "click attribution only" vs "click+view" no Ads Manager |
| **Cross-device** (viu no celular, comprou no desktop) | Meta credita; checkout pode não amarrar | Olha device breakdown |
| **iOS 14.5+** (ATT — opt-out) | Meta ↓ subreporta | Vendas no checkout sem source = orgânico/direto inflado |
| **Múltiplos canais** (viu Meta, depois clicou Google, depois orgânico) | Cada canal reivindica | UTM no checkout mostra **último** |
| **UTM mal configurado** | Hubla não atribui ao Meta | Pedidos com `utm_source` vazio |
| **CAPI duplicado ou ausente** | Atribuição errada | Event Manager → Diagnostics |
| **Refunds** (Hubla baixa, Meta não atualiza) | Meta ↑ | Cruzar bruto vs líquido |

**Regra:** se Meta diz 100 vendas e Hubla diz 70, **acredite no Hubla**. É dinheiro real entrando.

## Como calcular CAC real

Fórmula:
```
CAC_real = gasto_total_meta / vendas_no_checkout_com_utm_source=meta_em_d-N
```

Passos:

1. **Gasto Meta** — Graph API do período (não Ads Manager, que pode estar com cache)
2. **Vendas no Hubla** — exporta pedidos do mesmo período COM filtro `utm_source IN (meta, facebook, instagram, fb, ig)` (Hubla varia)
3. **Atribuição última interação:** Hubla salva o UTM da **última visita antes da compra**. É last-click.
4. **CAC = gasto / vendas**

**Exemplo (Cliente A, jan 2026):**
```
Gasto Meta jan: R$ 18.420
Vendas Hubla com utm_source=meta: 47
CAC real Meta: R$ 391,91

Vs Ads Manager:
Compras (Click 7d/View 1d): 68  → CAC "Meta" = R$ 270,88
Diferença: 21 vendas que Meta crê + Hubla não confirma (view-through, cross-device, refund)
```

Aprende a olhar **o teu CAC**, não o do Ads Manager.

## Padrão de UTM (vincular nos ads)

Convenção da casa:

```
utm_source=meta
utm_medium=cpc
utm_campaign={{campaign.name}}
utm_content={{ad.name}}
utm_term={{adset.name}}
```

Configurar em **URL parameters** no nível do ad. Meta substitui as variáveis dinâmicas automaticamente.

**Importante:**
- `utm_source` SEMPRE igual entre clientes (`meta`) — não usa `facebook` em uma campanha e `fb` em outra, vai bagunçar relatório
- `utm_campaign` usa nome real da campanha pra rastrear ROI por campanha no Hubla
- Não usa caractere especial nem espaço (substitui por `-` ou `_`)

## Diagnóstico de "Meta diz X, Hubla diz Y"

### Cenário 1: Meta > Hubla (Meta inflando)

Olha em ordem:
1. **View-through** — desliga view attribution no relatório, compara só click
2. **Refunds** — Hubla já baixou pedidos de stripe/pix devolvido?
3. **iOS modeling** — vendas "modeladas" são estimadas, não reais
4. **Cross-device** — checa "Compras (todos os dispositivos)" vs "Compras (mesmo dispositivo)"

### Cenário 2: Hubla > Meta (Meta subreporta — comum em iOS)

Olha em ordem:
1. **CAPI configurado?** Event Manager → Diagnostics → verde?
2. **Match quality** alto? (precisa email + telefone + IP no payload)
3. **Vendas no Hubla sem UTM?** São orgânico ou Meta que perdeu atribuição
4. **Deduplicação event_id** entre Pixel e CAPI

Se Hubla > Meta e CAPI tá bom, o canal está **subavaliado** no Ads Manager. CAC real é melhor que aparenta.

## Comparando canais (Meta vs Google vs orgânico)

Pra decidir alocação de budget entre canais, **não** compara CAC do Ads Manager de cada um (cada plataforma puxa a sardinha pra ela).

Compara **CAC real cruzado com Hubla**:

| Canal | Gasto | Vendas (Hubla, UTM) | CAC real | ROAS |
|---|---|---|---|---|
| Meta | R$ 18.420 | 47 | R$ 392 | 3.2x |
| Google | R$ 8.900 | 31 | R$ 287 | 4.4x |
| Orgânico/direto | R$ 0 | 22 | — | — |

(ticket médio R$ 1.250)

**Leitura:** Google tem CAC menor, mas Meta escala volume. Decidir é estratégia, não fórmula.

## Quando UTM tá vazio no Hubla

Causas comuns:
1. Lead veio de canal que não passou pela LP (anúncio direto pro WhatsApp, click 2x perde UTM)
2. WhatsApp Business retornou link com UTM mas usuário copiou só o número
3. Cliente acessou direto sem clicar (digitou domínio)
4. URL encurtada estourou UTM
5. Plataforma de checkout não captura UTM corretamente

**Solução:** sempre testar fluxo do anúncio até o checkout 1x por mês, conferindo se UTM chega no pedido.

## Ferramentas

### Puxar gasto Meta período exato

```python
import os, requests
from dotenv import load_dotenv
load_dotenv(os.path.expanduser('~/.claude/secrets.env'))
token = os.environ['META_ACCESS_TOKEN']

ACCOUNT_ID = 'act_SEU_ID'
url = f"https://graph.facebook.com/v21.0/{ACCOUNT_ID}/insights"
params = {
    'access_token': token,
    'fields': 'spend,actions,action_values',
    'time_range': '{"since":"2026-01-01","until":"2026-01-31"}',
    'level': 'account'
}
r = requests.get(url, params=params).json()
```

### Cruzar com Hubla

Exporta CSV de pedidos do Hubla → filtra por `utm_source` → conta.

Hubla tem campos:
- `utm_source`, `utm_medium`, `utm_campaign`
- `payment_status` (filtrar `paid` ou `confirmed`)
- `created_at` pra match de período

## O que NÃO fazer

- **Não usa só o número do Ads Manager pra relatório de cliente** — atribuição liberal vai morder você quando cliente bater no CAC real
- **Não muda janela de atribuição no meio do mês** — perde comparabilidade
- **Não confia em "vendas modeladas"** como se fossem reais — são estimativa
- **Não credita Meta por venda com UTM vazio** — pode ser orgânico
- **Não compara CAC Meta com CAC Google sem cruzar com a mesma fonte de verdade** (Hubla pros dois)
- **Não esquece de descontar refund** do número de vendas líquidas

## Skills relacionadas

- `meta-ads-funil-diagnostico` — quando Purchase = 0 no Ads Manager
- `meta-ads-report` — gerar relatório com CAC real
- `meta-ads-fundamentos` — janelas de atribuição padrão
