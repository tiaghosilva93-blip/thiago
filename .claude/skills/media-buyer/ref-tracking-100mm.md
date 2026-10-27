# Tracking em Escala — +100MM em 1 Ano

**Fonte:** Ele Trackeou +100MM De Dólares Em Apenas 1 Ano | Linecker Nunes - Segredos da Escala #082
**Especialista:** Linecker Nunes — consultor de tracking para as maiores operações do Brasil; embaixador do HatTrack
**Host:** João (Vurb — plataforma de hospedagem de vídeo)

---

## Resumo

Linecker Nunes explica a hierarquia completa de tracking para operações de tráfego pago em escala, por que o pixel nativo do Facebook é insuficiente, como funciona a API de Conversão (CAPI), e por que o uso de um **Tracker dedicado** (como HatTrack) é o padrão das maiores operações brasileiras e internacionais. O episódio cobre a jornada técnica completa: do pixel ao servidor, das UTMs ao Click ID, do Google Analytics ao banco de dados próprio (Supabase / BigQuery). Foco total em Direct Response — não e-commerce.

---

## Insights Principais

### 1. A Hierarquia das Camadas de Tracking

Existem quatro camadas principais, em ordem crescente de precisão:

| Camada | Ferramenta | Precisão | Problema Principal |
|---|---|---|---|
| 1 — Pixel nativo | Facebook Pixel | Baixa | Perde 25–30% das conversões; bloqueado por iOS 14, ad blockers, Firefox |
| 2 — UTM | Parâmetros UTM | Média | Dados em tempo real, mas não envia de volta ao Facebook |
| 3 — CAPI | API de Conversão | Alta | Delay de 2–3h; não tem visibilidade em tempo real |
| 4 — Tracker | HatTrack / Keitaro | Máxima | Combina real-time das UTMs + sendback da CAPI |

**O Tracker é a solução ideal porque resolve os problemas das três camadas anteriores ao mesmo tempo.**

### 2. Por Que o Pixel Sozinho Não Funciona em 2024+

- Após o iOS 14 (2021), Apple passou a bloquear rastreamento cross-app por padrão
- Firefox e Safari bloqueiam cookies de terceiros por padrão
- Ad blockers removem o pixel do navegador
- Resultado: **25 a 30% das conversões simplesmente desaparecem** — o pixel não registra
- Operações que só usam pixel estão treinando o algoritmo do Facebook com dados incompletos e imprecisos

### 3. O Que é UTM e Por Que Não Basta

- **UTM = Urchin Tracking Module** — origem: empresa Urchin, comprada pelo Google em 2004 para criar o Google AdWords
- Parâmetros: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- Vantagem: **dados em tempo real** — você vê qual anúncio gerou a conversão imediatamente
- Problema crítico: UTM **não envia dado de volta ao Facebook** — ele apenas captura, não retroalimenta o algoritmo
- O Facebook precisa receber o evento de compra de volta via servidor para otimizar corretamente

### 4. A API de Conversão (CAPI) — O Que é e Qual o Problema

- CAPI = Conversion API = envio de eventos de conversão via servidor HTTP para o Facebook
- Criada como resposta ao iOS 14 — todos os grandes players têm: Facebook, Google, Taboola
- Funciona: quando usuário compra, o servidor envia um evento HTTP para o Facebook com os dados da conversão
- **Problema de delay:** pode demorar 2 a 3 horas para o evento aparecer no Gerenciador de Anúncios
- Isso impede otimização em tempo real — você não sabe o que está funcionando agora

### 5. O Que É e Como Funciona um Tracker (HatTrack)

O tracker resolve o problema de todas as camadas anteriores ao mesmo tempo:

**Como funciona:**
1. Usuário clica no anúncio
2. O tracker intercepta o clique e cria um **Click ID** (chave primária única)
3. O Click ID condensa: IP, localização geográfica, user agent, dispositivo, OS, navegador, parâmetros de campanha
4. O Click ID é passado via URL para a página de vendas
5. Quando o usuário converte, o Click ID é usado para fazer o **sendback**: enviar o evento de volta ao Facebook/Google via CAPI
6. O dashboard do tracker mostra **dados em tempo real** (como UTM) E o sendback acontece automaticamente

**Resultado:** você tem visibilidade imediata de qual criativo gerou a conversão E o Facebook recebe o dado para otimizar o algoritmo.

**HatTrack especificamente:**
- Empresa lituana
- Linecker é embaixador oficial no Brasil
- Consegue identificar ISP (operadora de internet): Starlink, Vivo, Claro, etc.
- Custo: a partir de ~$60–70/mês (estimativa baseada na conversa)
- Não tem aplicativo mobile (ponto negativo mencionado)

