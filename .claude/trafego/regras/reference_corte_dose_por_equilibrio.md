---
name: corte-dose-por-equilibrio
description: O teto de ~20% em corte só vale ACIMA do ponto de equilíbrio; abaixo dele a dose certa é 30-40% ou pausar
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9c49c612-8823-4c53-a775-2ff0be0e8dd2
  modified: 2026-08-10T02:51:29.442Z
---

**A regra de corte tem duas metades e misturar as duas custa dinheiro.**

| Situação da campanha | Dose certa |
|---|---|
| **Acima** do ponto de equilíbrio, mas fraca | corte **≤20%** e realocar — o objetivo é preservar aprendizado |
| **Abaixo** do ponto de equilíbrio | **30-40% ou pausar** — o objetivo é estancar, aprendizado não importa |
| Dia 1 de campanha nova | **não cortar** — quase sempre é atribuição atrasada |
| Gastando acima da faixa histórica onde rende | trazer de volta **pra faixa**, não cortar 30% mecanicamente |

Ponto de equilíbrio do Cliente A: **ROAS 1,13** (taxas comem 11,2% do bruto).

**Erro documentado (27/07/2026):** cortei ESCALA CHECKOUT só −20% com ROAS 1,27 caindo e ela furou o piso (**0,90**, prejuízo real). ESCALA 2 cortada −15% caiu 2,17 → 1,34 queimando R$517. **Corte tímido em campanha em queda é dinheiro jogado fora.**

**Uso correto (09/08/2026):** o gestor questionou cortes >30% achando que violavam a regra. Não violavam — as três estavam em 0,81 / 0,95 / 0,00, todas abaixo de 1,13. O que estava errado era o corte de −25% que eu tinha proposto no Ads40-49 WW, **tímido demais**; virou −33%.

🔑 Antes de escolher a dose, a pergunta é sempre: **está acima ou abaixo do equilíbrio?** Sem esse número toda decisão de cortar é chute.

Ver [[reference_escala_meta_dose_certa]], [[reference_teto_de_escala_por_faixa]] e `.claude/trafego/meta-ads-brain/heuristicas/quando-pausar.md`.
