# Heurística — Quando Escalar

Decisão de aumentar budget. Erro comum: escalar cedo demais ou rápido demais e matar o aprendizado.

---

## Já temos (base)

- Mudança > 20% reseta aprendizado (Meta)
- Escalar agressivo, cortar conservador (sabedoria do mercado)
- Escalar horizontal (duplicar) > vertical (aumentar budget) na maioria dos casos

---

## 🔑 O TESTE DEFINITIVO: o que o ROAS faz quando a verba sobe

**Validado na prática (Cliente A, 25-27/07/2026).** É o diagnóstico mais confiável de todos:

| O que acontece ao subir o orçamento | O que significa | O que fazer |
|---|---|---|
| **ROAS SOBE junto com a verba** | a campanha estava **travada pelo orçamento**, não saturada. Tinha demanda sobrando e você estava deixando dinheiro na mesa | **continuar subindo** no dia seguinte |
| **ROAS se mantém** | absorveu o volume, mas chegou perto do limite | segurar, observar mais um dia |
| **ROAS CAI** | **saturação real** | parar de subir; se cair muito, recuar |

Casos: Lote 1 BR 3,85 → **5,03** com +32%; Lote 1 WW 3,18 → **3,76** com +32% (e antes 2,57 → 3,18 com outro +32%). Duas rodadas seguidas de escala com ROAS subindo = campanha que só não gastava mais porque o orçamento não deixava.

**Corolário:** não julgar escala por faturamento absoluto (óbvio que sobe quando se gasta mais). O sinal está no **ROAS e no CPA**, não no volume.

---

## 🔑 CADA CAMPANHA TEM UMA FAIXA ÓTIMA — mapear antes de escalar

Não existe "quanto mais orçamento melhor". Cada campanha performa numa faixa e **degrada acima dela**. Antes de definir orçamento, levantar o gasto × ROAS de cada dia dos últimos 5 e achar o teto.

Exemplo real (Cliente A, jul/2026):
| Campanha | Faixa boa | ROAS na faixa | Acima da faixa |
|---|---|---|---|
| Lote 1 BR | R$386-487 | 3,84 a 5,03 | **1,23 com R$727** |
| ISOLADA WW | R$330-386 | 3,66 a 4,47 | **1,05 com R$564** |
| Ads19-21 | R$233-380 | melhor ROAS (3,83) no **menor** gasto | — |

**Contraintuitivo e importante:** em campanha pequena, o melhor ROAS costuma vir no MENOR orçamento. Cortar não é sacrifício, é voltar ao ponto onde funciona.

## 🔑 MATEMÁTICA DA META DE LUCRO

Para uma meta de lucro L, com taxas de X% sobre o bruto:

```
gasto = L / ((1 − X) × ROAS − 1)
```

Com taxas de 11,2% (fator 0,888) e meta de R$1.000:
| ROAS | Gasto necessário |
|---|---|
| 3,00 | R$601 |
| 2,50 | R$820 |
| 2,00 | R$1.289 |
| 1,70 | R$1.976 |
| 1,50 | R$3.012 |
| 1,30 | R$6.477 |
| 1,15 | R$15.244 ❌ |

**A alavanca é o ROAS, não o orçamento.** Abaixo de ~1,3 nenhum orçamento realista entrega meta de lucro. E como o ROAS cai quando se ultrapassa a faixa ótima, existe um ponto onde aumentar orçamento REDUZ o lucro absoluto.

## Teto de escala por dia

- **+32% por campanha por dia é o teto que NÃO reseta aprendizado.** É o número operacional do gestor, não os 20% conservadores do manual. Subidas até 32% passam limpo.
- Acima disso, entra em aprendizado de novo e perde-se o histórico de entrega.
- **Se precisa colocar mais dinheiro do que o teto permite:** não force a campanha existente. **Duplique o vencedor numa campanha nova com orçamento cheio** (ver abaixo).

---

## Escala horizontal: isolar o vencedor (padrão validado)

Quando um criativo vira o cavalo da conta e o teto de 32% trava a escala:

**Estrutura: CBO 1-3-1** — 1 campanha, **3 conjuntos com targeting idêntico**, **o mesmo criativo vencedor** em cada um.
- Por que 3 conjuntos e não 1: três entradas no leilão pro mesmo criativo; o CBO despeja onde achar conversão mais barata. Com um conjunto só, fica refém de um único leilão.
- Por que não 1-4-1: o 1-4-1 é pra **portfólio de campeões diferentes** (um por conjunto). Pra **um criativo só**, o formato é o de isolamento.
- Resultado real: ISOLADA WW fez **ROAS 3,66 no dia 1**, entrando direto como 3ª melhor da conta.

