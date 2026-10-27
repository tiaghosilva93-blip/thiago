"""
Helper compartilhado: inicializa o SDK do Meta Marketing API.

Lê credenciais de ~/.claude/secrets.env (não do diretório local).
Multi-cliente: ad_account_id vem por CLI (--ad-account-id) ou, na falta,
da env var META_AD_ACCOUNT_ID.
"""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from facebook_business.api import FacebookAdsApi

# Sempre carrega do arquivo central de credenciais
SECRETS_ENV = Path.home() / ".claude" / "secrets.env"
load_dotenv(SECRETS_ENV)


def init_api() -> FacebookAdsApi:
    """Inicializa FacebookAdsApi e retorna instância."""
    access_token = os.getenv("META_ACCESS_TOKEN")
    if not access_token:
        sys.exit(
            f"Variável ausente em {SECRETS_ENV}: META_ACCESS_TOKEN.\n"
            f"Cheque ~/.claude/secrets.env"
        )

    return FacebookAdsApi.init(
        app_id=os.getenv("META_APP_ID"),
        app_secret=os.getenv("META_APP_SECRET"),
        access_token=access_token,
    )


def normalize_account_id(account_id: str) -> str:
    """Garante prefixo act_."""
    aid = (account_id or os.getenv("META_AD_ACCOUNT_ID") or "").strip()
    if not aid:
        sys.exit("--ad-account-id é obrigatório (ou defina META_AD_ACCOUNT_ID).")
    if not aid.startswith("act_"):
        aid = f"act_{aid}"
    return aid


def brl_to_cents(brl: float) -> int:
    """Converte BRL em centavos (unidade da API Meta)."""
    return int(round(brl * 100))
