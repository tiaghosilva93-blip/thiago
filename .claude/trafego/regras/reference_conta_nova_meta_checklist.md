---
name: conta-nova-meta-checklist
description: "Os 4 bloqueios que toda conta de anúncio nova bate antes de rodar, e como reaproveitar criativo sem reenviar vídeo"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9c49c612-8823-4c53-a775-2ff0be0e8dd2
  modified: 2026-08-10T02:51:15.432Z
---

Levantado subindo a bidcap do Cliente A numa conta de parceiro (10/08/2026). Vale pra qualquer conta nova.

## 1. Pixel não vem compartilhado
O Meta deixa criar campanha e conjunto normalmente e **só recusa na criação do ANÚNCIO** (`subcode 1815045`). Perde-se a viagem inteira se não conferir antes.
```
POST /{pixel_id}/shared_accounts?account_id=<id_sem_act>&business=<bm_dona_do_pixel>
```

## 2. `dsa_beneficiary` e `dsa_payor` são obrigatórios
Sem eles o conjunto é recusado com `subcode 3858081` ("Insira a pessoa ou organização sendo promovida"). Copiar do conjunto que já roda na conta antiga.

## 3. Cadastrar a conta no dashboard
Sem a linha em `meta_contas`, o gasto não é ingerido e a campanha aparece com R$0 — parece ROAS infinito.

## 4. Criativo NÃO precisa de reupload
Os anúncios apontam para posts da página (`effective_object_story_id`). Criar o criativo na conta nova com `object_story_id` reaproveita **o mesmo vídeo e a mesma prova social acumulada**, sem enviar arquivo. Copiar junto o `degrees_of_freedom_spec` (os 82 recursos de IA em `OPT_OUT`) e o `url_tags`.

## Fuso horário é escolha permanente
Depois que a conta gasta **qualquer valor**, fuso e moeda não mudam mais; o fluxo do "mudar fuso" no Ads Manager **fecha a conta e cria outra**. Conta em fuso errado desalinha o reset do orçamento diário e o corte do dia no relatório.
**Contorno:** faixa de horário (`adset_schedule`) com `timezone_type: USER` segue o relógio de **quem vê** o anúncio, não o da conta. Custo: dayparting **exige orçamento vitalício** — CBO com orçamento diário é recusado (`subcode 1487675`, verificado em teste seco).

🔑 **`execution_options=['validate_only']` valida a chamada inteira sem criar nada.** Usar sempre antes de montar estrutura grande em conta desconhecida.


## 5. Vídeo grande não sobe por POST direto
Envio multipart simples de arquivo acima de ~100 MB devolve **HTTP 413**. Usar upload em pedaços:
```
POST /act_X/advideos  upload_phase=start&file_size=<bytes>   → upload_session_id, video_id, start_offset, end_offset
POST /act_X/advideos  upload_phase=transfer&upload_session_id=..&start_offset=..  (+ video_file_chunk)  → repetir até start_offset==end_offset
POST /act_X/advideos  upload_phase=finish&upload_session_id=..
```
Conferir com `ffprobe` antes de enviar e checar `video_status == ready` depois. Baixar/subir **um por vez com limite de banda** — 10 vídeos de 300 MB em paralelo travam a máquina do usuário.

## 6. Fuso horário e horário de início
Conta em fuso diferente do BR: marcar o início na **virada do dia de orçamento da conta** (para Los Angeles, 04h00 BRT = meia-noite local). Começar 00h01 BRT faz a campanha pegar as últimas horas de um dia de orçamento e resetar logo em seguida.
O Meta reescreve o `start_time` no fuso da conta — `2026-08-12T04:00:00-0300` volta como `2026-08-12T00:00:00-0700`. É o mesmo instante, não é erro.

## 7. "Limite de gastos da campanha" é VITALÍCIO
Não existe teto diário separado no Meta: o teto do dia **é** o orçamento diário. E limite aplicado no meio do dia só vale no dia seguinte — a campanha já gastou o que gastou.

