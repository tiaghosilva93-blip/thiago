---
name: reference-apis-paginam-sempre
description: "Toda API/banco corta resposta em página — Supabase 1000 linhas e Graph API do Meta por `limit`; sempre seguir a paginação"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 304431cc-563a-4905-b381-4c8bd9ae9045
  modified: 2026-07-29T04:47:12.829Z
---

**Regra: nenhuma fonte devolve tudo de uma vez.** Truncamento é sempre
SILENCIOSO (HTTP 200, sem erro) e a soma sai menor com cara de número certo.
Ao integrar qualquer fonte, a primeira pergunta é "isso pagina?".

Casos já pagos, os dois no mesmo painel:

| fonte | corte | sintoma |
|---|---|---|
| **Supabase / PostgREST** | 1000 linhas por request | gasto por hora 18% menor (R$14.168 vs R$17.316) |
| **Graph API do Meta** | `limit` da chamada; resto atrás de `paging.next` | insight por hora trazia 500 de 2.200 linhas (**77% faltando**) |

**Como detectar:** número redondo suspeito no total (exatamente 500, 1000).
Melhor ainda: **cruzar com uma fonte que não trunca**. No dashboard de vendas do Cliente A, somar
`meta_horario` (por hora) e comparar com `meta_campanhas` (por dia) — tem que
bater. Depois do fix bateu com R$2,41 de diferença em R$40 mil.

**Correção:** Supabase → helper `paginar()` com `.range()`. Meta → helper
`fetchMetaPaged()` que segue `paging.next` até acabar (trava de 40 páginas).

**Impacto que isso teve na decisão:** a conversão de checkout por período
mostrava Madrugada 34% / Noite 100% (parecia que noite convertia 3x melhor).
Com os dados completos: 25% / 28% — **todos os períodos convertem igual**.
Quase virou decisão de cortar veiculação de madrugada sem motivo.

Ver também [[meta-success-que-nao-grava]] (o mesmo problema silencioso, na escrita).
