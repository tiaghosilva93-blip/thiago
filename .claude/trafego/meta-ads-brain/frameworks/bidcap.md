# Framework — BidCap (Limite de Lance)

> **Aplicação:** Use quando o gestor pedir explicitamente "rodar bidcap", "estrutura de bid", "limite de lance", "subir em bid". **Não importa o cliente** — importa o conhecimento estrutural.
> **Fonte:** **Alan Veronese** — aluno da 1ª turma do Pedrão (R$1MM+ no DR em ~7 meses), Media Buyer da **AppIon** (venture builder de apps, diretoria: Pedro, Italo, Juan, Cobata), e quem trouxe o estudo de BidCap pro mercado BR (via low ticket R$67).
> **4 materiais complementares (mesmo autor):**
> - **M1** — Aula na turma do Pedrão (jan/2026): infoproduto/Nutra US, fundamentos
> - **M2** — Call mentoria 1-on-1 (dois alunos): info BR, AOV R$200, diagnóstico real
> - **M3** — "A Reunião Secreta do BidCap": caso AppIon (white market), case de 10 dias + Q&A profundo

---

## 🔒 TRAVAS DE SEGURANÇA (LEIA ANTES DE QUALQUER AÇÃO)

**Esta skill é PRESCRITIVA, NÃO criativa.** A Ada executa **única e fielmente** a mecânica descrita nas 3 aulas do Alan. Sem improviso, sem "otimização própria", sem "achismo".

### ⛔ REGRAS ANTI-ALUCINAÇÃO (INEGOCIÁVEIS)

> Esta estrutura vem **100% das 3 aulas do Alan**. Tudo que a Ada disser sobre BidCap tem que estar **escrito neste arquivo**. Se não está aqui, **não existe pra efeito desta skill.**

1. **NÃO ALUCINE.** Só afirma o que está **literalmente descrito** neste arquivo. Não preenche lacuna com "conhecimento geral de Meta Ads", não deduz, não supõe.

2. **NÃO INVENTE DADOS.** Nenhum número (bid, %, orçamento, ROAS, dias, CPA, conversão) que não esteja neste arquivo. Não estima, não arredonda "de cabeça", não cria benchmark que o Alan não deu.

3. **NÃO INVENTE PARÂMETRO/CONFIG.** Se um toggle, campo, valor ou passo **não está descrito aqui**, a Ada **NÃO usa e NÃO sugere**. Para e pergunta ao gestor.

4. **NÃO EXECUTE NADA FORA DA ESTRATÉGIA.** Qualquer ação que não esteja no workflow/escada/configuração deste arquivo é proibida. Não roda passo "que faria sentido" — roda só o que está escrito.

5. **NÃO EXTRAPOLE.** Cenário não coberto pela aula (ex: "BidCap em ABO", "BidCap com Advantage+", "bid em campanha de mensagem sem o ajuste descrito") → **PARA, avisa que não está na estrutura, aguarda decisão.**

6. **NÃO COMBINE** com outras estratégias/estruturas por conta própria.

7. **NÃO "MELHORE" o método.** 1 variável fora invalida tudo. A "melhoria" é decisão exclusiva do gestor.

8. **NÃO COMPLETE com fonte externa.** Se o gestor perguntar algo que a aula não respondeu, a Ada diz: *"Isso não está descrito na estrutura do BidCap do Alan. Quer que eu responda com conhecimento geral (fora da skill) ou prefere manter só o que a aula ensina?"* — e **só sai da skill se o gestor autorizar.**

9. **Onde houver faixa de valor** (bid +30% a +50%, orçamento ticket × 1-3, mexer bid 5-10%), Ada **apresenta a faixa + o critério** ao gestor — nunca crava um número sozinha sem o contexto da aula.

10. **Na dúvida, ASSUME QUE NÃO SABE.** É melhor a Ada dizer "não está na estrutura" do que inventar uma resposta plausível. Resposta inventada sobre dinheiro real do cliente é o pior erro possível.

### Variáveis travadas

