# Teste de Estrutura, Reciclagem Hook×Body e Ecossistema ABO+CBO

**Fonte:** Saraiva (Brazilian Wave), aula de tráfego do dia 05. Operação de nutra internacional (EUA), afiliado com CPA fixo de US$ 160, conta em real. Aula dada com o gerenciador aberto, otimizando ao vivo.
**Destilado completo:** `~/Antigravity/brazilian-wave/knowledge/2026-07-25_aula-05-trafego-teste-e-escala.md`

> ⚠️ **Ler a seção 8 antes de aplicar em conta de cliente.** Uma das regras daqui colide com o nosso playbook validado de escala.

---

## 1. Teste de estrutura — a ideia central desta ref

**A tese:** validar criativo não basta. O que se valida é a tripla **criativo × conta × estrutura de campanha**.

> "A nossa validação não é só de criativo. A gente valida criativo, valida conta de anúncio e, principalmente, valida estrutura de escala na conta."

**As 3 estruturas testadas, sempre as mesmas:**

| Nome | Composição |
|---|---|
| **1-3-1** | 1 campanha, 3 conjuntos, 1 anúncio cada |
| **1-5-1** | 1 campanha, 5 conjuntos, 1 anúncio cada |
| **1-1-4** | 1 campanha, 1 conjunto, **4 anúncios idênticos duplicados** |

Sobre o 1-1-4, ele é honesto: *"por que 4 anúncios iguais duplicados? Não sei, mas funciona."*

**Parâmetros do teste de estrutura:**
```
Orçamento = CPA CHEIO (não metade)
Duração   = 1 dia, qualquer dia da semana
Critério  = 2 vendas em 1 dia → vai para escala
```
Usa ticket cheio porque roda em dia comum, sem a condição favorável do fim de semana.

**Evidência mostrada na tela:** mesmo anúncio, mesmo dia, mesma conta, 3 estruturas. A 1-5-1 vendeu 2× com IC de R$ 171. As outras duas não venderam, com IC de R$ 267 e R$ 343.

## 2. Funil de teste completo

```
TESTE DE CRIATIVO (ABO)              TESTE DE CRIATIVO (CBO)
orçamento = 1/3 do CPA               orçamento = 1/2 do CPA
2 dias                               1 dia, fim de semana
2 vendas em 2 dias                   já sobe nas 3 estruturas
       ↓                             2 vendas em 1 dia
TESTE DE ESTRUTURA                          ↓
orçamento = CPA cheio                       ↓
1 dia, 3 estruturas ────────────────────► ESCALA
2 vendas em 1 dia
```

O CBO pula a fase de teste de estrutura (já sobe nas três). É o caminho de quem tem caixa e quer velocidade: *"quem escala mais rápido ganha."*

**Sempre testar em pelo menos 2 contas simultaneamente.** É comum 3 criativos em 2 contas resultarem em 2 vencedores diferentes, um em cada conta. *"Tem criativo que valida em uma ponta e não valida em outra."*

**Corte antecipado:** se o custo por IC estourar o padrão da oferta, pausa antes de fechar a janela. Não espera os 2 dias.

**Por que 2 dias e não 1:** sazonalidade. Um dia ruim é normal; o critério é 2 vendas na janela, não importa como se distribuem.

**Se a conta cair com um criativo já validado:** não repetir o teste ABO de 2 dias. Subir direto em CBO, no fim de semana, em outras contas. O criativo já provou que vende.

## 3. Reciclagem hook × body (a planilha)

Origem: pirâmide de ads (Vakuda); planilha do Juan Sclippet a partir de conteúdo do Carriello.

**Método:** registrar hook rate, body rate e CTA de cada anúncio testado, depois **recombinar o hook de um com o body de outro**, desde que cada peça tenha validado no seu papel.

Nomenclatura: `H13_B8` = hook do anúncio 13 + body do anúncio 8. Roda-se as duas direções (H13/B8 e H8/B13).

**Caso com número:** o anúncio 13 tinha hook de 64,17% mas era um anúncio ruim. O anúncio 8 tinha body de 4,87% e vendia. A mescla H13/B8 **gastou R$ 43 mil e retornou R$ 95 mil em valor de conversão.**

**O CTA não se mexe** — está no fim do vídeo e move pouco.

**Generalização:** um teste "perdido" quase nunca é perdido inteiro. Decomponha em hook, corpo e CTA, veja qual elemento performou e recombine. Vale também para página e sequência de mensagens.

## 4. Métricas — fórmulas para colunas personalizadas

| Métrica | Fórmula no gerenciador | Benchmark dele (nutra US) |
|---|---|---|
| **Hook rate** | reproduções de vídeo ≥ 3s ÷ impressões | acima de 55% |
| **Body rate** | reproduções de 75% do vídeo ÷ reproduções de vídeo | acima de 4%, ideal 5% |
| **Connect rate** | visualizações da página de destino ÷ cliques no link | acima de 85% |
| **CTR** | taxa de clique no link | acima de 4% |
| **Custo por IC** | custo por finalização de compra | a métrica de corte dele |

Todas em porcentagem, exceto custo por IC e CPC.

⚠️ **Os benchmarks são de vídeo de nutra US.** As fórmulas são universais; os números precisam de baseline próprio por conta antes de virarem meta. Ele mesmo mostra um anúncio com hook e body abaixo do benchmark escalando bem: *"não dá para se basear só em número, tem muito filho também."*

