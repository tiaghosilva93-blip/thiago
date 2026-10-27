"""
Lateraliza teste de criativo CTWA (Click-to-WhatsApp) — Meta Ads.

Cria 1 CAMPANHA COMPLETA por criativo, no padrão CBO 1-1-1 WhatsApp:
    Campanha (OUTCOME_ENGAGEMENT, CBO) -> Conjunto (CONVERSATIONS/WhatsApp) -> Anúncio
Tudo PAUSED. Você revisa e ativa depois.

Cada criativo vira uma campanha independente (lateralização à la Pedro:
1 campanha = 1 criativo).

Uso:
    python lateralizar_ctwa.py --config lateralizar_config.json
    python lateralizar_ctwa.py --config lateralizar_config.json --dry-run

Config (JSON) — ver lateralizar_config.example.json:
{
  "ad_account_id": "act_SEU_ID",
  "page_id": "<PAGE_ID>",
  "whatsapp_number": "<NUMERO_WHATSAPP_55DDDNUMERO>",
  "daily_budget": 10,
  "countries": ["BR"],
  "age_min": 25,
  "age_max": 55,
  "name_prefix": "[29.05] | - [TESTE DE CRIATIVOS] - [Cliente_A]",
  "creatives": [
    {"label": "C01", "image": "/caminho/arte1.jpg",
     "primary_text": "Texto principal...", "headline": "Headline curta"}
  ]
}

Lê META_ACCESS_TOKEN da env var ou de ~/.claude/secrets.env (igual aos outros scripts).
Se "ad_account_id" faltar no config, usa a env var META_AD_ACCOUNT_ID.
"""

import argparse
import json
import os
import sys
from pathlib import Path

import requests

GRAPH = "https://graph.facebook.com/v21.0"
SECRETS_ENV = Path.home() / ".claude" / "secrets.env"


def get_token() -> str:
    if os.getenv("META_ACCESS_TOKEN"):
        return os.environ["META_ACCESS_TOKEN"].strip()
    if not SECRETS_ENV.exists():
        sys.exit(f"Não achei {SECRETS_ENV}")
    for line in SECRETS_ENV.read_text().splitlines():
        if line.startswith("META_ACCESS_TOKEN="):
            return line.split("=", 1)[1].strip()
    sys.exit("META_ACCESS_TOKEN não encontrado em ~/.claude/secrets.env")


def post(path: str, token: str, **params):
    params["access_token"] = token
    r = requests.post(f"{GRAPH}/{path}", data=params)
    data = r.json()
    if "error" in data:
        e = data["error"]
        raise RuntimeError(e.get("error_user_msg") or e.get("message") or str(e))
    return data


def upload_image(act: str, token: str, image_path: str) -> str:
    p = Path(image_path).expanduser()
    if not p.exists():
        raise RuntimeError(f"Imagem não encontrada: {p}")
    with open(p, "rb") as f:
        r = requests.post(
            f"{GRAPH}/{act}/adimages",
            files={"filename": f},
            data={"access_token": token},
        )
    data = r.json()
    if "error" in data:
        raise RuntimeError(data["error"].get("message"))
    return list(data["images"].values())[0]["hash"]


