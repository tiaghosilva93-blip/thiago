# Heurística — Quando Pausar

Decisão de pausar (campanha, conjunto, anúncio) sob critério, não sob impulso.

---

## Já temos (base)

- Não pausa em fase de aprendizado (< 50 conversões / < 7 dias)
- Mudança > 20% reseta aprendizado
- Cuidado com pausar sexta tarde — sábado/domingo entrega diferente

---

## 🔑 PRIMEIRO: calcular o PONTO DE EQUILÍBRIO, não olhar o ROAS solto

Antes de chamar uma campanha de "ruim", saber onde é o zero a zero. Não é ROAS 1,0.

**ROAS de equilíbrio = 1 ÷ (1 − % de taxas sobre o bruto)**

Exemplo real (Cliente A): gateway + comissões comem **11,2%** do faturamento bruto → **ROAS de empate = 1,13**. Abaixo disso a campanha **dá prejuízo de verdade**, não "lucro pequeno".

Também calcular o **CPA de equilíbrio** = receita líquida por venda de front. Serve pra medir folga: CPA de R$49 contra teto de R$316 = está usando 15% do que pode gastar, tem pista enorme pra escalar.

**Sem esse número, toda decisão de cortar/pausar é chute.**

---

## 🔑 REGRA DOS 30% (Pedro Andrade) — cortar orçamento é ALAVANCA, não castigo

Fonte: `skills/performance/media-buyer/ref-facebook-ads-7d-mes.md`

> *"Campanha saiu do ROAS mínimo → **reduzir 30%, não matar**. Ao reduzir, você sinaliza ao Facebook 'me traga conversões mais baratas'. Muitas vezes o ROAS recupera ou até melhora após a redução. Se cair novamente na próxima otimização → reduzir mais 30% do novo valor. Se cair 2 otimizações seguidas sem recuperar → pausar."*

**Validado em campo (Cliente A, 28-30/07/2026): três dias seguidos, TODA campanha que teve o orçamento cortado subiu de ROAS no dia seguinte, e toda que teve aumento caiu.** Chegou a dar 6 de 6 num único dia. Isso não é regressão à média — é o algoritmo respondendo ao sinal.

⚠️ **Distinção crítica:** a regra dos 30% é **reação INTRADIÁRIA** (checagens de 12h e 14h/16h). O orçamento **de partida do dia seguinte** se define pela **faixa histórica onde a campanha performa**, não cortando 30% mecanicamente — senão você joga uma campanha boa abaixo do nível onde ela funciona.

## 🔑 NÃO pausar no meio do dia pra realocar

Pausar campanha no meio do dia **trava o gasto sem transferir a verba** para as outras. O dinheiro não migra, simplesmente não é gasto.

Caso (30/07): pausei 4 campanhas às 18h20 e aumentei 3. O gasto por hora caiu de ~R$110 para **R$47**, e as 3 aumentadas fecharam com **R$675 de orçamento não usado**. O dia fechou 22% abaixo do planejado.

Complementa a regra do Pedro: *"aumentar muito no meio do dia = o Facebook não consegue redistribuir orçamento pelas horas restantes; gasta feio sem converter."*
→ **Depois das ~17h, não aumentar orçamento.** Realocação se faz no começo do dia.

## 🔑 Campanha abaixo do equilíbrio NÃO merece corte gentil

A regra de "cortar no máximo 20%" existe pra **proteger o aprendizado de campanha que se quer continuar otimizando**. Ela **não se aplica** a:

- campanha **abaixo do ponto de equilíbrio** (está sangrando — o objetivo é estancar, não preservar aprendizado)
- campanha de **teste cuja pergunta já foi respondida** (não se paga pra confirmar o que já se sabe)
- campanha que é o **maior gasto com o pior retorno** (custo de oportunidade: o mesmo dinheiro rende 3-4x do lado)

**Erro documentado (Cliente A, 27/07/2026):** cortei ESCALA CHECKOUT só −20% e ela furou o piso (1,27 → **0,90**, abaixo do empate de 1,13 = prejuízo real). Cortei ESCALA 2 só −15% e ela caiu 2,17 → **1,34** ainda queimando R$517, o 2º maior gasto da conta com o pior retorno. **Corte tímido em campanha em queda é dinheiro jogado fora.** Corrigido no dia seguinte com cortes de 32-37%.

---

## 🔑 Dia 1 não se julga (regra dura)

**Nunca cortar/pausar campanha nova com base no primeiro dia.** Motivos:
- atribuição atrasa: a venda pode cair em "não identificado" no dia 1 e só grudar na campanha depois
- a campanha ainda está saindo do aprendizado