⚠️ **Efeito colateral a vigiar:** o criativo passa a rodar em várias campanhas ao mesmo tempo disputando o mesmo público. Se o CPM disparar depois disso, **a sobreposição é a primeira suspeita, não o criativo**.

---

## Quando NÃO escalar, mesmo com ROAS bom

**Fadiga vence ROAS.** Campanha com ROAS alto mas **frequência subindo (>1,2), CPM subindo e CTR caindo** não deve receber verba. Jogar dinheiro ali só encarece o CPM sem trazer venda proporcional.

Caso: Ads19-21 estava com ROAS 3,39 (4º melhor da conta) mas frequência em 1,20 e era a mais velha do grupo. **Mantido o orçamento** → subiu sozinho de 2,35 pra 3,39. Se tivesse sido escalado, provavelmente teria empurrado o CPM.

**Manter é decisão.** Não mexer numa campanha é uma escolha ativa e deve ser justificada igual a subir ou cortar.

---

## Trocar eficiência por volume: quando compensa

Escalar quase sempre **derruba um pouco o ROAS**. A pergunta certa não é "o ROAS caiu?", é **"o lucro absoluto subiu?"**.

Caso (27/07): gasto +51% → faturamento +46%; ROAS caiu de 3,23 pra 3,12 (−0,11) **mas o lucro subiu de R$4.142 pra R$5.954 (+R$1.812)**. Trocar 0,11 de ROAS por R$1.812 de lucro é bom negócio.

**Regra:** enquanto o CPA estiver **muito abaixo do CPA de equilíbrio**, queda pequena de ROAS é preço justo por volume. Quando o CPA se aproxima do equilíbrio, a conversa muda.

---

## 📈 ESCALA 30% AO DIA EM CONTA DE EMPRESA (decisão do gestor, 2026-10-05, status: EM TESTE)

Pra conta de empresa (lead pra comercial, ex.: Cliente B): campanha boa sobe **30% por dia, todo dia**, enquanto o custo por lead **desde o último aumento** ficar dentro do teto do pilar. Furou o teto depois de um aumento → para de subir e corta 30% de volta.

**Condição pra subir:** 3+ dias no ar, sem corte/pausa recente, custo por lead de 3 dias pelo menos 10% abaixo do teto, lead em pelo menos 2 dos últimos 3 dias.

**Medição obrigatória:** todo aumento entra no placar (custo por lead 3 dias antes × desde o aumento). O placar fica no sistema de placar do time e a Ada lê antes de decidir. Revisar a regra com o placar acumulado.

⚠️ Contra-evidência a vigiar: no histórico do Cliente B (ago–set/2026), aumentos acima de 20% pioraram o custo por lead em 15 de 20 casos; e a "regra absoluta" de não aumentar orçamento veio do Cliente A (Direct Response). Esta regra não vale pra Direct Response.

---

## 📏 CONTA DE LEAD: o placar de escala usa CUSTO POR LEAD no lugar de ROAS (status: HIPÓTESE, 2026-10-05)

Em conta que vende por lead/conversa (ex.: Cliente B, educação presencial), o "teste definitivo" deste arquivo vale trocando ROAS por custo por lead (ou por conversa): olhar o custo por lead até 3 dias antes × até 3 dias depois de cada mudança de verba.

**Caso:** Cliente B, ago–set/2026. Nos aumentos de verba acima de 20% com amostra dos dois lados, o custo por lead piorou na maioria dos casos — mesma direção do placar do Cliente A ("cortar acerta mais do que escalar"). Amostra pequena: tendência, não prova. Números: raio-X do Cliente B, seção 2d.

**Pendente (gestor):** confirmar se a faixa ótima, o "+15–20%" e a regra absoluta de não aumentar orçamento de campanha que já roda valem iguais pra conta de lead.

---

## Suas regras (preencher)

**1. Critério mínimo pra escalar (campanha ainda recente):**
> _resposta:_

**2. Quanto você escala por vez?**
> **+32% por dia por campanha** (teto sem resetar aprendizado). Se precisar de mais, duplicar horizontal em campanha nova.

**3. Vertical vs horizontal — quando escolhe cada?**
> **Vertical** até o teto de 32%/dia enquanto o ROAS subir junto. **Horizontal (duplicar o vencedor em CBO 1-3-1)** quando o teto trava a verba que se quer colocar.

**4. Como você escala SEM resetar aprendizado?**
> Respeitando o teto de +32%/dia e nunca somando verba em campanha recém-criada; a verba nova vai pra duplicata, não pra forçar a original.

