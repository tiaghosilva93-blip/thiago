# Framework — Escala Baiana

> **Aplicação:** Use quando o gestor pedir explicitamente "rodar escala baiana", "estrutura baiana", "subir baiana". **Não importa o cliente** — importa o conhecimento estrutural.
> **Fonte:** Aula do **Guilherme** (ex-cadete Força Aérea/Exército, 8 anos, R$10MM+ faturado) na turma do Pedrão, **20/01/2026**.
> **Resultado declarado:** R$1.282.000 em 20 dias de janeiro 2026, ROAS 1.70, mercado americano, infoproduto.
> **Origem:** Baseado no método do "Sanchão" (2020-2021), com diferenças críticas.

---

## 🔒 TRAVAS DE SEGURANÇA (LEIA ANTES DE QUALQUER AÇÃO)

**Esta skill é PRESCRITIVA, NÃO criativa.** A Ada executa **única e fielmente** a mecânica descrita na aula do Guilherme. Não há espaço pra improviso, "tentativa", variação, "achismo" ou "otimização própria".

### ⛔ REGRAS ANTI-ALUCINAÇÃO (INEGOCIÁVEIS)

> Esta estrutura vem **100% da aula do Guilherme (20/01/2026)**. Tudo que a Ada disser sobre escala baiana tem que estar **escrito neste arquivo**. Se não está aqui, **não existe pra efeito desta skill.**

1. **NÃO ALUCINE.** Só afirma o que está **literalmente descrito** neste arquivo. Não preenche lacuna com "conhecimento geral de Meta Ads", não deduz, não supõe.

2. **NÃO INVENTE DADOS.** Nenhum número (orçamento, nº de conjuntos, %, ROAS, dias, CPA) que não esteja neste arquivo. Não estima, não arredonda "de cabeça", não cria benchmark que o Guilherme não deu.

3. **NÃO INVENTE PARÂMETRO/CONFIG.** Se um toggle, campo, valor ou passo **não está descrito aqui**, a Ada **NÃO usa e NÃO sugere**. Para e pergunta ao gestor.

4. **NÃO EXECUTE NADA FORA DA ESTRATÉGIA.** Qualquer ação que não esteja no workflow das 3 etapas / configuração deste arquivo é proibida. Não roda passo "que faria sentido" — roda só o que está escrito.

5. **NÃO EXTRAPOLE.** Cenário não coberto pela aula (ex: "roda baiana em CBO", "baiana com 100 conjuntos", "baiana com 3 criativos diferentes") → **PARA e avisa**: *"Isso não está descrito na escala baiana original. Quer que eu rode como variação experimental, ou prefere seguir a estrutura canônica?"* — e **aguarda decisão.**

6. **NÃO COMBINE** com outras estratégias/estruturas por conta própria (PMax, Advantage+, BidCap, etc). É decisão do gestor.

7. **NÃO "MELHORE" o método.** A escala baiana funciona pelo conjunto exato de regras. Mudar 1 variável sem confirmação invalida o framework.

8. **NÃO COMPLETE com fonte externa.** Se o gestor perguntar algo que a aula não respondeu, a Ada diz: *"Isso não está descrito na estrutura da escala baiana do Guilherme. Quer que eu responda com conhecimento geral (fora da skill) ou prefere manter só o que a aula ensina?"* — e **só sai da skill se o gestor autorizar.**

9. **NÃO SAIA DA FONTE sem avisar.** Toda recomendação cita: *"Pela escala baiana do Guilherme..."*. Se a Ada estiver misturando com outra coisa, ela explicita o que é doutrina e o que é opinião.

10. **Na dúvida, ASSUME QUE NÃO SABE.** É melhor a Ada dizer "não está na estrutura" do que inventar uma resposta plausível. Resposta inventada sobre dinheiro real do cliente é o pior erro possível.

### Variáveis travadas (NÃO mexer sem o gestor autorizar explicitamente)

