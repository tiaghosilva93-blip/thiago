---
name: search-terms-pruning
description: >
  Auditoria recorrente dos search terms do Google Ads. Identifica termos
  desperdiçando budget (negativar), termos convertendo bem (promover pra exact)
  e padrões que sugerem nova campanha. Roda semanalmente ou quando CAC subir
  sem motivo. Integra com nossos Google Ads Scripts (Sheets-based).
tags: [google-ads, search-terms, negativacao, exact-match, manutencao]
---

# Google Ads — Search Terms Pruning

Search terms = buscas reais que dispararam seu ad (diferente de keywords = o que VOCÊ definiu). Google match com várias formas (broad/phrase/exact) e quase sempre algumas combinações são desperdício.

Pruning recorrente é manutenção básica. Sem ele, gasto cresce sem performance correspondente.

## Quando esta habilidade é acionada

- Cadência semanal ou quinzenal (recomendado)
- CAC subindo sem mudança em campanha
- Cliques subindo, conversão não acompanhando
- Antes de aumentar budget (limpar primeiro)
- Suspeita de broad match pegando errado

## Workflow padrão (45 min)

### 1. Puxar search terms

Via nosso script (Google Ads Script → Sheets):
```
~/Antigravity/google-ads-scripts/cliente-a-audit.js
```
Aba **Search Terms** da planilha do cliente.

Filtro mental: ignora termos com gasto < R$ 50 (ruído). Foca em quem queimou mais.

### 2. Classificar cada termo

| Decisão | Critério | Ação |
|---|---|---|
| **NEGATIVAR (zero conv)** | Gastou > 3x CAC alvo, 0 conversão | Negativa específica |
| **NEGATIVAR (intent errada)** | Atrai fora do ICP, mesmo se converteu | Negativa (ex: "curso gratuito") |
| **PROMOVER PRA EXACT** | Converteu 2+ vezes, CAC abaixo do alvo | Adiciona exact match em ad group dedicado |
| **NOVA CAMPANHA** | Volume alto + intent diferente | Sugere campanha nova (não polui a atual) |
| **MANTER** | Performando bem | Nada |
| **OBSERVAR** | Pouco volume, intent OK | Aguarda 14 dias |

### 3. Padrões pra negativar em massa

Se 5+ termos com mesmo padrão, negativa o padrão broad em vez de cada um:

| Padrão | Quando negativar | Cuidado |
|---|---|---|
| `[termo] grátis`, `free`, `pdf`, `download` | Vende produto pago | Sempre OK |
| `[termo] apostila`, `pdf`, `download` | Curso completo | Sempre OK |
| `[termo] vaga`, `currículo`, `emprego`, `concurseiro pdf` | Quem busca emprego, não curso | Sempre OK |
| `[termo] tcc`, `monografia`, `universidade` | Acadêmico, não comprador | Sempre OK |
| `[termo] curso`, `aula`, `como fazer` | Depende — pode ser intenção certa | Cuidado |
| `[termo] gratuito` (sem "grátis") | Concorrência com gratuito | OK pra paid |

### 4. Aplicar negativações

Hoje fazemos via **UI do Google Ads** (não temos script de apply automatizado ainda).

Lista compartilhada (recomendado) > negativa por campanha — evita duplicar.

### 5. Documentar

Atualiza `.claude/trafego/clientes/[cliente]/ads-history.md` na seção "Negativações importantes":
- Data
- O que negativou
- Por quê (1 linha)
- Lista compartilhada usada

## Heurísticas

### Negativar agressivo vs paciente

| Gasto / CAC alvo | Conversão | Decisão |
|---|---|---|
| > 3x | 0 | Negativa imediato |
| 1-3x | 0 | Espera 7d |
| 1-2x | 1 com CAC 2x alvo | Espera 14d |
| < 1x | 0 | Observa |

### Promover pra exact match

Requisitos cumulativos:
- Search term apareceu 5+ vezes
- Converteu 2+ vezes
- CAC do termo < CAC alvo da campanha
- Volume justifica (> 10 buscas/mês)

Sobe como exact em ad group dedicado pra controlar bid.

### Sugerir nova campanha

Sinal: 10+ search terms com intent claramente diferente da campanha atual, volume relevante.

Exemplo: campanha "Cliente A - Concursos" começa receber "pré-vestibular RJ" → nova campanha.

## Auditoria assistida com Claude

Cola o CSV exportado da aba Search Terms na conversa. Pede:

> Leu a aba `Search Terms` do Sheets do [cliente] dos últimos 30 dias.
> Pra cada termo:
> 1. Classifica: NEGATIVAR / NEGATIVAR (intent errada) / PROMOVER PRA EXACT / NOVA CAMPANHA / MANTER / OBSERVAR
> 2. Justifica em 1 linha
> 3. Se for NEGATIVAR, indica se vai como específica ou padrão broad
> 4. Agrupa negativações por padrão (ex: tudo com "grátis" vira 1 broad)
>
> CAC alvo: R$ X (veja `pricing.md` do cliente).
> Anti-ICP em `icp.md`.

Confirma com o gestor antes de aplicar.

## Métricas de saúde do pruning

Mantém histórico em `ads-history.md`:

| Métrica | Alvo | O que significa |
|---|---|---|
| **% gasto em termos convertendo** | > 70% | Saúde geral do match |
| **Taxa de novos termos negativados/semana** | < 5% após 6 meses | Se > 15%, sua keyword raiz tá broad demais |
| **CAC médio antes/depois** | Queda gradual | Pruning está funcionando |

## O que NÃO fazer

- **Não negativa palavra que aparece junto com termo bom** (cuidado: "grátis" seguro; "curso" arriscado)
- **Não negativa imediato sem ler intent** — search estranho pode ser comprador real
- **Não promove pra exact com 1 conversão** — pode ter sido sorte
- **Não esquece de aplicar em todas as campanhas relevantes** (lista compartilhada resolve)
- **Não pula a documentação** — daqui 6 meses ninguém lembra por que negativou X
- **Não confunde search term com keyword** — keyword é o que VOCÊ definiu, search term é o que o USUÁRIO buscou

## Skills relacionadas

- `ads-google` — fundamentos de campanha e keywords
- `meta-exclusions-pruning` — equivalente pra Meta (placements/audiências ruins)
- `ads-attribution` — antes de declarar termo "ruim", confirma se atribuição não está vazando