**5. Sinal de que parou de escalar (saturação)?**
> ROAS caindo ao subir orçamento + frequência > 1,2-1,3 + CPM subindo + CTR caindo.

**6. Quando você escala MUITO rápido (exceção da regra)?**
> _resposta:_

---

## Anti-pattern

- Escalar campanha em learning
- Escalar baseado em 1 dia bom
- Escalar sem confirmar qualidade do lead no Hubla
- **Escalar campanha com frequência subindo só porque o ROAS está alto** (fadiga vence ROAS)
- **Julgar escala por faturamento absoluto** em vez de ROAS/CPA
- **Aumentar +20% "em tudo" de forma linear** — isso joga o maior dinheiro novo nas campanhas medianas junto com as boas. Escala é concentração, não distribuição.

---

## "Ladder de escala" que uso

1. Confirma critérios mínimos e que não há fadiga (freq/CPM/CTR)
2. Sobe **+32%** no melhor ROAS
3. No dia seguinte, olha **o que o ROAS fez**: subiu → repete; manteve → segura; caiu → para
4. Quando o teto de 32% travar a verba desejada → **duplica o vencedor em CBO 1-3-1**
5. Financia a escala **realocando dos piores**, não só somando verba nova

---

## Casos

| Cliente | Escala | O que fiz | Resultado |
|---|---|---|---|
| Cliente A | Lote 1 WW | +32% (R$288→380), depois +32% de novo | ROAS 2,57 → 3,18 → 3,76. Absorve escala |
| Cliente A | Lote 1 BR | +32% (R$362→478) | ROAS 3,85 → **5,03**, CPA R$49 (teto R$316) |
| Cliente A | Ads26_V03 | duplicou vencedor em CBO 1-3-1 isolada | **3,66 no dia 1**, 3ª melhor da conta |
| Cliente A | conta inteira | 2,2k → 3,4k/dia num salto | Faturamento +46%, lucro +44%, ROAS −0,11. Funil aguentou |

---

# 🔴 A REGRA DOS 32% ESTÁ ERRADA — placar de 66 alterações reais

**Cliente A, 20/07 a 05/08/2026.** Levantei TODAS as mudanças de orçamento de campanha das duas contas (`/{act}/activities` → `update_campaign_budget`) e cruzei cada uma com o ROAS real do dia anterior × dia seguinte.

| Faixa da alteração | Casos | ✅ | ❌ | **Taxa de acerto** |
|---|---|---|---|---|
| Aumento **+10 a +25%** | 6 | 3 | 2 | **60%** |
| **Aumento +25 a +35%** | **23** | **3** | **15** | **17%** ❌❌❌ |
| Aumento +35% ou mais | 1 | 0 | 1 | 0% |
| **Corte −10 a −25%** | **14** | **8** | 2 | **80%** ✅✅✅ |
| Corte −25 a −35% | 18 | 6 | 3 | **67%** ✅ |
| Corte −35% ou mais | 4 | 1 | 1 | 50% |

## 🔑 O ERRO CONCEITUAL
**Os "+32%" vêm da regra do META sobre não RESETAR APRENDIZADO** — é o teto que a plataforma tolera sem punir a entrega. **NÃO é a dose recomendada de escala.** Tratei um limite de segurança como se fosse recomendação.

Na prática, essa conta absorve **10% a 25% por vez**. Acima disso o algoritmo precisa comprar impressão mais cara pra gastar a verba extra e o ROAS cai **no mesmo dia**.

## Os casos mais caros (campanha voando, derrubada pelo +32%)
| Dia | Campanha | Δ | Antes | Depois |
|---|---|---|---|---|
| 23/07 | Lote 1 BR | +32% | **7,65** | 2,14 |
| 23/07 | Lote 1 WW | +32% | **7,52** | 2,43 |
| 29/07 | ISOLADA WW | +32% | **6,06** | 1,05 |
| 30/07 | Ads19-21 | +50% | 5,11 | 1,11 |
| 05/08 | Campanha X | +32% | 5,00 | 1,25 |
| 25/07 | Lote 1 BR | +32% | 3,44 | 0,71 |
| 28/07 | Lote 1 WW | +32% | 3,20 | 1,32 |

## ✅ REGRA CORRIGIDA
| Situação | O que fazer |
|---|---|
| Escalar campanha boa | **+15% a +20%.** NUNCA +32% |
| Campanha acima da faixa provada | **−15% a −25%** (80% de acerto, a melhor jogada da conta) |
| Campanha caindo, dentro da faixa | −25 a −30% |
| Campanha zerada há 2+ dias | **PAUSAR.** Corte só recuperou 2 de 8 casos |
| Precisa de muito mais verba | **duplicar em campanha nova**, não forçar a existente |

