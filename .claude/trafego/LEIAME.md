> **Instalação neste repositório (já feita).** Os caminhos originais `~/.claude/...` foram trocados pelos caminhos do projeto:
> - Agentes: `.claude/agents/ada.md` e `.claude/agents/theo.md`
> - Skills: `.claude/skills/<nome>/` (as 15 skills de performance)
> - Brain, regras, scripts e organograma: `.claude/trafego/`
> - Fichas de cliente: `.claude/trafego/clientes/<cliente>.md`
>
> Credenciais: **nunca** commitar. Na nuvem, cadastre `META_ACCESS_TOKEN` (e opcionalmente `META_AD_ACCOUNT_ID`, `META_APP_ID`, `META_APP_SECRET`) como variáveis de ambiente do environment; os scripts leem a variável primeiro. No computador local, pode usar `~/.claude/secrets.env`.
>
> O bloco "Instalação" abaixo é o original do pacote e não precisa ser seguido aqui.

# Ada: infra de gestão de tráfego (Meta Ads) para Claude Code

Ada é uma gestora de tráfego sênior que roda como agente dentro do Claude Code. Ela lidera o Theo, um júnior que cuida de nomenclatura e tracking.
Este pacote traz só a estrutura. Ele não inclui cliente, conta, ID nem chave.

## O que tem aqui

| Pasta | O que é | Onde instalar |
|---|---|---|
| `agents/` | Ada, Theo e o protocolo de trabalho entre eles (ORGANOGRAMA) | `.claude/agents/` |
| `meta-ads-brain/` | O cérebro da Ada: filosofia, heurísticas (pausar/escalar/matar), frameworks (bidcap, escala baiana, teste de criativos), playbooks, nichos | `.claude/trafego/meta-ads-brain/` |
| `skills/performance/` | 15 skills técnicas: diagnóstico de funil, auditoria, relatório, fadiga de criativo, atribuição, duplicar campanha, token de agência, Google Ads | `.claude/skills/` |
| `.claude/trafego/regras/` | Regras duras aprendidas na operação (aprovar antes de aplicar, leitura Meta + dash, src ≤67, bidcap, corte por equilíbrio etc.) + formato de relatório | Deixar junto; os agentes apontam pra `.claude/trafego/regras/` |
| `scripts/` | Python pra Graph API: ler insights, criar campanha/conjunto/anúncio (sempre pausado), subir criativo | Qualquer pasta; README dentro |

## Instalação

```bash
cp -R agents/. .claude/agents/
cp -R meta-ads-brain ~/.claude/
mkdir -p ~/.claude/skills && cp -R skills/performance ~/.claude/skills/
cp -R regras .claude/trafego/regras
```

Depois disso, ajuste os caminhos `.claude/trafego/regras/...` dentro de `agents/ada.md` e `agents/theo.md` para `.claude/trafego/regras/...`.

Credenciais ficam em `~/.claude/secrets.env`, que você cria:

```
META_ACCESS_TOKEN=seu_token
META_AD_ACCOUNT_ID=act_SEU_ID
```

## Como usar

- Para chamar a Ada no Claude Code, peça algo como "Ada, faz o raio-x da conta X" ou "Ada, vale escalar essa campanha?".
- Antes de responder, a Ada lê `meta-ads-brain/00-filosofia.md`, o `INDEX.md` e o arquivo do nicho.
- Cada cliente ganha um arquivo em `.claude/trafego/clientes/<cliente>.md` (nicho, contas, ticket, dashboard, histórico). A Ada lê esse arquivo antes de analisar.
- Nada é aplicado na conta sem o seu ok. A Ada propõe em tabela (de → para, motivo) e só executa depois da aprovação.

## O que você precisa preencher

1. Um arquivo por cliente em `.claude/trafego/clientes/`.
2. A tabela de contas em `skills/performance/meta-ads-report/SKILL.md`.
3. O capture loop: quando você ensina algo novo, a Ada pergunta se pode gravar no brain. É assim que o cérebro fica com o seu jeito de operar.

Nos exemplos, "Cliente A/B/C" são casos reais anonimizados. As letras não batem de um arquivo pro outro.
