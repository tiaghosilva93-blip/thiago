"""
Cria campanha Meta (sempre PAUSED por default — cliente revisa antes de ativar).

Uso:
    python create_campaign.py \\
        --ad-account-id act_SEU_ID \\
        --name "ClienteA_CONC_CONV_LAL3_2026-05" \\
        --objective OUTCOME_SALES
"""

import click
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.campaign import Campaign

from _client import init_api, normalize_account_id


OBJECTIVES = [
    "OUTCOME_SALES", "OUTCOME_LEADS", "OUTCOME_TRAFFIC",
    "OUTCOME_AWARENESS", "OUTCOME_ENGAGEMENT", "OUTCOME_APP_PROMOTION",
]


@click.command()
@click.option("--ad-account-id", envvar="META_AD_ACCOUNT_ID", required=True,
              help="Ad Account ID. Default: env var META_AD_ACCOUNT_ID")
@click.option("--name", required=True)
@click.option("--objective", type=click.Choice(OBJECTIVES), default="OUTCOME_SALES")
@click.option("--special-ad-categories", default="NONE",
              help="HOUSING, EMPLOYMENT, CREDIT, ISSUES_ELECTIONS_POLITICS, NONE.")
@click.option("--status", type=click.Choice(["PAUSED", "ACTIVE"]), default="PAUSED")
@click.option("--yes", is_flag=True, help="Pula confirmação interativa")
def main(ad_account_id, name, objective, special_ad_categories, status, yes):
    init_api()
    account = AdAccount(normalize_account_id(ad_account_id))

    print(f"\nVai criar campanha:")
    print(f"  Account: {account['id']}")
    print(f"  Nome: {name}")
    print(f"  Objetivo: {objective}")
    print(f"  Special categories: {special_ad_categories}")
    print(f"  Status: {status}")

    if not yes:
        click.confirm("\nConfirmar?", abort=True)

    categories = [c.strip() for c in special_ad_categories.split(",") if c.strip()]

    campaign = account.create_campaign(params={
        Campaign.Field.name: name,
        Campaign.Field.objective: objective,
        Campaign.Field.status: status,
        Campaign.Field.special_ad_categories: categories,
    })

    print(f"\nCampanha criada: {campaign['id']}")
    print(f"\nPróximo passo: criar Ad Set")
    print(f"  python create_adset.py --ad-account-id {account['id']} --campaign-id {campaign['id']} ...")


if __name__ == "__main__":
    main()