⚠️ **Cortar acerta mais do que escalar em TODAS as faixas.** Numa conta madura de resposta direta, a alavanca principal é subtrair verba de quem está acima do ponto, não somar em quem está bem.

## Como refazer essa auditoria em qualquer conta
```
GET /{act_id}/activities?fields=event_type,event_time,object_id,object_name,extra_data
    &since=...&until=...&limit=250   (PAGINAR — 4 páginas cobriram 19 dias)
filtrar event_type == "update_campaign_budget"
```
⚠️ **`extra_data` vem como STRING JSON com os valores ANINHADOS:**
```json
{"old_value":{"type":"payment_amount","old_value":19700},
 "new_value":{"type":"payment_amount","new_value":13800},"type":"composite_data"}
```
Ler `ex["old_value"]["old_value"]` e `ex["new_value"]["new_value"]`, não `ex["old_value"]` direto.

Casar por **`object_id`** (nunca por `object_name`, que vem truncado). Consolidar múltiplas edições do mesmo dia numa só (primeiro "de", último "para"). Alteração feita antes das 7h vale para o dia dela; depois disso, para o dia seguinte. Descartar dias com gasto < R$20 (ROAS não é mensurável).

---

## 📆 QUE DIA SUBIR TESTE DE CRIATIVO (não é o dia de maior ROAS)

**Teste compra aprendizado, e aprendizado se mede em CHECKOUT INICIADO.** O dia certo pra subir teste é o de **menor custo por checkout**, não o de maior ROAS.

Os dois rankings tendem a ser opostos: o dia que converte melhor tem o checkout mais caro (leilão sobe junto com a intenção de compra).

**Método (implementado no dashboard de DR do cliente):**

1. **Dia de ESCALAR** = maior **lucro médio por dia** daquele dia da semana.
2. **Dia de TESTAR** = menor **custo por checkout**, **excluindo os 3 dias campeões de lucro**. Dia de escalar não é dia de testar — a verba de teste tiraria espaço do dia que dá dinheiro.
3. Janela fixa de **28 dias terminando ontem** (dia corrente nunca entra: dia pela metade distorce) e **média por dia**, nunca soma (senão o weekday que apareceu mais vezes ganha vantagem injusta).

**Cliente A (06/08/2026):** testar sexta R$44,41 · quinta R$45,18 · sábado R$46,78. Escalar segunda (R$2.494/dia) · domingo · quarta. **Pior dia pra testar: segunda, R$52,91/checkout.**

⚠️ **Erro que eu cometi:** escolhi o dia pelo ROAS e cheguei em "subir domingo, ler segunda" — os dois dias de escalar, e a segunda é o checkout mais caro da semana. Comprava o aprendizado mais caro possível e ainda tirava verba do dia de maior lucro.

**Na leitura do teste:** comparar **custo por checkout entre os anúncios** e onde o CBO concentrou. Nunca julgar por ROAS do dia — o viés de dia da semana se cancela entre criativos do mesmo dia, mas não entre dias diferentes.

---

## 🎯 ACHE O TETO ANTES DE ESCALAR (faixa de gasto × ROAS)

**Antes de subir orçamento, descubra em que faixa de GASTO aquela campanha rende.** Não é opinião, é consulta: pega os últimos 14 dias, agrupa cada dia em faixas de R$100 de gasto e tira o ROAS médio de cada faixa.

```
faixa de gasto → ROAS médio
R$300-399: 2,90 (5 dias) · R$600-699: 3,27 (2d) · R$700+: 1,60 (1d)   ← teto em ~R$700
```

Quase toda campanha tem um **ponto de ruptura nítido**, e ele costuma estar logo acima de onde ela já roda. Exemplo real (Cliente A, 06/08/2026): duas campanhas rendiam 3,23 e 2,82 até R$199 de gasto e desabavam pra **0,80 e 0,65** acima de R$200. Subir orçamento nelas era comprar prejuízo com previsão.

⚠️ **Ler pelo GASTO, não pelo orçamento.** O CBO gasta **8-12% acima** do orçamento configurado. Orçamento R$592 entrega ~R$644.

### A consequência prática
Quando a maioria das campanhas já roda no topo da faixa boa, **não existe escala por orçamento** — só por estrutura nova. Em 06/08/2026 a soma de tudo que cabia dentro das faixas boas dava +R$135; o gestor queria +R$546. A saída foi **duplicar campeão em campanha nova**, que nasce com orçamento próprio e não empurra a original pra faixa ruim.

