---
name: meta-exclusions-pruning
description: >
  Equivalente de search-terms-pruning para Meta Ads. Auditoria recorrente de
  placements ruins, audiências saturadas, regiões/idades performando mal, e
  exclusões pra parar de queimar budget em delivery sem conversão. Rodar
  semanal junto com creative-fatigue.
tags: [meta-ads, exclusao, placement, audiencia, pruning, otimizacao]
---

# Meta Ads — Exclusions Pruning

Meta não tem "search terms" (não é busca, é interrupção). O equivalente em Meta é auditar **onde** e **pra quem** o ad foi entregue e cortar o que não converte.

3 frentes principais: **placements** ruins, **audiências** saturadas, **breakdowns** (idade/geo/device) que vazam budget.

## Quando esta habilidade é acionada

- Cadência semanal junto com `creative-fatigue`
- Antes de aumentar budget de campanha (limpar primeiro)
- CPL subindo sem mudança de criativo/oferta
- Suspeita de Advantage+ Placements pegando placement ruim
- Audiência grande (LAL 5%+ ou Advantage+) vazando volume

## Workflow padrão (30 min)

### 1. Puxar breakdowns via Graph API

```python
import os, requests
from dotenv import load_dotenv
load_dotenv(os.path.expanduser('~/.claude/secrets.env'))
token = os.environ['META_ACCESS_TOKEN']

# Por placement, últimos 14d
url = f"https://graph.facebook.com/v21.0/{ACCOUNT_ID}/insights"
params = {
    'access_token': token,
    'level': 'campaign',
    'breakdowns': 'publisher_platform,platform_position',
    'date_preset': 'last_14d',
    'fields': 'spend,impressions,clicks,ctr,cpm,actions',
}
```

Breakdowns úteis pra rodar separados:
- `publisher_platform,platform_position` — placement
- `age,gender` — demografia
- `country,region` — geo
- `device_platform` — mobile vs desktop
- `impression_device` — tipo de aparelho

### 2. Classificar (3 frentes)

#### A) Placements

| Placement | Sinal | Decisão |
|---|---|---|
| **Reels FB+IG** | CPL bom, CTR alto | Manter prioridade |
| **Stories** | CPL ok, fadiga rápido | Renovar criativo |
| **Feed FB+IG** | CPL ok | Manter |
| **Right Column** | CPL alto, CTR baixíssimo | Excluir |
| **Marketplace** | CPL muito alto, lead ruim | Excluir |
| **Audience Network** | CPM baixo, conversão zero | Excluir |
| **Messenger Inbox** | Misto — bom retarget, ruim prospect | Depende |

**Default operacional:** desligar Right Column + Marketplace + Audience Network em prospecting frio.

#### B) Audiência (em LAL grande / Advantage+)

| Sinal | Decisão |
|---|---|
| Idade 18-24 com CPL 3x da média | Restringir age_min |
| Idade 55+ com CPL alto + lead ruim | Restringir age_max |
| Geo com CPL alto sem conversão | Excluir cidade/estado |
| LAL 5-10% gerando lead ruim | Voltar pra LAL 1-3% |

#### C) Device

| Sinal | Decisão |
|---|---|
| iOS com conversão muito menor que Android | Pode ser tracking (CAPI) — não exclui sem investigar |
| Desktop com 0 conversão em prospecting de infoproduto | Excluir desktop |
| Tablet com volume baixo + CPL alto | Excluir tablet |

### 3. Padrões pra excluir em massa

| Padrão | Quando aplicar |
|---|---|
| **Right Column + Marketplace + Audience Network** | Prospecting frio sempre |
| **Idade 13-17, 65+** | Quase sempre (não compra infoproduto adulto) |
| **Países que não são alvo** | Targeting BR mas Meta vaza pra outros — geo_locations explícito |
| **Tablet** | Volume baixo, conversão pior |

### 4. Aplicar

Via UI Meta Ads Manager (ou nosso `create_adset.py` no momento de subir campanha nova).

⚠️ **Em adset em Learning, NÃO mexe.** Espera sair de Learning (50 conversões / 7 dias).

### 5. Documentar

Atualiza `ads-history.md`:
- Data
- O que excluiu
- Hipótese (por que excluiu)
- Resultado em 14 dias

## Auditoria assistida com Claude

Pega CSV do breakdown e cola:

> Leu o output de breakdown `publisher_platform,platform_position` do [cliente]
> dos últimos 14 dias.
>
> 1. Classifica cada placement: MANTER / OBSERVAR / EXCLUIR
> 2. Justifica em 1 linha com CPL e conversão
> 3. Considera CAC alvo de `pricing.md`
> 4. Aponta se algum placement gasta > 20% do budget total sem trazer conversão proporcional

## Heurísticas

### "CPL alto mas converte" vs "CPL alto e não converte"

- CPL alto + conversão proporcional → mantém (caro mas funciona)
- CPL alto + conversão zero → exclui
- CPL ok + conversão alta + lead ruim → audiência aberta demais, fecha LAL

### Quando NÃO excluir (mesmo parecendo ruim)

- Placement está fora de Learning < 7 dias → espera
- Volume < 50 conversões totais — amostra pequena
- iOS underreporta — confirme via CAPI antes de excluir iOS

## Sinais de problema vs fadiga vs atribuição

Antes de declarar "exclui audiência X", confirme **não é outra coisa**:

| Sintoma | Causa provável | Skill a rodar antes |
|---|---|---|
| CPL subiu em todo o adset | Fadiga de criativo | `creative-fatigue` |
| Conversão Meta sumiu mas vendas Hubla seguem | Tracking/CAPI | `ads-attribution` |
| Funil quebrado (Purchase = 0) | Pixel/LP | `meta-ads-funil-diagnostico` |
| Placement específico ruim sempre | Realmente ruim | Esta skill |

## O que NÃO fazer

- **Não exclui placement em campanha em Learning** — reseta aprendizado
- **Não exclui sem amostra** (mín 50 conv totais no adset)
- **Não usa Advantage+ Placements pra prospecting frio** — vaza pra Right Column/Audience Network
- **Não exclui iOS sem checar CAPI** — pode ser subreporte, não placement ruim
- **Não muda mais de 1 coisa por vez** — não saberá o que funcionou

## Skills relacionadas

- `creative-fatigue` — antes de excluir, garante que não é fadiga
- `ads-attribution` — confirma que tracking está OK
- `meta-ads-funil-diagnostico` — funil técnico
- `meta-ads-fundamentos` — hierarquia de audiência
