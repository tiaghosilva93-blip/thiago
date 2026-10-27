---
name: media-buyer
description: USE SEMPRE que o gestor perguntar sobre Meta Ads, Facebook Ads, TikTok Ads, tracking, escala de campanha, estrutura de conta, benchmarks, diagnóstico de funil, entrada no US ou operação de media buying em geral. Contém biblioteca OBRIGATÓRIA de consulta com frameworks dos maiores media buyers do Brasil (Pedro Andrade, Linecker, Gabriel Medeiros, Pedro/Dairo/Saraiva, Henrique/Anacleto/João Lucas). Cobre desde teste inicial até operações de 1M/dia no Meta e $100MM/ano nos EUA.
---

# Media Buyer — Playbook Consolidado

Biblioteca de referência OBRIGATÓRIA para Ada (Head de Performance) e Theo (Gestor Jr). Compilação do conhecimento prático dos maiores media buyers do Brasil operando BR e US.

## 🎯 Matriz de Decisão — LEIA ANTES DE RESPONDER

**Regra:** Antes de responder qualquer pergunta técnica, identifique a intenção abaixo e **LEIA o(s) arquivo(s) indicado(s)**. Não responda de memória quando houver ref disponível.

| Se o gestor pedir / perguntar sobre... | LEIA OBRIGATORIAMENTE |
|---|---|
| Estruturar campanha Meta Ads em escala (1M+/dia) | `ref-meta-ads-1m-dia.md` |
| Bidcap / Limite de Lance / lance manual / testar+escalar na mesma campanha / orçamento inflado / bid sensível / "campanha não gasta" | `ref-bidcap-meta.md` |
| Diagnóstico de campanha Facebook que parou de escalar | `ref-facebook-ads-7d-mes.md` |
| Testar nova oferta / pré-escala / validação | `ref-facebook-ads-7d-mes.md` (regra dos 20 tickets, protocolo) |
| TikTok Ads — estrutura, Smart/CBO/ABO, warming | `ref-tiktok-ads-escala.md` |
| Entrada no mercado americano com 1 gestor | `ref-escalar-eua-1-gestor.md` |
| Escalar operação US para $5K-200K+/dia | `ref-escalar-operacoes-eua-100mm.md` |
| Montar/debugar tracking (pixel, CAPI, tracker) | `ref-tracking-100mm.md` |
| Escolher ferramenta de tracking (HatTrack, Keitaro, UTMfy) | `ref-tracking-100mm.md` |
| Naming convention de campanhas/arquivos | `ref-naming-conventions.md` |
| Quando abandonar oferta / diagnóstico criativo vs oferta vs VSL | `ref-facebook-ads-7d-mes.md` (regra dos 20 tickets) |
| Proteção de oferta / anti-spy / rejeições | `ref-meta-ads-1m-dia.md` + `ref-escalar-eua-1-gestor.md` |
| Rotina diária de otimização | `ref-facebook-ads-7d-mes.md` (8h/9h30/12h/14h) |
| Estrutura de time, squads, proporção gestor:editor | `ref-escalar-operacoes-eua-100mm.md` |
| Qual estrutura de campanha usar para ESTE criativo (1-3-1 vs 1-5-1 vs 1-1-4) / criativo vendeu numa conta e não vende em outra / funil de teste ABO→estrutura→escala | `ref-brazilian-wave-teste-estrutura.md` |
| Reciclar criativo / aproveitar teste que "não validou" / combinar hook de um com corpo de outro | `ref-brazilian-wave-teste-estrutura.md` (hook×body) |
| Anúncio rejeitado / como fazer passar na revisão | `ref-brazilian-wave-teste-estrutura.md` (escada de 5) + `ref-meta-ads-1m-dia.md` |
| Baixar CPM / testar posicionamento manual / público de interesse | `ref-brazilian-wave-teste-estrutura.md` |
| Fórmula de hook rate / body rate / connect rate no gerenciador | `ref-brazilian-wave-teste-estrutura.md` |
| Saber de qual campanha/anúncio veio a venda sem tracker pago / parâmetro de URL / postback / webhook de venda | `ref-brazilian-wave-tracking-afiliado.md` |
| "Meta mostra cliques mas a plataforma mostra zero venda" / validar link antes de subir | `ref-brazilian-wave-tracking-afiliado.md` |
| Montar notificação de venda / planilha automática de vendas (Make + Sheets) | `ref-brazilian-wave-tracking-afiliado.md` |

