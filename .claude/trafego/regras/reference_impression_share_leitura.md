---
name: impression-share-leitura
description: "Como ler parcela de impressões no Google Ads sem tirar conclusão errada — IS rede vs IS exata, e por que orçamento só existe por campanha"
metadata: 
  node_type: memory
  type: reference
  originSessionId: c047af3a-2c21-4a4d-9f37-0c360be192d2
  modified: 2026-08-11T05:10:09.057Z
---

Aprendido na análise da conta Google Ads do Cliente A (um expert) em 10/08/2026, depois de eu errar a leitura e o gestor pegar.

## As três métricas e o que cada uma responde

| Métrica | O que é | Onde existe |
|---|---|---|
| **IS rede** (`search_impression_share`) | dos leilões ELEGÍVEIS, em quantos apareceu | campanha, grupo, palavra-chave |
| **IS exata** (`search_exact_match_impression_share`) | mesma conta, mas só sobre buscas que correspondem ao SIGNIFICADO da palavra | campanha, grupo, palavra-chave |
| **Perde por classificação** (`search_rank_lost_impression_share`) | perdeu por Ad Rank baixo (lance + qualidade do anúncio + experiência da página) | campanha, grupo, palavra-chave |
| **Perde por orçamento** (`search_budget_lost_impression_share`) | perdeu porque a campanha ficou sem verba no dia | **SÓ CAMPANHA** |

As três somam ~100%: aparece + perde por posição + perde por dinheiro.

## ERRO QUE EU COMETI — não repetir

**Agreguei tipos de correspondência diferentes na mesma palavra-chave.** Somei `[nome do expert]` exata com `nome do expert` ampla e concluí que a conta "perdia 110 mil buscas do próprio nome". Falso.

Separando por tipo, a verdade era o oposto:
- `[nome do expert]` **exata**: 84,8% de participação, perde só 15% por classificação. Bem posicionada.
- `nome do expert` **ampla**: 9,0% de IS rede, mas **56,6% de IS exata**.

**Por que a ampla marca 9%:** ela fica elegível para um oceano de buscas vagamente relacionadas, e o Google conta todas no denominador. Não é má posição, é denominador inflado.

O gestor pegou o erro comparando com o planejador de palavras-chave: "não tem 100k de volume mensal no nome dele". Estava certo.

**REGRAS:**
1. NUNCA somar tipos de correspondência ao calcular participação. Sempre separar exata / frase / ampla.
2. Para palavra em **ampla**, a métrica que vale é **IS exata**, não IS rede.
3. IS rede baixo em ampla é esperado e não é diagnóstico de problema.
4. Impressões perdidas calculadas como `impressões / IS × perda` são do PERÍODO INTEIRO, não mensais. Dividir pelos meses antes de comparar com volume de busca.

## Análise de Leilão (concorrentes)
Não sai por API nem por script, só na interface: campanha ou palavra → Insights e relatórios → Análise de leilão.
**Não aparece quando a participação é menor que 10%** — então palavra em ampla a 9% costuma não mostrar concorrente nenhum.

Ver [[reference_otimizacao_meta_cbo]].
