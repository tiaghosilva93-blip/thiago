---
name: creative-fatigue
description: >
  Detecta fadiga de criativo no Meta Ads (CTR caindo, CPM subindo, frequency alto)
  e define quando trocar. Inclui tabela de alertas verde/amarelo/vermelho, cadência
  de revisão semanal, regra "substituir não pausar" e 8 ângulos de criativo pra
  evitar fadiga. Adaptado pro nicho infoproduto/concursos públicos.
tags: [meta-ads, criativo, fadiga, frequency, ctr, cpm, otimizacao]
---

# Meta Ads — Diagnóstico e Combate à Fadiga de Criativo

Criativo em tráfego pago tem prazo de validade. Quanto mais a mesma pessoa vê o mesmo ad, menos engaja. Em infoproduto/concursos isso acontece **mais rápido que B2B** porque o pool de leads quentes é menor e a frequência sobe rápido.

## Quando esta habilidade é acionada

- CTR caindo ao longo de semanas sem mudança em targeting/budget
- CPM subindo na mesma audiência
- Frequency > 3 em 7 dias
- CPL/CAC subindo gradualmente
- Cadência preventiva (revisão semanal)
- Lead com qualidade caindo (mais "curiosos", menos compradores)

## Tabela de alertas

| Métrica (janela 7d) | 🟢 Saudável | 🟡 Atenção | 🔴 Fadiga |
|---|---|---|---|
| **Frequency** | < 1.8 | 1.8 – 3.0 | > 3.0 |
| **CTR vs baseline 14d** | ±10% | -10% a -25% | < -25% |
| **CPM vs baseline 14d** | ±10% | +10% a +30% | > +30% |
| **CPL/CPA tendência (14d)** | estável ou caindo | subindo gradual | +30% em 14 dias |
| **Hook Rate (3s) vídeo** | > 30% | 20-30% | < 20% |
| **Hold Rate (15s) vídeo** | > 15% | 10-15% | < 10% |

**Regra de gatilho:** 2+ amarelas OU 1+ vermelha → trocar criativo.

## Por que a fadiga acontece (4 causas)

1. **Saturação da audiência** — mesma audiência viu o ad várias vezes. **Trocar criativo resolve.**
2. **Concorrência no leilão** — mais anunciantes mirando o mesmo público. Criativo novo ajuda pouco.
3. **Sazonalidade** — feriados, virada de mês, evento do nicho (data de edital, prova). Esperar passar.
4. **Mudança no algoritmo Meta** — entrega muda. Investigar antes de trocar tudo.

**Diagnóstico rápido:** frequency alto + CTR caindo = saturação (causa 1). Frequency baixo + CPM alto = leilão (causa 2). Não confunda.

## Workflow recorrente

### 1. Cadência de revisão

| Frequência | O que olhar |
|---|---|
| **Semanal** | Frequency e CTR do top 5 criativos por gasto |
| **Quinzenal** | Lista de criativos a substituir (com hipótese de novo ângulo) |
| **Mensal** | Lançar lote novo de 3-5 variações por adset principal |

### 2. Puxar números (Graph API)

```python
import os, requests
from dotenv import load_dotenv
load_dotenv(os.path.expanduser('~/.claude/secrets.env'))
token = os.environ['META_ACCESS_TOKEN']

# Insights por anúncio dos últimos 14 dias
url = f"https://graph.facebook.com/v21.0/{ACCOUNT_ID}/insights"
params = {
    'access_token': token,
    'level': 'ad',
    'date_preset': 'last_14d',
    'fields': 'ad_id,ad_name,impressions,clicks,ctr,cpm,frequency,spend,actions,video_p25_watched_actions,video_p75_watched_actions',
    'time_increment': 1,
    'limit': 500
}
r = requests.get(url, params=params)
```

### 3. Classificar

Pra cada criativo ativo:
1. Compara últimos 14 dias com 14 anteriores
2. Classifica: **SAUDÁVEL**, **ATENÇÃO**, **FADIGA** (usando tabela acima)
3. Pros em FADIGA: sugere ângulo de substituição (ver lista de 8 ângulos abaixo)

