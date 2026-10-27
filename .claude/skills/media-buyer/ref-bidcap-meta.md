# Referência: Bidcap (Limite de Lance) no Meta Ads — Testar e Escalar na Mesma Campanha

**Fonte:** Curso de Bidcap do Allan (allanzord.notion.site) — media buyer de Direct Response (Nutra/Info global) e líder de aquisição no Meta de uma venture builder de apps (EP do Pedro Ítalo/Johan/Cobat). Compilado de: 5 aulas do curso base (R$67), a "Reunião Secreta do Bidcap" (call de comunidade + Q&A) e uma Call de Mentoria 1:1.
**Referências do próprio Allan:** Andrei Lunev (ucraniano, gasta ~$50K/dia no Meta, origem do método via Twitter/X), Taylor Lagace. Allan não criou a técnica — modelou o que os gringos já usavam pro contexto BR/DR. No Brasil quase ninguém fala disso; lá fora os grandes players só usam manual bidding.
**Data de captura:** 2026-07-17. Método registrado como vigente desde 26/06/2025, com **atualização crítica de 30/01/2026** (ver seção "Atualização Andrômeda").

---

## Resumo

Bidcap (**Limite de Lance** na UI do Meta) é uma estratégia de lance manual onde você **infla o orçamento** da campanha e **controla o gasto pelo BID (lance)**, não pelo orçamento. A tese central: o Meta em 2025/2026 (pós-atualização Andrômeda) recompensa **estabilidade e simplicidade** — poucas campanhas, muito criativo, tudo aberto (sem interesse/lookalike/segmentação). O bidcap entrega **constância de CPA e estabilidade absurda**, sem o "reset diário" e a montanha-russa da escala por duplicação ("escala baiana").

A grande sacada operacional: **você testa e escala na MESMA campanha, com UMA só campanha**. Criativos novos entram por conjuntos novos e disputam leilão contra os vencedores. Se o criativo é ruim, o Meta **não gasta** naquele bid — ou seja, você **testa criativo de graça** (a campanha não queima verba em criativo/oferta que não converteria naquele lance). Os vencedores puxam verba e vendem; os novos ficam sendo testados com verba baixa em paralelo, sem desestabilizar a estrutura.

O preço disso é **paciência**: é um formato LENTO. Sem nada validado, a campanha pode passar dias sem gastar. Exige volume alto de criativo (o "game de 2025") e análise em janela longa (5-7 dias, nunca dia-a-dia). O bid é **extremamente sensível** — qualquer mudança na conversão do front (microlead na VSL, mudança de ticket/preço) mexe no gasto na hora.

---

## Insights Principais

- **Bidcap = orçamento inflado + controle pelo lance.** Você diz ao Meta: "tenho esse lance X no leilão e esse orçamento; me entrega conversão dentro desse range". No "Valor/Volume Mais Alto" (padrão) o Meta gasta 100% do orçamento e "mais um pouco" pra te entregar o máximo — se o criativo é ruim, você perde a verba. No bidcap, se não performa naquele lance, ele **não gasta**.
- **"Se a campanha não gastar, é porque ela não iria performar/entregar ROAS positivo naquele bid."** Esse é o princípio-mãe (Andrei Lunev). Não gastou = criativo ruim OU oferta ruim. É teste grátis.
- **Teste e escala na mesma campanha, UMA campanha.** Nada de duplicação infinita, nada de fatia de público. "A verdadeira escala baiana é essa" (uma/duas campanhas, uma conta, 2 gestores).
- **Isole o bidcap.** Nunca rode bidcap junto de campanhas de alto volume (Advantage/CBO normal) na mesma conta — o alto volume prioriza gasto, rouba leilão e o bidcap gasta ainda menos. Conta separada só pra bidcap.
- **Criativo é a maior alavanca.** Sem volume de criativo o método (ou qualquer outro) falha. Referência de volume: 100-150 criativos numa campanha pra poder afirmar "não é problema de criativo". Abaixo disso, o gargalo provavelmente ainda é criativo.
- **O bid é sensível pra caramba.** Mudou preço/ticket da oferta (pra cima OU pra baixo) → o bid "destrói", desestabiliza. Microlead na VSL que reduz conversão do front → gasto cai na hora. NÃO teste precificação/oferta na campanha de bidcap.
- **Escala pelo ORÇAMENTO primeiro, não pelo bid** (na validação e no início). Libera verba; o bid escala sozinho quando há conversão pra fazer. Só otimiza o bid quando bate o teto da oferta.
- **O bidcap te diz o LIMITE da oferta rápido.** Em 1-2 dias você sabe até onde escala, em vez de perder 2-3 semanas tentando escalar algo que não escala. Isso é agilidade de decisão — o valor real de um gestor sênior.
- **Não gastou abaixo do CPA do front + gastando 100% do orçamento antes do fim do dia = bid ótimo, margem enorme pra escalar.** É o "mundo perfeito".
- **A atualização Andrômeda (set/out 2025) dificultou os gastos.** O lance inicial subiu de +30% pra **+50% do breakeven**.