| Variável | Valor travado | O que NÃO fazer |
|---|---|---|
| Orçamento por conjunto BR | **R$7** | Não testar R$10, R$5, R$15 |
| Orçamento por conjunto US | **US$1.28** | Não testar US$1, US$2, US$3 (já foi testado pelo Guilherme — pior) |
| Nº de conjuntos pré-escala | **50** | Não tentar 30, 75, 100 |
| Nº de conjuntos escala | **200** | Não tentar 150, 250, 300 |
| Anúncio por conjunto | **1 (mesmo em todos)** | Não rotacionar, não criar variações |
| Tipo de budget | **ABO** | Não trocar pra CBO no 1:50:1 ou 1:200:1 |
| Toggle "compartilhar orçamento" | **ATIVADO** | Não desligar |
| Toggle "vários anunciantes" | **DESATIVADO** | Não ativar |
| Advantage de localização | **DESATIVADO** | Não ativar |
| Programação | **00:00 dia seguinte** | Não subir no meio do dia |
| Janela de atribuição | **Padrão Meta** | Não setar 1d/7d |

### Ações proibidas durante a operação

A escala baiana é **passiva** após subir. Durante a operação, Ada **NÃO**:

- ❌ Aumenta budget de conjunto que vendeu
- ❌ Desativa conjunto que não vendeu
- ❌ Duplica conjunto vencedor dentro da mesma campanha
- ❌ Pausa intraday por "intuição"
- ❌ Sugere edição de criativo no meio da escala
- ❌ Move criativo entre campanhas ativas
- ❌ Troca de página com campanha rodando
- ❌ "Testa" variação sem critério explícito do gestor

### Protocolo quando algo foge da regra

Se em qualquer ponto a realidade contradiz a regra (ex: criativo não aprovou, conta não gasta, página atingiu limite, Meta mudou um campo na UI):

1. **PARA.** Não improvisa.
2. **Reporta ao gestor** com o problema exato + o que a regra prevê.
3. **Aguarda decisão** do gestor sobre como proceder.
4. Se o gestor decidir variar, **registra a variação como caso** em `.claude/trafego/meta-ads-brain/casos/` pra catalogar.

### Citação da fonte

Toda recomendação que Ada fizer usando esta skill **cita explicitamente**: *"Pela escala baiana do Guilherme (jan/2026): ..."* — pra deixar claro que é doutrina externa, não opinião própria.

---

## Convenção de notação

Toda referência usa o formato **`1:N:1`** = `1 campanha : N conjuntos : 1 anúncio`.

| Notação | Significa |
|---|---|
| **1:1:1** | 1 campanha, 1 conjunto, 1 anúncio (teste mínimo) |
| **1:50:1** | 1 campanha, 50 conjuntos, **o mesmo único anúncio** replicado em todos |
| **1:200:1** | 1 campanha, 200 conjuntos, **o mesmo único anúncio** replicado em todos |

> **Importante:** no 1:50:1 e no 1:200:1, **é o MESMO criativo nos N conjuntos**. Não é 50/200 criativos diferentes — é 50/200 fatias de público recebendo o mesmo ad.

---

## 1. O conceito central

**Escala Baiana = duplicação massiva de conjuntos com orçamento muito baixo em estrutura ABO, sem mexer depois.**

A grande diferença pro método antigo (Sanchão) é o que você **NÃO faz**:

- ❌ NÃO desativa conjuntos que não vendem
- ❌ NÃO duplica conjuntos vencedores dentro da mesma campanha
- ❌ NÃO aumenta orçamento de conjunto durante o dia
- ❌ NÃO mexe em nada após subir

O motor é a **massa de conjuntos com microbudget + lateralização** (mais campanhas em mais contas).

---

## 2. Workflow em 3 etapas

```
Etapa 1: Teste de Criativo (CBO 1:1:1 ou ABO 1:1:1)
   ↓ 48h, métrica = LUCRO
Etapa 2: Pré-Escala (ABO 1:50:1)
   ↓ 1 dia, métrica = LUCRO LÍQUIDO
Etapa 3: Escala (ABO 1:200:1)
   → Lateralizar em outras contas e duplicar campanhas
```

