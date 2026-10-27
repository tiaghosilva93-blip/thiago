# Meta-Ads-Brain — o gestor

**6 anos de tráfego pago condensados.** Este é o cérebro da Ada — toda decisão estratégica que ela toma sobre Meta Ads passa por aqui.

Não é teoria. É o que **eu vi funcionar** e **o que vi quebrar** em conta real, com dinheiro real, em nichos brasileiros (concursos, infoproduto, saúde).

---

## Estrutura

| Camada | O que tem | Quando Ada lê |
|---|---|---|
| `00-filosofia.md` | Postura. Como eu penso sobre tráfego. | Sempre, na abertura de qualquer análise |
| `heuristicas/` | Regras de bolso ("se X, então Y"). O **feeling** da conta. | Quando precisa decidir algo (pausar, escalar, matar) |
| `frameworks/` | Sistemas de organização (estrutura de conta, naming, fluxo de teste). | Ao subir campanha ou auditar conta |
| `playbooks/` | Receitas por situação (cliente novo, lançamento, salvando conta ruim). | Quando o contexto bate com a situação |
| `nichos/` | Specifics por nicho (concursos, infoproduto, saúde). | Sempre que o cliente cair num nicho |
| `casos/` | Wins e fails reais. Aprendizado por exemplo. | Ao buscar precedente pra decisão |
| `vocabulario.md` | Gírias do trade que uso. | Quando Ada não entender um termo |

---

## Como Ada usa este brain

Antes de qualquer análise/recomendação:

1. **Lê `00-filosofia.md`** (1x por sessão, fica no contexto)
2. **Lê `nichos/[nicho-do-cliente].md`** (1x por cliente na sessão)
3. **Consulta `heuristicas/` ou `playbooks/`** conforme a pergunta exige
4. **Cita o que aplicou** ("Pela heurística X de leitura de conta, ..." / "Pelo playbook Y de cliente novo, ...")

---

## Como popular este brain (ongoing)

3 caminhos:

1. **Entrevista** — o gestor me chama com "vamos preencher [arquivo X]" e eu faço perguntas
2. **O gestor escreve direto** — abre o arquivo e despeja no campo "Suas respostas"
3. **Captura de conversa** — depois de Ada diagnosticar uma conta, ela pergunta "isso vira heurística? quer que eu grave?"

Cada arquivo de heurística/framework/playbook tem **perguntas-âncora** dentro pra guiar o preenchimento.

---

## Status atual (preencher conforme avança)

| Arquivo | Status | Última atualização |
|---|---|---|
| 00-filosofia.md | 🟡 Stub com perguntas | 2026-05-29 |
| heuristicas/leitura-de-conta.md | 🟡 Stub | 2026-05-29 |
| heuristicas/quando-pausar.md | 🟡 Stub | 2026-05-29 |
| heuristicas/quando-escalar.md | 🟡 Stub | 2026-05-29 |
| heuristicas/quando-matar.md | 🟡 Stub | 2026-05-29 |
| heuristicas/sinais-de-alerta.md | 🟡 Stub | 2026-05-29 |
| heuristicas/red-flags-cliente.md | 🟡 Stub | 2026-05-29 |
| frameworks/estrutura-de-conta.md | 🟡 Stub + seção "Subir conjunto via API em conta travada por DSA" preenchida (caso real de um cliente) | 2026-08-13 |
| frameworks/fluxo-de-teste.md | 🟡 Stub | 2026-05-29 |
| frameworks/escalada.md | 🟡 Stub | 2026-05-29 |
| frameworks/escala-baiana.md | 🟢 Preenchido | 2026-05-29 |
| frameworks/bidcap.md | 🔵 Validado (3 aulas Alan) | 2026-05-29 |
| frameworks/teste-de-criativos.md | 🟢 Preenchido (aula Pedro) | 2026-05-29 |
| frameworks/rotina-diaria.md | 🟡 Stub | 2026-05-29 |
| playbooks/primeiro-mes-cliente-novo.md | 🟡 Stub | 2026-05-29 |
| playbooks/lancamento-do-zero.md | 🟡 Stub | 2026-05-29 |
| playbooks/salvando-conta-ruim.md | 🟡 Stub | 2026-05-29 |
| playbooks/escala-cpa-estavel.md | 🟡 Stub | 2026-05-29 |
| nichos/concursos.md | 🟡 Stub | 2026-05-29 |
| nichos/infoproduto.md | 🟡 Stub | 2026-05-29 |
| nichos/saude-nutra.md | 🟡 Stub | 2026-05-29 |
| nichos/educacao-presencial.md | 🟡 Stub | 2026-05-29 |
| vocabulario.md | 🟡 Stub | 2026-05-29 |

🟡 = stub com perguntas | 🟢 = preenchido | 🔵 = revisado e validado

---

## Relação com outras peças

- **`.claude/skills/media-buyer/`** — conhecimento EXTERNO (Pedro Andrade, Linecker, etc). Esse brain aqui é o **seu** conhecimento, complementar.
- **`.claude/trafego/clientes/[cliente]/`** — knowledge base por cliente (product, icp, positioning, pricing, ads-history). Brain é genérico, clients é específico.
- **`.claude/agents/ada.md`** — identidade e protocolo da Ada. Ela é treinada pra ler este brain.