### 6. O Click ID — A Chave Primária de Tudo

- Criado pelo HatTrack no momento do clique
- Contém: IP, localização, user agent, dispositivo, OS, navegador, dados da campanha
- É o elemento que conecta o clique à conversão
- Permite rastrear etapas intermediárias do funil (mid-funnel): não só o clique e a compra, mas o que acontece no meio
- **É a base de todo o sistema de tracking profissional**

### 7. O Problema do "Dashboard de Ego" vs. Tracking Real

Linecker faz distinção crítica entre:

- **Ferramenta de dashboard** (ex: UTMfy, Nemo) — mostra dados bonitinhos mas não faz sendback de verdade; é para "validar o ego"
- **Tracker de fato** (ex: HatTrack, Keitaro) — faz sendback para os ad platforms, rastreia mid-funnel, conecta click ID à conversão

> "Um tracker ruim não salva uma copy ruim. Um tracker bom não salva um tráfego ruim. Ele só vai te mostrar que tá uma merda — de forma mais escancarada."

### 8. Google Analytics — Quando Usar e Quando NÃO Usar

- Google Analytics é **gratuito** e bom para análise de comportamento do usuário
- **NÃO é indicado para Direct Response em tempo real**
- Atrasa dados a partir de 150.000 hits/dia (começa a amostrar)
- Não está alinhado com contagens do Facebook (metodologias de medição diferentes)
- Linecker recomenda: use o Analytics para análise de comportamento, não para tracking de ROI

### 9. Stape — A Alternativa para CAPI Sem Código

- Stape é uma ferramenta pré-configurada de servidor que funciona com Google Tag Manager
- Permite implementar CAPI sem precisar de desenvolvedor backend
- Custo: $30–50/mês
- É uma opção para quem quer CAPI mas não tem tracker dedicado
- **Não substitui um tracker completo** (não tem Click ID, não tem visibilidade mid-funnel)

### 10. Data Layer — O Que É e Por Que Importa

- Data Layer = camada do navegador que emite eventos com dados do produto
- Contém: nome do produto, preço, tipo de evento (visualização, adição ao carrinho, compra)
- O servidor usa o Data Layer para capturar os dados de conversão
- Importante para tracking server-side: sem Data Layer configurado, o servidor não sabe o que rastrear

---

## Estratégias e Frameworks

### Framework de Prioridade de Parâmetros para Atribuição do Facebook

O Facebook usa uma hierarquia para atribuir conversões. Em ordem de prioridade:

1. **Email** — parâmetro mais poderoso; quando o lead já existe na base do Facebook
2. **fbp / fbc** — cookies do Facebook (browser-side)
3. **IP + User Agent** — identificação por dispositivo
4. **Click ID** — quando enviado via CAPI pelo tracker

> "Email é o parâmetro número 2 em prioridade para o Facebook. Se você tem o email do comprador, o Facebook consegue atribuir com muito mais precisão."

### Framework de Stack Mínima de Tracking por Nível de Operação

**Operação iniciante (até ~R$10k/mês em ads):**
- Pixel do Facebook ativo
- UTM em todos os anúncios
- Google Analytics (comportamento)
- Foco em: criar ofertas, melhorar copy — tracking não é o gargalo

**Operação intermediária (R$10k–100k/mês):**
- CAPI implementada (via Stape ou nativa da plataforma)
- Tracker dedicado (HatTrack como recomendação principal)
- UTMs estruturadas e padronizadas
- Dashboard básico (Looker Studio ou dentro do próprio tracker)

**Operação avançada (R$100k+/mês):**
- Tracker com Click ID + sendback completo
- Banco de dados próprio (Supabase para começar)
- Automações (Make ou n8n) para mover dados
- Dashboard personalizado (Looker Studio conectado ao banco de dados)
- Mid-funnel tracking: saber o que acontece entre o clique e a compra

**Operação de escala internacional (milhões/mês):**
- BigQuery para "disposal data" — todos os dados históricos de mídia num único banco
- Integração: Ringba + HatTrack + Everflow tudo no mesmo banco
- Equipe dedicada de dados para criar visualizações customizadas
- Análise instantânea de qualquer período histórico

### Framework: O Que Fazer Antes de Investir em Tracking Avançado

Linecker alerta: tracking avançado não é a primeira prioridade de uma operação nova.

**Sequência correta:**
1. Validar a oferta
2. Validar a copy / criativo
3. Validar o tráfego
4. Depois: implementar tracking profissional

> "O tracking bom vai deixar mais escancarado que tá uma merda. Mas não vai salvar uma copy ruim."

### Framework de Configuração do HatTrack

