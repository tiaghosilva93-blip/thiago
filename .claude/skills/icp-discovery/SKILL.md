---
name: icp-discovery
description: >
  Descobre e valida o ICP (Ideal Customer Profile) que orienta copy e targeting
  de ads em infoproduto/concursos. 3 caminhos: hipótese rápida (sozinho), análise
  de dados Hubla/Hotmart (planilha) ou cruzamento com dashboard do cliente.
  Use pra criar/refinar o `icp.md` em .claude/trafego/clientes/[cliente]/.
tags: [icp, avatar, persona, targeting, infoproduto, concursos]
---

# ICP Discovery — Infoproduto / Concursos

ICP em infoproduto **NÃO é empresa** (como em B2B SaaS) — é **pessoa**: o tipo de aluno/comprador que (a) compra, (b) consome o produto, (c) indica pra outro. Sem ICP claro, copy fica genérica, audiência é tiro no escuro e o CAC sobe.

## Quando esta habilidade é acionada

- Cliente novo sem `icp.md` preenchido
- Performance caiu sem motivo aparente (talvez o avatar mudou)
- Cliente quer abrir vertical/produto novo
- CPL bom + qualidade caindo → audiência está abrindo demais
- "Quem é seu aluno?" — pergunta básica que precisa ter resposta na ponta da língua

## 3 caminhos pra chegar no ICP

### Caminho 1: Hipótese rápida (30 min, sem dado)

Pra cliente novo ou quem tá começando. Faz as 4 perguntas:

1. **Os 10 alunos que mais te marcaram (em resultado, em sumir do mapa indicando, em depoimento)** — o que eles têm em comum?
2. **10 alunos que te deram dor de cabeça** (cancelaram, reclamaram, não consumiram) — por quê?
3. De quem você ouviu **"era exatamente o que eu precisava"** sem precisar convencer?
4. Se você pudesse só atender 1 perfil, qual seria?

Com isso monta draft Tier 1 / Tier 2 / Anti-ICP em `icp.md`.

### Caminho 2: Análise de dados Hubla/Hotmart (1-2h)

Pra cliente com volume rodando.

Exporta dos últimos 6-12 meses:
- Pedidos pagos (closed-won) com email, data, produto, valor
- Status atual (ativo, reembolsado, cancelou recorrência)
- UTM source/campaign (pra cruzar com canal de aquisição)

Em ordem:

1. **Recorta os 20% que mais gastaram** (ticket alto, comprou upsell, voltou)
2. **Recorta os 20% que reembolsaram ou cancelaram cedo**
3. Cruza com pesquisa pós-compra ou DM do Instagram (se tiver) → demografia, dor, gatilho de compra
4. Vai cruzar: idade, geo, vertical/produto comprado, ticket, JTBD

Saída vira o draft Tier 1.

### Caminho 3: Pesquisa qualitativa (1 semana, mais rico)

Quando vai abrir vertical nova ou cliente sem dado.

1. Manda Google Form pra base de alunos (20-50 respostas mínimo)
2. Perguntas-chave:
   - Idade, profissão, renda faixa
   - "Por que comprou?" (campo aberto — gold pra copy)
   - "Qual a maior dor que esse produto resolveu?"
   - "Se um amigo perguntasse o que é, você diria...?"
   - "O que você quase comprou em vez disso?"
3. Tabula com Claude → identifica 3 dores TOP, 3 gatilhos TOP, 3 mensagens-vencedoras

(Existe a skill irmã `webinar-pesquisa-publico` que faz isso pra webinar — mesma técnica.)

## Estrutura do `icp.md`

Sempre 3 seções:

### ICP Tier 1 (~70% do budget mira aqui)
| Campo | Detalhe |
|---|---|
| **Decisor** | Quem decide comprar (ele mesmo? pai? cônjuge?) |
| **Idade** | Faixa |
| **Renda** | Classe (A/B/C/D) |
| **Geo** | Onde está |
| **Estágio** | Onde está na jornada |
| **Dor central** | Frase exata que ele falaria |
| **JTBD** | "Quero ___ porque ___" |
| **Gatilho de compra** | O que acontece e ele decide comprar AGORA |
| **Objeções top 3** | O que faz ele NÃO comprar |

### ICP Tier 2 (~25% do budget)
Qualificado mas secundário. Mesma estrutura.

### Anti-ICP
**Quem NÃO mirar e por quê.** Filtra exclusões de targeting, negativações de keyword, e ângulos de copy.

Exemplos pra infoproduto:
- "Quem busca apostila gratuita" — não compra
- "Quem só quer reembolso depois" — sinais: comprou, não consumiu, pediu reembolso em < 7 dias
- "Quem confunde com plataforma X" — vem buscando errado

## Casos comuns por nicho

### Concursos públicos
- **Tier 1 típico:** 28-42 anos, classe C/B, já reprovou 1+ vez, busca método (não conteúdo)
- **Anti-ICP:** "iniciante absoluto sem decidir cargo" (não está pronto pra comprar)

### Pré-vestibular
- **Decisor híbrido:** aluno (18-19) decide, pai paga. Copy precisa funcionar nos dois
- **Anti-ICP:** aluno classe A/escola particular cara (vai pro Bernoulli/Anglo, não compra online)

### Kids / Colégio
- **Decisor é o PAI**, não a criança. Copy precisa falar com pai
- **Anti-ICP:** pais que querem "atividade" (não educação) — vão pra escolinha de inglês/judô

### Saúde (diabetes, ED, anti-idade)
- **Decisor:** ele mesmo, mas com vergonha — copy precisa ser sigilosa
- **Anti-ICP:** quem só quer "produto encapsulado" sem método (vai churnar)

## Sinais de que o ICP precisa ser revisitado

- 3+ meses sem atualizar e tem volume de venda novo
- CPL bom + conversão caindo
- Reembolso aumentou em vertical específica
- Cliente diz "esses leads tão piores"
- Mudou ticket/produto

## O que NÃO fazer

- Não confunde **persona** (Maria, 35, RJ) com **ICP** (mulheres 30-40 RJ classe B preparando concurso TJ)
- Não copia ICP de concorrente — o produto é diferente
- Não escreve ICP super amplo ("quem quer passar em concurso")
- **Nunca esquece o Anti-ICP** — vale tanto quanto o Tier 1
- Não vira "fala em B2B" (empresa de X funcionários) — infoproduto é PESSOA

## Próximo passo

Com `icp.md` preenchido:
- Skill `positioning` usa pra desenhar mensagens-chave por persona
- Skill `meta-ads-fundamentos` usa pra escolher audiência (LAL, retargeting, interesses)
- `ads-history.md` registra quando teste de audiência confirmou/refutou o ICP