| Variável | Valor |
|---|---|
| Tipo de budget | **CBO** (não ABO) |
| Estratégia de lance | **Limite de Lance** (BidCap) |
| Bid inicial | **Break-even + 30% a 50%** |
| Conta dedicada | **Sim** — não mistura com CBO alto volume |
| Programação | **00:00 dia seguinte** |
| Janela de atribuição | **Padrão Meta** |
| Toggle "vários anunciantes" | **Desativado** |
| Advantage de localização | **Desativado** |
| Formato do criativo | **Vídeo** (imagem só em casos específicos — Alan não domina) |
| Mexida no bid | **5-10% por vez** (raro 15-20%) |

### Ações proibidas durante operação

- ❌ Pausar conjunto/criativo **antes de analisar a nível de campanha**
- ❌ Mexer no bid na **fase de validação** (primeiros 5-10 dias)
- ❌ Mudar criativo + bid + orçamento ao mesmo tempo
- ❌ Assumir "problema de criativo" com menos de 100-150 criativos
- ❌ Subir BidCap sem tracking do **FRONTE** chegando no gerenciador
- ❌ **Testar precificação/funil/ticket na campanha de bid** (destrói — é o controle)
- ❌ Misturar BidCap com CBO alto volume na mesma conta
- ❌ Usar "buscar prejuízo" fora de apps/recorrência (ver §8)
- ❌ Ficar testando contas em loop (escolhe 2 contas boas e fixa)

### Protocolo quando algo foge da regra

1. **PARA.** Não improvisa.
2. **Reporta** ao gestor com problema + o que a regra prevê.
3. **Aguarda decisão.**
4. Se variar, **registra como caso** em `.claude/trafego/meta-ads-brain/casos/`.

### Citação obrigatória da fonte

Ada cita: **"Pelo BidCap do Alan..."**

---

## 1. O conceito central

**BidCap = Limite de Lance** (configuração no nível CONJUNTO).

Sintaxe:
> "Facebook, aqui tem R$X por dia e aqui tem um limite de lance de R$Y. Me entregue conversões com esse limite de lance no leilão."

**Diferença vs alto volume:**
- Alto volume: Facebook gasta TUDO atacando todo leilão
- BidCap: Facebook **só gasta dentro do bid** — leilão mais caro = não entrega

**Proposta de valor:**
> "Testar de graça." Se criativo é ruim OU bid baixo, **não gasta** → você não perdeu dinheiro. E ainda: "BidCap te diz o LIMITE da oferta."

**Argumento de mercado:**
> "Em 90% dos gerenciadores que escalam $700k+/7 dias, usam manual bidding (cost cap, bid cap, ROAS goal). Ninguém usa escala baiana. 2026-2027 vai ser dominado por manual bidding."

**O gestor que agiliza decisão:**
> O grande valor do bid é **mostrar o limite da oferta em 1-2 dias**. Um gestor inexperiente em outra estrutura demoraria 2-3 semanas pra descobrir que não dá pra escalar — e queimaria o lucro tentando.

---

## 2. Workflow — UMA campanha só

```
[Campanha CBO + BidCap]
  ├─ Conjunto 1 (Pack inicial) → começou gastando → vencedor inicial
  ├─ Conjunto 2 (Pack novo) → não gastou → lixo (deixa parado)
  ├─ Conjunto 3 (variação) → gastou → bateu controle
  └─ ... loop infinito (caso AppIon: 59 conjuntos sem pausar nada)
```

**Regras:**
- 1 conjunto = 1 pack de criativos novo (mesmo body, variações de hook/avatar)
- **Sobe sempre em conjunto NOVO, não duplica** — por quê? Pra conseguir **mudar o bid por conjunto** e fazer os criativos lutarem entre si
- Nunca mistura packs diferentes no mesmo conjunto
- Nunca pausa nada na fase de validação

**Até 10k/dia = 1 campanha basta.** Não precisa mais que uma campanha pra performar bem (BR: até ~R$10k/dia depende do nicho).

---

## 3. Cálculo do Bid — Regra contextual

**Base: Bid = Break-even + 30% a 50%**

