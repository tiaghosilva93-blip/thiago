---
description: Naming Conventions para campanhas de Meta Ads. Cobre: 6 regras de ouro (consistência, brevidade <25 chars, sem caracteres especiais, data AAAA-MM-DD, versão descritiva, autor), taxonomia CLIENTE_PLATAFORMA_OBJETIVO_AUDIÊNCIA_FORMATO_DATA_ESTÁGIO, sistema de status de campanhas, checklist de implementação, template para equipe.
---

O arquivo SRT foi lido na íntegra. Segue o resumo abrangente e aplicável para a equipe de media buyers:

---

# Guia Completo de Convenção de Nomenclatura de Arquivos para Media Buyers

---

## 1. POR QUE NOMEAR CORRETAMENTE É ESSENCIAL

- Economiza tempo na busca de arquivos no futuro
- Permite identificar a versão correta rapidamente, especialmente quando existem múltiplas versões
- Revela a relação entre os arquivos dentro de uma pasta
- Permite ordenar arquivos de forma lógica e intuitiva
- Facilita o trabalho em equipe com múltiplos colaboradores

---

## 2. AS 6 REGRAS DE OURO DA NOMENCLATURA

### Regra 1: Consistência é tudo
- Escolha uma convenção e **siga sempre** — pelo menos dentro de cada pasta/projeto
- Se os arquivos forem nomeados de forma inconsistente, você não conseguirá ordenar nem identificar a relação entre eles
- Todos da equipe devem seguir o mesmo padrão

### Regra 2: Seja descritivo, mas mantenha curto
- Ideal: **abaixo de 25 caracteres**
- Não é necessário incluir todos os possíveis termos de busca — as ferramentas de busca já indexam o conteúdo e metadados dos arquivos
- Um nome curto e descritivo é suficiente

### Regra 3: Evite espaços e caracteres especiais
- Caracteres como `!`, `@`, `#`, `$`, `%`, `&`, `*`, `(`, `)` devem ser **completamente evitados**
- Espaços podem gerar problemas de compatibilidade com sistemas legados (são convertidos para `%20` ou interpretados como separadores)
- Use **hífens** (`-`) ou **underscores** (`_`) para separar palavras
- Espaços são toleráveis em ambientes modernos (OneDrive, Google Drive), mas o ideal é evitar

### Regra 4: Use formato de data correto — sempre AAAA-MM-DD
- Formato obrigatório: **Ano > Mês > Dia** (ex: `2026-04-11` ou `20260411`)
- Isso garante que os arquivos sejam ordenados cronologicamente de forma automática
- Qualquer outro formato (ex: DD/MM/AAAA) quebra a ordenação cronológica
- A data no nome não precisa ser a data de modificação — pode ser a **data de uso/apresentação/lançamento**

### Regra 5: Inclua número de versão ou modificação
- Para arquivos com múltiplas revisões, adicione indicadores de versão
- Use **rótulos descritivos de estágio** em vez de apenas v1, v2, v3 (que não comunicam o propósito)
- Exemplos de estágios para documentos:
  - `vShell` — estrutura inicial, esqueleto para preenchimento
  - `vDraft` — rascunho pronto para revisão
  - `vApproved` — versão final aprovada
  - `vPrez` — versão usada na apresentação
  - `vPreRead` — versão enviada antecipadamente aos participantes
  - `vSigned` / `vExecuted` — para contratos já assinados

### Regra 6: Inclua o autor quando houver múltiplos colaboradores
- Quando diferentes membros da equipe trabalham em arquivos separados, inclua o autor
- Formato sugerido: **primeira inicial do nome + sobrenome completo** (ex: `ASmith`, `JSilva`)

---

## 3. ESTRUTURA DE NOMENCLATURA RECOMENDADA

### Template Geral:
```
[KEYWORDS/CONTEXTO]_[DATA-AAAA-MM-DD]_[MODIFICAÇÃO/VERSÃO]
```

### Aplicado a campanhas de mídia paga:
```
[CAMPANHA]_[PLATAFORMA]_[AUDIÊNCIA]_[TIPO-CRIATIVO]_[DATA]_[ESTÁGIO]
```

### Exemplos práticos para Media Buyers:

| Arquivo | Nome Sugerido |
|---|---|
| Campanha de Black Friday no Facebook | `BlackFriday_FB_Retargeting_2026-11-01_Draft` |
| Criativo de vídeo para cold traffic | `ColdTraffic_YT_Video_2026-04-11_vApproved` |
| Relatório semanal de performance | `PerfReport_Semanal_2026-04-07` |
| Planilha de budget mensal | `Budget_Abril2026_vFinal` |
| Copy de anúncio para teste A/B | `CopyTest_FB_VarianteA_2026-04-11` |
| Criativos enviados ao cliente | `Criativos_Instagram_Carrossel_2026-04-01_vCliente` |

---

## 4. ESTRUTURA DE PASTAS: SIMPLES É MELHOR

### O que NÃO fazer:
Evitar estrutura em árvore muito elaborada com subpastas para cada detalhe, por exemplo:
```
Campanhas/
  Facebook/
    2026/
      Q1/
        Março/
          Criativos/
```
Isso gera confusão sobre **onde colocar** e **onde encontrar** cada arquivo.

