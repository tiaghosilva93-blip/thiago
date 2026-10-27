---
name: dia-de-teste-custo-checkout
description: "Dia certo pra subir teste de criativo = menor CUSTO POR CHECKOUT, nunca maior ROAS; dia de escalar e dia de testar são opostos"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9c49c612-8823-4c53-a775-2ff0be0e8dd2
  modified: 2026-08-06T04:46:47.752Z
---

**Escolher dia de teste pelo ROAS é errado.** Teste de criativo compra APRENDIZADO, e aprendizado se mede em checkouts iniciados, não em faturamento. O dia certo é o de **menor custo por checkout**.

Na prática os dois rankings são quase opostos: o dia que converte melhor tem o checkout mais caro, porque é o dia em que todo mundo está comprando e o leilão sobe.

**Regra completa (já implementada no dashboard DR, `src/lib/funil-insights.ts`):**
1. **Escalar** = maior LUCRO MÉDIO POR DIA daquele dia da semana (não ROAS, não faturamento).
2. **Testar** = menor custo por checkout iniciado, **excluindo os 3 dias campeões de lucro** — dia de escalar não é dia de testar, senão a verba de teste rouba o dia que dá dinheiro.
3. Janela fixa de 28 dias terminando ONTEM (o dia corrente nunca entra, senão dia pela metade distorce) e **média por dia**, não soma, senão o dia da semana que caiu mais vezes ganha vantagem injusta.

**Cliente A, medido em 06/08/2026** — testar: sexta R$44,41 · quinta R$45,18 · sábado R$46,78. Escalar: segunda (R$2.494/dia), domingo, quarta. Pior dia pra testar: segunda, R$52,91/checkout.

**Consequência na leitura:** o resultado de um teste NÃO se lê por ROAS do dia. Compara-se custo por checkout entre os anúncios e onde o CBO concentrou a verba. Todos os criativos pegam o mesmo dia, então o viés de dia da semana se cancela entre eles — mas não se cancela ao comparar um dia contra outro.

Ver também [[reference_escala_meta_dose_certa]].