| Contexto | Multiplicador | Exemplo |
|---|---|---|
| Padrão / conservador | Break-even **+ 30%** | US$160 → US$208 (~210) |
| "Dar uma agressivada" / oferta nova | Break-even **+ 50%** | US$19 → US$28,5 → **arredonda US$30** |

> "Gosto de deixar tudo arredondado, tem um pouquinho de toque. Nunca colocaria 28,5, deixo 30."

**Evolução do bid:**

| Fase | Bid |
|---|---|
| Teste / oferta nova | Break-even + 30~50% |
| Escala validada | Vai **diminuindo** progressivamente |
| Criativo vencedor maduro | **Bid abaixo do break-even** (até abaixo do CPA) |

> Caso da mentoria (dois alunos, info BR): AOV R$200, CPA R$160, melhor conjunto bid **R$145** (abaixo do break-even). "Margem altíssima pra escalar."

**Mexer no bid: 5-10% por vez no máximo.** Raro 15-20% (só pra agressivar muito ou extrapolar). **Ticket baixo (<$20): centavos mudam a escala** — então 5-10% mesmo.

**Subir criativo novo: bid 5% ACIMA dos que já gastam** — pra dar margem do novo competir com os top spenders na mesma campanha.

---

## 4. Critério "Tem potencial?" — Gasto vs orçamento

| Gasto % do orçamento diário | Diagnóstico |
|---|---|
| < 10% | **Sem potencial** — criativos ou oferta ruins |
| 10-20% | **Potencial mínimo** — sinal verde pra investigar |
| 50-90% | **Potencial alto** — escala via mais orçamento |
| 100% **antes do dia acabar** | **MARGEM ALTÍSSIMA** — escala agressivo |

> Exemplo concreto: orçamento US$1.000 → tem que gastar **≥US$200 (20%)** pra ser potencial. Se gastar US$10, não é potencial — melhora criativo/oferta.

---

## 5. Critério "100-150 criativos" — Quando culpar o criativo

| Nº de criativos na campanha | Se não gasta → diagnóstico |
|---|---|
| < 100 | Problema = **quantidade** (sobe mais) |
| 100-150 | Limiar — qualidade OU quantidade |
| > 150 | Problema = **qualidade dos criativos** OU **oferta** |

> "Só considero que NÃO é problema de criativo se tiver pelo menos 100-150 criativos."

**Volume de produção (referência 2026):**
- **15 criativos é só pro dia 1. Dia 2 já tem que ter 30.**
- Criativo é a maior alavanca há ~2 anos
- Acertar 1 criativo bom = **+0.2 de ROAS** = margem pra colocar +5k de orçamento

---

## 6. Ordem de diagnóstico quando "gasta mas ROAS < 1"

Diagnóstico **a nível de campanha**, NUNCA conjunto/criativo na fase inicial.

1. **Quantidade de criativos** — tem 100-150? Se não, sobe mais.
2. **AOV** — tá baixo demais pro CPA?
3. **Conversão do checkout** — funil vazando?
4. **Conversão de upsell** — backend monetiza?
5. **SÓ DEPOIS** olha conjuntos/criativos.

**Resumo dos 2 cenários:**
- **Não gasta** (com 100-150 criativos) → problema de **OFERTA**
- **Gasta mas não vende** → problema de **CRIATIVO + funil** (mas existe potencial)

**Caso AppIon (prova viva):**
- Dia 4: US$900, ROAS 0.5. NÃO pausou nada.
- Diagnóstico campanha: AOV + checkout + upsell péssimos. Mandou time arrumar funil + subir criativos.
- Dia 8: ROAS 1.9. Dia 14: US$14k/dia validado.
- Conversão checkout foi de **9% → 23-24%** via teste de precificação/copy/HTML.

---

## 7. Configuração detalhada

### Nível Campanha

| Campo | Valor |
|---|---|
| Objetivo | **Vendas** |
| Tipo budget | **CBO** |
| **Orçamento** | **a nível de CAMPANHA** |
| Orçamento teste | **Ticket × 1 a 3** |
| Orçamento escala | Alto com **limite de gasto na campanha** (US$5-10k/dia) |

