---
name: estrutura-teste-criativo
description: "Forma canônica de teste de criativo em CBO: 3 conjuntos, 8 anúncios, distribuição 3-3-2 — medido em 27 campanhas"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9c49c612-8823-4c53-a775-2ff0be0e8dd2
  modified: 2026-08-17T02:59:32.337Z
---

**A estrutura de teste tem efeito medível no ROAS, e a diferença é grande.** Medido no Cliente A em 09/08/2026, todas as campanhas com mais de R$200 de gasto entre 20/07 e 08/08.

| Estrutura | ROAS observado |
|---|---|
| **1-3-8 · 3 conjuntos, dist 3-3-2** ✅ | **2,34 · 2,21 · 2,16 · 2,16** (4 campanhas, R$15.674, 154 vendas) |
| 1-3-3 · 1 anúncio por conjunto | 2,18 · 1,90 · 1,87 · 1,19 · **0,00** |
| **1-3-10 · dist 4-3-3** ❌ | **1,37 · 0,94** |
| 1-4-x | 1,64 · 0,56 · **0,00** |
| **1-1-x · um conjunto só** ❌ | **0,80 · 0,00** |

**O 1-3-8 é o único que repete o resultado.** Quatro campanhas com a mesma forma, todas entre 2,16 e 2,34.

**O 1-3-3 é loteria:** a mesma forma deu 2,18 numa campanha e 0,00 em outra. Com um anúncio por conjunto, criativo ruim mata o conjunto inteiro e não existe plano B dentro dele.

**Espalhar demais é pior que concentrar:** 10 anúncios em 3 conjuntos (4-3-3) deu 1,37 e 0,94, o pior entre as estruturas de teste.

**Um conjunto só nunca funcionou** em nenhuma tentativa.

## Regra
Teste de criativo em CBO: **3 conjuntos, 2 a 3 anúncios em cada, no máximo 8 no total.** Se o lote tem mais que 8 criativos, quebrar em duas campanhas em vez de espremer numa só.

Isolar vencedor é outra coisa: aí é **CBO 1-3-1**, 3 conjuntos idênticos com o MESMO criativo já provado em cada um. Foi a melhor campanha da conta (ROAS 2,73 em 20 dias, R$6.364, 82 vendas).

⚠️ Não confundir teste com isolamento. Teste procura vencedor, isolamento dá pista livre a quem já ganhou.

## Orçamento inicial de uma isolada (medido em 13 campanhas, 16/08/2026)
| Gasto do dia 1 | Campanhas | ROAS dos 3 primeiros dias |
|---|---|---|
| **até R$199** | 5 | **0,25** |
| **R$200-349** | 8 | **1,66** |

🔑 **Nascer com menos de R$200 mata a isolada.** As 5 que começaram em R$197 falharam todas. A faixa que produz retorno é **R$250 a R$330**; melhor caso individual R$281 → 3,07.
🔑 **A conta certa é POR CONJUNTO, não pelo total:** R$197 ÷ 3 conjuntos = R$65 e não sai do aprendizado; R$250-297 dá R$83-99. Numa 1-5-1, R$250 daria só R$50 por conjunto — pior que o valor que já fracassou.
⚠️ Dentro da faixa boa o resultado ainda varia de 0,00 a 3,07. **O orçamento decide se a campanha tem chance; o criativo decide o resultado.**

## 1-5-1: mais rápido, não melhor (dia 1, 16/08/2026)
5 isoladas estrearam no mesmo dia: 2 em 1-5-1 e 3 em 1-3-1.
| Estrutura | ROAS | Conversão | % do orçamento gasto |
|---|---|---|---|
| 1-5-1 | 1,97 | 38% | **124% a 131%** |
| 1-3-1 | 1,53 (2,19 sem o criativo ruim) | 36% | 79% a 99% |

🔑 **Mais conjuntos = mais entrega em paralelo, e o 1-5-1 ESTOURA o orçamento em 24-31%.** Ele acelera o que o criativo já é: bom rende mais rápido, ruim queima mais rápido. **Contar com ~25% a mais de gasto ao planejar o dia.**
🔑 **A vantagem aparente do 1-5-1 era criativo, não estrutura** — a conversão foi praticamente igual nas duas (38% e 36%), que é onde a diferença apareceria se a estrutura mudasse a qualidade do tráfego.

Ver [[reference_teto_de_escala_por_faixa]] e [[reference_escala_meta_dose_certa]].
