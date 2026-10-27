---
name: positioning
description: >
  Define o posicionamento (por que o aluno escolhe esse curso vs alternativas)
  que vira mensagem central nos ads. Cobre frase de positioning, JTBD,
  mapeamento de alternativas e mensagens-chave por persona. Adaptado pra
  infoproduto/concursos. Use pra criar/refinar `positioning.md` em
  .claude/trafego/clientes/[cliente]/.
tags: [positioning, mensagem, copy, jtbd, alternativa, infoproduto]
---

# Positioning — Infoproduto / Concursos

Posicionamento é **por que o aluno escolhe esse curso vs as outras opções**. É a base de toda copy: o ad é a entrega curta da mensagem, o positioning é a mensagem.

Sem positioning claro:
- Copy copia concorrente
- Vira commodity (vende preço)
- Foca em feature ("3.000 questões") em vez de resultado ("aprovação")

## Quando esta habilidade é acionada

- `positioning.md` vazio ou com hipóteses não validadas
- Cliente lançando produto/vertical novo
- Concorrente novo no nicho
- Copy estagnada — CTR caindo sem renovação de mensagem
- Cliente pergunta "como eu falo nos ads?"

## Estrutura do `positioning.md`

4 blocos.

### 1. Frase de positioning

Template:
> Pra **[QUEM]** que precisa de **[QUE]**, somos a **[CATEGORIA]** que entrega **[DIFERENCIAL]**, ao invés de **[ALTERNATIVA]**.

Cada espaço puxa de:
- **QUEM:** Tier 1 do `icp.md`
- **QUE:** dor central do ICP
- **CATEGORIA:** como o aluno **busca** (não como o cliente se define)
- **DIFERENCIAL:** o que faz melhor
- **ALTERNATIVA:** status quo + concorrentes

Exemplo (concursos):
> Pra **professor estadual 30-45 que quer mudar de carreira**, que precisa de **método pra passar em 1-2 anos sem largar emprego**, somos a **mentoria de aprovação** que entrega **cronograma adaptado + correção semanal**, ao invés de **apostila gigante ou playlist de YouTube**.

### 2. JTBD (Jobs To Be Done)

3-5 "jobs" que o aluno quer fazer ao comprar. Cada job vira ângulo de copy.

Exemplos infoproduto:
- **Mudança de vida:** "quero estabilidade" / "quero sair desse emprego"
- **Reparação:** "reprovei ano passado, quero entender o que faltou"
- **Preparação:** "edital saiu / vai sair, quero estar pronto"
- **Validação social:** "quero mostrar pra família que vou conseguir"
- **Evitar dor:** "não quero estudar 5 anos como fulano"

Cada job → ângulo:
- Mudança de vida → criativo aspiracional (depoimento)
- Reparação → criativo de quebra ("erro que reprovou você")
- Preparação → urgência + cronograma
- Validação → prova social com pessoas comuns

### 3. Alternativas

Pra cada alternativa relevante:

| Alternativa | A favor | Contra | Como vencemos |
|---|---|---|---|
| **Status quo: estudar sozinho** | Gratuito, flexível | Sem método, desanima | "Sai do estudo solo" |
| **YouTube/redes** | Gratuito, conteúdo bom | Sem ordem, sem prática | "Conteúdo solto ≠ aprovação" |
| **Apostila/PDF** | Barato | Estática, sem feedback | "Apostila não corrige, a gente corrige" |
| **Concorrente A** | Marca forte | Caro, turma gigante | "Atendimento individual vs turma de 1000" |
| **Cursinho presencial** | Estrutura, rotina | Caro, fixo no horário | "Mesma qualidade, do seu sofá" |

**Sempre lista status quo (estudar sozinho / YouTube) como alternativa #1.** Esquecer dele é erro clássico.

### 4. Mensagens-chave validadas

Pra cada persona dentro do ICP:

| Persona | Dor (gancho 3s) | Promessa | Prova |
|---|---|---|---|
| Tier 1 | Frase exata da dor | O que entrega | Número/case |
| Tier 2 | ... | ... | ... |

**E uma seção vinculante "o que NÃO falar nos ads"** — termos proibidos por:
- Regulamentação (promessa de aprovação, claim médico)
- Política da plataforma (Meta bloqueia)
- Desmerecimento da audiência ("fácil", "qualquer um")
- Coisa que o produto não entrega (não inventar)

## Caminho rápido (30 min)

Pergunta 4 coisas pro cliente:

1. **Pitch em 1 frase:** "Se um amigo perguntar o que é, você diz?"
2. **Concorrentes nominais:** "Quais 2-3 nomes aparecem quando o aluno avalia?"
3. **Status quo:** "Sem o seu produto, o que o aluno faria?"
4. **Resultado real:** "O aluno compra a feature ou o resultado?"

Com isso monta draft. Valida com cliente em 1 reunião curta.

## Caminho com dado

Se cliente tem pesquisa de pós-compra ou DM organizada:

1. Coleta 30+ respostas de "por que comprou?"
2. Tabula com Claude → 3 motivos TOP de ganho, 3 motivos TOP de não-compra (perdidos)
3. Os motivos viram **mensagens** ("compraram pq queriam X" → ad com gancho X)

## Caminho de pesquisa de concorrente

Sem dado próprio:

1. Lista os 3 concorrentes principais
2. WebFetch a página de vendas de cada um
3. Identifica: positioning explícito / JTBD endereçado / claim principal
4. Onde tem espaço pra diferenciar?

## Sinais de positioning fraco

- Cobre o nome do cliente com o do concorrente — copy faz sentido = positioning fraco
- CTR oscila sem padrão — mensagem não está cristalizada
- Cliente do funil reclama que lead "não entende o que é" — mensagem confusa
- Vendendo feature ("3.000 questões") em vez de resultado ("aprovação em 6 meses")

## O que NÃO fazer

- **Não cita concorrente nominalmente** em ad (Meta bloqueia, risco jurídico)
- **Não usa superlativo vazio** ("o melhor método", "o mais completo")
- **Não promete aprovação** garantida (regulamentação)
- **Não traduz positioning gringo** literal — não funciona no PT-BR
- **Não desmerece status quo** ("apostila é fácil de superar") — desmerece o esforço do aluno
- **Não inventa** prova que não pode sustentar

## Próximo passo

Com `positioning.md` validado:
- `meta-ads-fundamentos` usa mensagens pra escrever copy
- `creative-fatigue` usa os 8 ângulos derivados dos JTBD pra renovar
- Toda copy nova passa pelo crivo "isso bate com positioning?"
- Lista "o que NÃO falar" vira regra dura — Cyro/Kai/Ada não violam

## Skills relacionadas

- `icp-discovery` — define QUEM antes de definir mensagem
- `product-context` — define O QUE
- `creative-fatigue` — varia ângulo dentro do positioning
- `webinar-mecanismo-unico` — pra webinars, o positioning vira mecanismo
