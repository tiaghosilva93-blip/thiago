"""
Cria Ad usando Ad Set existente + creative.

Uso (imagem):
    python create_ad.py \\
        --ad-account-id act_SEU_ID \\
        --adset-id <ADSET_ID> \\
        --name "Dor-EstudoSolo_Static_v1" \\
        --page-id <PAGE_ID> \\
        --image-hash abc123def456 \\
        --primary-text "Você estudou 6 meses e zerou em raciocínio lógico?" \\
        --headline "Aprovação real começa aqui" \\
        --link "https://seusite.com.br/?utm_source=meta&utm_campaign={{campaign.name}}" \\
        --cta LEARN_MORE

Uso (vídeo): adiciona --video-id e --image-hash (thumbnail).
"""

import click
from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.adcreative import AdCreative

from _client import init_api, normalize_account_id


CTAS = ["LEARN_MORE", "SIGN_UP", "DOWNLOAD", "CONTACT_US", "GET_QUOTE",
        "BOOK_NOW", "SUBSCRIBE", "APPLY_NOW", "GET_OFFER", "SEE_MORE"]


@click.command()
@click.option("--ad-account-id", envvar="META_AD_ACCOUNT_ID", required=True,
              help="Ad Account ID. Default: env var META_AD_ACCOUNT_ID")
@click.option("--adset-id", required=True)
@click.option("--name", required=True)
@click.option("--page-id", required=True, help="Facebook Page ID")
@click.option("--image-hash", help="Hash da imagem (upload_creative)")
@click.option("--video-id", help="ID do vídeo (upload_creative)")
@click.option("--primary-text", required=True, help="Texto principal (≤125 chars recomendado)")
@click.option("--headline", required=True, help="Headline (≤27 chars recomendado, max 40)")
@click.option("--description", default="", help="Descrição (≤27 chars recomendado, max 30)")
@click.option("--link", required=True, help="URL destino (com UTMs)")
@click.option("--cta", type=click.Choice(CTAS), default="LEARN_MORE")
@click.option("--instagram-actor-id", help="IG Account ID (opcional)")
@click.option("--status", type=click.Choice(["PAUSED", "ACTIVE"]), default="PAUSED")
@click.option("--yes", is_flag=True)
def main(ad_account_id, adset_id, name, page_id, image_hash, video_id,
         primary_text, headline, description, link, cta,
         instagram_actor_id, status, yes):
    if not (image_hash or video_id):
        raise click.UsageError("Use --image-hash OU --video-id.")

    init_api()
    account = AdAccount(normalize_account_id(ad_account_id))

    # Alertas de tamanho de copy (regra meta-ads-fundamentos)
    if len(primary_text) > 125:
        click.echo(f"⚠️  primary_text {len(primary_text)} chars — recomendado ≤125 (corta no mobile)")
    if len(headline) > 27:
        click.echo(f"⚠️  headline {len(headline)} chars — recomendado ≤27 (max 40)")
    if description and len(description) > 27:
        click.echo(f"⚠️  description {len(description)} chars — recomendado ≤27 (max 30)")

    print(f"\nVai criar Ad:")
    print(f"  Account: {account['id']}")
    print(f"  Ad Set: {adset_id}")
    print(f"  Nome: {name}")
    print(f"  Page: {page_id}" + (f" / IG: {instagram_actor_id}" if instagram_actor_id else ""))
    print(f"  Asset: {'image_hash=' + image_hash if image_hash else 'video_id=' + video_id}")
    print(f"  Primary: {primary_text}")
    print(f"  Headline: {headline}")
    if description:
        print(f"  Description: {description}")
    print(f"  Link: {link}")
    print(f"  CTA: {cta}")
    print(f"  Status: {status}")

    if not yes:
        click.confirm("\nConfirmar?", abort=True)

    if image_hash and not video_id:
        link_data = {
            "image_hash": image_hash,
            "link": link,
            "message": primary_text,
            "name": headline,
            "call_to_action": {"type": cta, "value": {"link": link}},
        }
        if description:
            link_data["description"] = description
        object_story_spec = {"page_id": page_id, "link_data": link_data}
    else:
        video_data = {
            "video_id": video_id,
            "title": headline,
            "message": primary_text,
            "call_to_action": {"type": cta, "value": {"link": link}},
        }
        if image_hash:
            video_data["image_hash"] = image_hash
        object_story_spec = {"page_id": page_id, "video_data": video_data}

    if instagram_actor_id:
        object_story_spec["instagram_actor_id"] = instagram_actor_id

    creative = account.create_ad_creative(params={
        AdCreative.Field.name: f"{name} - Creative",
        AdCreative.Field.object_story_spec: object_story_spec,
    })
    print(f"\nCreative: {creative['id']}")

    ad = account.create_ad(params={
        Ad.Field.name: name,
        Ad.Field.adset_id: adset_id,
        Ad.Field.creative: {"creative_id": creative["id"]},
        Ad.Field.status: status,
    })
    print(f"Ad criado: {ad['id']}")


if __name__ == "__main__":
    main()