### 4. Substituir, NÃO pausar de uma vez

Boa prática:
- Mantém o ad antigo rodando enquanto sobe o novo
- Deixa 7 dias em paralelo
- Se o novo bate o antigo → pausa o antigo
- Se o novo é pior → pausa o novo e investiga (hipótese errada? landing page? oferta?)

Por quê: pausar de uma vez perde sinal histórico de comparação e zera o aprendizado do conjunto.

### 5. Documentar

Atualiza `.claude/trafego/clientes/[cliente]/ads-history.md` (ou equivalente):
- O que pausou e por quê
- O que entrou e qual era a hipótese
- Resultado depois de 14 dias

## Cadência de criativos novos por formato

| Formato | Renovar a cada | Variações por lote |
|---|---|---|
| **Reels / Stories** | 2-3 semanas | 3-5 |
| **Feed estático** | 3-4 semanas | 3-5 |
| **Vídeo UGC depoimento** | 4-6 semanas | 2-3 |
| **Vídeo de aula/conteúdo** | 4-6 semanas | 2-3 |

Reels fadiga mais rápido que feed estático porque algoritmo prioriza novidade.

## 8 ângulos de criativo pra evitar fadiga

Em vez de só variar headline/cor, **varie a estrutura do ângulo**:

| # | Ângulo | Exemplo (nicho concursos) |
|---|---|---|
| 1 | **Dor/problema** | "Você estudou 6 meses e zerou em raciocínio lógico?" |
| 2 | **Resultado/promessa** | "Aprovado em 4 meses estudando 3h por dia" |
| 3 | **Prova social/case** | "Maria, 38, dona de casa, passou em 2º lugar" |
| 4 | **Comparação** | "Apostila gigante vs 5 questões certeiras por dia" |
| 5 | **Educacional** | "3 erros que reprovam em redação discursiva" |
| 6 | **UGC depoimento** | Aluno gravando no celular contando a história |
| 7 | **Provocação/contrária** | "Estudar 8h por dia é o pior conselho que te deram" |
| 8 | **Bastidores/método** | "Como a gente monta o cronograma de revisão espaçada" |

**Regra:** num lote de 5 variações, use **3 ângulos diferentes**, não 5 variações do mesmo ângulo.

## Sinais de que NÃO é fadiga (e sim outra coisa)

| Sintoma | Provável causa | O que fazer |
|---|---|---|
| CTR caiu de uma vez (não gradual) | Mudança de audiência ou tracking | Checar pixel, recente mudança de adset |
| Frequency baixo + CPM alto | Leilão concorrido | Trocar criativo ajuda pouco; rever audiência/horário |
| CPL alto + CTR estável | Problema na LP ou no checkout | Roda `meta-ads-funil-diagnostico` |
| Performance varia dia a dia sem padrão | Amostra pequena | Aguarda mais dados (mín 1000 impressões/ad/dia) |
| CPL bom + qualidade do lead caiu | Audiência abrindo demais (LAL grande) | Voltar pra LAL 1-3% ou retargeting |

## O que NÃO fazer

- **Não pausa criativo sem ter substituto pronto** — perde delivery acumulado
- **Não troca tudo de uma vez** — perde sinal histórico de comparação
- **Não ignora frequency** — é o sinal mais antecipado de fadiga
- **Não confunde fadiga com problema de landing/oferta** — faz o diagnóstico antes
- **Não testa 5 variações da mesma headline** — varia o ângulo, não a tipografia
- **Não pausa em fase de aprendizado** (primeiros 7 dias / 50 conversões)

## Integração com outras skills

- Antes de declarar fadiga, descartar funil quebrado → `meta-ads-funil-diagnostico`
- Pra produzir os criativos novos → delegar pro Kai (design) e Cyro (copy)
- Pra subir os novos pausados na conta → delegar pro Theo