> Limite de gasto na campanha (escala): "Subo 100k/dia mas escalo de verdade 5-10k. Coloco o limite na campanha. Isso evita resetar otimização por mexer no orçamento."

### Nível Conjunto (BidCap aqui)

| Campo | Valor |
|---|---|
| **Bid (Limite de Lance)** | **a nível de CONJUNTO** |
| Valor do bid | Ver §3 |
| Segmentação | **Só Sexo + Idade**, público original, sem Advantage |
| Posicionamento | **Automático** |
| Atribuição | **Padrão** |

### Nível Anúncio

| Campo | Valor |
|---|---|
| Formato | **Vídeo** (img só em caso específico) |
| Criativos por conjunto | **Sem regra** — média 5; se produz muito (200/dia), 10-15/conjunto. Performance igual |
| Composição | Mesmo body, variações de hook/avatar |

---

## 8. Otimização — A ESCADA das 4 alavancas

Quando a escala **trava** (atinge o limite / ROAS ~1.0), Alan ataca **nesta ordem**:

### 1ª — Otimizar o BID
- Diminui o bid: perde escala mas salva ROAS (atua em leilão mais barato)
- **Mexe 5-10% por vez** (raro 15-20%). Ticket baixo: centavos importam
- Pode mexer pra cima ou pra baixo conforme objetivo

### 2ª — Continuar empurrando CRIATIVO
- "Criativo infinito, infinito, infinito"
- Acertar 1 criativo melhor = **+0.2 ROAS** = margem pra +5k
- Criativo melhor vem lá de baixo e ganha do top spender

### 3ª — Diminuir um pouco o ORÇAMENTO
- Se o teto é 15k, trabalha em 13k pra extrair o máximo de otimização
- Conter gastos enquanto otimiza

### 4ª — Pausar CONJUNTOS (POR ÚLTIMO)
- Impacto pequeno (~0.05 ROAS) — por isso é a última alavanca
- Pausa o conjunto que está mal nos **últimos 3 dias** (não no dia atual)
- Conjunto ROAS médio 0.79 nos últimos 3d → dá chance baixando bid → não sobrevive → pausa
- **ROAS acima de 1: NÃO pausa.** Deixa rodando.

### ⚠️ "BUSCAR PREJUÍZO" — APENAS apps/recorrência
**ESCOPO RESTRITO:** só em apps/recorrência (AppIon), onde LTV recorrente justifica descobrir o teto. **NÃO em info/Nutra one-shot.**
- Sobe bid + orçamento de uma vez (ex: AppIon bid 28→35, orçamento 2.5k→7.5k)
- Quando entra ROAS 1.0 = achou o limite. Trabalha abaixo dele.

---

## 9. Filosofia de escala: SAUDÁVEL > LIMITE

> "Prefiro escalar 10k/dia com ROAS 1.3 por 60 dias do que buscar 30k com ROAS 0.9 ficando igual maluco."

- Prioriza **lucro constante** sobre escala máxima
- Quando aperta: "imprime o máximo que dá enquanto trabalha em melhorias e outros funis"
- "Sobrevivi no Nutra porque perdi pouca grana, economizei em teste, e escalei só o que precisava"
- **Maior desafio da escala:** manter o mesmo CPA enquanto aumenta volume. "Colocar grana todo mundo faz."

---

## 10. Como ESCALAR: libera ORÇAMENTO, não bid

> "Libero orçamento pela campanha, não pelo bid. Se coloco 2k e gasta 1k, já sei que tem problema no bid ou criativos. Se libero orçamento e continua gastando 100%, ainda tenho bid OK pra otimizar depois."

**Princípio "Bid escala sozinho":**
> "Quando existe conversão pra ser feita, o bid escala sozinho. Se não tá escalando no bid, é porque NÃO TEM escala."

**Fase de validação (primeiros 5-10 dias): NÃO mexe no bid.**
- Mudar criativo+bid+orçamento junto = não sabe o que funcionou
- Bid é sensível — mudança de VSL/funil reflete na hora
- Máximo: baixa ~2 pontos só pra dar fôlego ao time arrumar funil

---

## 11. Pré-requisito crítico: Tracking do FRONTE

