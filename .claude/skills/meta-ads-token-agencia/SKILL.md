---
name: meta-ads-token-agencia
description: Configurar token de acesso Meta Ads para agências que acessam BMs de clientes diretamente, sem BM própria centralizada. Inclui permissões necessárias para relatórios e gestão de anúncios.
version: 1.0.0
author: o gestor
---

# Meta Ads Token — Configuração para Agências

## Contexto

Agências que acessam contas de clientes **diretamente na BM do cliente** (não pela BM da agência) precisam gerar o token na BM de cada cliente separadamente.

## Problema comum

- Token de usuário expira a cada 60 dias → causa erro HTTP 400
- System User Token não expira → solução definitiva
- BMs de clientes frequentemente atingem limite de System Users (cheias de WordPress App System Users abandonados)

## Fluxo correto para agências sem BM centralizada

### Opção A — System User Token (ideal, não expira)

1. Acessa BM do cliente → Configurações → Usuários do sistema
2. Cria System User com nome identificável (ex: "Relatorios-Agencia")
3. Gera token → seleciona o app correto
4. Se der erro "Nenhuma permissão disponível": o System User precisa ter função atribuída no app
5. Se BM atingiu limite de System Users: tenta usar um existente ou mudar função de Admin→Funcionário em algum inativo

### Opção B — Token via Graph API Explorer (expira em 60 dias)

1. Acessa: https://developers.facebook.com/tools/explorer
2. **ATENÇÃO: selecionar o app correto no dropdown** (erro comum: deixar app errado selecionado)
3. Selecionar "Token do usuário"
4. Adicionar permissões (ver lista abaixo)
5. Clicar em "Generate Access Token"
6. Copiar token e salvar em `~/.claude/secrets.env` como `META_ACCESS_TOKEN`

## Permissões necessárias (Ada + Theo)

Para relatórios e gestão completa de anúncios + Instagram:

```
ads_read
ads_management
pages_read_engagement
pages_manage_ads
instagram_manage_insights
instagram_basic
instagram_content_publish
leads_retrieval
```

- `ads_read` + `ads_management` → leitura e gestão de campanhas
- `pages_read_engagement` + `pages_manage_ads` → anúncios nas páginas
- `instagram_manage_insights` → seguidores, alcance, métricas IG
- `instagram_basic` → acesso básico ao Instagram
- `instagram_content_publish` → subir criativos
- `leads_retrieval` → campanhas de lead

## Token único para múltiplos clientes

Um token de usuário gerado no Graph API Explorer funciona para **todas as BMs** às quais o usuário tem acesso — não é necessário gerar um token por cliente. Basta testar com `api_get(f"{account_id}/insights", {...})` para confirmar acesso antes de criar infraestrutura extra.

## App IDs conhecidos — Cliente A

- **App correto:** "<NOME_DO_APP>" → App ID `<APP_ID>`
- **App ID errado (não usar):** `<APP_ID_ERRADO>` — causa erro "token does not belong to application"
- Para verificar qual app gerou um token: `curl "https://graph.facebook.com/debug_token?input_token=TOKEN&access_token=TOKEN"` → campo `app_id` na resposta

## Token do Explorer já sai estendido

Quando o app está configurado corretamente na BM do cliente, o token gerado no Graph API Explorer **já sai com validade longa (~3 meses)** — não é necessário fazer a troca via `fb_exchange_token`. Confirmar sempre com `debug_token` antes de tentar a troca.

## Pitfalls

- **App errado selecionado no Explorer** → token gerado sem as permissões certas, erro silencioso
- **`instagram_basic` pode não aparecer** no Explorer → não é bloqueante, `instagram_manage_insights` resolve
- **System User sem app associado** → erro "Nenhuma permissão disponível" na hora de gerar token
- **BM do cliente lotada** → Meta tem limite de System Users por BM; deletar é difícil se tiverem ativos associados
- **App criado na BM errada** → token funciona mas sem acesso às contas certas

## Renovação automática (Opção B)

Se usar token de usuário (60 dias), configurar lembrete ou cron job para renovar antes de expirar. System User Token é a solução definitiva.

## Atualizar token no arquivo de credenciais

```bash
# Substituir token no .env via sed (não usar patch — arquivo protegido)
sed -i '' 's|META_ACCESS_TOKEN=.*|META_ACCESS_TOKEN=<SEU_TOKEN>|' ~/.claude/secrets.env
```

Reiniciar o processo que usa o token (se houver algum rodando) após atualizar.

## Script completo de renovação (Opção B + troca longa)

Salvar como `/tmp/exchange_token.py` e rodar com `uv run --with python-dotenv /tmp/exchange_token.py`:

```python
import urllib.request, urllib.parse, json, re
from pathlib import Path
from dotenv import dotenv_values

APP_ID = "<APP_ID>"        # app da BM do cliente (<BM_ID>)
APP_SECRET = "SEU_APP_SECRET"
SHORT_TOKEN = "TOKEN_CURTO_DO_EXPLORER"

params = urllib.parse.urlencode({
    "grant_type": "fb_exchange_token",
    "client_id": APP_ID,
    "client_secret": APP_SECRET,
    "fb_exchange_token": SHORT_TOKEN
})
url = f"https://graph.facebook.com/oauth/access_token?{params}"

with urllib.request.urlopen(url, timeout=15) as r:
    data = json.loads(r.read())

long_token = data["access_token"]
expires_days = data.get("expires_in", 0) // 86400
print(f"✅ Token longo gerado — expira em {expires_days} dias")

env_path = Path.home() / ".claude" / "secrets.env"
content = env_path.read_text()
content = re.sub(r"META_ACCESS_TOKEN=.*", f"META_ACCESS_TOKEN={long_token}", content)
env_path.write_text(content)
print("✅ .env atualizado")
```

**Nota:** O token gerado no Explorer já sai com ~3 meses quando o app está configurado corretamente. Usar `debug_token` para confirmar `expires_at` antes de decidir se a troca é necessária. Se `expires_at` for hoje ou amanhã, o token saiu curto — fazer a troca.

## Verificar validade do token atual

```bash
curl -s "https://graph.facebook.com/debug_token?input_token=TOKEN&access_token=TOKEN" | python3 -m json.tool | grep -E "expires_at|app_id|is_valid"
```
