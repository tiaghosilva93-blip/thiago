---
name: meta-ads-fundamentos
description: >
  Fundamentos de decisão estratégica em Meta Ads — matriz de objetivos de campanha,
  CBO vs ABO, hierarquia de audiência, limites de caracteres por campo e regras de
  estrutura. Use como referência antes de subir campanha nova ou auditar estrutura
  existente. Adaptado pra infoproduto/concursos.
tags: [meta-ads, fundamentos, estrategia, cbo, abo, audiencia, copy]
---

# Meta Ads — Fundamentos Estratégicos

Documento de referência rápida pra decisões estruturais. Se a dúvida é "qual objetivo escolher", "CBO ou ABO", "que audiência" ou "qual limite de copy" — está aqui.

## Estrutura Meta (3 níveis)

```
Campanha          → objetivo (Conversion / Lead / Traffic / Awareness)
  └ Adset         → audiência, budget, schedule, placement, otimização
      └ Ad        → criativo (imagem/vídeo), copy, CTA, link
```

Múltiplos adsets por campanha = testar audiências. Múltiplos ads por adset = testar criativo.

## Matriz de objetivo de campanha

| Objetivo | Quando usar | Quando NÃO usar |
|---|---|---|
| **Conversions** | Tem Pixel + Conversion API + ≥ 50 conversões/semana. Default pra infoproduto com checkout |  Sem volume mínimo → algoritmo não aprende |
| **Lead Generation** | Funil de captação WhatsApp/email, X1, baixo ticket | Quando precisa do lead na sua LP (sem Pixel próprio) |
| **Traffic** | Ainda não tem volume pra Conversions, fase 0 | Como objetivo permanente — otimiza pra clique, não venda |
| **Awareness** | Lançamento de marca/produto novo | Pra gerar venda direta — CPM barato, mas conversão péssima |
| **Engagement** | Quase nunca | Atrai curtida fake, lead frio |
| **Sales (Catálogo)** | E-commerce com catálogo | Infoproduto |

**Default infoproduto/concursos:** Conversions otimizando pra Purchase (após validar Pixel). Em fase 0 sem volume → Lead Generation com formulário interno do Meta.

## CBO vs ABO

| | CBO (Campaign Budget Optimization) | ABO (Ad Set Budget Optimization) |
|---|---|---|
| **Budget** | No nível da campanha | Por adset |
| **Distribuição** | Meta decide | Você força equalizado |
| **Quando usar** | Campanha validada, escalar vencedor | Fase de teste, comparar audiências |

**Fluxo padrão:**
1. **Teste** com ABO (3-5 adsets, budget igual) → descobre audiência vencedora
2. Identifica vencedor depois de 3-7 dias (50+ conversões idealmente)
3. **Escala** migrando pra CBO (mantém vencedor + 1-2 challengers)

Não começa CBO se ainda não sabe que audiência funciona. Meta vai jogar tudo na audiência mais barata, não na mais lucrativa.

## Hierarquia de audiência (infoproduto)

Ordem de preferência por **qualidade de lead**:

| # | Tipo | Quando usar |
|---|---|---|
| 1 | **Retargeting** (visitou LP, viu vídeo 75%, abriu form) | Sempre que tem pixel acumulado. Quente, converte 3-5x melhor |
| 2 | **Custom Audience de compradores** (lista CRM) | Subir CSV de quem comprou nos últimos 180 dias |
| 3 | **Lookalike 1% de compradores** | LAL de quem JÁ COMPROU (não de lead — lead tem ruído) |
| 4 | **Lookalike 3-5%** | Quando 1% saturou ou tem público pequeno |
| 5 | **Interesses + comportamentos** | Frio. CAC mais alto. Última opção pra abrir volume |
| 6 | **Advantage+ / Open targeting** | Conta com muito histórico de conversão. Meta escolhe |

**Regra de tamanho mínimo:**
- Audiência < 1.000 → Meta avisa "narrow", não roda
- Audiência ideal pra prospecting frio: 500k – 5M
- Audiência ideal pra retargeting: 10k – 500k

## Limites de caracteres (anote)

| Campo | Limite recomendado | Máximo absoluto |
|---|---|---|
| **Primary text** (texto principal) | 125 chars | 2.200 (corta no mobile depois de ~125) |
| **Headline** | 27 chars | 40 |
| **Description** (link description) | 27 chars | 30 |
| **Display link** | 30 chars | — |

**Regra do gancho:** primeiras 3 linhas do primary text decidem se a pessoa expande. Coloca o hook nos primeiros 80 chars.

## Placement

| Placement | Quando usar | Observação |
|---|---|---|
| **Reels (FB+IG)** | Default infoproduto. CPM mais barato, CTR mais alto | Criativo vertical 9:16 |
| **Stories** | Complemento. Fadiga rápido | Vertical 9:16, sem texto crítico no rodapé |
| **Feed (FB+IG)** | Estático e carousel | Quadrado 1:1 ou vertical 4:5 |
| **Marketplace, Right column, Audience Network** | Geralmente desligar | CPM baixo mas qualidade péssima |
| **Messenger / Inbox** | Desligar pra prospecting | Pode ligar pra retargeting |

**Default operacional:** Reels + Feed (FB+IG) + Stories. Desliga o resto manualmente em vez de "Advantage+ Placements" automático.

## Otimização do adset (Optimization Goal)

| Goal | Quando usar |
|---|---|
| **Offsite Conversions** (Purchase, Lead) | Default Conversions — tem Pixel/CAPI ativo |
| **Landing Page Views** | Fase 0, sem volume de conversão |
| **Link Clicks** | Quase nunca — engana o algoritmo, traz clique sem qualidade |
| **Leads** (form Meta) | Lead Generation com formulário interno |
| **Conversions** (vista no objetivo Lead) | Lead Gen otimizando pra qualidade |