**Depois de ler a ref, cite a fonte na resposta:** "Segundo o Pedro Andrade...", "Benchmark do Linecker é...", etc.

## Quando usar

- Diagnosticar campanhas que não escalam ou pararam de performar
- Definir estrutura de teste, validação e escala (ABO, CBO, Advantage+)
- Montar stack de tracking (pixel, CAPI, server-side, UTMs)
- Planejar entrada no mercado americano (contas, contingência, naming)
- Definir benchmarks de CTR, CPC, ROAS, hook rate por nicho
- Consultar erros comuns e como evitá-los antes de escalar
- Montar time / rotina operacional de gestor de tráfego

## Como usar as referências

As referências estão no mesmo diretório desta skill (arquivos `ref-*.md`). Cada uma é um documento denso com frameworks, métricas e exemplos. Leia a referência relevante ao contexto antes de responder ao gestor ou executar otimizações.

### Índice de Referências

| Arquivo | Tópico Principal | Quando Consultar |
|---------|------------------|------------------|
| `ref-meta-ads-1m-dia.md` | Meta Ads em escala extrema (Pedro, Dairo, Saraiva) — 14 seções: estrutura de contas, DEC/anti-detect, testes, validação, escala, criativos, rejeições, anti-spy | Operações Meta de 6-7 dígitos/dia, problemas de rejeição, proteção de oferta |
| `ref-bidcap-meta.md` | Bidcap / Limite de Lance no Meta (Allan, ref. Andrei Lunev) — 11 seções: orçamento inflado + controle pelo bid, testar e escalar 1 campanha só, bid = breakeven +50% (pós-Andrômeda), teste de criativo grátis, otimização de bid 5-10%, limite de gasto vs desligar, modos de apoio | Estratégia de lance manual, estabilidade/constância de CPA, testar+escalar na mesma campanha, "campanha não gasta", info/nutra/apps global |
| `ref-facebook-ads-7d-mes.md` | Pedro Andrade — CBO 151, pré-escala, diagnóstico criativo vs oferta vs VSL, regra dos 20 tickets, escala vertical vs horizontal, rotina hora a hora | Teste inicial, diagnóstico de funil, quando abandonar oferta, rotina diária |
| `ref-tiktok-ads-escala.md` | TikTok Ads 2026 (Henrique, Anacleto, João Lucas) — Smart vs CBO vs ABO, Spark Ads, warming, validação de criativos, spy tools | Operações TikTok, validação de criativo, estrutura de conta |
| `ref-escalar-eua-1-gestor.md` | Escala Baiana 151, sistema Directs, leading indicators via VTURB, AntiSpy, catálogo, operação noturna | Entrada no US, 1 gestor gerindo múltiplas ofertas, proteção de oferta |
| `ref-escalar-operacoes-eua-100mm.md` | Gabriel Medeiros — NLPT como KPI, Lifetime Budget trick, remarketing Lego, estrutura de squads, relacionamento com Meta/Google | Operações $5K-200K+/dia no US, estruturação de equipe, relacionamento com plataformas |
| `ref-tracking-100mm.md` | Linecker Nunes — 4 camadas (pixel→UTM→CAPI→tracker), HatTrack vs Keitaro, UTMfy vs tracker de verdade, stack por nível | Montar ou debugar tracking, escolher ferramenta, trocar de tracker |
| `ref-naming-conventions.md` | Convenções de nomenclatura para arquivos, campanhas, anúncios | Organização operacional, documentação |
| `ref-brazilian-wave-teste-estrutura.md` | Saraiva (Brazilian Wave) — teste de estrutura (1-3-1 / 1-5-1 / 1-1-4) com ticket cheio, funil ABO→estrutura→escala, reciclagem hook×body, fórmulas de hook/body/connect rate, ecossistema ABO+CBO, posicionamento manual, interesse amplo para cortar CPM, escada de 5 para anúncio rejeitado | Decidir estrutura por criativo, reciclar criativo, aprovar rejeitado, baixar CPM, montar colunas de métrica. **Ler a seção 8 antes de aplicar: conflita com a nossa regra de escala de +32%** |
| `ref-brazilian-wave-tracking-afiliado.md` | Lucas/Brinks (Brazilian Wave) — parâmetros por plataforma, postback de venda E de checkout, parâmetros dinâmicos do Meta, teste de link antes de subir, Make→Sheets→notificação, critério de volume para tracker pago | Saber de onde veio a venda sem tracker pago, validar link, montar notificação/planilha de vendas. Complementa `ref-tracking-100mm.md` no nível barato |