---

## 1. Fundamentos da Estrutura

**Regra de ouro: quanto mais básico, melhor.** O Meta recompensa estabilidade. Você tem que jogar A FAVOR do algoritmo, não contra.

### Nível Campanha
- **Poucas campanhas** = 1 ou 2, só. Até ~US$10k/dia (ou ~R$10k/dia no BR) você não precisa de mais que UMA campanha.
- **CBO (Orçamento Advantage) em 99% das vezes.** ABO vai deixar de existir; e o CBO respeita muito mais o orçamento e é mais inteligente.
- **Estratégia de lance = Limite de Lance.** Fica em: criar campanha de Vendas → nível campanha → onde escolhe CBO (Orçamento Advantage) → **Estratégia de lances da campanha → Limite de lance**. Essa é a parte mais importante do método.
- **Objetivo:** Vendas (OUTCOME_SALES), otimizando Compra.

### Nível Conjunto
- **Esquece interesse.** Zero interesse, zero lookalike, zero segmento. Tudo aberto (Advantage+). "Quem segmenta hoje é o criativo."
- No máximo **idade e sexo** — e olha lá (Allan rodou produto masculino com segmentação feminina e os compradores vieram masculinos; pro Meta é só sugestão).
- **Posicionamento:** deixa Advantage (automático). Não mexe, senão encarece métrica sem necessidade. Exceção: querer só Instagram.
- **O bid (limite de lance) fica no CONJUNTO.** Orçamento é a nível de campanha; bid é a nível de conjunto. É isso que permite criativos "lutarem entre si" com lances diferentes.

### Nível Anúncio
- **Muito criativo.** É o pré-requisito não-negociável. Pode separar por ângulo; a quantidade por conjunto não importa muito (ver seção 6).
- Sem volume + diversidade + variações dos que vendem → falha certa.

---

## 2. Como Definir o BID Inicial (Breakeven)

O lance base é o seu **breakeven** (0 a 0): o CPA que te deixa no zero a zero. Se seu breakeven é R$100, o bid base é R$100.

- **Regra ATUAL (pós-Andrômeda, desde set/out 2025): bid inicial = breakeven + 50%.** Ex: breakeven R$100 → bid inicial R$150. (A regra antiga era +30%; o Meta dificultou o gasto e subiu pra +50%.)
- Allan gosta de **arredondar** o valor (feeling/toque): 28,5 vira 30. Nunca deixa quebrado.
- Se não quiser agressivar, roda no breakeven puro (0 a 0). O +30-50% é pra "dar uma agressivada" e gastar um pouco mais / dar chance no leilão.

**Referência de bid ótimo (o "mundo perfeito"):** um bid **um pouco ABAIXO do ticket do front** que ainda gasta 100% do orçamento antes do fim do dia. Exemplo real da mentoria: front R$160, AOV R$200, bids nos conjuntos 145-155, gastando toda a verba antes das 24h → "um dos bids mais perfeitos que já vi, se melhorar, estraga". **Bid abaixo do ticket do front + gastando 100% = margem enorme pra escalar.**

