---
name: feedback-meta-sempre-api-nunca-browser
description: Meta Ads é SEMPRE via API Graph; nunca abrir Chrome/Ads Manager no navegador
metadata:
  type: feedback
---

Qualquer leitura ou ação em Meta Ads é feita pela **API Graph da Meta**, nunca abrindo o Chrome / Ads Manager no navegador. Regra dura, sem exceção — mesmo para "só conferir uma coisa na tela".

**Why:** O navegador é lento, quebra sessão, depende do Chrome estar aberto e logado, e o gestor fecha o Chrome no meio do trabalho. A API sempre responde, é auditável e não depende de estado de UI.

**How to apply:** Token em `~/.claude/secrets.env` (`META_ACCESS_TOKEN`). Tudo por `curl` no `graph.facebook.com`. Se um dado parecer invisível na API (ex: criativos de anúncio dinâmico), a resposta NÃO é abrir o navegador — é achar o endpoint certo (ver [[reference-meta-anuncio-dinamico-breakdown]]). Sempre consultar a documentação oficial da Meta antes de afirmar como um endpoint funciona.
