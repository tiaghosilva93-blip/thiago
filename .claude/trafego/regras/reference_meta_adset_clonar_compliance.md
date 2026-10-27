---
name: reference-meta-adset-clonar-compliance
description: "Na BM do Cliente A, criar adset do zero via API quebra em compliance (erro 3858634) — sempre clonar um adset existente e renomear"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 7c91cd02-649d-4451-b892-1d42e15da208
  modified: 2026-08-09T03:34:35.518Z
---

Criar conjunto **do zero** via Graph API na conta do Cliente A (`act_SEU_ID`) falha com erro **3858634** — "O anunciante está ausente / forneça um anunciante verificado", blame em `compliance_section`. É o requisito de DSA (União Europeia) de informar beneficiário e pagador do anúncio.

Piora porque os campos `dsa_beneficiary` / `dsa_payor` **não aparecem no GET** dos adsets existentes, então não dá pra ler o valor e replicar na mão.

**Contorno que funciona:** clonar um adset já existente da conta (endpoint `/copies` no adset, apontando `campaign_id` para a campanha nova) e depois renomear + ajustar o que precisar. A cópia herda o compliance junto com todos os outros parâmetros.

Usado em 2026-08-09 pra montar as campanhas CBO 1-5-1 do webinário do Cliente A. Vale testar se o mesmo acontece nas outras contas antes de assumir que é geral — por ora só confirmado nessa BM.

Relacionado: [[reference_meta_duplicar_campanha_api]], [[reference_apis_paginam_sempre]].