### Etapa 1 — Teste de Criativo

**Objetivo:** validar (a) que o criativo **aprova** e (b) que dá **lucro mínimo**.

**Estrutura:**
- **CBO 1:1:1** com R$100 de orçamento (info, ticket menor)
- OU **ABO 1:1:1** (equivalente)

**Janela de análise:** 48 horas. Se deu lucro → vai pra pré-escala.

> ⚠️ **CRÍTICO:** essa etapa serve TAMBÉM pra testar se o criativo aprova. Se você pula essa etapa e sobe **1:200:1** direto, e o criativo for rejeitado em massa, **sua conta é restrita na hora**.

**Adaptação do Pedrão pra Nutra (ticket alto):**
- **PULA** o CBO de teste (gasto cobre rápido o teste falho no ticket alto)
- Sobe ABO 1:1:1 só pra ver se aprova
- Aprovou → duplica direto pra **ABO 1:50:1**

### Etapa 2 — Pré-Escala (ABO 1:50:1)

**Objetivo:** testar se o criativo aguenta duplicação e validar ROI escalável.

**Estrutura:**
- 1 campanha ABO
- 50 conjuntos de anúncio
- **Mesmo único criativo** em todos os 50 conjuntos
- Orçamento por conjunto: ver tabela BR vs US abaixo

**Critério pra subir pra escala 1:200:1:**

| Cenário | Critério |
|---|---|
| **Info** (Guilherme) | Lucro líquido bom no dia (ex: R$1.600 com 50 conjuntos) |
| **Nutra** (Pedrão) | 1 venda no dia 1 → repete por mais 1 dia → 2ª venda → sobe |

**Critério pra matar:**
- CPA estourado vs outras pré-escalas
- Lucro próximo de zero / empatado
- → mata e joga o criativo num "CBO cemitério" junto com outros validados

### Etapa 3 — Escala (ABO 1:200:1)

**Estrutura:**
- 1 campanha ABO
- 200 conjuntos de anúncio
- **Mesmo único criativo** replicado em todos os 200 conjuntos
- **"Compartilhar parte do orçamento entre conjuntos" ATIVADO**

**Filosofia:**
> "É literalmente uma campanha que você não mexe. Deixa lá."

**Por que funciona:** dos 200 conjuntos, **só ~5 fazem venda no dia**. Mas:
- O conjunto vencedor varia dia a dia (algoritmo reseta a cada meia-noite)
- A inteligência do Facebook distribui orçamento dos 195 perdedores → 5 vencedores (por isso o toggle "compartilhar")
- Ganhar 1 venda de US$160 com US$3-5 gastos = **ROAS gigantesco** no conjunto

---

## 3. Orçamento por mercado — BR vs US

### 🇧🇷 Mercado BR (BM em real)

| Etapa | Estrutura | Orçamento total | Por conjunto |
|---|---|---|---|
| Teste de criativo | CBO 1:1:1 | **R$100/dia** | — (campanha) |
| Pré-escala | ABO 1:50:1 | **R$350/dia** | **R$7** |
| Escala | ABO 1:200:1 | **R$1.400/dia** | **R$7** |

### 🇺🇸 Mercado US (BM em dólar)

| Etapa | Estrutura | Orçamento total | Por conjunto |
|---|---|---|---|
| Teste de criativo | CBO 1:1:1 | ~US$20/dia | — (campanha) |
| Pré-escala | ABO 1:50:1 | **US$64/dia** | **US$1.28** |
| Escala | ABO 1:200:1 | **US$256/dia** | **US$1.28** |

> **Por que US$1.28?** Conversão aproximada de R$7 no momento que Guilherme começou. Ele testou US$2 e US$3 — não performou melhor, gastava demais de madrugada e zerava o caixa antes do horário-pico da oferta.
>
> **Anti-pattern testado e falho:** aumentar de R$7 → R$14 (BR) ou de US$1.28 → US$3 (US) por conjunto **não melhora** o ROAS. Se quiser mais volume, lateralize — não infle.

---

## 4. Configuração detalhada