**Piso do bid:** quando o bid chega ABAIXO do CPA/ticket do front e ainda gasta, você está no limite máximo do bid. Abaixar mais que isso começa a estragar (para de gastar, números pioram). Não desça mais.

---

## 3. Fluxo de TESTE (sem nada validado)

Pra quem não tem criativo nem oferta validada e quer começar do zero:

1. **ISOLE.** Conta separada só pra bidcap.
2. Sobe **1 campanha CBO + Limite de Lance**, conjuntos abertos (só idade/sexo), anúncios dentro.
3. Coloca o **bid no breakeven** (ou +50% pós-Andrômeda) e sobe **bastante criativo**.
4. **Vê se o Meta gasta.**
   - **Gastou** (10-20%+ do orçamento diário) → o criativo tem potencial, fica de olho. É candidato a bom.
   - **Não gastou** (< 10% do orçamento) → criativo/oferta ruim. Teste grátis, você economizou a verba.
5. Ao longo dos dias, algum criativo vence, começa a vender e vira o maior gasto. Aí você coloca os próximos testes **na mesma campanha** (conjuntos novos).

⚠️ **É LENTO.** Sem nada validado, pode passar dias sem gastar. É o preço do teste de graça. Tenha em mente: **se não gastar, é porque não iria performar naquele bid** — Allan testou contra si mesmo várias vezes (subir os mesmos criativos que "não gastaram no bid" num formato de alto volume) e nunca deu ROAS positivo por 3 dias seguidos. Se não gastou no bid, o criativo/oferta não é bom o suficiente.

**Critério de "potencial":** só considera potencial se gastar **10-20% do orçamento diário**. Menos que isso não é potencial — melhora criativo/oferta. (Ex: orçamento R$1.000 → precisa gastar ≥ R$200 pra ter potencial.)

---

## 4. Fluxo de ESCALA (com oferta/criativo validado)

A escala acontece na MESMA campanha. Estrutura:

- **1 campanha, orçamento INFLADO** (bem acima do que vai gastar — o bid controla o gasto real). Pode colocar R$50k, R$100k de orçamento diário de boa; ele não gasta tudo, gasta conforme os dias e o leilão.
- **Injeta criativo SEMPRE.** Todo dia, o mais rápido possível. Nunca deixar a esteira parar.
- **Criativos vencedores** (verdes/topo) puxam a maior verba e vendem; **criativos novos** (com bid um pouco maior) entram sendo testados com verba baixa, sem afetar a estrutura.
- Se um criativo novo **bate o CPA ideal e não vende**, para ele. Se não gasta, nunca ia bater o controle mesmo.

### A ordem de alavancas na escala (validação → escala)
1. **Libera ORÇAMENTO primeiro** (não o bid). "Quando existe conversão pra ser feita, o bid escala sozinho." Se você tem 2K/dia e ele já gasta 1K, tem problema de bid/criativo — o único caminho é bid ou criativo novo.
2. **Só mexe no bid quando bate o teto da oferta** (ver seção 5).
3. **Sempre criativo novo** em paralelo.

**Por que orçamento antes de bid:** se você libera orçamento e ele continua gastando ~100% com ROAS positivo, você ainda tem um bid estável pra otimizar depois. Se você escala pelo bid cedo, perde a referência de gasto e fica "refém do bid", numa rua sem saída. Prioridade sempre: orçamento → depois bid.

### Passo-a-passo de escala gradual (da mentoria 1:1)
Estava em R$3.500/dia gastando tudo antes das 16h, bid abaixo do front → margem enorme:
- Manhã (6-7h, antes do pico de venda): sobe orçamento pra **~2x** (3.500 → 7.000).
- **Deixa 48h sem mexer em nada** (só sobe criativo). Analisa: valor gasto, ROAS, pico de venda, % do orçamento gasto.
- Continuou respondendo → **próximo salto ~3x** (7.000 → 20.000). De novo 48h.
- Depois 20k → 50k, e assim por diante, sempre gradual e sempre observando.
- **Sobe orçamento em salto grande de uma vez, não de pouquinho.** Allan testou aumentar 30%, aumentar de 24 em 24h, de 48 em 48h — "toda vez que mexo, dá uma bagunçada no orçamento". Então, se vai bagunçar de qualquer jeito, dobra/salta de uma vez só (menos intervenções = mais estável). Não vai de 3k pra 30k, mas 3k→7k→20k é ok.