Elementos de configuração dentro do HatTrack:
- **Traffic Channel** = fonte (conta de anúncios, perfil, rede)
- **Campaign** = campanha
- **Click ID** = gerado automaticamente no clique
- Configuração de sendback: qual evento enviar de volta (Purchase, Lead, etc.) e para qual plataforma (Facebook, Google)
- Configuração de mid-funnel: quais etapas intermediárias rastrear (page view, checkout view, etc.)

### Automação com Make / n8n para Dados de Tracking

- Make e n8n são ferramentas de automação no-code
- n8n é open source / gratuito
- Uso prático: criar pipelines que movem dados do tracker → banco de dados → dashboard
- Exemplo: quando uma conversão acontece no HatTrack, n8n move automaticamente o dado para o Supabase

---

## Métricas e Benchmarks

| Métrica | Valor | Contexto |
|---|---|---|
| Perda de conversões sem CAPI | 25–30% | Estimativa para operações só com pixel após iOS 14 |
| Delay da CAPI nativa | 2–3 horas | Tempo para evento aparecer no Gerenciador |
| Conversões mínimas para pixel aprender | 50/semana | Mínimo para o algoritmo identificar perfil de comprador |
| Custo do Stape | $30–50/mês | Alternativa server-side sem código |
| Custo HatTrack | ~$60–70/mês | Estimativa baseada em comentários do episódio |
| Limite gratuito do Supabase | 500 MB | Banco PostgreSQL gratuito para começar |
| Volume que o GA começa a amostrar | 150.000 hits/dia | A partir desse volume, dados são estimados |
| Volume que Linecker trackeou | $100M+ em 1 ano | Referência de escala do episódio |
| Tempo de podcast | ~2h10min | Episódio completo |

### Sobre Diminishing Returns no Pixel

O pixel do Facebook aprende com as conversões recebidas:
- **50 conversões/semana** = mínimo para saída da fase de aprendizado
- Quanto mais conversões, melhor a identificação do perfil de comprador
- Porém, depois de certo ponto, há retornos diminuentes — cada conversão adicional melhora menos a precisão
- Com CAPI + Click ID, você envia mais dados para o Facebook → algoritmo aprende mais rápido e com mais precisão

---

## Erros Comuns e O Que Evitar

### Erro 1: Usar Só o Pixel Nativo
**Problema:** Perde 25–30% das conversões. O algoritmo treina com dados incompletos.
**Solução:** Implementar CAPI + preferencialmente um Tracker com sendback.

### Erro 2: Usar Só UTM Sem Sendback
**Problema:** Você vê os dados em tempo real, mas o Facebook não recebe de volta — não retroalimenta o algoritmo.
**Solução:** UTM deve ser usado em conjunto com CAPI/Tracker para que o dado volte ao Facebook.

### Erro 3: Confundir "Dashboard Tool" com "Tracker"
**Problema:** Ferramentas como UTMfy e Nemo (nas versões que Linecker menciona) são boas para visualização mas não fazem sendback de verdade — são dashboards, não trackers.
**Solução:** Verificar se a ferramenta faz sendback via CAPI para o Facebook/Google. Se não faz, não é um tracker — é um dashboard.

### Erro 4: Tentar Fazer Tracking Profissional Sem Base
**Problema:** Operação pequena investe tempo em banco de dados e dashboards antes de ter produto validado.
**Solução:** Primeiro valide oferta e copy. Tracking avançado vem depois.

### Erro 5: Análise Paralisia (Over-Analysis)
**Problema:** Ter muito dado disponível e gastar mais tempo analisando do que agindo.
**Solução:** Definir KPIs principais e monitorar apenas esses. "Será que tu deveria estar criando mais ofertas ao invés de criar um dashboard bonitinho?"

### Erro 6: Usar Google Analytics como Fonte da Verdade para ROI
**Problema:** GA não é em tempo real para DR, amostra dados acima de 150k hits/dia, e não alinha com contagens do Facebook.
**Solução:** Use GA para análise de comportamento. Para tracking de ROI, use o tracker ou o Gerenciador de Anúncios.

### Erro 7: Contratar Tracking de Profissional Errado
**Problema:** Para configurar tracking, você precisa dar acesso às suas operações. Contratar pessoa errada = exposição da oferta, produtos, receita.
**Solução:** Trabalhar apenas com profissionais de referência validados pelos grandes players do mercado.

### Erro 8: Depender do Google Sheets para Dados de Tracking
**Problema:** Google Sheets tem limitações de requisições — não escala para operações maiores.
**Solução:** Migrar para Supabase (PostgreSQL gratuito até 500MB) ou banco de dados próprio.

---

## Aplicação Prática

### Passo a Passo: Implementar Stack de Tracking para Operação em Crescimento

