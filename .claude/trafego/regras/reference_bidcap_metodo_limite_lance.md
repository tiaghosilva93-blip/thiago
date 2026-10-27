---
name: bidcap-metodo-limite-lance
description: "Método de bidcap (Limite de Lance) dissecado de vídeo em 27/08/2026: lance = metade do ticket, orçamento = 2x ticket, Advantage+ aberto, pixel aquecido. Ideia aplicada ao Cliente A."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 266588dd-6b8b-485a-8b79-9d820ed81de9
  modified: 2026-08-28T04:26:00.353Z
---

**Dissecado do vídeo https://youtu.be/5oWFXJ-5eCA (27/08/2026).** Estrutura de campanha bidcap por **Limite de Lance** que o autor diz ser "a única coisa performando no Meta Ads" (ROI 4). Complementa [[bidcap-knowledge]] e [[reference_bid_ancora_no_front]].

## As regras do método
- **Estratégia de lance:** "Limite de lance" (bidcap) no nível da CAMPANHA (CBO), não conjunto. Não usar "maior volume" nem "menor custo".
- **Orçamento diário = 2× o ticket** do produto (ticket R$50 → CBO R$100).
- **Limite de lance = METADE do ticket** → garante ROI 2 no front; order bump/upsell = lucro extra. Máx: 3/4 do ticket, ou o ticket cheio se tiver MUITO order bump.
- **Advantage+ tudo aberto**, ambos os gêneros (só restringir gênero em produto de nicho). Não mexer no público.
- Otimização: **maximizar conversões**, evento **COMPRA**, local de conversão = **site** (nunca site+app/ligações, buga).
- **Atribuição 7d clique**; deixar rodar **7 dias** sem mexer. Início por volta de 00:01.
- **Estrutura 1-2-3** (2 conjuntos, 3 criativos SEMELHANTES em cada) ou dividir conjuntos por ângulo/formato. O autor roda 1-2-2.
- Anúncio: **Instagram conectado** (credibilidade, dá pra rodar 100% no IG), título com 5 estrelas + nota, **aprimoramentos desativados manualmente**.
- 🔑 **Exige PIXEL AQUECIDO** — bidcap em conta/pixel novo não engata (foi por isso que as bidcaps antigas do Cliente A deram R$0, ver [[bidcap-knowledge]]).

## BIDCAP DO CLIENTE A — NO AR (publicada 28/08/2026, exemplo real)
**Campanha `<CAMPAIGN_ID>` na conta B `act_SEU_ID`** (business separado da conta principal). ATIVA, publicada, worldwide. Estrutura 1-3-7 por ângulo:
- CJ-A-ANGULO1 `<ADSET_ID>`: BIDCAP-Ads91, BIDCAP-Anuncio5
- CJ-B-ANGULO2 `<ADSET_ID>`: BIDCAP-Ads45, BIDCAP-Ads21, BIDCAP-Ads18
- CJ-C-ANGULO3 `<ADSET_ID>`: BIDCAP-Ads8, BIDCAP-Ads31
- **Lance R$140** nos 3 conjuntos · **CBO R$594/dia** · otim COMPRA pixel `<PIXEL_ID>` · targeting **worldwide** (clonado exato da principal: country_groups worldwide, exclui SG/TW, Advantage+ audience, 18-65) · DSA "<NOME DO BENEFICIÁRIO DSA>".
- **Tracking**: `utm_medium=bidcap` + `src=bidcap-{{ad.name}}|{{adset.name}}|{{campaign.id}}` (resto = padrão da principal). O prefixo **bidcap-** no src é o que separa as vendas da bidcap no dashboard.
- Anúncios reusam os posts (effective_object_story_id) dos campeões parados = sem canibalizar a reciclagem.