**Erro documentado (Cliente A, 25/07/2026):** cortei o Lote 1 BR em −20% porque fez ROAS 0,71 no dia 1. Era **furo de atribuição, não performance**. No dia seguinte virou a **melhor campanha da conta (3,85)** e depois 5,03.

⚠️ Antes de concluir "faturou zero", **checar o pixel da campanha**: se o pixel viu compra e o dashboard não atribuiu, é atribuição, não fracasso.

---

## Reduzir budget vs pausar

| Situação | Ação |
|---|---|
| Acima do equilíbrio mas fraco (custo de oportunidade) | **reduzir** e realocar pro melhor |
| Abaixo do equilíbrio, tendência de queda em 2-3 dias | **corte forte (30-40%) ou pausar** |
| Teste com pergunta respondida | **cortar forte**; manter só um resto se quiser observar |
| Dia 1, seja qual for o número | **não mexer** |
| Fadiga (freq alta) com ROAS ainda bom | **manter**, não escalar; pausar só quando furar o equilíbrio |

---

## Suas regras pessoais (preencher)

**1. Critério mínimo pra pausar um anúncio:**
> _resposta:_

**2. Critério pra pausar um conjunto inteiro:**
> _resposta:_

**3. Critério pra pausar uma campanha inteira:**
> Abaixo do ponto de equilíbrio por 2-3 dias seguidos com tendência de queda, e já fora do dia 1.

**4. Quando você pausa MESMO em aprendizado? (a exceção da regra)**
> _resposta:_

**5. Quando você prefere reduzir budget em vez de pausar?**
> Quando ainda está acima do equilíbrio: aí o problema é custo de oportunidade, não prejuízo. Reduz e realoca.

**6. "Pausa estratégica" vs "pausa de morte" — como você diferencia?**
> _resposta:_

---

## Anti-pattern (o que eu NÃO faço)

- Pausar porque "o cliente perguntou"
- Pausar baseado em 1 dia ruim
- **Cortar campanha NOVA por um único dia ruim** (quase sempre é atribuição)
- **Cortar tímido (15-20%) campanha que já vem caindo há dias** — não estanca nada
- **Tratar ROAS 1,0 como o zero a zero** (o equilíbrio é maior, por causa das taxas)
- **Manter intocada a pior campanha só porque ela é antiga/conhecida** — dinheiro parado no cavalo errado

---

## Casos

| Cliente | Quando pausei/cortei | Por quê | Resultado |
|---|---|---|---|
| Cliente A | Lote 1 BR, −20% (25/07) | ROAS 0,71 no dia 1 | ❌ **ERRO** — era atribuição; virou a melhor da conta (3,85 → 5,03) |
| Cliente A | ESCALA CHECKOUT, −20% (27/07) | ROAS 1,27 caindo | ⚠️ direção certa, dose errada — furou o equilíbrio (0,90) |
| Cliente A | ESCALA 2, −15% (27/07) | ROAS 2,17 com maior gasto | ❌ corte curto demais — caiu pra 1,34 queimando R$517 |
| Cliente A | os três, −32 a −37% (28/07) | correção do erro acima | (acompanhar) |

## 🔴 NUNCA usar regra automatizada de PAUSAR + REATIVAR pra dayparting

**Custou caro no Cliente A (30-31/07/2026).** Duas regras (pausa 03h36, reativação 06h06) desligaram 3 campanhas por **2h30 numa única madrugada**. O efeito nas 3 tocadas:

**As TRÊS tocadas estavam no melhor dia delas na véspera:**
| Campanha | ROAS 29/07 (véspera) | 30/07 | 31/07 | média diária antes |
|---|---|---|---|---|
| Ads19-21 | **3,83** (pico da semana) | 1,11 | **0,00** | R$786/dia |
| Lote 1 WW | 3,17 (R$1.676 faturados) | **0,00** | **0,00** | R$1.262/dia |
| ESCALA 2 | **2,55** (pico da semana) | **0,00** | pausada | R$682/dia |

**As não tocadas se dividem — e é isso que dá o contraste:** a ISOLADA WW **se recuperou sozinha** de dois dias fracos (1,05/1,30) pra 3,24 dois dias depois. Já o Lote 1 BR caiu 4 dias seguidos **sem ter sido tocado** — prova de que a regra não explica tudo.

Sintomas no Lote 1 WW após a reativação: visitas −40% (286→172), custo por checkout dobrou (R$29→R$57), e no 2º dia **CPM caiu 47% junto com o CTR** — assinatura de campanha que perdeu a otimização e passou a comprar inventário barato e ruim.

**Prejuízo estimado: ~R$4.400 de faturamento + ~R$1.577 de verba queimada em 2 dias.**