**Passo 1 — Garantir o básico funcionando**
- Pixel do Facebook instalado e disparando corretamente
- UTMs em TODOS os anúncios (estrutura: source/medium/campaign/content/term)
- Verificar no Eventos Manager se os eventos estão chegando

**Passo 2 — Implementar CAPI**
- Opção A: Via plataforma nativa (ex: Hotmart tem integração CAPI)
- Opção B: Via Stape ($30–50/mês) com Google Tag Manager
- Verificar se está recebendo confirmação de eventos server-side no Eventos Manager

**Passo 3 — Contratar/Implementar Tracker Dedicado**
- HatTrack como primeira recomendação (embaixador: Linecker Nunes)
- Keitaro como alternativa (mais barato, mas complexo — e é cloaker, requer cuidado)
- Configurar Traffic Channels por conta/perfil de anúncios
- Configurar sendback de eventos (Purchase, Lead)
- Configurar mid-funnel tracking

**Passo 4 — Estruturar Banco de Dados (para operações maiores)**
- Começar com Supabase (PostgreSQL gratuito, 500MB)
- Usar Make ou n8n para automatizar o fluxo de dados tracker → banco
- Criar visualizações no Google Looker Studio (gratuito)
- Para escala internacional: migrar para BigQuery

**Passo 5 — Monitoramento Contínuo**
- Definir KPIs principais (CPM, CPC, CTR, CPA, ROAS)
- Verificar diariamente: coerência entre dados do tracker e do Facebook
- Usar tracker para decisões em tempo real, CAPI para retroalimentar o algoritmo

### Ferramentas Mencionadas no Episódio

| Ferramenta | Tipo | Custo | Uso |
|---|---|---|---|
| HatTrack | Tracker | ~$60–70/mês | Tracker principal recomendado; empresa lituana |
| Keitaro | Tracker + Cloaker | Mais barato | Alternativa; complexo de configurar; também é cloaker |
| UTMfy (ATMF) | Dashboard | Variável | Bom para automação de UTMs em volume; sem mid-funnel |
| Nemo | Dashboard | Variável | Migrou para e-commerce; menos foco em DR |
| ClickMagic | Tracker antigo | Variável | Usado antes do HatTrack chegar ao Brasil |
| Stape | Server-side GTM | $30–50/mês | CAPI sem código; alternativa ao tracker completo |
| Google Analytics | Analytics | Gratuito | Análise de comportamento; não para ROI em tempo real |
| Supabase | Banco de dados | Gratuito (500MB) | PostgreSQL na nuvem para começar |
| BigQuery | Banco de dados | Pago (Google) | Para "disposal data" em escala internacional |
| Google Looker Studio | Dashboard | Gratuito | Visualização conectada ao banco de dados |
| Make | Automação | Freemium | Workflows no-code para mover dados |
| n8n | Automação | Gratuito (open source) | Alternativa ao Make; self-hosted possível |
| Ringba | Call tracking | Pago | Mercado PPC internacional (pay-per-call) |
| Everflow | Affiliate tracking | Pago | Mercado internacional de afiliados |
| Vurb | Hospedagem de vídeo | Pago | Host do podcast; plataforma de vídeo |

### Referências de Termos Técnicos

- **PPC (Pay Per Call):** Modelo internacional onde a comissão é paga quando o call center recebe uma ligação de 45+ segundos. Muito diferente do DR brasileiro.
- **DTC (Direct to Checkout):** Link que intermediaria entre página de vendas e checkout — mencionado de passagem.
- **Disposal Data:** Conceito das operações internacionais — todos os dados de compra de mídia armazenados no banco próprio, consultáveis instantaneamente via BigQuery.
- **Traffic Channel:** Termo do HatTrack para identificar a fonte de tráfego (conta de anúncios, perfil).
- **Data Layer:** Camada do navegador que emite eventos com dados de produto — necessária para tracking server-side.
- **fbp / fbc:** Cookies do Facebook usados para atribuição; fbp é o cookie de browser permanente, fbc é gerado pelo clique no anúncio.

### Checklist de Qualidade de Tracking

- [ ] Pixel instalado em todas as páginas do funil
- [ ] CAPI configurada (server-side events chegando no Eventos Manager)
- [ ] UTMs em 100% dos anúncios
- [ ] Tracker com Click ID ativo
- [ ] Sendback de eventos configurado para Facebook e Google
- [ ] Mid-funnel tracking ativo (ver o que acontece entre clique e compra)
- [ ] KPIs definidos e sendo monitorados
- [ ] Banco de dados (Supabase ou superior) para persistir histórico
- [ ] Nenhum dado crítico dependendo só do Google Sheets
