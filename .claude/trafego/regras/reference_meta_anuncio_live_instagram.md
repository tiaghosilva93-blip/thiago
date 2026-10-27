---
name: reference-meta-anuncio-live-instagram
description: Receita via API de anúncio de LIVE AO VIVO do Instagram (Tráfego + INSTAGRAM_LIVE); start_time só depois da live começar
metadata:
  node_type: memory
  type: reference
  originSessionId: 1fd28f19-9f8d-4989-972e-7f6d37643c24
  modified: 2026-09-29T05:56:50.628Z
---

Anúncio de live do IG via API (receita copiada das campanhas manuais do Cliente A, `act_SEU_ID`, jul/2026; aplicada na conta do Cliente B, `act_SEU_ID`, em 29/09/2026):

- Alcance NÃO aceita destino live (API recusa). Usar OUTCOME_TRAFFIC; conjunto destination_type INSTAGRAM_LIVE, optimization_goal LINK_CLICKS (PROFILE_VISIT recusado), lifetime_budget, janela curta.
- Não existe campo "próxima live": criativo é link ad com imagem (object_type SHARE), link instagram.com/<user>/live, CTA WATCH_LIVE_VIDEO com app_destination INSTAGRAM_LIVE_VIDEO e app_link instagram://user?username=<user>&userid=<ig_id legado>.
- Na hora do start_time a Meta checa se o perfil está ao vivo; se não, mata o ad de vez (erro 3843094). 6 de 8 do Cliente A morreram assim. Regra: start 5 min DEPOIS do início da live.
- Gasto cai quase todo em Stories mesmo sem restringir posicionamento. Cliente A: R$55 → 951 cliques.
- Conta do Cliente B está em fuso America/Cuiaba: mandar horário com -0300 explícito.

**How to apply:** conferir pela API 1-5 min após o start_time de cada live se o ad está rodando. Relacionado: [[reference-meta-success-que-nao-grava]]

**Aprendizados out/2026 (Cliente B, perfil `@<perfil_do_expert>`):**
- Programar com DIAS de antecedência funciona (29/09 criada 9h antes rodou; 06-07/10 idem).
- 05/10 aula 19h, R$200, público aberto, posicionamento livre: 2.469 cliques a R$0,08; Stories levou R$106 e fez 2.052 cliques (R$0,05) vs Reels R$0,23 → padrão = SÓ STORIES.
- 07/10 só remarketing engajamento do expert (ENG 90D + ENG 365D, Advantage OFF): R$0,30/clique e não gastou os R$200 → público aberto rende mais.
- A Meta liga sozinha `targeting_relaxation_types.custom_audience` em público personalizado: desligar antes de ativar.
- Janela que o gestor usa: início 10 min depois da live (12h40 pra live 12h30; 19h10 pra 19h), fim no fim da live.