## Estratégia de lance (Bid Strategy) — Automático vs Manual

O lance decide COMO o Meta compra no leilão. Fica no nível da campanha (junto do CBO/Orçamento Advantage).

| Estratégia | O que faz | Quando usar |
|---|---|---|
| **Maior Volume / Valor Mais Alto** (padrão) | Gasta 100% do orçamento (e um pouco mais) pra entregar o máximo de conversão. Você controla pelo ORÇAMENTO | Default. Validação com volume, escala por duplicação, quando você não domina lance manual. Se o criativo é ruim, gasta e perde a verba |
| **Limite de Lance (Bidcap)** | Você trava o lance máximo no leilão; o Meta só gasta se entregar conversão dentro daquele lance. Você controla pelo LANCE, com orçamento inflado | Oferta/criativo validado, pixel com sinal, DR (info/nutra/apps). Estabilidade de CPA, testar+escalar 1 campanha só, teste de criativo "de graça" |
| **Meta de Custo (Cost Cap)** | Mira um CPA médio-alvo, com flexibilidade | Alternativa ao bidcap; menos usada no DR BR |
| **Objetivo de ROAS (ROAS Target)** | Mira um ROAS-alvo (precisa de valor de conversão) | E-commerce/catálogo com valor por compra; escala pouco |

**Bidcap em uma frase:** infla o orçamento e controla o gasto pelo lance. "Se a campanha não gasta, é porque não performaria naquele bid" → teste de criativo sem queimar verba. Bid base = **breakeven +50%** (pós-Andrômeda 2025). Testa e escala na MESMA campanha; criativo novo entra em conjunto novo. Escala pelo orçamento, otimiza pelo bid (5-10% por vez). **Bid é sensível:** não teste preço/oferta nele e **isole em conta separada** (não misture com Maior Volume). É a alternativa estável à "escala baiana" por duplicação.

📖 **Antes de estruturar ou otimizar bidcap, LEIA `media-buyer/ref-bidcap-meta.md`** (método completo do Allan: teste, escala, otimização de bid, limite de gasto, modos de apoio, quando não usar). Validado em info/nutra/apps global; não validado em bet/hot.

## Regras de período de aprendizado

- **Conversions / Lead**: 50 conversões/semana mínimo pra sair de "Learning"
- **Não mexer em adset em Learning** — qualquer edição substancial reseta
- **Mudanças que resetam aprendizado:** budget > 20%, mudança de objetivo, mudança de audiência, troca de criativo do ad principal
- **Mudanças que não resetam:** trocar ad pausado, adicionar ad novo (sem mexer no existente), pequenos ajustes de budget (< 20%)

**Regra de ouro:** se a campanha está em Learning, espera. Se está estável e a métrica caiu, aí mexe.

## Estrutura de naming (padrão da casa)

```
[Cliente]_[Objetivo]_[Audiência]_[Data]
└─ Conjunto: [Audiência detalhada]_[Placement]
   └─ Anúncio: [Ângulo]_[Formato]_[v1]

Exemplo:
ClienteA_CONV_Retargeting-LP_2026-05
└─ Visitou-LP-7d_Reels
   └─ Dor-Glicemia_Video15s_v1
```

## Critério "Meta vale o canal?"

Antes de matar Meta como canal pra um cliente:

1. **Teste mínimo:** 14 dias com budget 10-15% do total
2. **CPL/CAC vs canal mais barato:**
   - CAC > 2x → desliga
   - CAC entre 1.5-2x → mantém como diversificação
   - CAC ≈ outros canais → expande
3. **Olha qualidade do lead, não só CAC** — Meta puxa lead frio em volume; se cliente cancela em 7 dias, CAC real é maior

## Sinais de problema (diagnóstico rápido)

| Sintoma | Causa provável | Skill a acionar |
|---|---|---|
| Frequency > 3, CTR caindo | Fadiga de criativo | `creative-fatigue` |
| Gasto subindo, Purchase = 0 | Funil quebrado (pixel, LP, checkout) | `meta-ads-funil-diagnostico` |
| CPM alto, frequency baixo | Leilão concorrido / audiência saturada de anunciantes | Trocar audiência, não criativo |
| Lead em volume mas qualidade ruim | Audiência aberta demais (LAL grande / Advantage+) | Voltar pra LAL 1-3% ou retarget |
| CPL bom, conversão ao vivo péssima | Problema de **oferta**, não de mídia | Discute com cliente, não mexe na campanha |

## O que NÃO fazer

- Não rodar Conversions sem Pixel/CAPI testado
- Não usar audiência < 1.000 pessoas
- Não sobrepor adsets com mesma audiência na mesma campanha (auction interno)
- Não misturar cold e warm no mesmo adset (dilui aprendizado)
- Não confiar cego no Ads Manager — atribuição Meta é liberal. Cruza com Hubla/Hotmart pra CAC real
- Não pausar em Learning
- Não trocar tudo de uma vez (perde sinal histórico)
- Não escalar > 20%/dia em campanha ativa (reseta aprendizado)

## Skills relacionadas

- `creative-fatigue` — quando trocar criativo
- `meta-ads-funil-diagnostico` — Purchase = 0
- `meta-ads-auditoria-funil` — auditoria completa
- `meta-ads-report` — geração de relatório
- `meta-ads-duplicate-campaign` — escalar vencedor
- `media-buyer` — postura e referências de operação
