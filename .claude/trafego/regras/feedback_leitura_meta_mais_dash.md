---
name: feedback-leitura-meta-mais-dash
description: "REGRA DURA de leitura de performance: Meta só dá gasto/CTR/CPM; venda/faturamento/ROAS SEMPRE do dashboard, pelo LTV POR ANÚNCIO. Processo fixo, repetir sempre, sem ficar procurando."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0b076963-55c8-4dad-88d5-d15abdec3737
  modified: 2026-07-27T13:19:15.385Z
---

**A leitura de performance SEMPRE tem 2 pontas. Nunca uma só.**

- **Meta (API):** gasto, CPM, CTR, frequência, impressões, cliques, IC. **Só isso.**
- **Dashboard:** venda, faturamento, ROAS, CPA. **Sempre.** É o dado real (venda aprovada via webhook Hotmart).

🚫 **NUNCA reportar venda / faturamento / ROAS vindo do pixel do Meta.** Nem como "prévia", nem como "tendência", nem "pra sentir o dia". Se ainda não olhei o dashboard, eu digo que não olhei — não substituo pelo pixel.

**Why:** o pixel subnotifica muito e leva a decisão errada. Dia 26/07 o pixel mostrou R$3.699 / ROAS 1,67 quando o real era R$7.178 / ROAS 3,23 (**48% subnotificado**). Uma campanha que parecia boa era a pior e vice-versa. Além disso eu já queimei tokens várias vezes caçando o caminho no dashboard — o caminho está aqui, é fixo, é pra repetir sem procurar.

**How to apply — processo fixo, toda vez:**

### 1. Meta (API) — só os dados de mídia
`/{act_id}/insights` com `level=campaign`, `time_range` do dia, campos: `spend, impressions, cpm, ctr, frequency, actions`.
→ Disso eu uso **gasto, CPM, CTR, frequência**. Compras/valores do pixel eu **ignoro**.

### 2. Dashboard — filtrar a data
`<URL_DO_DASH>` → **botão de período** (Hoje / Ontem / clicar 1x no dia no calendário) + **Aplicar**.
⚠️ Os `select` de campanha e de dia **não filtram nada**. Só o botão de período funciona.
⚠️ **Sempre conferir** se o card "GASTOS COM ANÚNCIOS" bate com o gasto do dia antes de ler qualquer tabela. Se não bateu, o filtro não pegou.

### 3. Dashboard — ler o **LTV POR ANÚNCIO** (é aqui que fecha)
É a tabela certa. **LTV = front + order bump + upsell, creditado ao anúncio que trouxe o cliente.**
→ Por isso ela resolve o "não identificado": o upsell 1-clique volta pro anúncio de origem em vez de virar receita órfã.
🚫 Não usar a tabela "TODAS AS ORIGENS" pra calcular ROAS — ela é só pra **conferir configuração de rastreio** (ver se o src está chegando certo). Usar origens pra ROAS joga o upsell fora e subestima o anúncio.

### 4. Fechar a leitura
**ROAS real = LTV do dashboard ÷ gasto do Meta.** Por anúncio, e somando por campanha (o src traz `campaign_id` e `adset_id`; para campanhas antigas de src compartilhado, mapear adset→campanha via API).

### 5. Total do dia
Aba **Relatórios** → "Relatório Diário" (uma linha por data: gasto, faturamento, ROAS, CPA, margem). Serve de conferência: a soma das partes tem que bater com o total.

---

Vale pro Cliente A e pra qualquer conta que tenha dashboard próprio de venda aprovada. Ver [[reference-otimizacao-meta-cbo]] (o que fazer com o número depois de lido).
