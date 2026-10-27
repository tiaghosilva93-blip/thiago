---
name: reference_meta_duplicar_campanha_api
description: "Duplicar campanha Meta via API — deep_copy quebra >3 objetos, ativar campanha não sobe filhos, rate limit da conta"
metadata: 
  node_type: memory
  type: reference
  originSessionId: b6ca59b4-d845-4364-8c25-6fa7c50de8f8
  modified: 2026-08-23T22:00:18.223Z
---

Duplicar campanha inteira (com conjuntos + ads) pela Graph API e trocar link de destino:

1. **`POST /{campaign_id}/copies` com `deep_copy=true` FALHA** se a campanha tem >3 objetos (erro `1885194` "solicitação de cópia muito grande"). Solução: `deep_copy=false` copia só a shell da campanha; depois `POST /{adset_id}/copies` com `deep_copy=true` + `campaign_id={shell}` por conjunto (adset+seu ad = 2 objetos, passa). Isso também evita o compliance 3858634 (clona conjunto em vez de criar do zero).

2. **Trocar o link de destino = recriar o criativo.** O link mora em `object_story_spec...call_to_action.value.link` (e em `link_data.link` pra imagem). Criativo é imutável: `POST /act_X/adcreatives` com o spec novo (substituir a URL recursivamente) → `POST /{ad_id}` com `creative={creative_id:novo}`. Ao reenviar o spec, **remover `image_url`** (Meta rejeita `image_url`+`image_hash` juntos, erro `1443051`).

3. **Ativar a campanha NÃO ativa os filhos.** Cópia com `status_option=PAUSED` deixa conjuntos e ads pausados. Depois de `status=ACTIVE` na campanha, ativar cada adset e ad também, senão não entrega. Sempre reler `effective_status` dos filhos pra confirmar.

4. **Rate limit da conta (erro 17 "User request limit reached")** é o gargalo real numa duplicação (≈100 chamadas pra 24 ads) — não o método. Retry com backoff de 30s+ e sleep de ~1s entre chamadas. Foi o que fez uma duplicação de 4 campanhas levar >1h. Rodar em background e deixar o script esperar sozinho.

Script de referência (parametrizável por campanha/label/range, com modos make/fill/clean idempotentes): scratchpad da sessão de 2026-08-23 (`dup_quinta.py`). Ver [[feedback_meta_sempre_api_nunca_browser]].
