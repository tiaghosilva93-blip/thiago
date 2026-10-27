"""
Upload de imagem ou vídeo pra biblioteca de creative.

Uso:
    python upload_creative.py --ad-account-id act_SEU_ID --image path/to/img.jpg
    python upload_creative.py --ad-account-id act_SEU_ID --video path/to/vid.mp4
"""

from pathlib import Path

import click
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.adimage import AdImage
from facebook_business.adobjects.advideo import AdVideo

from _client import init_api, normalize_account_id


@click.command()
@click.option("--ad-account-id", envvar="META_AD_ACCOUNT_ID", required=True,
              help="Ad Account ID. Default: env var META_AD_ACCOUNT_ID")
@click.option("--image", type=click.Path(exists=True, dir_okay=False, path_type=Path))
@click.option("--video", type=click.Path(exists=True, dir_okay=False, path_type=Path))
def main(ad_account_id, image, video):
    if not (image or video):
        raise click.UsageError("Use --image OU --video.")
    if image and video:
        raise click.UsageError("Use só um: --image OU --video.")

    init_api()
    account = AdAccount(normalize_account_id(ad_account_id))

    if image:
        print(f"Subindo imagem: {image}")
        ad_image = AdImage(parent_id=account["id"])
        ad_image[AdImage.Field.filename] = str(image)
        ad_image.remote_create()
        print(f"\nimage_hash: {ad_image['hash']}")
        print(f"Use no create_ad: --image-hash {ad_image['hash']}")
    else:
        print(f"Subindo vídeo: {video}")
        ad_video = AdVideo(parent_id=account["id"])
        ad_video[AdVideo.Field.filepath] = str(video)
        ad_video.remote_create()
        print(f"\nvideo_id: {ad_video['id']}")
        print(f"Use no create_ad: --video-id {ad_video['id']}")
        print("\nNota: Meta processa vídeo em background. Espera 1-3 min antes do create_ad.")


if __name__ == "__main__":
    main()
