---
name: feedback-interrupcao-nao-e-conclusao
description: Chamada interrompida/rejeitada em conta de ads não prova que nada foi feito — ler a conta pela API antes de afirmar o estado
metadata:
  type: feedback
---

Interrupção ou rejeição de uma chamada de ferramenta NÃO é conclusão de nada. Um subagente já lançado continua executando contra a API — a interrupção mata o relatório, não o efeito colateral.

Antes de afirmar qualquer coisa sobre o estado de uma conta de ads (o que existe, o que subiu, o que está ativo), LER a conta pela Graph API. Nunca deduzir estado a partir do que a interface de ferramenta devolveu.

**Why:** em 2026-09-06, na conta de um cliente de concursos (`act_SEU_ID`), uma chamada da Ada voltou como "interrompida pelo usuário". Ela já tinha criado as 4 campanhas [06.09] com R$50/dia, ativas. Eu afirmei duas vezes "nada subiu" e o gestor teve que mandar print do Ads Manager pra me corrigir.

**How to apply:** qualquer pergunta do tipo "já subiu?", "o que tem lá?", "está ativo?" → curl na Graph API primeiro, resposta depois. Custa 5 segundos. Vale também pro inverso: não repassar diagnóstico de subagente como fato sem validar por ID na fonte viva. Nunca puxar link/ID/config da memória: sempre da fonte viva, e ler o cenário completo antes de concluir.
