---
name: reference-escala-meta-dose-certa
description: "A dose certa de aumento e corte de orçamento no Meta — placar de 66 alterações reais, o +32% erra 83% das vezes"
metadata: 
  node_type: memory
  type: reference
  originSessionId: c976ef06-3b2f-4c72-a42b-c15d88ac805b
  modified: 2026-08-15T21:54:22.633Z
---

**Os "+32%" NÃO são a dose recomendada de escala.** São o teto que o Meta tolera sem resetar o aprendizado — um limite de segurança da plataforma, não uma recomendação de quanto escalar.

**Placar real (Cliente A, 66 alterações de orçamento auditadas, 20/07 a 05/08/2026):**

| Faixa da alteração | Casos | ✅ | ❌ | **Acerto** |
|---|---|---|---|---|
| Aumento +10 a +25% | 6 | 3 | 2 | **60%** |
| **Aumento +25 a +35%** | **23** | **3** | **15** | **17%** |
| Aumento +35% ou mais | 1 | 0 | 1 | 0% |
| **Corte −10 a −25%** | **14** | **8** | 2 | **80%** |
| Corte −25 a −35% | 18 | 6 | 3 | 67% |
| Corte −35% ou mais | 4 | 1 | 1 | 50% |

**DUAS CONCLUSÕES:**
1. **Escalar em +32% erra 4 de cada 5 vezes.** A conta absorve 10-25% por vez; acima disso o algoritmo compra impressão mais cara pra gastar a verba e o ROAS cai NO MESMO DIA.
2. **Cortar acerta mais que escalar em TODAS as faixas.** A melhor jogada disponível é **−15 a −25%** (80%).

**Casos mais caros** (campanha voando, derrubada pelo aumento): 7,65→2,14 · 7,52→2,43 · 6,06→1,05 · 5,11→1,11 (+50%) · 5,00→1,25 · 3,44→0,71 · 3,20→1,32.

⚠️ **A regra vale pra CONTA INTEIRA, não só pra campanha.** Em 15/08/2026 o Cliente A abriu o dia com **+101%** (R$2.202 → R$4.427, somando 3 frentes novas). Resultado às 18h: gastou 57% a mais que um sábado comparável e trouxe **exatamente os mesmos 38 checkouts**, com a conversão checkout→venda caindo pra **24%** (base 38-41%). Não foi sobreposição de leilão — o CPM por criativo ficou estável e a frequência em 1,1-1,2. **A verba extra vira impressão mais barata e mais fria.** Ver [[reference_conversao_checkout_venda]].

⚠️ **Campanha com 1 DIA de vida não recebe aumento, por melhor que tenha sido a estreia.** Em 16/08/2026 o Ads19_gancho1 estreou em 2,80 e subiu de R$250 pra R$290 na mesma noite; no dia seguinte fez **0,18 gastando 144% do orçamento**. Estreia forte é atribuição concentrada, não tendência. Esperar 3 dias.

⚠️ **O CBO desta conta gasta ~10% ACIMA do configurado todo dia** (102% a 144% em 17/08; as 1-5-1 chegam a 131%). **Somar +10% ao planejar o total do dia**, senão o orçamento planejado e o gasto real divergem sempre.

**REGRA DE BOLSO:**
| Situação | Ação |
|---|---|
| Escalar campanha boa | **+15% a +20%** |
| Campanha acima da faixa provada | **−15% a −25%** |
| Campanha caindo dentro da faixa | −25 a −30% |
| Zerada há 2+ dias | **pausar** (corte só recuperou 2 de 8) |
| Precisa de muito mais verba | **duplicar em campanha nova** |

**Como auditar em qualquer conta:**
```
GET /{act_id}/activities?fields=event_type,event_time,object_id,object_name,extra_data&since=&until=&limit=250
filtrar event_type == "update_campaign_budget"  ·  PAGINAR
```
⚠️ `extra_data` é STRING JSON com valores ANINHADOS: ler `ex["old_value"]["old_value"]` e `ex["new_value"]["new_value"]`.
⚠️ Casar por `object_id` (o `object_name` vem truncado). Consolidar edições do mesmo dia. Alteração antes das 7h vale pro dia dela; depois, pro dia seguinte. Descartar dias com gasto < R$20.

Detalhe completo em `.claude/trafego/meta-ads-brain/heuristicas/quando-escalar.md`.
Relacionado: [[reference_otimizacao_meta_cbo]] · [[reference_modelo_cbo_escala]]