### Nível Campanha

| Campo | Valor | Observação |
|---|---|---|
| Objetivo | **Vendas** | Sempre |
| Categorias especiais | NONE (default) | Salvo Nutra em alguns mercados |
| Tipo de budget | **ABO** | Não usa CBO na escala |
| **"Compartilhar parte do orçamento entre conjuntos"** | **ATIVADO** | Diferencial — deixa o algoritmo redistribuir |

### Nível Conjunto

| Campo | Valor | Observação |
|---|---|---|
| Local da conversão | **Site** | Sempre |
| Maximizar | Conversões (default) | |
| Pixel | Pixel da conta | |
| **Orçamento diário** | **R$7 (BR)** ou **US$1.28 (US)** | Por conjunto |
| Programação | **00:00 do dia seguinte** | Sempre meia-noite |
| **Advantage de localização** | **DESATIVADO** | Limita alcance ao geo real |
| Localização | Geo do mercado (e DESATIVA outros) | Ex: US ON, Brasil OFF |
| Idade/Gênero | Varia por oferta | |
| Idioma | Do mercado | |
| Janela de atribuição | **Padrão (não mexer)** | Guilherme NÃO usa 1d/7d |
| Posicionamento | **Automático** | Salvo Threads que dá problema — ele desliga |

### Nível Anúncio

| Campo | Valor | Observação |
|---|---|---|
| Página | **Página farmada 1-2 anos** (R$30-50) | Ver seção infraestrutura |
| Conta Instagram | Configura normalmente | |
| **"Vários anunciantes"** | **DESATIVADO** | Toggle obscuro — Guilherme sempre desliga |
| Posicionamentos | Automáticos | |
| Rastreamento | Conforme cloaker em uso | |

---

## 5. Lateralização (essencial)

Como você NÃO pode escalar vertical (aumentar budget do conjunto), a escala vem de **lateralização em 2 dimensões**:

### Dimensão A: Múltiplas campanhas na mesma conta de anúncio

Criativo F36 validou na CA01. Você pode rodar:
- Campanha A: ABO 1:200:1 com F36
- Campanha B: ABO 1:200:1 com F36 (cópia)
- Campanha C: ABO 1:200:1 com F36 (cópia)

> Guilherme: "Tem criativo aqui que tem 3 ABO 1:200:1 na mesma conta."

### Dimensão B: Múltiplas contas de anúncio com o mesmo criativo

F36 validou na CA01 → testar em:
- CA03 (CBO 1:1:1 → se vender, ABO 1:50:1 → se lucrar, ABO 1:200:1)
- CA07 (mesma esteira)
- CA09 (mesma esteira)

**Regra:** ao lateralizar, **NÃO altera o criativo**. Sobe igual, mesmo asset.

> "Aquele criativo em tese já tá validado, porque me gerou o lucro na conta 1."

### Por que lateralizar é crítico

> "Não existe verdade absoluta dentro do Facebook. Tem criativo que valida na CA01 mas vende muito mais na CA09. É quase místico."

Cada conta entrega de jeito diferente — público diferente, leilão diferente. O que **mata na CA01** pode **explodir na CA09**.

---

## 6. Infraestrutura

### Páginas (Facebook Pages)

**Regra do limite:**
- Default: **250 anúncios ATIVOS por página**
- Liberação até 1000: após gastar um valor X (Guilherme não lembrou o número exato)
- **1 página comporta:** 1 ABO 1:200:1 + 1 ABO 1:50:1 simultaneamente (= 250, no limite)
- Reseta quando você desliga campanha

**Estratégia:**
- Comprar **páginas farmadas** (1-2 anos): R$30-50 cada
- **NÃO criar páginas novas** — risco de não gastar / rejeição
- Trocar foto/banner/nome (ex: "Amy Watson" pra mercado US genérico)
- Não precisa postar conteúdo — é só rodar anúncio

**Bug do Facebook ao trocar página em duplicação:**
- Ao duplicar conjunto pra nova campanha e tentar mudar a página, dá conflito por causa das **reações acumuladas** no criativo
- **Workaround:**
  1. Duplica o conjunto → nova campanha
  2. **Remove as reações** (curtidas/comentários antigos)
  3. Aí muda a página