⚠️ **Escalar = se expor mais ao risco do mercado.** Ao subir orçamento você pode pegar volatilidade da plataforma (dia ruim do Meta, checkout caindo, Cloudflare). Isso é normal. Aguenta o primeiro dia ruim (ver seção 8).

---

## 5. Otimização do BID (quando bate o teto)

Só otimiza o bid quando a escala TRAVA — quando mais orçamento não dá mais lucro (relação inversamente proporcional). Nesse ponto sobra: otimizar bid, empurrar criativo, diminuir orçamento, pausar conjuntos.

### Diminuir o bid dos VENCEDORES
Quando um criativo já validou e continua vendendo, **abaixa um pouco o bid dele** (só um pouquinho):
- Ele já tem potencial pra gastar de qualquer jeito (porque performa) → gasta mesmo com bid menor.
- Você economiza verba e o Meta te entrega **ROAS maior** (mesma performance, lance menor).
- Os **criativos novos entram com bid NORMAL (breakeven)** — pra dar chance contra os vencedores. Mesmo com bid menor, os vencedores gastam mais que os novos, porque performam. "É meio que anti-erro."

### Regra "gastou 100% do orçamento → diminui o bid"
Se está gastando 100% do orçamento ANTES do fim do dia, o bid está alto demais. Abaixa o bid pra ele atuar em ~70-80% do orçamento diário → aí você sabe que pode **aumentar muito o orçamento** e ele responde no teto, atuando numa faixa de leilão que entrega mais resultado. Objetivo: achar o bid que gasta ~70-80% do orçamento com folga.

### Magnitude dos ajustes
- **Sempre 5 a 10% por vez** (pra cima ou pra baixo). Raro ir a 15-20% (só se querendo agressivar muito ou extrapolar). Além disso "você perde a mão do bit".
- **Ticket baixo (< US$20): centavos mudam a escala.** Tem que ser 5-10% mesmo.
- Allan mexe no bid **1x por dia**, deixa 24h, compara com dias anteriores. Não faz intraday (embora ache válido pra quem é muito bom — "bid intraday").

### Quando NÃO mexer no bid
- Em validação de oferta nova: **não mexe no bid** (senão nunca sabe se foi criativo, bid ou orçamento). Só abaixa levemente pra "dar fôlego" enquanto o time arruma o funil.
- Quando o bid já está abaixo do ticket do front e gastando bem: **não mexe, só sobe orçamento.** "Se melhorar, estraga."

---

## 6. Criativos: Volume, Variações e Conjuntos

- **Volume é tudo.** Dia 1: mínimo 30 criativos. Referência de saturação de teste: 100-150 criativos numa campanha antes de afirmar "não é criativo". Allan sobe ~50/dia (10s × 5 variações). Andrei (que roda mais imagem) sobe centenas.
- **Nunca deixe a esteira parar.** Programe pra ter ED (criativo) todo dia — se produz 200/dia, distribui (sobe 100 hoje, guarda pra amanhã) pra nunca faltar.
- **Criativo novo entra em CONJUNTO NOVO, nunca dentro de conjunto que já roda.** Motivo: permite dar bid diferente por conjunto → criativos lutam entre si e você otimiza bid por conjunto. (Allan usa ferramenta que já sobe em conjunto novo automático.)
- **Bid do criativo novo = um pouco ACIMA (+5%) dos que já gastam bem** — pra dar margem/chance de competir com os vencedores. (Nota: isso é o bid do teste/novo. Os vencedores já validados você abaixa; os novos você sobe um tico.)
- **Criativos por conjunto: não tem regra.** Média ~5 (Allan), mas 10-15 é ok pra não criar conjuntos demais. Se produz muito, 15/conjunto. Não impacta performance, é organização.
- **Imagem vs vídeo:** pode subir tudo junto no mesmo bid. Depois, se quiser escalar só imagem, lateraliza uma campanha só de imagem. Allan é fraco em imagem; o mentor dele (Andrei) só roda imagem.
- **Variação de COP importa muito (Andrômeda):** existem "estruturas de copy campeãs" — a mesma estrutura escrita com palavras diferentes vende mais que uma estrutura totalmente diferente. O próprio gerenciador te diz o que escrever: se as variações do criativo campeão gastam e as novas estruturas não, é a estrutura de copy que está errada, não bug do Meta.

