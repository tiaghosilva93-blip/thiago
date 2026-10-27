---
name: src-atribuicao-formato
description: "Como o src liga uma venda à campanha: qual campo é qual, por que o último número é o CONJUNTO e não a campanha, o teto de 67 caracteres e o prefixo por conta"
metadata: 
  node_type: memory
  type: reference
  originSessionId: c976ef06-3b2f-4c72-a42b-c15d88ac805b
  modified: 2026-08-15T03:09:21.887Z
---

O `src` é a etiqueta pendurada no link do anúncio que viaja até o checkout e chega junto com a venda, na coluna `vendas.meta_campanha_id`. É o que liga faturamento a campanha.

## O formato que chega

```
facebook_paid_<CAMPAIGN_ID>_Ads26-V03_<ADSET_ID>
   [0]    [1]  [2] CAMPANHA      [3] ANUNCIO  [4] CONJUNTO
```

🔑 **O ÚLTIMO número é o CONJUNTO, não a campanha. A campanha é o PRIMEIRO número.**
Provado em 15/08/2026 cruzando cada campo contra os IDs reais de campanha, conjunto e anúncio da Graph API.

**Bug que isso causou (corrigido em 15/08/2026):** o `parseSrc` do dashboard de vendas lia o último número. Resultado: **0 de 852 vendas** ligavam a uma campanha real, e a visão por campanha mostrava `Campanha <ADSET_ID>` em todas as linhas. **R$105.336 de faturamento sem dono.**
⚠️ **Passou meses despercebido porque o gestor lê o ROAS por ANÚNCIO**, e o nome do anúncio saía do penúltimo campo, que por acaso era o certo. Erro em visão pouco usada não dá sinal.

## Teto de 67 caracteres
`SRC_TETO = 67` em `queries.ts`. Acima disso o src provavelmente foi cortado no meio pela plataforma de checkout. A mediana real é **61**, ou seja, está no limite.
🔑 **Ler pelo PRIMEIRO número é imune ao corte** — o fim some, o começo nunca. Foi o segundo motivo pra mudar a regra.
⚠️ Nome de conjunto comprido empurra o src pro corte. Usar nome curto (`CJ1 - WW - TOP5`).

## Identificar a CONTA dentro do src
Duas contas diferentes rodando o mesmo criativo ficam indistinguíveis se o src não disser de onde veio. A convenção que funciona é **prefixo no `utm_content` e no `src`**, nunca `utm_term`:

```
utm_content=CONTA2_{{ad.name}}
src=CONTA2_{{ad.name}}|{{adset.name}}|{{campaign.id}}
```
Prefixos em uso (exemplo): `CONTA2_` · `CONTA3_` · `CONTA4_`. A principal vai sem prefixo.

⚠️ **Identificador em `utm_term` NÃO funciona.** Uma conta usava `utm_term=CONTA4` e o valor caía no fim do src como texto; a regra antiga exigia número no fim e descartava a venda. Eram 27 vendas e R$5.301 perdidos.

## Formato pipe
`{{ad.name}}|{{adset.name}}|{{campaign.id}}` também é aceito e é o único que devolve **nome do conjunto**. Nele o último campo É a campanha (e precisa ser numérico).

Ver [[feedback_leitura_meta_mais_dash]].