### Contas de Anúncio

**Conta nova não gasta — protocolo de aquecimento:**
1. Sobe campanha CBO em paralelo, orçamento baixo
2. Coloca **cobrança manual** (mínimo US$2)
3. À medida que gasta, Meta aumenta a meta de cobrança (US$10 → US$20 → ...)
4. Aquece com criativo **da oferta real** (não cachorrinho)
5. Pedrão (citando Dairo): cachorrinho atrapalha o público — usa criativo white da oferta

**BMs:**
- Compradas farmadas funcionam bem
- BR em dólar vs BR em real — Guilherme migrou pra dólar
- Sem milagre: **criativo bom > BM perfeita**

### Cobrança

- Forçar cobrança manual pra acelerar gasto inicial
- A partir de certo ponto, Meta sobe a meta de cobrança sozinho

---

## 7. Regras duras (não-negociáveis)

1. **NUNCA mexer em conjunto da escala** — não aumenta budget, não desativa, não duplica intraday
2. **SEMPRE ativar "compartilhar orçamento entre conjuntos"** no nível campanha
3. **SEMPRE programar meia-noite** do dia seguinte
4. **SEMPRE testar criativo antes do 1:200:1** (CBO 1:1:1 ou ABO 1:1:1) — pular pode banir conta
5. **SEMPRE comprar página farmada** — não cria página nova
6. **LATERALIZAR ao invés de escalar vertical** — duplicar campanhas em contas diferentes
7. **NUNCA mexer em campanha em Learning** (regra clássica Meta, vale aqui)
8. **NUNCA alterar criativo ao lateralizar** entre contas
9. **MESMO ÚNICO criativo** no 1:50:1 e 1:200:1 — não confundir com matriz de teste

---

## 8. Quando desativar uma campanha 1:200:1

Guilherme **aguenta 2-3 dias de prejuízo** antes de desativar uma escala. Lógica:
- Tem dias bons e dias ruins por natureza
- Se desativa em 1 dia ruim, perde a chance dos R$4-5k de lucro que pode vir amanhã
- Campanha tem inteligência acumulada — fechar perde tudo

**Critério de morte:**
- 3 dias consecutivos de prejuízo
- ROI dos últimos 7 dias caiu vs início
- → desliga, joga criativo num CBO cemitério com outros validados

---

## 9. Adaptação do Pedrão pra Nutra

A escala baiana original do Guilherme é pra **infoproduto US** (ticket US$37 front, US$160 CPA). Pra Nutra (ticket maior, CPA alvo US$160+), o Pedrão otimiza:

| Etapa | Guilherme (Info) | Pedrão (Nutra) |
|---|---|---|
| Teste criativo | **CBO 1:1:1** com R$100 | **PULA** — sobe ABO 1:1:1 só pra aprovar |
| Pós-aprovação | Pré-escala 1:50:1 | **Direto pra 1:50:1** com R$7/conjunto |
| Critério 1:50:1 → 1:200:1 | Lucro líquido bom | **1 venda → mais 1 dia → 2ª venda → 1:200:1** |
| Justificativa | Info caro pra testar com volume | Nutra tem ticket alto, 1 venda já cobre teste |

> Pedrão: "Você gasta R$350 por criativo, fez 1 venda, deixa rodar 2 dias, fez outra → joga pro 1:200:1 pra ver se tem tração de escala."

---

## 10. Prós e contras

### ✅ Prós
| Pró | Detalhe |
|---|---|
| **Constância** | Lucro mais previsível que CBO (R$2-3k/dia por campanha) |
| **Revive criativo** | Criativo que parou no CBO volta a vender na escala baiana |
| **Vira o dia ganhando leilão** | 3-4k anúncios ativos = barreira pra concorrente clonar/spy |
| **Economia de teste** | Microbudget por conjunto = menos prejuízo num teste falho |
| **Você não mexe** | Campanha "preguiçosa", reduz erro humano |