### Quando pausar criativo/conjunto
- **Só pausa quando entra na fase de otimização** (teto da escala). Até lá, **ROAS acima de 1 não pausa nada.** Allan chegou a 1.3 de ROAS em escala **sem pausar nada**.
- Impacto de pausar um criativo é **pequeno** (~0.05 de ROAS). Por isso não é prioridade — prioridade é empurrar verba enquanto tem escala.
- Ao pausar, **olha os últimos 3 dias, não o dia atual.** Se um conjunto está ROAS 0.79 de média em 3 dias, dá uma última chance abaixando o bid; se não sobreviver, pausa.
- Se um criativo **não gastou** em ~5-10 dias, pausa e tenta **lateralizar** ele numa outra campanha/precificação (às vezes gasta em outro funil). Na campanha principal de escala, se não gastou em ~5 dias, dificilmente vai gastar.

### Criativo vencedor que REJEITA / para de performar
- Ele já sobe com variações → uma variação toma o lugar (performa minimamente bem).
- Sobe um criativo novo **igual, mas com +5s de frase / qualidade a mais** → vira "criativo novo" aos olhos do Meta e roda.
- Se **rejeitou** de fato: pausa, sobe um white (versão limpa) num conjunto novo como se fosse criativo novo.

---

## 7. Métricas que Importam (ordem de prioridade)

**Vendas & Finalizações de Compra (IC) >>>>> CPC > Hook Rate & Hold Rate >>>>>> CPM**

1. **Vendas e Finalização de Compra (Checkout)** — na frente de tudo. É a métrica que o bid usa pra funcionar. A conversão do FRONT precisa chegar no gerenciador (via CAPI/tracker) — a do upsell nem tanto.
2. **CPC** — relacionado a quantas pessoas entram no funil.
3. **Hook Rate** (reprodução 3s / impressões) e **Hold Rate** (reprodução 75% / impressões).
4. **CPM** — o menos importante. CPM caro NÃO é necessariamente ruim: se o CPC é baixo com CPM alto, é ótimo (entregando gente qualificada). O que não pode é CPM caro com CPC caro.

⚠️ **Tracking do FRONT é vital.** O bid funciona a partir da conversão do front chegar no Meta. Se o tracker cai (Cloudflare, não pagou tracker, zoou métrica), o bid "arrebenta" a campanha — pode ter que subir tudo de novo. Allan usa **Redtrack** em escala agressiva (o mais preciso), **UTMfy** pra projetos menores. Ver [[ref-tracking-100mm]].

---

## 8. Rotina, Limite de Gasto e "Pausar"

### Limite de gasto (em vez de desligar)
- **Não desligue a campanha; use "Limite de gastos da campanha".** Allan pegou do Andrei: desligar perde otimização (fonte: gerentes do Meta). Colocar limite de gasto baixo trava o gasto sem desligar.
- Uso 1 (segurança): coloca um limite acima do que pretende gastar (uma "gordurinha", ~R$500 a mais) pra evitar que o Meta "resolva gastar tudo" num dia maluco.
- Uso 2 (pausar sem desligar): se vai parar a oferta, coloca o limite lá embaixo → a campanha fica ativa mas não gasta; quando quiser religar, só **libera o limite** (e libera aos poucos: 1k, 2k, pra não gastar o dia todo de uma vez ao religar de noite).
- No orçamento inflado, você **não mexe no orçamento** também → a campanha "trabalha sozinha".

