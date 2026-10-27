---
name: conversao-checkout-venda
description: "A conversão de checkout em venda é o que separa 'lance mal calibrado' de 'público ruim' — ROAS baixo com checkout barato é qualidade de tráfego, não preço de mídia"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9c49c612-8823-4c53-a775-2ff0be0e8dd2
  modified: 2026-08-12T02:53:20.296Z
---

**Quando uma campanha compra checkout barato e mesmo assim não dá ROAS, o problema não é mídia. É quem está entrando.**

A conta comum tem uma taxa estável de checkout iniciado → venda aprovada. No Cliente A é **38% a 41%**. Comparar a taxa da campanha contra essa base separa dois diagnósticos que parecem iguais no ROAS:

| Sintoma | Diagnóstico | Alavanca |
|---|---|---|
| Custo por checkout ALTO, conversão normal | mídia cara | lance, faixa de horário, orçamento |
| Custo por checkout BAIXO, **conversão pela metade** | **tráfego de baixa intenção** | criativo, público, posicionamento |
| Conversão normal e CPA alto em tudo | funil / oferta | página, preço, esteira |

**Caso real (bidcap, Cliente A, 10-11/08/2026):** R$2.257 gastos, 24 checkouts, **5 compradores = 21%**. Vários anúncios compravam checkout MAIS BARATO que a conta principal (R$40 e R$47 contra R$65 de média) e ainda assim o ROAS ficou em 0,59. Metade dos checkouts não fechava.

🔑 **Custo por checkout baixo não é sinal de qualidade sozinho.** Só vale lido junto da conversão.

⚠️ **Não confundir "o lance está calibrado" com "a campanha funciona".** No mesmo caso, a régua do Allan (consumo de 70-80% do orçamento) dizia que o lance estava perfeito — e estava. O dinheiro se perdia depois do clique.

**Como medir:** checkouts vêm do Meta (`initiate_checkout`), compradores únicos vêm do dashboard (e-mail distinto, não linhas de venda — bump e upsell inflam a contagem).

Ver [[reference_bidcap_licoes_praticas]] e `.claude/skills/media-buyer/ref-bidcap-meta.md`.