## Princípios centrais extraídos das referências

1. **Tracking é camada, não ferramenta** — pixel, UTM, CAPI e tracker têm funções distintas. UTMfy/Nemo são dashboards, HatTrack/Keitaro são trackers de verdade. Sem CAPI, perde 25-30% de atribuição.

2. **Criativo é 90/10 no resultado** — gancho é a variável mais sensível. Antes de mexer em público, orçamento ou estrutura, diagnostique criativo.

3. **Escala é lateralização, não empurrão** — escalar verticalmente (aumentar budget de 1 campanha) mata aprendizado. Regra geral: escalar agressivo, cortar conservador.

4. **Leading indicators > conversão** — Custo por Play, Custo por PIT (VTURB), Hook Rate e CTR te dizem se vai converter antes do lead chegar. Não espere 50 conversões para decidir.

5. **Regra dos 20 tickets** (Pedro Andrade) — se uma oferta não faz 20 vendas em 72h com criativo validado, o problema é oferta/VSL, não tráfego. Aborte.

6. **Operações ≠ gestores** — 1 gestor consegue operar 6+ ofertas no US com sistema (Directs, AntiSpy, catálogo, operação noturna). Não é sobre time grande, é sobre sistema.

7. **Rejeição é cascata** — documentar metadados, variações proativas, processo de reaprovação. Não espere rejeitar para agir.

8. **Bidcap = orçamento inflado + freio no bid** (`ref-bidcap-meta.md`) — no Limite de Lance quem controla o gasto é o LANCE, não o orçamento. "Se a campanha não gasta, é porque não performa naquele bid" → teste de criativo de graça. Testa e escala na MESMA campanha (1 só), criativo novo em conjunto novo. Escala pelo orçamento, otimiza pelo bid (5-10%/vez). Bid base = breakeven +50% (pós-Andrômeda). Bid sensível: NÃO testa preço/oferta nele, ISOLA em conta separada. Alternativa estável à "escala baiana" por duplicação. Validado em info/nutra/apps; não em bet/hot.

9. **A validação é criativo × conta × estrutura** (`ref-brazilian-wave-teste-estrutura.md`) — criativo validado não é validado em geral, é validado NAQUELA conta e NAQUELA estrutura. Antes de escalar, rodar o mesmo criativo em 1-3-1, 1-5-1 e 1-1-4 com ticket cheio por 1 dia; a estrutura vencedora é que vai para a escala. É comum o mesmo criativo performar numa conta e não performar em outra — isso não invalida o criativo. Corolário: teste "perdido" quase nunca é perdido inteiro, decomponha em hook/corpo/CTA e recombine (H13_B8 gastou R$ 43k e voltou R$ 95k).

10. **Saber de onde veio a venda é pré-requisito da otimização** (`ref-brazilian-wave-tracking-afiliado.md`) — sem parâmetro de origem, a decisão mais provável é aumentar o orçamento do criativo que não vendeu e pausar o que vendia. Configurar parâmetro dinâmico uma vez (a duplicação herda), testar o link com valores fake ANTES de subir, e tratar "Meta mostra cliques e a plataforma mostra zero" como alarme de estrutura quebrada. Tracker pago é decisão de VOLUME, não de vontade.

## Fluxo de trabalho recomendado

1. **Diagnóstico do gestor** → identifique o problema real (criativo? oferta? tracking? escala?)
2. **Consulte a referência relevante** da tabela acima
3. **Aplique o framework específico** do especialista que mais se aproxima do contexto
4. **Valide com benchmarks numéricos** antes de executar
5. **Documente o aprendizado** no playbook da Ada se for padrão novo

---

**Observação:** Esta skill é biblioteca de consulta. Para ações práticas (diagnóstico de funil, relatório, duplicação de campanha, token de agência), use as skills operacionais do `performance/`:
- `performance/meta-ads-funil-diagnostico`
- `performance/meta-ads-report`
- `performance/meta-ads-duplicate-campaign`
- `performance/meta-ads-token-agencia`
- `performance/meta-ads-auditoria-funil`