### Primeiro dia ruim = não faz nada
- Vinha escalando com dias verdes e o **primeiro dia ruim: NÃO pausa, não mexe.** Pode ser o Meta, checkout, hospedagem, Cloudflare — você não sabe. No máximo otimiza o bid levemente se tiver margem.
- **Segundo dia ruim seguido** (mesmo tendo otimizado): aí sim tem algo errado. "Pausa" (via limite de gasto) pra rever criativo, oferta, mercado, espionar concorrente, falar com o produtor. Faz um reset.

### Reset quando desestabiliza
- Queda ABRUPTA de gasto (de um dia pro outro) ≠ perda de performance (que é gradual). Abrupta geralmente é: tomou clone, tracker caiu/parou de enviar métrica, Cloudflare caiu. O bid é sensível: qualquer um desses arrebenta a campanha.
- **Fix:** resetar o post ID (duplicar o criativo sem puxar comentários), injetar bastante criativo, tentar voltar ao normal. Se não, subir campanha nova (o bid é sensível demais).

---

## 9. Modos Alternativos e Estruturas de Apoio

- **Modo 1 (principal, o desenho do PDF):** 1 campanha → **VÁRIOS conjuntos** → vários ads por conjunto (5-15). O bloco base é **1-1-X** (1 campanha, 1 conjunto, X ads), mas o Modo Principal **multiplica esse bloco em N conjuntos** = **1-N-X**: cada lote de criativo injetado vira um conjunto NOVO com seu próprio bid (é assim que o gerenciador dele chega a 59 conjuntos numa campanha). Testa e escala tudo na mesma campanha. Notas do quadro: poucas campanhas · CBO · sem duplicação infinita · 100% aberto · só idade/sexo · posicionamento adv+ · avaliar 5-7d.
- **Modo 2 (isolado) = 1-1-X puro:** 1 campanha, **1 conjunto só**, X ads. Orçamento 0,5-2 tickets, isolado, CBO. É o modo de **isolar quando está na dúvida** (se o Meta está escolhendo bem, se um criativo com ROAS 7 gastou só R$30, etc.). Não confundir com o Modo 1: o 1-1-X de um conjunto só é o Modo 2, não o principal.
- **Modo 2.5 (isolado / sem top spender):** igual o Modo 1 (vários conjuntos), mas você **mata os top spenders** e deixa só os novos/menores rodando, pra ver se gastam/vendem sem os campeões roubando o leilão. (Quase sempre confirma que o bid estava certo.)
- **Campanha de suplemento (CBO alto volume SEM bid):** pega os criativos "do meio termo" (não os 2-3 melhores) e joga num CBO normal 1x3/1x5, orçamento BAIXO (ex: R$1.000/dia), só pra **suplementar gasto** fora da faixa de leilão do bidcap. O bidcap atua numa faixa de leilão; o alto volume pega vários leilões. Sem risco (orçamento baixo). Serve pra arrancar um gasto a mais em outros criativos.
- **Testar oferta/preço:** NUNCA na campanha de bidcap. Abre um **CBO normal ("day trade")** isolado, orçamento baixo, mesmos criativos validados, roda 2-3 dias (esperando montanha-russa de ROAS) e lê o resultado. A campanha de bidcap é seu CONTROLE — extrai o máximo dela, não mexe.
- **Lateralização (2ª conta):** só em momentos específicos, com orçamento já validado. É jogo de risco: pode haver **canibalização** entre contas (a conta maior faz a menor não performar, ou vice-versa). Não é garantia de escala. Fica numa conta só sempre que der.
- **WhatsApp:** bidcap funciona pra tráfego de conversa — coloca o custo por conversa perto do bid. Escala lateralizando bid não funciona tão bem.
- **Cost Cap / ROAS Target (Meta de Custo/Objetivo de ROAS):** Allan NÃO validou. Atuam no resultado, escalam ainda menos que o bidcap. Andrei usa, mas Allan não conseguiu fazer rodar. Fica no **Limite de Lance**, que é o que os players lá fora usam.

---

## 10. Quando NÃO Usar / Limitações