### O que FAZER:
- Use **poucas pastas principais** representando assuntos de alto nível (ex: `Facebook`, `Google`, `TikTok`, `Relatórios`, `Criativos`)
- **Evite subpastas** sempre que possível
- Com uma boa nomenclatura, todos os arquivos em uma mesma pasta ficam facilmente filtráveis por ordenação

### Vantagem da pasta plana com boa nomenclatura:
- Permite ver **todos os arquivos relacionados** de uma vez
- A ordenação por nome revela automaticamente a sequência cronológica e os estágios
- Fácil localizar "os arquivos mais recentes em que trabalhei"

---

## 5. TAXONOMIA PARA CAMPANHAS DE MÍDIA PAGA

Com base nos princípios do vídeo, segue uma taxonomia aplicada à realidade de media buyers:

### Componentes do nome (da esquerda para direita, do mais geral para o mais específico):

```
[CLIENTE/PRODUTO]_[PLATAFORMA]_[OBJETIVO]_[AUDIÊNCIA]_[FORMATO]_[DATA]_[VERSÃO]
```

**Legenda de cada componente:**
- `CLIENTE/PRODUTO`: Nome do cliente ou produto anunciado (ex: `Antigravity`, `ClienteX`)
- `PLATAFORMA`: Onde o anúncio roda (ex: `FB`, `IG`, `YT`, `TT` para TikTok, `GG` para Google)
- `OBJETIVO`: Objetivo da campanha (ex: `Lead`, `Conv`, `Brand`, `Traffic`)
- `AUDIÊNCIA`: Segmentação (ex: `Cold`, `Retarg`, `LAL` para Lookalike)
- `FORMATO`: Tipo do criativo (ex: `Video`, `Carrossel`, `Imagem`, `VSL`)
- `DATA`: No formato `AAAA-MM-DD`
- `VERSÃO/ESTÁGIO`: Estado do arquivo (ex: `vDraft`, `vApproved`, `vAo-Vivo`, `vArquivado`)

### Exemplos:
```
Antigravity_FB_Conv_Cold_Video_2026-04-11_vApproved
ClienteX_IG_Lead_Retarg_Carrossel_2026-03-15_vDraft
Antigravity_YT_Brand_LAL_VSL_2026-04-01_vAo-Vivo
```

---

## 6. RASTREAMENTO DE CAMPANHAS PELO NOME

### Como o nome do arquivo funciona como sistema de rastreamento:
- Ao ordenar arquivos **por nome** na pasta, você vê automaticamente todas as versões de uma campanha agrupadas
- Ao ordenar **por data** (dentro do nome), você vê a evolução cronológica
- O estágio no final do nome permite saber instantaneamente o que está ativo, em revisão ou arquivado

### Sistema de status sugerido para campanhas:
| Estágio | Significado |
|---|---|
| `vRascunho` | Criativo/documento em criação |
| `vRevisao` | Enviado para revisão interna |
| `vAprovado` | Aprovado internamente |
| `vCliente` | Enviado ao cliente para aprovação |
| `vAo-Vivo` | Campanha rodando ativamente |
| `vPausado` | Campanha pausada |
| `vArquivado` | Campanha encerrada |

---

## 7. RESUMO EXECUTIVO — CHECKLIST DE IMPLEMENTAÇÃO

Antes de salvar qualquer arquivo, verifique:

- [ ] O nome começa com o contexto mais relevante (campanha, cliente, tipo)?
- [ ] A data está no formato AAAA-MM-DD?
- [ ] O nome tem menos de 25 caracteres (sem contar data e versão)?
- [ ] Não há espaços nem caracteres especiais (`!@#$%&*()`)?
- [ ] Há um rótulo de versão descritivo no final (não apenas v1, v2)?
- [ ] O nome é consistente com os outros arquivos da mesma pasta/projeto?

---

## 8. TEMPLATE RÁPIDO PARA COLAR NO NOTION/SLACK DA EQUIPE

```
PADRÃO OFICIAL DE NOMENCLATURA — EQUIPE MEDIA BUYERS

[CLIENTE]_[PLATAFORMA]_[OBJETIVO]_[AUDIÊNCIA]_[FORMATO]_[AAAA-MM-DD]_[ESTÁGIO]

Plataformas: FB | IG | YT | TT | GG | LI
Objetivos:   Conv | Lead | Brand | Traffic | Retarg
Audiências:  Cold | LAL | Retarg | Custom
Formatos:    Video | VSL | Img | Carrossel | Story
Estágios:    vRascunho | vRevisao | vAprovado | vCliente | vAo-Vivo | vPausado | vArquivado

Exemplo:
Antigravity_FB_Conv_Cold_Video_2026-04-11_vApproved
```

---

Este guia traduz todos os princípios do vídeo (consistência, brevidade, datas no formato ISO, versões descritivas, ausência de caracteres especiais e estrutura de pastas simples) para a realidade operacional de uma equipe de media buyers, criando um sistema que permite rastrear o ciclo de vida completo de cada campanha apenas pelo nome do arquivo.