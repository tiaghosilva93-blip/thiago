---
name: data-venda-utc
description: A coluna vendas.data_venda está em UTC e o dashboard corta o dia em BRT — toda consulta precisa do offset -03:00 ou o faturamento sai menor
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9c49c612-8823-4c53-a775-2ff0be0e8dd2
  modified: 2026-08-10T02:50:52.992Z
---

**`vendas.data_venda` no Supabase do dashboard de vendas do Cliente A está em UTC. O dashboard corta o dia em BRT.**

`src/lib/queries.ts` → `rangeTs()` monta `${data}T00:00:00-03:00` … `${data}T23:59:59-03:00`.

Consultar sem o offset lê a janela **21h do dia anterior → 21h do dia**, e some com as 3 últimas horas — justamente as que mais faturam nessa operação.

```
❌ ('data_venda','gte.2026-08-09T00:00:00')
✅ ('data_venda','gte.2026-08-09T00:00:00-03:00'), ('data_venda','lte.2026-08-09T23:59:59-03:00')
```

Erro real (Cliente A, 09/08/2026): fechei o dia em **R$11.885** e o número certo era **R$12.899**. 8,5% a menos, e o gestor percebeu antes de mim.

🔑 **Sintoma pra reconhecer na hora:** se a quebra por hora começa às 04h em vez de 00h, você está lendo em UTC.

**Faturamento na tela = `valor` (bruto), não `valor_liquido`.** O filtro da dash é `status = 'approved'` **e** `valor > 1` (exclui compras teste de R$1). Reproduzir os dois para o número bater.

Ver [[feedback_leitura_meta_mais_dash]].
