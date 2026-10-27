---
name: bidcap-licoes-praticas
description: "O que a 1ª rodada real de bidcap ensinou: isolar não é opcional, lance alto compra na hora errada, e criativo repetido só recompra o próprio público"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9c49c612-8823-4c53-a775-2ff0be0e8dd2
  modified: 2026-08-10T00:35:24.710Z
---

Primeira execução real de bidcap (Cliente A, 09/08/2026). R$1.516 gastos, 5 compradores, ROAS 1,15, lucro ~R$23. Três lições que valem pra qualquer conta.

## 1. "Isolar em conta separada" não é recomendação, é pré-requisito
Rodou na conta principal junto de R$3.200/dia de CBO. Resultado: às 8h a conta já tinha queimado 77% do orçamento do dia (contra 49% no dia anterior), o **CPM das outras campanhas subiu até +100%**, e a conta acabou a verba às 19h — antes do horário em que mais vende.
⚠️ O Allan avisa que o alto volume rouba leilão do bidcap. **Aconteceu o contrário:** o bidcap, com lance muito acima do CPA real, sufocou o resto.

## 2. Lance alto faz ele comprar na hora ERRADA do dia
Com lance de R$330 numa conta que compra a R$157, ele ganha praticamente todo leilão que disputa — inclusive nas horas em que não converte.

| Faixa | Gasto | Vendas | ROAS |
|---|---|---|---|
| Madrugada 00-05h | R$418 | 5 | **2,32** |
| Manhã 06-11h | R$476 | 1 | 0,62 |
| Tarde 12-17h | R$404 | 1 | 0,77 |
| Noite 18-23h | R$138 | **0** | **0,00** |

**61% do faturamento veio antes das 6h.** De madrugada o leilão é barato e ele converte; de dia o leilão sobe, ele continua pagando porque o lance permite, e para de converter.
🔑 **Sintoma de lance alto demais: o ROAS despenca conforme o dia avança.** Se isso aparecer, é bid, não criativo.

## 3. Criativo que já roda em outra campanha não testa nada
Os 26 anúncios eram os mesmos que já rodavam nas campanhas de CBO. **Um único criativo (o campeão da conta) levou 62% da verba do bidcap** e no mesmo dia consumiu mais R$762 na campanha isolada dele — R$1.613 comprando o mesmo espaço de leilão, mesmo público, mesmo pixel.
🔑 **A graça do bidcap é injetar criativo NOVO e ver o que gasta.** Com criativo já servido ao mesmo público, não existe descoberta — só canibalização com nome novo.
⚠️ Mudar de conta resolve a disputa por ENTREGA, **não o leilão**: conta diferente não cria público diferente.

## O que deu certo
✅ **O método engata:** gastou 98% do orçamento. O Allan usa 10-20% como sinal de potencial, então o sinal existe.
✅ **A leitura por faixa de hora é o diagnóstico mais rápido** de lance mal calibrado. Vale mais que ROAS do dia.

## Configuração corrigida (a testar)
Conta isolada · lance **abaixo do ticket do front** (não do LTV) · orçamento moderado · **sem os criativos que já rodam em campanha própria**.

Ver [[project_bidcap_knowledge]] e [[reference_bid_ancora_no_front]]. Método completo em `.claude/skills/media-buyer/ref-bidcap-meta.md`.
