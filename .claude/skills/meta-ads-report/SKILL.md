---
name: meta-ads-report
description: Gera relatório diário de Meta Ads (Facebook/Instagram) para múltiplas contas. Configure as contas dos seus clientes na tabela de Configuração. Puxa métricas de ontem via Graph API e exibe investimento, alcance, seguidores conquistados, custo por seguidor e campanhas ativas.
version: 1.0.0
author: o gestor
license: MIT
platforms: [linux, macos]
prerequisites:
  env_vars: [META_ACCESS_TOKEN]
metadata:
  tags: [meta, facebook, instagram, ads, report]
---

# Meta Ads Report — Cliente A

Gera um relatório diário das campanhas Meta Ads da conta `act_SEU_ID`.

## Uso

```bash
uv run --with python-dotenv scripts/read_insights.py
```

## O que o relatório mostra

- **Instagram**: total de seguidores atual + ganho do dia
- **Conta de conteúdo**: gasto, impressões, alcance, CPM, CPC, CTR, engajamentos
- **Campanhas ativas da conta de conteúdo**: breakdown por campanha
- **Conta de conversão**: gasto, impressões, alcance, CPM, CPC, CTR, compras
- **Campanhas ativas da conta de conversão**: breakdown por campanha

## Token Meta Ads

- Tokens de usuário expiram em 60 dias — usar **System User Token** (não expira) sempre que possível
- Se a BM do cliente estiver lotada de System Users, gerar token via **Graph API Explorer** com o app correto da BM do cliente
- Permissões necessárias: `ads_read`, `ads_management`, `pages_read_engagement`, `pages_manage_ads`, `instagram_manage_insights`, `leads_retrieval`, `instagram_content_publish`
- App errado selecionado no Explorer = erro silencioso de permissões — sempre confirmar o app antes de gerar

### Diagnóstico de token expirado

- Sintoma real: `OAuthException code 190` com mensagem `"Session has expired on..."` — não apenas HTTP 400
- Para testar o token rapidamente via shell: `source ~/.claude/secrets.env && curl -s "https://graph.facebook.com/v21.0/me?access_token=${META_ACCESS_TOKEN}"`
- Se retornar `{"name": "...", "id": "..."}` → token válido
- Se retornar `OAuthException` → token expirado, renovar no Graph API Explorer
- **Não usar `python-dotenv` direto no shell** — usar `source ~/.claude/secrets.env` para carregar variáveis no bash

### Verificação em massa de contas

Para checar acesso a múltiplas contas de uma vez:

```bash
source ~/.claude/secrets.env
for ACC in act_SEU_ID_1 act_SEU_ID_2 act_SEU_ID_3; do
  curl -s "https://graph.facebook.com/v21.0/${ACC}?fields=name,account_status&access_token=${META_ACCESS_TOKEN}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('name','ERR'), d.get('account_status','?'))"
done
```

`account_status`: 1=Ativo, 2=Desativado, 3=Sem pagamento, 7=Bloqueado, 9=Em revisão

## Configuração

O token `META_ACCESS_TOKEN` fica salvo em `~/.claude/secrets.env`.

### Contas de clientes

Preencha com as contas que você gerencia (uma linha por conta):

| Conta | ID | Observação |
|---|---|---|
| Cliente A — conta de conteúdo | `act_SEU_ID` | ex.: Instagram ID `<IG_USER_ID>` |

## Agendar envio diário

Para receber o relatório todo dia às 8h:

```
/schedule criar cron diário às 8h: rode scripts/read_insights.py e me envie o resultado
```