- **Início de campanha comprando dados (pixel/conta muito novos, sem informação):** o bid pode não gastar por falta de sinal. Aí roda 1-2 dias de CBO alto volume pra dar informação, depois volta pro bid.
- **Comprando dados frios em geral** — vai travar.
- **Múltiplos tickets/produtos na mesma campanha:** separa por ticket (obrigatório). Se ainda ruim, separa por conta. Um ticket menor entrando na campanha do maior mata o funcionamento.
- **Rodando junto de alto volume na mesma conta** — o alto volume rouba leilão. Isola.
- **Bet/iGaming (relato de aluno, não validado por Allan):** bidcap "não segurou" a escala com orçamento infinito e criativo majoritariamente imagem; CBO padrão segurou melhor o CAC. Allan diagnosticou provável **auto-canibalização de leilão** (competindo contra si mesmo com orçamento inflado numa vertical saturada). Info/Nutra: funciona como um sonho. **Bet e Hot: Allan não validou.**
- **E-commerce/loja física:** precisa de 100-150 criativos antes de culpar a estrutura. Se gastou no bid e não deu ROAS, é criativo ou a página/loja.

---

## 11. Números Reais Citados (benchmarks de referência)

- **Escala máxima já batida por Allan (1 dia, bidcap):** ~US$200k somados (US$170k info/apps + US$30k nutra). Nutra limitado por ser afiliado (respeitar limite da oferta).
- **ROAS em alta escala:** manter ~1.3-2.0. "Melhor R$100k de lucro com ROAS 1.3 do que R$10k com ROAS 2." O objetivo em escala é volume e lucro, não ROAS alto.
- **Consistência:** oferta que ficou **28 dias positivo, 2 dias negativos** (os negativos ~R$100-200). Estabilidade é o produto que se compra aqui.
- **Exemplo de campanha única:** 313 compras, CPA R$480, ~R$50k de lucro, ROAS 1.35 em escala, 1 campanha, 59 conjuntos, 116 anúncios (50+ rodando) — sem duplicar nada.
- **Caso Apple/apps (fev/2026):** oferta do zero aos US$10k/dia em ~10 dias. Começou US$1k orçamento / bid 19 (= 19 × 1,5 ≈ 28, arredonda 30). Gastou mas sem ROAS → gargalo era o FUNIL (AOV, conversão checkout, upsell), não o criativo. Corrigiu funil + subiu de 50 pra 250 criativos → destravou. Escalou dobrando orçamento a cada validação, mexendo pouco no bid.

---

## Princípios Centrais (resumo executivo)

1. **Orçamento inflado + controle pelo bid.** O bid é o freio, não o orçamento.
2. **Se não gasta, não performa.** Teste de criativo/oferta de graça.
3. **UMA campanha, testa e escala junto.** Criativo novo = conjunto novo, bid um tico acima.
4. **Escala pelo orçamento, otimiza pelo bid.** Bid escala sozinho quando há conversão.
5. **Bid base = breakeven +50%** (pós-Andrômeda). Bid ótimo = abaixo do ticket do front gastando 100%.
6. **Ajustes de bid: 5-10% por vez, 1x/dia.** Vencedor abaixa, novo entra no normal.
7. **Volume de criativo é o game.** 30/dia mínimo, 100-150 pra saturar teste.
8. **Paciência: janela de 5-7 dias, nunca dia-a-dia.** É lento e é assim mesmo.
9. **ISOLA** (conta separada) e **não testa oferta/preço** na campanha de bidcap (bid sensível).
10. **Limite de gasto em vez de desligar. Primeiro dia ruim, não mexe.**

**Validado por Allan em:** Info (BR/global), Nutra, apps (Apple). **NÃO validado:** Bet, Hot, Cost Cap, ROAS Target.

Relacionado: [[ref-meta-ads-1m-dia]] (escala e proteção), [[ref-facebook-ads-7d-mes]] (regra dos 20 tickets, criativo vs oferta), [[ref-tracking-100mm]] (Redtrack/UTMfy, CAPI do front).
