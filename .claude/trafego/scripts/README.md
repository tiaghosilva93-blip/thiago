# Meta Ads Scripts

Scripts operacionais pra Meta Marketing API adaptados do starter da Nekt.
**Para Theo executar via Bash quando Ada delegar.**

## Setup (1x por máquina)

```bash
pip install -r requirements.txt
```

Variáveis necessárias em `~/.claude/secrets.env` (ou exportadas no shell):
- `META_APP_ID`
- `META_APP_SECRET`
- `META_ACCESS_TOKEN`

- `META_AD_ACCOUNT_ID` (opcional: conta padrão, formato `act_SEU_ID`)

(Multi-cliente: `--ad-account-id` na CLI sempre vence. Sem a flag, os scripts usam a env var `META_AD_ACCOUNT_ID`.)

## Scripts

| Script | O que faz |
|---|---|
| `_client.py` | Helper compartilhado — não chama direto |
| `read_insights.py` | Lê insights (account/campaign/adset/ad) |
| `create_campaign.py` | Cria campanha (sempre PAUSED por default) |
| `create_adset.py` | Cria ad set vinculado a uma campanha |
| `upload_creative.py` | Sobe imagem ou vídeo → retorna hash/id |
| `create_ad.py` | Cria ad amarrando creative + adset |

## Regras inegociáveis

1. **Sempre `--status PAUSED`** ao criar (default). Cliente revisa no Ads Manager antes de ativar.
2. **Sempre passar `--ad-account-id act_SEU_ID`** (ou definir `META_AD_ACCOUNT_ID`) — multi-cliente, confira a conta antes de rodar.
3. **Sempre confirma com `--yes` só quando Ada autorizou explicitamente**. Default pede confirmação interativa.
4. **Reads (insights) podem rodar livremente.** Writes (create) precisam de aprovação humana.

## Exemplo de fluxo completo

```bash
# 1. Cria campanha pausada
python create_campaign.py \
  --ad-account-id $META_AD_ACCOUNT_ID \
  --name "ClienteA_CONC_CONV_LAL3-Compradores_2026-05" \
  --objective OUTCOME_SALES

# 2. Cria adset
python create_adset.py \
  --ad-account-id $META_AD_ACCOUNT_ID \
  --campaign-id <CAMPAIGN_ID> \
  --name "LAL3-Compradores_Reels" \
  --daily-budget 80 \
  --start-time "2026-05-28T08:00:00-0300"

# 3. Sobe criativo
python upload_creative.py \
  --ad-account-id $META_AD_ACCOUNT_ID \
  --image ~/Desktop/criativo-v1.jpg
# → imprime image_hash

# 4. Cria ad
python create_ad.py \
  --ad-account-id $META_AD_ACCOUNT_ID \
  --adset-id <ADSET_ID> \
  --name "Dor-EstudoSolo_Static_v1" \
  --page-id <PAGE_ID> \
  --image-hash abc123 \
  --primary-text "Você estudou 6 meses e zerou em raciocínio lógico?" \
  --headline "Aprovação real começa aqui" \
  --link "https://seusite.com.br/?utm_source=meta&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.name}}"
```

## Ler insights

```bash
# Insights da conta inteira nos últimos 30 dias
python read_insights.py --ad-account-id $META_AD_ACCOUNT_ID --level account --days 30

# Por adset, últimos 14 dias, exportando CSV
python read_insights.py --ad-account-id $META_AD_ACCOUNT_ID --level adset --days 14 --output csv > insights.csv

# Por ad, ações de tipo purchase
python read_insights.py --ad-account-id $META_AD_ACCOUNT_ID --level ad --days 14 --action-type purchase
```

## Origem

Adaptado de [nektcom/workshop-ads-agent-starter](https://github.com/nektcom/workshop-ads-agent-starter) em 2026-05-27.
Mudanças:
- credenciais carregadas de `~/.claude/secrets.env` (não `.env` local)
- `--ad-account-id` virou CLI flag com fallback na env var `META_AD_ACCOUNT_ID` — multi-cliente
- Comentários em pt-BR
