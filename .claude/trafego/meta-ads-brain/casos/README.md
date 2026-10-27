# Casos — Wins, Fails, Lessons

Aprendizado por exemplo. Quando a Ada precisar de precedente real ("já fizemos algo parecido?"), busca aqui.

---

## Como adicionar caso

Crie um arquivo `YYYY-MM-DD_[cliente]_[breve-titulo].md` com este template:

```markdown
# [Título do caso]

**Cliente:** [nome]
**Data:** [YYYY-MM-DD]
**Tipo:** [Win | Fail | Lesson]
**Nicho:** [concursos | infoproduto | saude | educacao-presencial | outro]

## Contexto
O que estava acontecendo na conta?

## Hipótese
O que eu achava que era?

## Ação
O que eu fiz exatamente? (passos, datas, mudanças)

## Resultado
Antes → Depois. Em número.

## O que aprendi
1-3 lições generalizáveis.

## Atualiza alguma heurística/playbook?
- [ ] Sim → qual arquivo:
- [ ] Não, só caso isolado.
```

---

## Como Ada usa

Antes de responder algo grande (matar campanha, escalar 5x, mudar funil), ela pode buscar:

> "Já vi caso parecido? O gestor já enfrentou X?"

Se sim, cita: "No caso `2026-04-12_cliente-a_escala-falhou.md`, a tentativa de escalar de R$ 8k pra R$ 20k em 5 dias quebrou aprendizado. Sugiro escalonar gradual."

---

## Organização

Pode subdividir por nicho conforme cresce:

```
casos/
├── concursos/
├── infoproduto/
├── saude/
└── README.md
```

(por enquanto, fica plano)

---

## Status

| Casos cadastrados | 0 |
| Wins | 0 |
| Fails | 0 |
| Lessons | 0 |
