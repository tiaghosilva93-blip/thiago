---
name: feedback-status-meta-ler-motivo
description: Status da Meta (LIMITED, BLOCKED, RED etc.) só vira alerta depois de ler o MOTIVO (errors/error_description) e confirmar que afeta o que o gestor faz
metadata:
  type: feedback
---
REGRA DURA (14/10/2026): o kit acusou ativos de uma BM como "LIMITED" e eu repassei como bloqueio de operação. O motivo real era "WhatsApp Business calling cannot use SIP" (recurso de ligação, nada a ver com o que estava rodando). Gestor: "tem que tomar cuidado com essas confusões, pra não me falar merda".

**Why:** alerta falso faz ele tomar decisão errada (achar que a BM travou) e corrói a confiança na Ada.
**How to apply:** antes de reportar qualquer status ruim da Meta (health_status LIMITED/BLOCKED, account_status, quality RED, ad DISAPPROVED), ler `errors[].error_description`/motivo, traduzir e checar se afeta mensagem/anúncio/verba. Se não afeta, é aviso de rodapé, nunca prioridade. Escrever o motivo junto do alerta.
