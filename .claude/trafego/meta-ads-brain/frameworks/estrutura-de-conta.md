# Framework — Estrutura de Conta

Como eu organizo uma conta Meta Ads do zero. O "esqueleto" antes de existir criativo.

---

## Já temos (em outras skills)

- `meta-ads-fundamentos`: matriz de objetivo, CBO vs ABO, hierarquia de audiência
- `media-buyer/ref-meta-ads-1m-dia.md`: estrutura Pedro/Dairo pra escala extrema

Este arquivo é a SUA versão personalizada.

## Perguntas-âncora

**1. Quantas campanhas você tem em uma conta saudável?**
> _resposta:_
> Ex: 1 prospecting frio + 1 retargeting + 1 LAL + 1 brand defense

**2. Como você separa por funil/objetivo/audiência?**
> _resposta:_

**3. Sua regra pra CBO vs ABO?**
> _resposta:_
> Ex: "ABO pra teste com 3-5 adsets, depois migra pra CBO em vencedor"

**4. Quantos anúncios por conjunto você considera ideal?**
> _resposta:_

**5. Como você organiza retargeting (camadas, exclusões)?**
> _resposta:_

**6. Brand defense: usa? como?**
> _resposta:_

---

## Naming convention (a casa)

Padrão mínimo já estabelecido:

```
[Cliente]_[Objetivo]_[Audiência]_[YYYY-MM]
└─ [Audiência detalhada]_[Placement]
   └─ [Ângulo]_[Formato]_v[N]
```

**Sua versão completa (preencher):**
> _resposta:_

---

## Templates por tipo de cliente (preencher)

### Cliente novo / fase de teste
> _resposta:_

### Cliente validado / fase de escala
> _resposta:_

### Cliente sazonal (lançamento, Black Friday)
> _resposta:_

---

## Subir conjunto via API em conta travada por DSA (caso Cliente A)

**Sintoma:** `POST /act_<id>/adsets` do zero falha com `error_subcode 3858634`, `blame_field_specs: ["compliance_section"]`, título "O anunciante está ausente". É o requisito de DSA (União Europeia) de informar beneficiário e pagador. Piora porque `dsa_beneficiary` / `dsa_payor` **não aparecem no GET** dos adsets existentes, então não dá pra ler e replicar na mão.

**Contorno:** não criar do zero. Clonar um adset existente via `POST /<adset_id>/copies` com `campaign_id` apontando pra campanha nova, `deep_copy=false` (não traz os anúncios) e `status_option=PAUSED`. A cópia herda o compliance junto com todo o resto. Depois renomear e ajustar via `POST /<novo_adset_id>`.

**Os 3 pré-requisitos da base que você vai clonar** (se faltar 1, a cópia falha):

| Requisito | Por quê | Erro se ignorar |
|---|---|---|
| **Mesmo objetivo** da campanha destino | Meta não copia adset entre objetivos diferentes | `1815149` — "Objective Mismatch: Ad set can not be copied into X because it uses a different objective" |
| **Zero `custom_audiences`** na base | Conflita com Advantage+ audience da campanha nova | `1359202` — "Não é possível desabilitar as opções do Advantage... porque sua campanha usa o público Advantage+" |
| **Recente o bastante pra ter DSA** | Adset antigo não carrega o compliance, então a cópia dele cai no mesmo erro do zero | `3858634` — mesmo erro do POST direto |

**Armadilha (2026-08-12):** a chamada que falhou com `1359202` **retornou erro MAS criou o adset assim mesmo**. Sempre listar os adsets da campanha depois de um clone que deu erro e deletar a sobra — senão a estrutura fica com conjunto fantasma.

**Limites do ajuste pós-clone:** `name`, `destination_type`, `targeting` inteiro, `attribution_spec` e `status` sobrescrevem normal. Já campos **aninhados** do `promoted_object` (ex: `whatsapp_phone_number`, `page_id` herdados de uma base WhatsApp) **não têm como limpar** — mandar `null` retorna `success: true` e não apaga. Se o resíduo incomodar, o jeito é clonar de uma base limpa e deletar o sujo.

**Rate limit:** rajada de clone + update derruba a conta em `code 17 / error_subcode 2446079` ("quantidade excessiva de chamadas de API"). Espaçar 5-10s entre chamadas e aceitar esperar alguns minutos pra voltar a ler.

**Onde isso apareceu:** BM `<BM_ID>` (Cliente A, expert de concursos), conta `act_SEU_ID`, montando a CBO 1-10-1 de um funil de concurso. Vale testar se acontece nas outras contas antes de assumir que é geral — por ora confirmado só nessa BM.
