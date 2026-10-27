# Escalar Milhões nos EUA com 1 Gestor

**Fonte:** Como Eles Escalam Milhões Nos EUA Com Só 1 Gestor? | Wellington e Lucas - Segredos da Escala #149  
**Convidados:** Wellington Costa e Lucas Canavarro  
**Data de referência:** 2025

---

## Resumo

Wellington Costa e Lucas Canavarro são dois gestores de tráfego brasileiros que operam no mercado americano de marketing direto (principalmente produtos de saúde — nutra). Com um time de apenas 2 gestores de Facebook, eles gerem 6 ofertas simultâneas e já faturaram mais de R$50 milhões acumulados, com pico de R$1 milhão/dia e R$40 milhões em um único ano a partir de apenas 2 ofertas. O diferencial central deles é um sistema proprietário de automação chamado **"Directs"**, que permite subir 200 campanhas em menos de 3 minutos via API do Facebook, com features de proteção anti-spy, gestão de fan pages, e controle de contingência. O podcast detalha toda a operação, filosofia de escala e os frameworks técnicos por trás disso.

---

## Insights Principais

### 1. O Caminho Para o Mercado Americano
- **Motivação principal:** A Reforma Tributária brasileira criou uma nova taxa de 12% sobre o investimento em anúncios no Brasil, tornando o mercado brasileiro muito mais apertado em margem.
- O mercado americano não tem esse imposto adicional e tem volume muito maior de audiência.
- Além disso, a concorrência no US market ainda é mais baixa para brasileiros com sistemas sofisticados de escala.
- A transição exige adaptar VSLs, copy e segmentação para o público americano — mas o modelo de campanha e automação é o mesmo.

### 2. Resultados Concretos
- **R$50M+** faturados no total acumulado
- **R$1M/dia** no pico de operação
- **R$40M em 1 ano** operando com apenas 2 ofertas
- **1 gestor de Facebook** gerenciando 6 ofertas simultaneamente
- **200 campanhas** subidas em menos de 3 minutos
- **23 segundos** por campanha via automação

### 3. Evolução da Profissionalização
O negócio passou por 3 fases:
1. **Fase inicial:** Trabalho braçal, subindo campanhas no gerenciador manualmente, sem sistema, operando de madrugada (Corujão do Tráfego).
2. **Fase intermediária:** CBO com otimização hora a hora, planilhas com gráficos por hora puxados via API do RedTrack.
3. **Fase avançada:** Sistema proprietário de automação (Directs) + Escala Baiana/Estrutura 151 com ABO, sem tocar nas campanhas durante o dia.

---

## Estratégias e Frameworks

### Framework 1: Escala Baiana / Estrutura 151 (ABO)

**Conceito:**  
Em vez de escalar verticalmente (aumentar o budget de uma campanha), cria-se horizontalmente, subindo dezenas ou centenas de campanhas ABO com orçamento fixo baixo.

**Como funciona:**
- Campanhas ABO com budget de **$1,30 a $1,50 por campanha**
- Subir entre **50 e 250 campanhas por dia** de uma mesma oferta
- **Não tocar nas campanhas durante o dia** — avaliar somente ao final do dia
- O Facebook distribui o gasto por conta própria entre as campanhas ativas
- Campanhas que não gastam: desliga; campanhas que gastam e convertem: deixa rodar

**Por que funciona:**
- Evita o "learnig reset" constante do Meta ao editar campanhas
- Cria múltiplos pontos de entrada no leilão do Facebook
- Distribuição de risco — se uma campanha cair, as outras seguem
- Escala de volume sem depender de um único conjunto de anúncios

**Regra de ouro:** "Sobe e não mexe. Avalia só no fim do dia."

---

### Framework 2: Escala CBO (Método Legado)

**Estrutura CBO 1-3-1:**
- 1 campanha CBO
- 3 conjuntos de anúncios (audiences distintas)
- 1 criativo principal por conjunto

**Operação hora a hora:**
- Gráficos por hora montados no Google Sheets via API do RedTrack
- Monitoramento em tempo real do ROI hora a hora
- Ajuste de budget ao longo do dia baseado na performance
- **Stop Loss / Trailing Stop:** Conceito emprestado do mercado financeiro. Se o lucro cai X% abaixo do pico intraday, reduz ou desliga a campanha. Impede que um dia lucrativo vire um dia negativo.

