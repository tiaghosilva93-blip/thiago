> ⚠️ **ATUALIZAÇÃO 06/08/2026 — a regra de "+32% de escala" desta nota foi SUPERSEDIDA.**
> Auditoria de 66 alterações reais mostrou que **+32% acerta só 17%** das vezes. A dose certa é **+15 a +20%** (60%) e o corte de **−15 a −25%** é a melhor jogada (80%). Ver [[reference_escala_meta_dose_certa]].

---
name: reference-otimizacao-meta-cbo
description: "Regras de otimização diária de contas CBO no Meta (Cliente A/DR): escala máx +32%, realocar mantendo total, ROAS/CPA, decisão sempre pelo dashboard, sinais de fadiga, método de atribuição real por campanha"
metadata:
  node_type: memory
  type: reference
  originSessionId: 0b076963-55c8-4dad-88d5-d15abdec3737
  modified: 2026-07-24T03:43:48.321Z
---

**PLAYBOOK de otimização diária das contas CBO de Direct Response (usado no Cliente A, replicável).** Sempre passar por [[feedback-aprovar-antes-de-aplicar]] antes de mexer.

## Regras de escala/orçamento
- **Escala máxima +32% por campanha por dia.** Acima disso zera o aprendizado. É o teto que o gestor usa (não os 20% conservadores). Subidas ≤32% não resetam.
- **Cortes ≤ ~20%** também (decréscimo grande também mexe no aprendizado).
- **Realocar mantendo o total, não empilhar verba.** O gestor define o teto diário (ex: R$2.200) e a gente SÓ realoca: tira dos piores ROAS, joga nos melhores. "Otimizar sem diminuir o investimento" = mover, não somar.
- **NÃO subir campanha em aprendizado com salto grande** (as novas de 1-2 dias). Mesmo dentro dos 32%, é o máximo pra elas.
- **Campanha nova/pixel novo = bidcap não gasta** (ver [[bidcap-knowledge]]). Conta nova também tem limite de gasto baixo no arranque.

## Como decidir (o que olhar)
- **Comparar por ROAS e CPA, NUNCA por faturamento absoluto** (orçamentos diferentes distorcem).
- **Decisão é SEMPRE o dashboard (venda aprovada via webhook Hotmart), nunca o pixel.** O pixel subconta/superconta.
- **Não escalar criativo/campanha em fadiga mesmo com ROAS alto.** Sinais de fadiga: CPM subindo forte + frequência > ~1,3 + CTR caindo. (Ex: Ads21 fez ROAS 5,25 mas com CPM 157 e freq 1,31 → segurar, não subir; jogar +32% só encareceria o CPM.)
- **Dia excelente de ROAS = conversão de checkout alta (38-41%) + criativos vencedores carregando.** A alavanca dos dias bons é o checkout/oferta segurar, não só mídia.

## Método de leitura real por campanha (ROAS por campanha)
Cruzar **gasto do Meta** (API, por campaign_id) com **faturamento do dashboard** (aba ORIGENS, atribuído por src):
- **Src NOVO** (`{{ad.name}}|{{adset.name}}|{{campaign.id}}`) = atribuição LIMPA, o dashboard separa a campanha pelo ID no src.
- **Src ANTIGO** (`utm_campaign=<nome-antigo-compartilhado>` compartilhado entre ESCALA CHECKOUT/Ads19-21/Ads15-18/Lote3) = atribuição APROXIMADA (só dá pra separar por nome de anúncio, e nome se repete entre campanhas). Migrar os antigos pro src novo resolve.
- **"não identificado" = upsells (1-clique sem src) + furos de atribuição.** Campanha NOVA no dia 1 pode ter a venda caindo no não-identificado (aconteceu com a 1-4-1 em 22/07: pixel mostrou 1 compra R$264, dashboard atribuiu R$0 à campanha). NÃO concluir "faturou zero" sem checar o pixel da campanha.
- Reconciliar: soma das origens + não-identificado deve bater com o faturamento total do dia.

## Contas da operação do Cliente A (multi-conta)
- **Conta principal** `act_SEU_ID` (BM `<BM_ID>`) = onde roda o CBO principal.
- **Conta nova bidcap** `act_SEU_ID` (BM `<BM_ID>`, business separado) = isolada só pra bidcap; pixel principal `<PIXEL_ID>` compartilhado nela; página do cliente é client_page dessa BM.
- **Conta original** `act_SEU_ID` = BLOQUEADA, mas ainda LEGÍVEL via API pra puxar gasto histórico (1ª metade de julho rodou nela). Sempre somar as duas contas pra ROAS de mês.

Ver [[reference-modelo-cbo-escala]] (1-1-X vs 1-4-1).