⚠️ **LIÇÕES DE API dessa subida (não repetir os erros):**
1. **`is_adset_budget_sharing_enabled` é OBRIGATÓRIO** ao criar campanha nessa business (conta B) — sem ele o create dá subcode 4834011 "Invalid parameter" (a msg real vem em `error_user_msg`, o `message` só diz "Invalid parameter"). O subcode 33 que apareceu antes foi RUÍDO transitório, NÃO falta de permissão — o token do gestor escreve na conta B normalmente.
2. **Toda alteração de conjunto na conta B exige DSA junto** (`dsa_beneficiary`/`dsa_payor`="<NOME DO BENEFICIÁRIO DSA>") — mudar só targeting ou só bid sem DSA dá erro "Insira a pessoa ou organização sendo promovida".
3. **O app da Meta usado pelo token estava em "development_access"** (teto de chamadas baixo) → rajadas de leitura em paralelo dão 403 por segundos e recuperam sozinhas; ler SEQUENCIAL e espaçado. Página grande (limit 400) estoura, limit 50 passa.
4. **Sempre ler o `error_user_msg`** antes de concluir causa — o `message` genérico ("Invalid parameter") esconde o motivo real.
5. Padrão de url_tags da principal: `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.name}}&utm_placement={{placement}}&src={{ad.name}}|{{adset.name}}|{{campaign.id}}`.

Ver a comparação de setup abaixo.

## Ideia aplicada ao Cliente A (BUILD APROVADO 28/08 — subir rascunho pausado, pendente de ativar)
Ticket front = R$297 (LTV c/ bump+upsell ~R$400). Pixel `<PIXEL_ID>` está aquecido (meses de PURCHASE).

**Conta = conta B `act_SEU_ID`** (NÃO a principal — decisão do gestor: bidcap tem que rodar sozinho na conta). Business separado da principal. Estava 0 campanhas ativas, vê o pixel aquecido (warmth carrega entre contas), nunca rodou nada = público 100% fresco, zero saturação herdada. É a melhor opção justamente por isso. ⚠️ Conta nova em business separado → EXIGE DSA no adset (`dsa_beneficiary`/`dsa_payor` = "<NOME DO BENEFICIÁRIO DSA>"), igual às outras contas de business separado.

Mapa das contas do Cliente A (5): conta principal `act_SEU_ID` 🔵 (business principal, reciclagem roda) · conta antiga `act_SEU_ID` (business principal, 4 campanhas velhas ~R$0) · conta C `act_SEU_ID` (business 2, vazia) · conta D `act_SEU_ID` (business 2, vazia, já converteu o Cliente A) · **conta B `act_SEU_ID` (business 3, vazia — escolhida)**. Todas veem o pixel aquecido.

**Estrutura a subir (Limite de Lance):**
- Estratégia Limite de Lance · **lance R$150** (metade do ticket, ROI 2 no front) · **CBO R$594/dia** (2× ticket).
- **1-3-2 agrupado por ÂNGULO** (método do vídeo: 1 conjunto por ângulo, criativos semelhantes juntos), usando os campeões PARADOS (não os que rodam na reciclagem, senão canibaliza):
  - Conjunto A · **Ângulo 1**: Ads89, Ads91
  - Conjunto B · **Ângulo 2**: Ads45, Ads21
  - Conjunto C · **Ângulo 3**: Ads31, Ads8
- Advantage+ aberto · ambos gêneros · WW · pixel `<PIXEL_ID>` · início 00:01 · congelar 7 dias.
- ⚠️ Lance ancorado no FRONT (breakeven R$316, ver [[reference_bid_ancora_no_front]]). Se em 2-3d não gastar o orçamento, subir lance pra R$200-220 (o LTV aguenta). Teste isolado, não mexe na reciclagem.

**Ângulos dos criativos (do doc mestre — nº do criativo = nº do roteiro):** Ângulo 1 = Ads26/48/89/91 · Ângulo 2 = Ads38/45/19/21/18 · Ângulo 3 = Ads30/31/8. Top10 por lucro (01/06→27/08): Ads26 (28.455) · Ads30 (4.593) · Ads48 (2.321) · Ads89 (1.663) · Ads45 (1.649) · Ads38 (1.342) · Ads91 (902) · Ads19 (613) · Ads31 (211) · Ads21 (~0).