> "Bid funciona a partir da conversão do FRONTE no gerenciador. Bid é muito sensível — muda VSL e reduz conversão, o bid já vê e reduz gastos."

- Pixel + CAPI do **fronte**: 100% funcional (vinculante)
- Upsell: pode falhar sem matar BidCap
- **Sem fronte trackeado → BidCap não funciona**

### Stack de tracking
| Escala | Ferramenta |
|---|---|
| Alta ($700k+/7d) | RedTrack (Alan usa — **não é nossa stack hoje**) |
| Média | UTMfy |
| Afiliação | Pixel na plataforma (BuyGoods/ClickBank/CartPanda) — 90% bate |

> **Nota da casa:** não rodamos RedTrack. Definir stack do fronte (Pixel+CAPI mínimo) antes de subir BidCap pra valer.

---

## 12. Parada ABRUPTA de gasto = problema estrutural

> Fadiga normal cai **gradual**. Parar de gastar **do dia pra noite** = algo drástico aconteceu.

Causas de parada abrupta:
- **Tracking quebrou** (RedTrack não pagou, parou de mandar métrica → arrebenta a campanha)
- **Cloudflare caiu** (zoou a métrica)
- **Foi clonado** (mexeu no leilão)
- **Checkout caiu**

**Solução:**
1. Resetar o **post ID** (duplicar criativo SEM puxar comentários)
2. Injetar bastante criativo
3. Às vezes subir a campanha do zero (bid é sensível demais)

---

## 13. Bid é SENSÍVEL a mudança de oferta/preço

> "Mudar precificação da oferta (pra cima OU pra baixo) DESTRÓI o bid. Mudou o ticket = recomeça."

**Implicação:** teste de funil/precificação/ticket **NÃO se faz na campanha de bid**.

### Como testar funil/precificação sem zoar o bid
1. Mantém a campanha de bid intocada (é o seu **controle**, extrai o máximo dela)
2. Abre **CBO alto volume isolado** (outra campanha), orçamento baixo, com os criativos validados
3. Deixa 2-3 dias. **Assume que CBO é day-3** (montanha russa: 1.5, 1.0, 0.8)
4. Colhe o dado. Depois pode validar numa campanha de bid isolada

---

## 14. E-commerce / multi-ticket

> "Produto base rodava redondo, coloquei o de ticket maior, o menor parou de funcionar."

**Regra:** separar campanhas **por ticket** é MUST. Se ainda ruim → **isola por conta**.

---

## 15. Conta boa vs testar contas (DIVERGE da baiana)

> "Identifique contas suas que são boas e só joga o vídeo ali. Se ficar testando conta, conta, vai ficar num loop infinito. Se o vídeo não performa numa conta boa, é criativo ou oferta — não a conta."

- Alan tem 10 perfis × 2-3 BM × 5-10 contas cada → **escolhe só 2 contas fortes e fixa**
- **Contraste com baiana:** baiana depende de testar muitas contas; BidCap não — fixa 2 boas

---

## 16. Criativo que não gasta / criativo que rejeita

### Criativo que NÃO gasta na campanha principal
- Pausa após **5-10 dias** (deixa até lembrar de otimizar — pode dar uma chance de vencer)
- OU **lateraliza** pra outra campanha/precificação ("já vi criativo que não gastou gastar em outro funil")

### Criativo VENCEDOR que rejeita
1. As **variações dele já sobem junto** → uma variação toma o lugar (performa minimamente bem)
2. Sobe criativo novo igual + **5 segundos de frase a mais** pra ser "novo" aos olhos do FB
3. Quando rejeita: **pausa, sobe um white** pra desbloquear a conta

---

## 17. Aplicabilidade por nicho

| Nicho | BidCap funciona? | Observação |
|---|---|---|
| **Nutra US (caro)** | ✅ Forte | Economiza muito em teste |
| **White / apps (AppIon)** | ✅ Forte | Respeita leilão sem força-bruta |
| **Info US barato** | ⚠️ Fraco pra teste | CPA baixo, melhor CBO alto volume |
| **Info BR** | ✅ Funciona | Caso da mentoria (info BR) validou |
| **WhatsApp** | ✅ Funciona | Coloca custo por conversa próximo do bid |
| **iGame / bet** | ❌ Fraco | Commodity (todos inflados), muita imagem, bid compete contra você mesmo. Melhor CBO volume |
| **Imagem (geral)** | ⚠️ Limitado | Alan nunca validou imagem bem. Pode misturar img+vídeo; depois lateraliza campanha só de imagem |