**Quando usar:**  
Método mais antigo, útil quando se tem menos campanhas rodando e mais capacidade de atenção manual. A Escala Baiana substituiu esse método como estratégia principal.

---

### Framework 3: Sistema Directs (Ferramenta Proprietária)

**O que é:**  
Ferramenta SaaS desenvolvida internamente em Python que se conecta à API do Facebook para automatizar upload em massa de campanhas.

**Funcionalidades principais:**

#### a) SubCampanha (Core Feature)
- Sobe dezenas/centenas de campanhas em paralelo via API
- **23 segundos por campanha** em média
- **200 campanhas em menos de 3 minutos**
- Nomenclatura automática (sem erro humano de nomeação)
- Operável pelo **celular** — não precisa deixar computador aberto
- O sistema roda nos bastidores após receber o comando

#### b) AntiSpy
- Distribui cada campanha em uma **fan page diferente** de um pool de 200+ fan pages
- Resultado: cada página aparece no Ad Library do Facebook com **máximo 6 anúncios visíveis** por página
- Concorrentes que tentam fazer spy no Ad Library veem apenas 6 anúncios de cada vez, sem saber que é a mesma operação rodando 200+ campanhas
- Usa **links de exibição aleatórios** para variar a URL aparente de cada campanha
- Usa **JPEGs aleatórios** como variações visuais para dificultar identificação do criativo real

#### c) Catálogo do Facebook
- Integração com o Catálogo do Facebook para upload de criativos
- **Dois benefícios:**
  1. **Taxa de aprovação maior:** Anúncios enviados via catálogo têm menos rejeição na moderação
  2. **Invisibilidade no Ad Library:** Criativos em catálogo não aparecem na biblioteca de anúncios — proteção extra além do AntiSpy

#### d) Controle de Contingência
- Dashboard que puxa via API todas as contas de anúncio da operação
- Visibilidade de: saldo, status, fuso horário, gasto do dia
- Substitui planilha manual de controle de contas
- Alertas quando conta está próxima de zerar ou bloqueada

#### e) Gestão de Slots de Fan Page
- Cada fan page tem limite de **250 anúncios ativos** no Facebook
- O sistema consulta via API quantos slots ainda estão disponíveis em cada página
- Distribui automaticamente as novas campanhas respeitando o limite
- **Problema que resolve:** No gerenciador manual, o Facebook não atualiza o contador de slots em tempo real — você só descobre que estourou o limite no dia seguinte quando a API do Facebook atualiza, e as campanhas excedentes simplesmente não veiculam.

---

### Framework 4: Indicadores de Performance (Leading Indicators)

**Problema:** Esperar pela conversão final (compra) para decidir matar uma campanha é lento demais — você perde muito dinheiro esperando.

**Solução:** Usar indicadores antecedentes do VTURB (player de vídeo) como proxies de qualidade da campanha.

**Métricas do VTURB usadas como leading indicators:**
- **Custo por Play:** Quanto custou para cada pessoa começar a assistir o vídeo. Se muito alto → tráfego desqualificado ou criativo fraco.
- **Custo por PIT (Point in Time):** Quanto custou para cada pessoa atingir um ponto específico do vídeo (ex: 50%, 75%, ou o ponto de virada da VSL). Se alto → audiência não está engajando com a oferta.

**Lógica:** Se o custo por play e por pit estão ruins, a campanha dificilmente vai converter — mata antes de chegar na compra e economiza budget.

**Configuração no RedTrack:**
- Pixel events do VTURB (play, pit) são enviados para o RedTrack
- RedTrack conecta via API ao Google Sheets
- Gráficos horários montados automaticamente para acompanhamento em tempo real

---

### Framework 5: Operação Noturna (Corujão do Tráfego)

**Por que operar de madrugada:**
- Mercado americano (East Coast) = Horário Brasília - 3 horas
- Prime time do usuário americano = tarde/noite US = madrugada no Brasil
- Gestores brasileiros acordam às 1–3h da madrugada para monitorar e reagir ao tráfego no horário mais quente do dia americano

**Impacto na operação:**
- Com a automação (Directs), o corujão virou opcional — as campanhas sobem sozinhas
- A ferramenta operável pelo celular permite ajustes sem precisar estar no computador
- Mas para gestores sem automação, a operação noturna é praticamente obrigatória para competir no US market

