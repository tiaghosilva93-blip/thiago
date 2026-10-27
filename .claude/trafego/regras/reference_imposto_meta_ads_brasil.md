---
name: reference-imposto-meta-ads-brasil
description: "Meta Ads Brasil cobra 13,83% de imposto EM CIMA do gasto (12,15% por dentro) — o spend da API não inclui isso"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 304431cc-563a-4905-b381-4c8bd9ae9045
  modified: 2026-07-21T12:03:35.385Z
---

O `spend` que a API do Meta devolve é **líquido, sem imposto**. O que sai do
cartão é maior. Quem fatura é a **FACEBOOK SERVICOS ONLINE DO BRASIL LTDA**
(CNPJ 13.347.016/0001-17) e o recibo abre as alíquotas:

| tributo | alíquota |
|---|---|
| COFINS | 7,60% |
| PIS | 1,65% |
| ISS | 2,90% (municipal — 2,90% = São Paulo) |
| **soma** | **12,15%** |

**Pegadinha:** esses 12,15% incidem **POR DENTRO**, ou seja, sobre o valor BRUTO
cobrado, não sobre o gasto. Então o multiplicador sobre o `spend` é:

```
1 / (1 - 0,1215) = 1,1383  →  13,83% em cima do gasto
```

Quem calcula "12,15% sobre o gasto" erra pra menos. E chutar "~7%" (que é o que
aparece em fórum) erra quase pela metade.

**Validado 2x com dado real** (Cliente A, jul/2026): numa conta bloqueada
e 100% quitada, gasto de R$ 10.755,29 (API) contra R$ 12.246,25 cobrados (CSV de
cobranças) = **13,86% medido** vs 13,83% da fórmula. Erro de 0,03 p.p.
(arredondamento de centavos por transação). Contas e cartões diferentes.

**Por que importa:** o CPA e o ROAS reais são ~14% piores que os do Gerenciador.
Em julho do Cliente A: CPA R$ 123 → **R$ 140**; ROAS 2,14 → **1,88**. Se
o CPA é a régua pra cortar/escalar criativo, a régua estava 14% otimista.

**Onde tirar:** Gerenciador → Cobrança e pagamentos → Atividade de pagamento →
clicar na transação (o recibo PDF abre subtotal + cada tributo). A API **não**
entrega isso.

O ISS muda por município, então confirmar o recibo ao aplicar isso em outro
cliente. Implementado em `META_IMPOSTO_PCT` no dashboard de vendas.