⚠️ **Ressalvas honestas:** a conta já vinha caindo antes (dia 29, pré-regra) e o Lote 1 BR, não tocado, caiu 4 dias seguidos. A regra não explica 100% da queda. E **não foi possível confirmar reset de aprendizado pela API** (o Meta não devolve `learning_stage_info` nesse caso) — o que existe é o efeito observado, não o mecanismo provado. A doc oficial diz que só pausa ≥7 dias é edição significativa; 2h30 não deveria disparar nada. Ou a doc não cobre o caso, ou foi coincidência — mas com 3/3 batendo nas tocadas e 0 nas limpas, a aposta é na regra.

**Regra prática:** pra concentrar verba em horário, usar **programação de orçamento** (`budget_schedules`, que sobe/desce o valor sem desligar a entrega), **nunca** pause/unpause. Desligar campanha madura, mesmo por poucas horas, é mexer no que está funcionando.

### Como auditar se uma regra estragou algo
```
GET /{act_id}/adrules_history?fields=rule_id,timestamp,results,evaluation_spec
```
Traz o carimbo exato (UTC) e a lista de `object_id` afetados com `old_value`/`new_value`. Cruzar com a série de ROAS diário e separar **tocadas × não tocadas** — o grupo de controle é o que transforma coincidência em evidência.


### 🔑 ANTES DE ACUSAR UMA CAMPANHA DE "ZERO", AUDITAR A ATRIBUIÇÃO
Na 1ª rodada dessa mesma análise uma campanha apareceu com **ROAS 0,00 em todos os dias** e eu quase a descartei. Era **erro de parsing do src**, não performance: ela tinha faturado R$4.275 em 7 dias.

**O formato do src costuma NÃO ser uniforme numa conta que já teve várias fases:**
```
campanhas NOVAS:   facebook_paid_{campaign_id}_{ad.name}_{adset_id}
campanhas ANTIGAS: facebook_paid_<texto-fixo>_{ad.name}_{adset_id}
```
**Ancorar SEMPRE no último campo (adset_id) e mapear adset→campanha pela API.** Ler o 3º campo como campaign_id joga tudo das campanhas antigas num balde solto e produz zeros falsos.

**Teste de sanidade obrigatório:** somar o faturamento atribuído e conferir contra o total do dashboard. Se sobrar um balde grande de "não identificado", o parsing está errado — não é falta de rastreio.

### 🔴 O ERRO DE SELEÇÃO: a regra desligou o PÓDIO da conta

**Ranking de ROAS do dia 29/07 — a véspera da regra:**
| # | Campanha | ROAS | Gasto | Faturou | Desligada 03h36? |
|---|---|---|---|---|---|
| 1º | Ads19-21 | 3,83 | R$233 | R$891 | 🔴 SIM |
| 2º | Lote 1 WW | 3,17 | R$528 | R$1.676 | 🔴 SIM |
| 3º | ESCALA 2 | 2,55 | R$266 | R$678 | 🔴 SIM |
| 4º | Lote 3 WW | 1,40 | R$239 | R$334 | |
| 5º | Lote 1 BR | 1,23 | R$727 | R$891 | |
| 6º | ISOLADA WW | 1,05 | R$564 | R$595 | |

**As 3 tocadas eram 1º, 2º e 3º lugar. Faziam 64% do faturamento da conta com 30% da verba.**

**Por que foram escolhidas:** o critério de seleção foi *"quem mais gasta de madrugada"*. Quem mais gasta de madrugada é quem está entregando volume — o critério levou direto às campeãs.

⚠️ Contexto honesto: no dia 28 essas mesmas três eram 5º, 7º e 8º lugar. Subiram ao pódio no dia 29. Na hora de MONTAR a regra elas não pareciam campeãs no acumulado — mas a regra EXECUTOU no dia 30, quando o dia 29 já era visível.

## 🔑 REGRA DURA: teste se faz onde a perda é aceitável

**Nunca apontar um teste (dayparting, bid novo, público novo, pausa programada) para a campanha que está pagando a conta.** O candidato a teste é a campanha marginal: já perto do equilíbrio, gasto pequeno, pergunta ainda aberta.

Checklist antes de ligar qualquer automação/teste numa campanha:
1. Ela está no top 3 de ROAS dos últimos 2 dias? → **não entra no teste**
2. Ela responde por mais de ~20% do faturamento? → **não entra no teste**
3. O critério que me levou até ela foi "gasto"? → **refazer**, gasto alto costuma ser proxy de entrega boa, não de desperdício
4. Se esse teste der errado, quanto eu perco por dia? → se a resposta passar de ~10% do faturamento diário, escolher outra campanha