**Alerta sobre hook rate alto:** clickbait demais em público mais velho sobe o hook rate e enche o funil de gente que não compra. Hook rate não é meta isolada.

## 5. Escala

**CBO:** duplicar a estrutura campeã **6×**, cada uma com **2× o CPA**, programadas para o dia seguinte.
**ABO:** duplicar o conjunto campeão **30×** numa campanha nova, cada um com **1/2 CPA**.

**Diferença dura:** em ABO, campanha que gasta o orçamento inteiro no primeiro dia sem vender **não é reativada**. Em CBO, pode.

**Para que serve o ABO:** mineração. Gasto pequeno espalhado por muitos anúncios, garimpando quem entrega IC barato.

### Regras de otimização intradiária dele

| Situação | Ação dele |
|---|---|
| ROAS acima de 2,5 | dobra o orçamento a cada 2 horas |
| ROAS abaixo de 2,5 | +30% a cada 2 horas |
| 1 venda (campanha "zerada") | aguarda mais 1 CPA antes de decidir |
| Gastou pouco, sem venda, mas IC barato | mantém ativa |
| Passou do CPA máximo | pausa |
| CPA subindo e lucro caindo | volta ao orçamento da primeira dobra, ou corta 30% |

**CPA máximo = quanto se pode pagar mantendo a margem alvo.** Com CPA de R$ 960 e meta de 25% de lucro, o CPA máximo é R$ 720. Vira gatilho automático de pausa.

**Prioridade declarada:** *"eu me importo muito mais com lucro do que com ROAS ou faturamento."*

### Ecossistema de campanhas (a recomendação final dele)
Rodar ABO **e** CBO na mesma conta ao mesmo tempo, e promover o vencedor de ABO para teste de estrutura em CBO no dia seguinte. *"Melhor maneira de escalar, disparado."*

Sobre sobreposição de público: ele evitava duas estruturas do mesmo criativo na mesma conta; mudou de posição semanas antes da aula e passou a fazer. Registra a ressalva: **"tráfego muda; o que funciona agora pode não funcionar daqui a alguns dias."**

## 6. Estratégias na contramão do consenso

**Posicionamento manual.** A oferta dele converte no Facebook, então roda campanhas posicionadas só em Facebook (feed, stories, reels) em vez de automático. Efeito colateral: CPM menor.

**Público de interesse, em 2026.** Campanha com interesse "The Dr. Oz Show", EUA 40-65+: **CPM de R$ 374 contra R$ 1.000-1.500 do mesmo público em aberto.** Recomenda interesses **amplos** (já rodou com "Netflix"), nunca fechados. *"A massa fala para não usar, então usa."*

**Dobra de virada.** Campanha que fechou o dia bem, dobra o orçamento na virada da meia-noite para se posicionar no leilão. Só em CBO. *"Às vezes fico um pouco no prejuízo para expulsar todo mundo e depois lucrar."*

## 7. Aprovação de anúncio rejeitado (escada de 5)

Na ordem, do menos ao mais drástico:

1. **Filtro** no começo (ou em todo) o vídeo
2. **Legenda colada na boca do avatar**, com o filtro
3. **Hook em vídeo + corpo em fundo preto com letra dinâmica** ← "funciona muito bem"
4. **Vídeo acima de 5 min com imagem estática ou cronômetro** no meio ← "quase todos aprovam", mas traz público ruim
5. **Tirar o avatar**

## 8. ⚠️ Antes de aplicar em conta de cliente

### 🔴 Conflito com o nosso playbook validado
Ele **dobra orçamento a cada 2 horas** com ROAS acima de 2,5. Nosso `.claude/trafego/regras/reference_otimizacao_meta_cbo.md` fixa **escala máxima de +32%** justamente para não zerar o aprendizado.

**Não substituir a nossa regra pela dele.** Contextos diferentes: ele roda nutra US com CPA fixo, volume altíssimo, conta descartável, e aceita reset de aprendizado como custo de posicionamento no leilão. Nossos clientes têm orçamento menor, contas que não podem cair e ciclo mais longo. Se for testar, que seja **experimento isolado numa campanha, com hipótese declarada e aprovação do gestor**, nunca como regra nova.

### 🟢 Aplicável direto
Teste de estrutura (1-3-1 / 1-5-1 / 1-1-4) antes de escalar · reciclagem hook×body · validar por conta e não só por criativo · escada de aprovação de rejeitado · ecossistema ABO+CBO · teste de posicionamento manual quando o dado mostrar concentração · interesse amplo como tática de corte de CPM · CPA máximo derivado da margem como gatilho de pausa.

### 🟡 Aplicável com adaptação
Fórmulas de hook/body/connect rate (universais) com benchmarks recalibrados por conta · divisores de orçamento (1/3, 1/2, cheio) ancorados no ticket médio real em vez do CPA fixo de afiliado.

### 🔴 Não aplicável
Benchmarks de CPC e custo por IC de nutra US · contingência com perfil de familiar e BM comprada · "não preencher texto, título e descrição do anúncio" · segmentações e faixas etárias dos nichos dele.

### 🚨 Regra dura que continua valendo
Qualquer alteração em conta de cliente (orçamento, pausa, nova estrutura) segue o protocolo: **proposta → OK explícito do gestor → só então aplicar.** Nada daqui autoriza aplicar direto.
