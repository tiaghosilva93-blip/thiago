---
name: reference-meta-anuncio-dinamico-breakdown
description: Como extrair os criativos escondidos de um anúncio dinâmico na API da Meta
metadata:
  type: reference
---

Em anúncio dinâmico / formato flexível, o nó `adcreative` mostra **um único vídeo** e `asset_feed_spec` volta vazio ou nulo. Os criativos reais ficam escondidos.

**O endpoint que revela é o insights com breakdown por asset:**

```
GET /v21.0/<AD_ID>/insights?breakdowns=["video_asset"]&fields=spend,impressions&date_preset=maximum&level=ad
```

Breakdowns que funcionam: `video_asset`, `image_asset`, `body_asset`, `title_asset`, `description_asset`, `call_to_action_asset`, `link_url_asset`. Um breakdown por chamada (não dá pra combinar).

Bônus: além de listar os assets, já vem gasto e impressão por criativo, o que ranqueia os vídeos na hora. Depois valide os IDs contra `GET /act_<ID>/advideos` pra confirmar que estão na biblioteca da conta e pegar título e duração.

Caso real: campanha de webinário de um cliente de concursos, ad "DINAMICO" mostrava 1 vídeo no creative e tinha 10 vídeos no breakdown. Ver [[feedback-meta-sempre-api-nunca-browser]].
