---
titulo: Padrão de mensagem de relatório de campanhas
data: 2026-10-14
status: REGRA DURA (gestor: "odeio coisa não formatada")
---

# Padrão de mensagem (relatórios de campanhas e tráfego)

**Toda mensagem com número, relatório, status ou proposta de tráfego segue este padrão. Sem exceção.** Parágrafo corrido com número no meio é proibido.

Marcadores: `*negrito*`, `_itálico_` (formato de chat). Se o envio formatado falhar, NÃO manda em texto puro: corrige e reenvia.

## Estrutura (nessa ordem)
```
*📊 CLIENTE · CONTA OU ASSUNTO*          ← título em CAIXA ALTA, negrito, 1 emoji
_Fonte e hora da leitura · o que foi alterado_   ← itálico, 1 linha

*SEÇÃO EM CAIXA ALTA* · período
• Métrica: *valor* ✅/⚠️/🔴 referência    ← 1 métrica por linha, vertical
• Métrica: valor

*⚠️ ATENÇÃO*                             ← só se tiver
• 1 linha por ponto

*❓ DECISÃO*                              ← sempre a última seção, se precisar do gestor
Pergunta fechada?
Opção A · Opção B
```

## Regras
- Uma métrica por linha, empilhada (o gestor rejeitou layout horizontal).
- Negrito só no número que decide e nos títulos.
- Semáforo ao lado do número que tem referência: ✅ dentro do teto, ⚠️ encostando (até 10% do teto), 🔴 estourou.
- Período sempre explícito na seção (datas), nunca "essa semana".
- Linha em branco entre seções.
- Máximo ~20 linhas. Passou disso: resumo aqui + link do documento.
- Mensagem curta de conversa (confirmação, "rodando, chega em 2 min") pode ser texto simples de 1 a 2 linhas.
- Nunca travessão (—).

## Exemplo aprovado como modelo (14/10)
```
*📊 CLIENTE A · CONTA PRINCIPAL*
_Lido na API às 01:35 · nada alterado_

*AULA DE TERÇA* · 07 a 13/10
• Leads: *2.890*
• Investimento: R$ 6.206
• CPL: *R$ 2,15* ✅ teto R$ 3,00

*CAPTAÇÃO QUINTA 15/10* · desde 13/10
• Leads: *302*
• Investimento: R$ 497
• CPL: *R$ 1,65* ✅
• Projeção até qui 19h: ~820 _(base de 1 dia)_

*⚠️ ATENÇÃO*
• CRIATIVO X (R$ 2,97) e CRIATIVO Y (R$ 2,84) encostando no teto
• CRIATIVO Y: só 6 leads quentes de 53

*❓ DECISÃO*
Ada revisa CRIATIVO X e CRIATIVO Y pra aula do dia 20?
Sim · Não
```

## Relatório de campanhas pedido pelo gestor (MODELO 1, aprovado 16/10/2026)
Vale pra TODO relatório de anúncios que o gestor pedir (qualquer cliente, qualquer período). O relatório automático das 8h30 tem formato próprio já aprovado e não muda.
Seções obrigatórias, nessa ordem:
```
*☀️ CLIENTE · RELATÓRIO*
_Lido na API às HH:MM · nada alterado_

*📅 HOJE · DD/MM*
• Investido: R$ X
• Leads: *N*            (ou Vendas / Checkouts, conforme o funil)
• CPL: *R$ X*

*🗓️ PERÍODO · DD e DD/MM*        (desde o início da campanha, ou o período que ele pediu)
• Investido: R$ X
• Leads: *N*
• CPL: *R$ X* ✅ teto R$ Y

*🔎 PERÍODO PEDIDO · DD a DD/MM*   (só quando ele pedir um período específico)

*📊 POR CAMPANHA*
*Nome curto da campanha* · R$ X/dia
• Hoje: R$ X · N leads · CPL R$ X ✅
• Período: R$ X · N leads · CPL R$ X ✅

*🏆 MELHOR CRIATIVO*
Nome legível do criativo · CPL R$ X no período

*⚠️ ATENÇÃO*  (só se tiver)
*❓ DECISÃO*  (só se precisar dele)

🔗 Abrir no Gerenciador: <link do adsmanager com act e as campanhas do relatório>
```
Regras do modelo:
- Nunca código cru de criativo ("P02"): sempre código + apelido legível tirado da arte ou do texto ("P02 Cansado da conta").
- Nunca "15+16": escrever "15 e 16/10" ou "15 a 20/10".
- Uma métrica por linha; semáforo só ao lado do número que tem teto.
- O link do Gerenciador é obrigatório: https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=<ID sem act_>&selected_campaign_ids=<ids separados por %2C>
