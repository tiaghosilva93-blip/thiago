---
name: ads-google
description: >
  Fundamentos estratégicos de Google Ads (Search, PMax, Display, Brand) pra
  infoproduto/concursos. Cobre estrutura de campanha, naming, bid strategies,
  keywords e match types, quando usar cada tipo. Integra com nossos Google Ads
  Scripts (Sheets-based, em ~/Antigravity/google-ads-scripts/). Use sempre que
  o assunto for Google Ads.
tags: [google-ads, search, pmax, keywords, bid-strategy, infoproduto]
---

# Google Ads — Fundamentos Estratégicos

Google Ads é **intent-heavy**: a pessoa está buscando ativamente. Campanha bem feita captura demanda existente. Mal feita queima budget em busca genérica.

Em infoproduto/concursos, Google geralmente entrega **lead mais barato e mais quente** que Meta — mas com volume menor. É o canal de **eficiência**.

## Quando esta habilidade é acionada

Qualquer assunto Google Ads:
- Criar/alterar campanha
- Keywords, match types, negativações
- Bid strategy (Max Conversions, tCPA, Manual CPC, Impression Share)
- Performance Max (PMax)
- Brand defense
- Auditoria de performance

## Nossa infraestrutura

```
~/Antigravity/google-ads-scripts/
└── cliente-a-audit.js    # Google Ads Script → exporta pra Sheets
```

**Como funciona:** Google Ads Script roda dentro da conta do cliente, exporta dados pra Sheets multi-aba (Daily Trend / Campaigns / Ad Groups / Keywords / Search Terms / Ads / Conversions). Ada/Theo lê o Sheets pra analisar.

**Padrão:** 1 script por cliente, agendado diário 08h. Ver `cliente-a-audit.js` como template.

## Princípios

### 1. Um objetivo por campanha

Nunca misture intent na mesma campanha. Separa por:
- **Intent principal** (ex: "concurso TJ", "vestibular medicina")
- **Estágio do funil** (awareness "o que é" → consideração "melhor" → decisão "X vs Y")
- **Brand vs Non-brand** — sempre separado

Exemplo Cliente A (um cliente de concursos):

| Campanha | Intent | Bid strategy |
|---|---|---|
| Cliente A - Brand | Defende busca pelo nome | Target Impression Share 90% |
| Cliente A - Concursos Federais | "concurso PF/Receita Federal" | Max Conversions com tCPA |
| Cliente A - Pré-Vestibular RJ | "cursinho rj", "pré-vest" | Max Conversions com tCPA |
| Cliente A - Kids | "reforço escolar RJ" | Max Conversions com tCPA |
| Cliente A - Concorrentes | "[concorrente 1]", "[concorrente 2]" | Manual CPC, lance baixo |

### 2. Naming convention (padrão da casa)

```
[Cliente] - [Categoria] - [Geo] - [Idioma]
```

Exemplo: `Cliente A - Concursos Federais - BR - PT`

Ad groups:
```
[Tema] - [Match type principal]
```

Exemplo: `Receita Federal - Phrase`

### 3. Match types

| Match | Quando usar | Cuidado |
|---|---|---|
| **Broad** | Só com audience signal forte + tCPA apertado | Queima rápido sem freio |
| **Phrase** | Default pra maioria dos casos | Controle decente, volume razoável |
| **Exact** | Intent alta, pouca variação, high-value | Brand é sempre exact |

### 4. Bid strategy

| Campanha | Bid recomendada | Por quê |
|---|---|---|
| Brand | Target Impression Share 90%+ | Presença, não conversão |
| Non-brand conversão | Max Conversions com **tCPA** | Plataforma otimiza bid; tCPA é o freio |
| Awareness | Target CPM ou Manual CPC | Objetivo é ver marca |
| Concorrentes | Manual CPC baixo | Não queima se não vence leilão |
| Remarketing | Max Conversions | Retarget de visitantes |

**Regra inegociável:** NUNCA Max Conversions **sem tCPA**. Sem limite, a plataforma gasta o que o budget deixar sem se importar com CAC.

### 5. Performance Max (PMax)

PMax = Google IA rodando em search + display + YouTube + Gmail + Maps. Você dá asset (texto, imagem, vídeo) e audience signal, ele decide o resto.

**Quando usar:**
- Audience signal forte (lista de compradores, conversão recorrente)
- tCPA apertado pra servir de freio
- Conta com 30+ conversões/mês de histórico

**Quando NÃO usar:**
- Começando do zero (vai servir display ruim, queima)
- Sem conversão configurada
- Nicho muito específico (PMax otimiza pra volume de clique, não qualidade de lead)

