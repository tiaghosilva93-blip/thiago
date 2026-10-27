---
name: teto-de-escala-por-faixa
description: "Antes de escalar, achar a faixa de GASTO em que a campanha rende; campanha no topo da faixa boa se DUPLICA, não se aumenta"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9c49c612-8823-4c53-a775-2ff0be0e8dd2
  modified: 2026-08-07T03:14:47.414Z
---

**Toda campanha tem um ponto de ruptura de gasto, e ele costuma estar logo acima de onde ela já roda.** Descobre-se consultando, não opinando: pega os últimos 14 dias, agrupa cada dia em faixas de R$100 de gasto e tira o ROAS médio por faixa.

Exemplo real (Cliente A, 06/08/2026) — duas campanhas rendiam **3,23 e 2,82 até R$199** de gasto e desabavam pra **0,80 e 0,65 acima de R$200**. Subir orçamento nelas era comprar prejuízo com aviso prévio.

⚠️ **Ler pelo GASTO, nunca pelo orçamento: o CBO gasta 8-12% acima do configurado.** Orçamento R$592 entrega ~R$644.

**Regra de decisão:**
- Campanha **no topo da faixa boa** → **duplicar em campanha nova**, que nasce com orçamento próprio e não empurra a original pra faixa ruim.
- Campanha com **faixa superior comprovada** → aumentar até o limite dessa faixa, nunca além.

Quando a maioria já roda no topo, **não existe escala por orçamento** — só por estrutura nova. Em 06/08 a soma do que cabia dentro das faixas boas dava +R$135; o pedido era +R$546. A saída foram 2 duplicatas.

**Ao duplicar:** prefira duplicar quem usa **criativo diferente** do campeão que já está em várias campanhas (duplicar o mesmo criativo infla CPM por sobreposição de leilão); reaproveite o `creative_id` da origem para manter a prova social; e se a duplicata roubar leilão da original e **as duas ficarem medianas, consolide numa só**.

Detalhe completo e os casos em `.claude/trafego/meta-ads-brain/heuristicas/quando-escalar.md`. Ver [[reference_escala_meta_dose_certa]].