---

## 18. Quando NÃO usar BidCap

| Cenário | Estrutura |
|---|---|
| Info barato + teste rápido | CBO 1:1:1 alto volume |
| "Isola e vê agora" | CBO alto volume |
| Teste de funil/precificação | CBO alto volume isolado (§13) |
| **Nutra/white/escala** | **BidCap** |
| iGame/bet | CBO volume |
| Escala em paralelo (segurança) | BidCap (1 conta) + CBO normal (outra conta) |

**Regra inegociável:** conta dedicada pra BidCap. "O CBO alto volume puxa atenção e o BidCap não gasta."

---

## 19. Orçamento inflacionado — só alta escala

> "Orçamento inflado é só pra alta escala mesmo ($50-60k/dia) e quando tudo certinho. Pra quem pega feeling, evita — gera mais confusão que benefício."

Caso real: aluno subiu 1:4:10 com $20k de orçamento inflado, bid 320, 40 criativos → gastou pouco, 1 venda em 3 dias, prejuízo. Outro 1:2:6 com orçamento menor, mesmo criativo, bid 350 → deu ROI. **Diferença foi o orçamento inflado fora de hora**, não os criativos.

---

## 20. Fluxo de decisão por conjunto

```
SUBIU CONJUNTO COM PACK NOVO
    │
    ↓
GASTOU >10-20% do orçamento?
    ├── NÃO → lixo (deixa parado; pausa após 5-10d OU lateraliza)
    └── SIM → POTENCIAL → análise A NÍVEL DE CAMPANHA
              │
              ↓ ROAS >= 1?
              ├── NÃO → diagnóstico (quant criativos → AOV → checkout → upsell)
              │         NÃO pausa nada. Time arruma funil + sobe criativos.
              └── SIM + cadência → ESCALA via mais orçamento (não bid)
                        │
                        ↓ travou em ROAS 1.0?
                        └── SIM → ESCADA: bid → criativo → orçamento → pausar conjunto
```

---

## 21. Regras duras

1. **Bid = break-even + 30% (padrão) a 50% (agressivo)**
2. **CBO sempre** — nunca ABO
3. **Uma campanha só** (até 10k/dia basta)
4. **Conjuntos NUNCA misturam packs diferentes**
5. **Conta dedicada pra BidCap** — escolhe 2 contas boas e fixa
6. **Sobe conjunto novo, não duplica** (pra mudar bid por conjunto)
7. **Tracking do fronte 100%** antes de subir
8. **NÃO mexe no bid na validação** (5-10 dias)
9. **NÃO muda 3 coisas ao mesmo tempo**
10. **Análise SEMPRE a nível de campanha primeiro**
11. **NÃO pausa conjunto enquanto gargalo for funil**
12. **Mínimo 100-150 criativos** antes de culpar criativo
13. **Escala via orçamento, não bid** (na validação)
14. **Mexe no bid 5-10% por vez** (raro 15-20%)
15. **NÃO testa funil/precificação na campanha de bid** (usa CBO isolado)
16. **"Buscar prejuízo" só em apps/recorrência**
17. **Orçamento inflado só em alta escala** ($50k+/dia)
18. **Pausar conjunto é a ÚLTIMA alavanca** de otimização
19. **Criativo vencedor que rejeita:** variação toma o lugar + sobe white

---

## 22. Prós e contras

### ✅ Prós
- Testa de graça | Previsibilidade alta | Forte em Nutra/white/escala
- Bid te diz o limite da oferta | Equipe enxuta (1-2 gestores em 7D)
- Não trava o gerenciador (baiana sim) | Agiliza decisão (limite em 1-2 dias)

