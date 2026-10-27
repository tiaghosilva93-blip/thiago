# Heurística — Leitura de Conta em 5 Minutos

A primeira coisa que faço quando abro uma conta. O olhar de raio-X.

---

## 🔑 REGRA DURA: a leitura tem DUAS pontas

Quando o cliente tem dashboard próprio de venda aprovada (webhook Hotmart/Hubla/etc):

- **Meta (API/gerenciador):** gasto, CPM, CTR, frequência, impressões, cliques, IC. **Só isso.**
- **Dashboard do cliente:** venda, faturamento, ROAS, CPA. **Sempre.**

🚫 **NUNCA reportar venda / faturamento / ROAS vindo do pixel do Meta.** Nem como prévia, nem como "tendência do dia". Se ainda não olhei o dashboard, digo que não olhei — não substituo pelo pixel.

**Por quê:** o pixel subnotifica pesado e inverte o ranking. Caso real (Cliente A, 26/07/2026): pixel mostrou R$3.699 / ROAS 1,67; o real era **R$7.178 / ROAS 3,23** — **48% subnotificado**. Campanha que parecia boa era a pior e vice-versa. Decidir por pixel = cortar o cavalo e alimentar o pangaré.

**Onde ler o faturamento por criativo:** a tabela de **LTV por anúncio** (LTV = front + order bump + upsell, **creditado ao anúncio que trouxe o cliente**). É ela que resolve o "não identificado", porque o upsell 1-clique não carrega src e ficaria órfão numa tabela de origens crua.
→ Tabela de origens/src serve pra **conferir se o rastreio está chegando certo**, não pra calcular ROAS.

**Fechar sempre:** ROAS real = faturamento do dashboard ÷ gasto do Meta. E conferir se a soma das partes bate com o total do dia.

---

## 🔑 Toda análise de fechamento traz a TABELA ANTES × DEPOIS

Não basta dizer como o dia foi. Tem que comparar **o que foi alterado ontem** com **o resultado de hoje**:

| Campanha | O que fizemos | Orçamento (antes → depois) | ROAS dia anterior | ROAS dia | Veredito |
|---|---|---|---|---|---|

Veredito: ✅ acerto · ❌ erro · ⚠️ direção certa, dose errada · ⏳ dia 1, cedo pra julgar.
Inclui as campanhas **mantidas de propósito** (manter é decisão). Última linha = o dia inteiro.

Depois da tabela: **o que deu certo** e **o que deu errado**, com o *porquê*, e o que já foi corrigido na proposta seguinte.

⚠️ **Puxar as alterações do log do gerenciador** (`/{act_id}/activities` com since/until mostra o de→para de cada orçamento), não da memória do que "foi combinado". Vale o que foi de fato aplicado.
⚠️ Comparar dois dias **pelo mesmo método de leitura**. Se os métodos diferem, a comparação não vale e isso tem que ser dito.

**Por quê:** sem esse placar a operação otimiza no escuro e repete o mesmo erro. Os dois aprendizados mais caros da conta do Cliente A (cortar campanha nova por um dia ruim; cortar tímido demais quem já vinha caindo) só ficaram visíveis quando alteração × resultado foram postos lado a lado.

---

## Perguntas-âncora pra preencher

**1. Em que ordem você abre as abas/relatórios?**
> Meta nível campanha (gasto/CPM/CTR/freq do período) → dashboard filtrado no mesmo período (conferir se o gasto bate) → LTV por anúncio → cruzar → tabela antes × depois.

**2. Quais 5 métricas você bate o olho primeiro e por quê?**
> 1. **ROAS real** (dashboard) — contra o **ponto de equilíbrio**, não contra 1,0
> 2. **CPA** — contra o CPA de equilíbrio (mede a folga pra escalar)
> 3. **Frequência** — o sinal mais precoce de fadiga
> 4. **CPM** — se subiu, ou é fadiga ou é sobreposição de público entre campanhas
> 5. **Gasto x retorno relativo** — quem tem o maior orçamento com o pior ROAS é sempre a primeira correção

**3. O que faz seu "alarme interno" disparar em 30 segundos?**
> - Campanha **abaixo do ponto de equilíbrio** (não ROAS < 1, e sim < equilíbrio calculado)
> - A **maior verba** da conta **não** sendo a melhor em ROAS
> - Frequência subindo + CPM subindo + CTR caindo (fadiga)
> - Mesmo criativo rodando em **várias campanhas** ao mesmo tempo (sobreposição encarece o leilão)
> - Faturamento alto num anúncio, mas o gasto vindo de outra campanha (erro de atribuição)

**4. Como você diferencia "conta saudável travada" vs "conta podre"?**
> Travada: ROAS **sobe** quando a verba sobe (falta orçamento, não demanda). Podre: ROAS cai ao subir verba, ou está abaixo do equilíbrio com frequência alta.

**5. Quando o cliente diz "tá tudo ruim" mas você abre e tá normal, como você responde?**
> _resposta:_

---

## Atalhos mentais que uso

- **CPM baixo + CTR fraco ≠ tráfego lixo.** Validar pelo ROAS antes de condenar. (Cliente A: campanha com CPM R$40 e CTR 2,71% foi a 3ª melhor em ROAS.)
- **Campanha nova com R$0 de faturamento no dia 1** → quase sempre atribuição atrasada, não fracasso. Checar o pixel dela antes de concluir.
- **CPM disparou depois de duplicar o vencedor** → suspeitar de sobreposição de público entre as campanhas, não do criativo.
- **ROAS sobe junto com a verba** → estava travada pelo orçamento; continuar escalando.
- **Bidcap não gasta em conta nova** → não é bid nem orçamento; é falta de histórico. Aquecer antes com CBO/lance automático.

---

## Onde costumo me enganar

- **Reportar ROAS de pixel** achando que serve de prévia. Não serve: já inverteu o ranking de campanha inteiro (48% de subnotificação).
- **Usar tabela de origens/src pra calcular ROAS**, jogando o upsell em "não identificado" e subestimando os anúncios. O certo é LTV por anúncio.
- **Estimar rateio quando o dado exato existe.** Se um criativo roda em várias campanhas, o src carrega o `campaign_id` — dá pra separar com exatidão. Não aproximar.
- **Esquecer campanhas programadas** (agendadas dias antes) ao projetar o gasto do dia. Listar TODAS as ativas, não só as que foram mexidas.
- **Confiar no filtro do dashboard sem conferir.** Sempre validar se o card de gasto bate com o dia antes de ler qualquer tabela.