---

### Framework 6: Estrutura de Time Enxuta

**Configuração atual:**
- **1 gestor de Facebook** gerencia **6 ofertas simultâneas**
- **Total de 2 gestores** na operação de Facebook Ads
- **Ferramentas de gestão de time:** ClickUp (projetos), Gather (escritório virtual), PDI - Plano de Desenvolvimento Individual (avaliação de desempenho)

**Possibilitado por:**
- Automação via Directs (elimina trabalho repetitivo de subida de campanhas)
- Processos claros e nomenclatura padronizada
- Indicadores de performance objetivos para tomada de decisão

**Filosofia:**  
"O gestor de tráfego deve ser um tomador de decisão, não um executor manual. A automação libera o cérebro para analisar, não para clicar."

---

### Framework 7: Proteção de Oferta e Competitividade

**Problema no mercado de marketing direto:**
- Concorrentes fazem spy constante no Ad Library do Facebook
- Identificam criativos que estão rodando há muito tempo (sinal de que estão convertendo)
- Copiam o criativo, a copy, às vezes até o produto

**Solução em camadas:**
1. **AntiSpy** — Distribuição por 200 fan pages (máximo 6 ads visíveis por página no Ad Library)
2. **Catálogo** — Criativos em catálogo não aparecem no Ad Library
3. **Links de exibição aleatórios** — A URL que aparece no anúncio varia, dificultando rastreio
4. **JPEGs aleatórios** — Pequenas variações visuais impedem matching por similaridade de imagem

---

## Métricas e Benchmarks

| Métrica | Valor |
|---|---|
| Budget por campanha ABO | $1,30 – $1,50 |
| Número de campanhas por subida | 50 – 250 |
| Tempo por campanha (automatizado) | ~23 segundos |
| Tempo para 200 campanhas | < 3 minutos |
| Fan pages no pool AntiSpy | 200+ |
| Anúncios visíveis por página no Ad Library | máximo 6 |
| Limite de anúncios por fan page (Facebook) | 250 slots |
| Gestores para 6 ofertas | 1 (Facebook) |
| Faturamento pico/dia | R$1.000.000 |
| Faturamento em 1 ano (2 ofertas) | R$40.000.000+ |
| Faturamento total acumulado | R$50.000.000+ |

---

## Erros Comuns e O Que Evitar

### 1. Mexer nas Campanhas Durante o Dia
- **Erro:** Pausar, editar ou ajustar budget de campanhas ABO durante o horário de veiculação
- **Por quê é erro:** O Facebook reinicia o aprendizado (learning reset) e destrói a performance acumulada
- **Correto:** Subir de manhã, não tocar, avaliar só no final do dia

### 2. Não Controlar os Slots de Fan Page
- **Erro:** Subir campanhas sem saber quantos slots restam em cada fan page
- **Consequência:** Campanhas são criadas mas não veiculam — gasto de tempo sem retorno
- **Correto:** Consultar slots via API antes de subir; ou usar o Directs que faz isso automaticamente

### 3. Gestão Manual de Contas de Anúncio
- **Erro:** Controlar saldo, status e limites de várias contas manualmente
- **Consequência:** Campanhas pausam por falta de saldo sem aviso; erros operacionais em escala
- **Correto:** Dashboard de contingência via API que agrega todas as contas

### 4. Esperar pela Conversão Final para Matar Campanhas
- **Erro:** Deixar campanhas ruins rodando esperando ver se convertem no final do dia
- **Consequência:** Gasto de budget em tráfego desqualificado
- **Correto:** Usar leading indicators (custo por play, custo por pit) para matar campanhas cedo

### 5. Operar Sem AntiSpy em Mercado Competitivo
- **Erro:** Rodar todas as campanhas na mesma fan page ou em poucas páginas
- **Consequência:** Concorrentes identificam rapidamente seus criativos ganhadores e copiam
- **Correto:** Distribuir por pool de 200+ fan pages com limite de 6 ads visíveis por página

### 6. Ignorar a Tributação e Regulação Local
- **Erro:** Não considerar o impacto da tributação no mercado brasileiro (12% nova taxa sobre adspend)
- **Correto:** Avaliar migração para mercados sem essa tributação (EUA principal alternativa) quando as margens apertarem