### ❌ Contras
| Contra | Mitigação |
|---|---|
| Lento pra escalar | BidCap + CBO em paralelo |
| Fraco em Info barato US / iGame | CBO alto volume |
| Não-gastar gera ansiedade | Confia no sistema |
| Sensível a mudança de oferta/preço | Testa funil em CBO isolado |
| Exige tracking do fronte impecável | CAPI no mínimo |

---

## 23. Cadência operacional

| Frequência | Ação |
|---|---|
| **Diário** | Sobe novos packs — nunca ficar sem criativo (distribui a esteira) |
| **Após 48h** | Avalia conjuntos a nível de campanha |
| **Validou ROAS ≥ 1** | Libera mais orçamento (não bid) |
| **Travou em ROAS 1.0** | Escada: bid → criativo → orçamento → pausar conjunto |
| **3 dias prejuízo** | Reduz orçamento, investiga gargalo |
| **Parada abrupta** | Reseta post ID + injeta criativo (provável tracking/clone) |
| **Criativo rejeitou** | Variação toma o lugar; sobe white pra desbloquear |

**Mexer no bid:** 1x por dia, deixa 24h, compara com dias anteriores (jeito safe). Intraday de bid existe mas é avançado — Alan não recomenda pra quem não domina.

---

## 24. Como Ada aplica esta skill

**Ativação:** o gestor diz "rodar bidcap", "subir em bid", "limite de lance".

**Antes de qualquer ação, Ada relê a seção 🔒 TRAVAS DE SEGURANÇA.**

**Checklist pré-subida:**
1. **Tracking do fronte:** 100%? (Pixel+CAPI mínimo) Se não → PARA.
2. **Conta:** 2 contas boas dedicadas, isoladas de CBO?
3. **Bid:** contexto pede +30% ou +50%? Apresenta a escolha.
4. **Orçamento:** ticket × 1-3 (não inflado, salvo alta escala).
5. **Criativos:** 100-150 disponíveis? (15 dia 1, 30 dia 2)
6. **Mercado:** Nutra/white/escala = sim. Info barato/iGame = considerar CBO.

**Diagnóstico (quando o gestor trouxer campanha rodando):**
1. Quanto gastou do orçamento? (10-20% = potencial)
2. ROAS da campanha (≥1?)
3. Se ROAS<1: quant criativos → AOV → checkout → upsell
4. Se travou: aplica a ESCADA (bid → criativo → orçamento → pausar)

**Postura:**
- Ada NÃO sugere BidCap espontaneamente — só quando o gestor pede
- Ada NÃO varia parâmetros fora das faixas
- Ada NÃO improvisa se dá ruim — para, reporta, aguarda
- Ada cita a fonte: "Pelo BidCap do Alan..."
- "Buscar prejuízo" só se for apps/recorrência

---

## 25. TL;DR

> **BidCap = Limite de Lance no conjunto.** Bid = break-even +30% (padrão) a +50% (agressivo). Mexe 5-10% por vez.
>
> **1 campanha CBO** (até 10k/dia basta), conjuntos por pack. Conta dedicada (2 boas fixas). Orçamento na campanha, bid no conjunto.
>
> **Análise a nível de campanha PRIMEIRO.** Não pausa conjunto enquanto gargalo for funil.
>
> **Diagnóstico:** não gasta (c/ 100-150 criativos) = OFERTA. Gasta sem vender = CRIATIVO+funil.
>
> **Validação (5-10d):** NÃO mexe no bid. Sobe criativos (15 dia 1, 30 dia 2) + funil. Escala via orçamento.
>
> **Travou (ROAS 1.0): ESCADA →** bid → criativo → orçamento → pausar conjunto (último, ~0.05 ROAS).
>
> **Testa funil/preço em CBO isolado**, nunca na campanha de bid (destrói).
>
> **Parada abrupta** = tracking/clone. Reseta post ID + injeta criativo.
>
> **Filosofia:** escala saudável (10k ROAS 1.3 por 60d) > limite (30k ROAS 0.9).
>
> **Pré-requisito vinculante:** tracking do FRONTE 100%.
>
> **Forte:** Nutra, white/apps, escala. **Fraco:** Info barato US, iGame, imagem.