def build_one(cfg, cre, token, dry_run):
    act = cfg.get("ad_account_id") or os.getenv("META_AD_ACCOUNT_ID", "")
    if not act.startswith("act_"):
        act = f"act_{act}"
    label = cre["label"]
    budget_cents = int(round(cfg.get("daily_budget", 10) * 100))
    camp_name = f'{cfg["name_prefix"]} — [CBO 1-1-1] — WhatsApp — {label}'
    adset_name = f'[CONJ] {label} — WhatsApp — {",".join(cfg.get("countries", ["BR"]))} {cfg.get("age_min",25)}-{cfg.get("age_max",55)}'
    ad_name = f"[AD] {label} — {cre.get('headline','')[:30]}"

    if dry_run:
        print(f"  [DRY] Campanha: {camp_name}")
        print(f"  [DRY]   Conjunto: {adset_name}")
        print(f"  [DRY]   Anúncio: {ad_name}  (imagem: {cre['image']})")
        return {"label": label, "dry": True}

    # 1) Campanha (CBO)
    camp = post(
        f"{act}/campaigns", token,
        name=camp_name,
        objective="OUTCOME_ENGAGEMENT",
        status="PAUSED",
        special_ad_categories="[]",
        daily_budget=budget_cents,
        bid_strategy="LOWEST_COST_WITHOUT_CAP",
    )
    camp_id = camp["id"]

    # 2) Conjunto (CONVERSATIONS / WhatsApp)
    targeting = {
        "geo_locations": {"countries": cfg.get("countries", ["BR"])},
        "age_min": cfg.get("age_min", 25),
        "age_max": cfg.get("age_max", 55),
    }
    promoted = {"page_id": str(cfg["page_id"])}
    if cfg.get("whatsapp_number"):
        promoted["whatsapp_phone_number"] = str(cfg["whatsapp_number"])
    adset = post(
        f"{act}/adsets", token,
        name=adset_name,
        campaign_id=camp_id,
        optimization_goal="CONVERSATIONS",
        billing_event="IMPRESSIONS",
        destination_type="WHATSAPP",
        promoted_object=json.dumps(promoted),
        targeting=json.dumps(targeting),
        status="PAUSED",
    )
    adset_id = adset["id"]

    # 3) Upload imagem + Criativo CTWA
    img_hash = upload_image(act, token, cre["image"])
    story_spec = {
        "page_id": str(cfg["page_id"]),
        "link_data": {
            "image_hash": img_hash,
            "link": f'https://wa.me/{cfg.get("whatsapp_number","")}',
            "message": cre.get("primary_text", ""),
            "name": cre.get("headline", ""),
            "call_to_action": {
                "type": "WHATSAPP_MESSAGE",
                "value": {"app_destination": "WHATSAPP"},
            },
        },
    }
    creative = post(
        f"{act}/adcreatives", token,
        name=f"[CRE] {label} CTWA",
        object_story_spec=json.dumps(story_spec),
    )
    creative_id = creative["id"]

    # 4) Anúncio (PAUSED)
    ad = post(
        f"{act}/ads", token,
        name=ad_name,
        adset_id=adset_id,
        creative=json.dumps({"creative_id": creative_id}),
        status="PAUSED",
    )

    return {
        "label": label, "campaign": camp_id, "adset": adset_id,
        "creative": creative_id, "ad": ad["id"],
    }


def main(config_path, dry_run):
    cfg = json.loads(Path(config_path).read_text())
    cfg["ad_account_id"] = cfg.get("ad_account_id") or os.getenv("META_AD_ACCOUNT_ID", "")
    if not cfg["ad_account_id"]:
        sys.exit("Defina ad_account_id no config ou a env var META_AD_ACCOUNT_ID.")
    token = get_token()

    creatives = cfg.get("creatives", [])
    if not creatives:
        sys.exit("Config sem 'creatives'.")

    print(f"\n{'DRY-RUN — ' if dry_run else ''}Lateralizando {len(creatives)} criativo(s) "
          f"em {cfg['ad_account_id']}  (tudo PAUSED)\n")

    results, errors = [], []
    for cre in creatives:
        label = cre.get("label", "?")
        print(f"→ {label}")
        try:
            results.append(build_one(cfg, cre, token, dry_run))
            if not dry_run:
                print(f"  ✓ campanha {results[-1]['campaign']} criada (PAUSED)")
        except Exception as ex:
            print(f"  ✗ ERRO em {label}: {ex}")
            errors.append((label, str(ex)))

    print(f"\n=== Resumo ===")
    print(f"  OK: {len(results)}  |  Erros: {len(errors)}")
    for r in results:
        if not r.get("dry"):
            print(f"  {r['label']}: camp={r['campaign']} adset={r['adset']} ad={r['ad']}")
    for label, msg in errors:
        print(f"  ERRO {label}: {msg}")
    if not dry_run and results:
        print("\nTudo PAUSED. Revise no Gerenciador e ative quando quiser.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lateraliza teste de criativo CTWA (CBO 1-1-1 WhatsApp). Tudo PAUSED."
    )
    parser.add_argument("--config", required=True, help="Caminho do JSON de config")
    parser.add_argument("--dry-run", action="store_true",
                        help="Só mostra o que faria, não cria nada")
    args = parser.parse_args()
    if not Path(args.config).exists():
        sys.exit(f"Config não encontrada: {args.config}")
    main(args.config, args.dry_run)
