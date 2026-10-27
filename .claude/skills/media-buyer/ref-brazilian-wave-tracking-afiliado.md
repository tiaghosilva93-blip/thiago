# Tracking de Origem de Venda — parâmetros, postback e automação barata

**Fonte:** Lucas / Brinks (Brazilian Wave), aula do dia 07. Contexto: afiliado de nutra em ClickBank e BuyGoods, **sem acesso ao checkout**.
**Destilado completo:** `~/Antigravity/brazilian-wave/knowledge/2026-07-25_aula-07-tracking-e-estrutura.md`

Complementa `ref-tracking-100mm.md` (Linecker, 4 camadas pixel→UTM→CAPI→tracker). Esta ref cobre o **nível barato e manual** do tracking: como saber de onde veio a venda sem tracker pago.

---

## 1. A premissa

> "A responsabilidade da otimização é do gestor de tráfego. Não ache que é o Facebook, não ache que é o pixel, não ache que é a conta de anúncio."

**O cenário que o tracking evita:** 100 cliques em cada campanha, sai uma venda, você não sabe de onde veio. Resultado provável: **você aumenta o orçamento do criativo que não vendeu e pausa o que estava vendendo.**

## 2. Os parâmetros são da plataforma, não seus

UTM é a nomenclatura conhecida, mas cada checkout define os próprios campos, e eles **mudam sem aviso**. Entender o conceito importa mais que decorar o nome.

| Plataforma | Campos disponíveis |
|---|---|
| **BuyGoods** | `sub_id`, `sub_id2` a `sub_id5` |
| **ClickBank** | `tid`, `aff_sub` a `aff_sub5`, `traffic_source` |
| **Hotmart (nosso)** | `src` |
| **Hubla / GreatPages (nosso)** | campos de UTM |

**Duas pegadinhas documentadas:**
- **BuyGoods**: o relatório na tela mostra só `sub_id` e `sub_id2`; **o postback devolve todos**. Quem confia na tela conclui errado que os outros não funcionam.
- **ClickBank**: valor com muitos espaços **buga** e o parâmetro não chega. Usar traço no lugar de espaço na nomenclatura.

## 3. Postback: como a venda volta para quem originou o tráfego

Hierarquia: o checkout tem os dados do comprador, o produtor tem o que precisa para despachar, o afiliado está no último nível e **não acessa o checkout**. A ponte é o **postback** (webhook servidor a servidor) que reporta a ação de volta.

**O detalhe de maior valor:** a ClickBank dispara postback também no **checkout**, não só na venda.

> "Quando você mexer no seu fechamento, no seu mecanismo, e perceber que a conversão de checkout caiu, você vê se fez sentido."

**Generalização para nós:** rastrear a etapa intermediária transforma mudança de página/copy em **experimento medível**, em vez de palpite sobre o número final. Aplicável a Hotmart e Hubla, que expõem webhook de checkout iniciado.

## 4. Parâmetros dinâmicos no Meta

Em vez de escrever o nome da campanha à mão em cada link, usar os parâmetros dinâmicos no campo "Parâmetros de URL" do anúncio:

```
tid=facebook&aff_sub={{campaign.name}}&aff_sub2={{adset.name}}&aff_sub3={{ad.name}}
```

O Meta sugere `utm_` por padrão; troca-se pelos campos da plataforma de destino.

**Configurou uma vez, toda duplicação herda.** Tracking deixa de ser tarefa recorrente e vira configuração.

**Consequência de método:** como o parâmetro carrega o *nome*, **a nomenclatura vira o relatório**. Ele coloca a hipótese do teste dentro do nome:
`lipo01_presell_vsl-produtor_ads1`
Batendo o olho no clique já se sabe qual página, qual VSL e qual anúncio geraram a venda.

**Nota para as nossas contas:** já usamos `src={{ad.name}}|{{adset.name}}|{{campaign.id}}` concatenado num campo só. Quando a plataforma de destino aceitar **campos separados**, preferir separado: filtra melhor e não depende de parsing na leitura.

## 5. Testar o link ANTES de subir

Colar a URL montada no navegador com valores de teste (`campanha1`, `campanha2`, `campanha3`) e conferir se chegam no relatório da plataforma.

> "Se subir errado, gastou 5 mil reais com link errado, eles vão mandar você fazer o L."

**Diagnóstico complementar (barato e ninguém faz):** gastou orçamento, o Meta mostra 20 cliques e a plataforma mostra **zero**. Isso não é falha de tracking, é sinal de que algo entre o anúncio e o checkout está quebrado. Revisar estrutura, página e player.

→ **Ambos deveriam ser itens fixos do checklist de subida do Theo.**

## 6. Automação barata (quando não há dashboard)

```
venda → postback → webhook no Make (10 mil operações/mês no plano gratuito)
      → linha no Google Sheets
      → notificação no celular
```