**Em infoproduto:** PMax tende a inflar volume e cair qualidade. Default = **não usar sem motivo forte**.

### 6. Keywords e negativações

**Pra escolher keywords iniciais:**

1. Lê `product.md` (o que faz) e `positioning.md` (como o aluno busca)
2. Começa com 10-15 phrase match
3. Usa Keyword Planner pra volume
4. Evita keywords super amplas ("concurso", "estudar", "curso") — atraem TUDO

**Negativações iniciais obrigatórias (infoproduto):**

| Categoria | Termos |
|---|---|
| **Gratuito** | `grátis`, `free`, `download`, `pdf`, `gratuito`, `de graça` |
| **Acadêmico** | `tcc`, `monografia`, `artigo científico`, `universidade`, `bibliografia` |
| **Emprego** | `vaga`, `currículo`, `emprego`, `clt`, `salário inicial` |
| **Pirataria** | `mega`, `drive`, `torrent`, `baixar`, `link` |
| **Concorrente que confunde** | depende do nicho — listar em `ads-history.md` |
| **Intent errada** | depende do produto — ex: pro Cliente A: `apostila`, `pdf concurso` |

**Lista compartilhada** > negativar por campanha (evita duplicar).

## Ações operacionais

### Subir campanha nova

Confirma com o gestor:
- Nome (padrão da casa)
- Budget diário
- Bid + tCPA
- Lista keywords
- Lista negativações
- Copy (15 headlines + 4 descriptions pra Responsive Search Ad)
- URL final + UTMs

Hoje a gente sobe via **UI Google Ads** (não temos script Python de create). O Sheets exportado pelo `cliente-a-audit.js` é pra leitura/análise.

### Auditar performance

```bash
# Abrir Sheets do cliente:
open "https://docs.google.com/spreadsheets/d/[ID_DO_CLIENTE]/edit"
```

Olhar nessa ordem:
1. **Daily Trend** — gasto/conversão por dia, identificar mudança brusca
2. **Campaigns** — qual campanha tá puxando ou queimando
3. **Search Terms** — o que está sendo buscado (e disparando o ad)
4. **Keywords** — quais keywords convertem
5. **Ads** — qual ad tem CTR melhor

## Limites técnicos (sempre respeitar)

| Campo | Limite |
|---|---|
| Headline | 30 chars |
| Description | 90 chars |
| RSA: mínimo headlines | 3 |
| RSA: máximo headlines | 15 |
| RSA: mínimo descriptions | 2 |
| RSA: máximo descriptions | 4 |

## Sinais de problema

| Sintoma | Causa provável | Ação |
|---|---|---|
| CTR < 2% em search | Copy ruim ou keyword mal escolhida | Revisa copy + intent das keywords |
| Impressão alta, clique baixo | Audiência errada ou copy não bate com busca | Revisa headlines vs search terms |
| Gasto alto, 0 conversão (>7d) | Pixel quebrado OU intent errada | Diagnostica antes de pausar |
| Quality Score < 5 | LP não bate com expectativa | Revisa LP + relevância |
| Search Terms vazando | Keyword broad demais | `search-terms-pruning` |

## Casos comuns por nicho

### Concursos
- Brand defense crítico (concorrentes vão comprar o nome da marca)
- Negativa pesada: gratuito + apostila + pdf + emprego
- Sazonal — edital sai, mira

### Pré-vestibular
- Sazonal forte (out-fev = peak)
- Geo muito relevante (cursinho RJ vs cursinho SP — não mistura)

### Kids / Colégio
- Decisor = pai. Keyword = "escola pro meu filho RJ"
- Geo presencial = raio físico, não estado

### Saúde / Nutra
- Categoria especial Meta — em Google é menos restrito, mas cuidado com claim
- Brand fundamental (compras de quem viu Meta)

## O que NÃO fazer

- **Não usa Max Conversions sem tCPA** — queima orçamento
- **Não mistura brand e non-brand** na mesma campanha
- **Não ativa PMax sem conversão histórica decente**
- **Não cria 1 campanha com 20 ad groups de temas diferentes** — vira caos de bid
- **Não esquece tracking de conversão ANTES de subir a campanha** — sobe sem pixel e o Max Conversions otimiza pra nada
- **Não compra nome de concorrente** sem checar regras locais (pode bloquear)
- **Não esquece de negativar gratuito/emprego/acadêmico** desde o dia 1

## Skills relacionadas

- `search-terms-pruning` — manutenção semanal das negativações
- `ads-attribution` — Google vs Hubla, CAC real
- `meta-ads-fundamentos` — quando comparar com Meta
- `icp-discovery` — define quem mirar antes das keywords
- `positioning` — define mensagem que vira RSA
