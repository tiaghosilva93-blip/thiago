---
name: bid-ancora-no-front
description: "Lance de bidcap se ancora no breakeven do FRONT, não no do LTV — o LTV assume que bump e upsell continuam convertendo"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9c49c612-8823-4c53-a775-2ff0be0e8dd2
  modified: 2026-08-09T04:13:15.952Z
---

**Toda operação com order bump e upsell tem DOIS breakevens, e eles servem pra coisas diferentes.**

| Breakeven | Base | Serve pra |
|---|---|---|
| **Com LTV** (front + bump + upsell) | receita líquida por comprador | decidir orçamento e ler ROAS |
| **Só FRONT** | receita líquida por venda de entrada | **definir lance de bidcap** |

Cliente A em 09/08/2026: LTV **R$327,28** · só front **R$266,07**. Diferença de 23%, porque bump e upsell são 19,2% da receita.

**Por que o lance se ancora no front:** o lance é um compromisso de quanto você paga por aquisição AGORA. Se ele for calibrado no LTV, ele só se paga se a esteira de trás continuar convertendo no mesmo ritmo. Bump e upsell dependem de página de upsell, e-mail e disparo pós-compra — operação que roda DEPOIS do anúncio e pode quebrar sem aviso. Ancorar no front é apostar só no que o anúncio comprovadamente entrega.

Nessa conta o upsell nem carrega `src` (roda em fluxo separado), o que reforça: é receita real, mas frágil e desacoplada da mídia.

**Aplicando a regra do Allan sobre a base certa:** bid = breakeven do front **+50%** (pós-Andrômeda). R$266 → **R$400**.
Isso também converge com a referência dele de "bid ótimo = um pouco abaixo do ticket do front, gastando 100%": ticket real do front R$298,95, então a otimização de longo prazo desce o lance na direção de R$270-290.

Ver [[project_bidcap_knowledge]]. Detalhe do método em `.claude/skills/media-buyer/ref-bidcap-meta.md`.