**Colunas:** data (convertida para o fuso local **na entrada**, não na leitura) · order ID · produto · network · parâmetros 1 a 5 · quantidade.

**Para que serve na prática:** *"subi o criativo de manhã, são duas da tarde, o orçamento já está razoável e não chegou notificação nenhuma. Vou dar uma olhada."*

**Notificação:** ele usa Pushcut (iOS). Para nós, Telegram ou WhatsApp resolve e é multiplataforma.

## 7. Quando comprar tracker pago

Posição dele: **volume decide, não vontade.** RedTrack (~US$ 150/mês), Hyros e ClickMagic foram feitos para 300-400 vendas/dia. Com 10 vendas/dia, planilha resolve.

> "Vende primeiro. Quando estiver vendendo, US$ 150 por mês não vai ser nada."

Combina com o critério de stack por nível do `ref-tracking-100mm.md`.

## 8. Economia da operação (contexto para leitura de print)

Perguntado sobre lucro num faturamento de R$ 300 mil/mês:

> "Dá mais ou menos 40 a 45% de margem. **Mas não é lucro.** É a grana girando. Você vai pegar e botar de volta na operação."

Recomendação: girar caixa até a operação ter consistência de 7 dígitos mensais antes de tirar lucro. *"Você não tem uma empresa de 7 dígitos com R$ 140 mil de caixa."*

Útil como contraponto quando aparecer print de faturamento: margem declarada de 35-45%, e o caixa é o que limita a escala, não a margem.

## 8b. Princípios de gestão (da parte 1 da mesma aula)

**Aprenda o SEU benchmark, não o do mercado.**
> "O mercado fala que o CPC de emagrecimento é US$ 2. Eu sei que para mim US$ 1,50 já é muito, porque são os meus números."

Benchmark de terceiro é ponto de partida. A régua real é o histórico da própria conta. Vale para todos os números que importamos de fora, inclusive os desta biblioteca.

**Ansiedade é a principal fonte de decisão errada, e o risco maior está na alta.**
> "Quando uma campanha está muito boa, você quer triplicar o orçamento e ela simplesmente morre."

Registrado porque vem do mesmo time que ensina a dobrar orçamento a cada 2 horas: eles próprios reconhecem o risco da escala emocional. Reforça a nossa regra de +32%.

**Não "noiar" com o pixel no começo.**
> "Você tem um público de 6 milhões e fez duas vendas. Não é isso que vai fazer o pixel ficar inteligente ou burro."

No começo, o que resolve é saber qual campanha vendeu, não a maturidade do pixel.

**A aba de transações como instrumento de medida de oferta.** O relatório que mostra quantidade de unidades por pedido é o que mede o efeito de uma mudança no fechamento. Mexeu na oferta → olhe se passou a sair mais kit maior e mais upsell. **É a ponte entre o trabalho de copy e o número de AOV** (conversa direto com `estrategia/resposta-direta-black/references/fechamento-e-aov.md`).

**O link é o único ativo sem rede de proteção.** Ele apaga um dígito do ID de afiliado ao vivo e o link passa a creditar outra pessoa. Não existe recurso.
> "Se subir errado, gastou 5 mil reais por link errado, eles vão mandar você fazer o L."

O equivalente nas nossas contas: link de checkout errado, parâmetro quebrado, pixel de outro cliente. **Conferência de link é item de checklist, não zelo opcional.**

**Escolha de hospedagem é decisão de performance, não de gosto.** Página rápida = connect rate alto = métrica de campanha. Ele descarta WordPress e servidor próprio com o argumento de que não domina a otimização, e domínio genérico (`.online`, ~US$ 1) é reutilizável entre produtos.

## 9. O que aplicar nas nossas contas

**Direto:** postback de checkout como evento separado do de venda · testar link com valores fake antes de publicar · diagnóstico "Meta mostra cliques, plataforma mostra zero" · nomenclatura carregando a hipótese do teste · webhook de venda → planilha + notificação para cliente sem dashboard · conversão de fuso na entrada do dado · critério de volume para comprar tracker.

**Com adaptação:** os campos são de ClickBank/BuyGoods; o equivalente nosso é `src` da Hotmart e UTMs de Hubla/GreatPages. O conceito é idêntico, os nomes não.

**Não aplicável:** escolha de plataforma e fluxo de aprovação de afiliado · Pushcut (iOS) · o conselho de girar caixa até 7 dígitos, que é para operação própria e não para conta de cliente.

## 10. Frase que vale como princípio

> "Não tenha crença limitante de acordo com as experiências alheias. Só o teste é 100% confiável."

Dito contra as regras de mercado que circulam sem evidência ("se o pixel não tiver nota 8 não funciona"). Vale na direção inversa também: **o que está nesta ref é a experiência deles, e também precisa passar pelo nosso teste antes de virar regra nossa.**