### 7. Fazer Escalabilidade Vertical Antes de Dominar a Horizontal
- **Erro:** Aumentar muito o budget de poucos conjuntos antes de provar que o sistema de escala horizontal funciona
- **Correto:** Dominar a Escala Baiana (muitas campanhas ABO baixas) antes de tentar escalar um único CBO

---

## Aplicação Prática

### Para um Gestor Iniciando no Mercado EUA

**Passo 1: Validação da Oferta**
1. Escolha um produto de saúde/nutra com demand comprovada no mercado americano
2. Monte uma VSL adaptada para o público americano (copy e linguagem)
3. Configure o VTURB com eventos de pixel (play e pit nos momentos chave)
4. Configure RedTrack como tracker (ou similar) para receber esses eventos

**Passo 2: Primeira Escala (Sem Automação)**
1. Crie um pool de 10–20 fan pages inicialmente
2. Configure nomenclatura padronizada de campanhas (evita erros)
3. Suba 20–50 campanhas ABO a $1,50 cada = investimento inicial de $30–$75/dia
4. Avalie ao final do dia: quais campanhas gastaram e converteram? Quais ficaram zeradas?
5. Desligue as zeradas, mantenha as que converteram, repita no dia seguinte

**Passo 3: Monitoramento com Leading Indicators**
1. Acompanhe custo por play e custo por pit nas primeiras 2–3 horas
2. Campanhas com custo por play/pit acima do benchmark: pausar
3. Campanhas com custo por play/pit dentro do benchmark mas sem conversão: aguardar
4. Defina seus benchmarks baseado nas primeiras semanas de dados

**Passo 4: Escala com Automação**
1. Avalie o uso do Directs (directs.ai) quando estiver rodando 50+ campanhas/dia
2. A automação elimina erros manuais e reduz tempo de operação de horas para minutos
3. Ative AntiSpy assim que os criativos começarem a performar (proteja antes de ser copiado)

**Passo 5: Controle de Contingência**
1. Monte planilha Google Sheets via API do Meta para consolidar todas as contas
2. Acompanhe saldo, gasto do dia e status de cada conta diariamente
3. Configure alertas de saldo baixo

---

### Checklist Diário do Gestor (Escala Baiana)

**Manhã (antes de subir):**
- [ ] Verificar saldo de todas as contas de anúncio
- [ ] Verificar slots disponíveis nas fan pages
- [ ] Preparar criativos e definir quantas campanhas subir hoje
- [ ] Subir campanhas via Directs (ou manualmente se não tiver a ferramenta)

**Ao longo do dia (1–2 check-ins):**
- [ ] Checar custo por play e custo por pit no VTURB/RedTrack
- [ ] Pausar campanhas com indicadores muito ruins nas primeiras 2h
- [ ] NÃO editar campanhas que estão performando bem

**Fim do dia:**
- [ ] Avaliar campanhas: gastou e converteu? Mantém. Não gastou? Desliga.
- [ ] Registrar performance do dia por oferta
- [ ] Planejar upload do dia seguinte

---

### Referências e Ferramentas Mencionadas

| Ferramenta | Uso |
|---|---|
| **Directs.ai** | Automação de upload de campanhas em massa |
| **VTURB** | Player de vídeo com eventos de pixel para leading indicators |
| **RedTrack** | Tracker de conversão com API para Google Sheets |
| **Google Sheets** | Dashboard de gráficos horários via API |
| **ClickUp** | Gestão de projetos do time |
| **Gather** | Escritório virtual para comunicação do time |
| **Meta API** | Automação de upload, controle de contas e slots de fan page |
| **Facebook Catálogo** | Upload de criativos com maior taxa de aprovação e invisibilidade no Ad Library |

---

### Conceitos de Mercado Financeiro Aplicados ao Tráfego

| Conceito Financeiro | Aplicação no Tráfego |
|---|---|
| **Stop Loss** | Definir um limite de prejuízo máximo por campanha — se gastar X sem converter, pausa automática |
| **Trailing Stop (Stop Móvel)** | Se o lucro do dia cair X% abaixo do pico (ex: estava em R$10k de lucro, caiu para R$7k), reduz budget ou pausa |
| **Diversificação** | Múltiplas campanhas ABO em vez de um único CBO concentrado |
| **Hedge** | Múltiplas ofertas e contas para proteger contra bloqueios |