### ❌ Contras
| Contra | Mitigação |
|---|---|
| **Rejeição massiva = conta restrita** | Sempre testar criativo antes (CBO/ABO 1:1:1) |
| **Não escala vertical** | Lateraliza (mais campanhas + mais contas) |
| **Demora pra gastar em conta nova** | Aquecimento com cobrança manual + criativo da oferta |
| **Limite de 250 ads/página** | Compra páginas farmadas em volume |

---

## 11. Variações observadas (estruturas paralelas do Guilherme)

Além das 3 etapas canônicas, Guilherme roda em paralelo:

### CBO 1:2:10
- 1 campanha CBO
- 2 conjuntos
- 10 criativos em cada conjunto
- Usado pra "cemitério" de criativos já validados (combinação de top performers)

### CBO 1:6:10
- 6 conjuntos, 10 criativos cada
- Mesma lógica — vários criativos validados rodando juntos

### Por que mantém CBO em paralelo
Mesmo com CBO "perdendo força" em jan 2026, ele mantém:
- 1-2 CBOs de cemitério de criativos vencedores
- Escala baiana como motor principal

---

## 12. Cadência operacional (rotina)

| Momento | Ação |
|---|---|
| **Diário** | Sobe novos testes de criativo (~10/dia) |
| **Após 48h** | Avalia teste, decide se vai pra ABO 1:50:1 |
| **Após 24h no 1:50:1** | Avalia, decide se vai pra ABO 1:200:1 |
| **Validado 1:200:1** | Lateraliza em outras contas (mesmo criativo, mesma esteira) |
| **Lucro consistente** | Cria 2ª, 3ª, 4ª campanha 1:200:1 do mesmo criativo |
| **3 dias prejuízo** | Desliga campanha, joga criativo no CBO cemitério |

Variações de criativo que Guilherme prioriza (em 2026):
- Variação de **avatar** (mais efetiva que hook hoje)
- Variação de **formato** (9:16, 1:1)
- ⚠️ Variação de **hook** está **menos efetiva** em 2026 vs 2024 (segundo Guilherme e Pedrão)

---

## 13. TL;DR

> Escala Baiana = ABO 1:200:1 a R$7 (BR) ou US$1.28 (US) por conjunto, microbudget extremo, **você não mexe**.
>
> 3 etapas: **CBO 1:1:1 (teste)** → **ABO 1:50:1 (pré-escala)** → **ABO 1:200:1 (escala)**.
>
> Validação a cada etapa = **LUCRO**. Cresce por **lateralização** (mais campanhas + mais contas), nunca aumentando budget.
>
> Trade-off: previsibilidade alta, mas dependência alta de páginas farmadas + contas múltiplas + criativo pré-validado (rejeição em massa = conta morta).

---

## 14. Como Ada aplica esta skill

**Ativação:** o gestor diz "rodar escala baiana", "subir baiana", "estrutura baiana".

**Antes de qualquer ação, Ada relê a seção 🔒 TRAVAS DE SEGURANÇA.** É o protocolo base — sem exceção.

**Checklist pré-subida:**
1. **Mercado:** BR (R$7) ou US (US$1.28)?
2. **Criativo:** já passou pelo teste CBO/ABO 1:1:1 (etapa 1)?
3. **Página:** tem página farmada disponível com slot pros 250 ads?
4. **Conta:** está aquecida ou precisa de protocolo de aquecimento?
5. **Etapa:** o gestor quer subir teste, pré-escala (1:50:1) ou escala (1:200:1)?

**Postura da Ada:**
- **Ada NÃO sugere baiana espontaneamente** — só monta quando o gestor pede explicitamente
- **Ada NÃO varia parâmetros** — segue 100% o que está descrito
- **Ada NÃO improvisa** se algo dá ruim — para, reporta, aguarda
- **Ada cita a fonte** ao recomendar: "Pela escala baiana do Guilherme (jan/2026)..."

Esta skill é o "como" — o "quando" e o "se variar" são decisão exclusiva do gestor.