**Regra:** campanha no topo da faixa boa → **duplicar**, não aumentar. Campanha com faixa superior comprovada → aumentar até o limite dessa faixa, nunca além.

### Ao duplicar
- Prefira duplicar quem **usa criativo diferente** do campeão que já está em várias campanhas — duplicar o mesmo criativo aumenta sobreposição de leilão e infla CPM.
- Reaproveite o `creative_id` da origem em vez de criar criativo novo: mantém a prova social acumulada.
- ⚠️ **O endpoint `POST /{campaign_id}/copies` tem limite de volume por conta** (`error_subcode 1885194`, "solicitação de cópia é muito grande"). Depois de várias duplicações na semana ele passa a recusar. Solução: ler a config da origem (`targeting`, `optimization_goal`, `promoted_object`, `attribution_spec`, `dsa_beneficiary`) e recriar campanha/conjuntos/anúncios na mão.
- Se a duplicata roubar leilão da original e **as duas ficarem medianas**, consolidar numa só — não manter as duas por teimosia.

---

## 🧪 A ESTRUTURA DO TESTE MUDA O RESULTADO (medido em 27 campanhas)

Cliente A, 20/07 a 08/08/2026, tudo com mais de R$200 gasto:

| Estrutura | ROAS |
|---|---|
| **CBO 1-3-8 · dist 3-3-2** ✅ | **2,34 · 2,21 · 2,16 · 2,16** (4 campanhas, R$15.674, 154 vendas) |
| CBO 1-3-3 · 1 ad por conjunto | 2,18 · 1,90 · 1,87 · 1,19 · **0,00** |
| **CBO 1-3-10 · dist 4-3-3** ❌ | **1,37 · 0,94** |
| CBO 1-4-x | 1,64 · 0,56 · **0,00** |
| **CBO 1-1-x · um conjunto só** ❌ | **0,80 · 0,00** |

**Regra: teste de criativo = 3 conjuntos, 2 a 3 anúncios em cada, no máximo 8.** Lote maior que 8 se quebra em duas campanhas, não se espreme numa só.
**O 1-3-3 é loteria** — com 1 ad por conjunto, criativo ruim mata o conjunto inteiro.
**Isolar vencedor é outra coisa: CBO 1-3-1**, 3 conjuntos idênticos com o MESMO criativo provado. Foi a melhor campanha da conta (2,73 em 20 dias, 82 vendas).

## 🚫 DUPLICAR CAMPEÃO EM CAMPANHA NOVA CANIBALIZA

Testado 07-08/08/2026 com 2 pares. As duplicatas gastaram R$477 **sem nenhuma venda** e as originais caíram no mesmo dia (3,46→2,57 e 2,24→1,27). **Pausadas as duplicatas, a original voltou pra 4,97 no dia seguinte.**

Duplicar o MESMO criativo cria duas campanhas disputando o mesmo leilão pelo mesmo público. Não soma alcance, divide.
**Escala por estrutura nova significa lote de criativo NOVO, não cópia do que já roda.**

## ⏳ CRIATIVO NOVO NÃO SE JULGA ANTES DO DIA 3

O lote Ads40-49 ficou 2 dias zerado e no dia 3 fez 3,20 e 2,99. Eu ia propor pausar no dia 2. Terceira vez que a mesma conta mostra isso. **Atribuição atrasada é a regra, não a exceção.**

---

## 🔒 REGRA ABSOLUTA: NÃO AUMENTAR ORÇAMENTO DE CAMPANHA QUE JÁ RODA

Terceira leva de evidência no Cliente A (05, 06 e 09/08/2026), medida sempre no mesmo corte de hora:

**Aumentos caíram 10 de 11. Cortes: 9 de 9 não pioraram.**

Os casos mais caros de 09/08: ISOLADA WW **4,26 → 0,73** e Lote 5 BR **7,09 → 0,00**, as duas com +15%. Eram as duas melhores do dia anterior.

⚠️ Eu propus 5 aumentos em 08/08 argumentando que "dessa vez o sinal é diferente, são campanhas vindo de 2,44 a 4,97". **Não era diferente.** 4 dos 5 caíram.

**Sem exceção por qualidade de sinal. Sem exceção por dia bom. Sem dose menor.** Escala nessa conta se faz por **estrutura nova** (lote de criativo novo, isolar vencedor), nunca por orçamento.

**O que fazer quando a campanha está voando:** deixar em paz. Se quiser mais volume daquele criativo, **isolar ele em campanha própria CBO 1-3-1** — foi o que fez o Ads38_V01 entregar ROAS 6,84 no dia 1 com R$232.
