# Worker de pré-visualização do Deu na Tela

O site do Deu na Tela é montado no navegador, e os robôs do WhatsApp, Facebook, X, LinkedIn e Telegram não executam JavaScript. Sem ajuda, todo link de artigo mostra a mesma prévia.

Este Worker fica na frente de `deunatela.com`:

- repassa todas as páginas do site publicado no Lovable (`https://deunatelanews.lovable.app`);
- nas páginas `/artigo/<slug>`, busca o post no banco (Supabase, chave pública) e troca as meta tags padrão pelas do post: título SEO, meta descrição, capa, categoria e data;
- redireciona `www.deunatela.com` para `deunatela.com`.

Se o post não existir ou o banco falhar, a página sai normalmente, com a prévia padrão do site (`/og-default.png`).

## Instalação (painel do Cloudflare)

1. **Criar o Worker:** *Workers & Pages → Create → Worker*, nome `deunatela-preview` → *Deploy*. Depois *Edit code*, apague o código de exemplo, cole o conteúdo de `worker.js` e clique em *Deploy*.
2. **Variável:** *Settings → Variables and Secrets → Add*: `LOVABLE_ORIGIN` = `https://deunatelanews.lovable.app` (tipo texto) → *Deploy*.
3. **Testar antes de mexer no domínio:** abra `https://deunatela-preview.<sua-subconta>.workers.dev/artigo/serie-de-harry-potter-tiago-e-lilian-potter`. O site deve abrir normalmente. Cole esse endereço em https://www.opengraph.xyz para ver a prévia com a capa do post.
4. **Ligar ao domínio** (o domínio precisa estar na conta Cloudflare):
   1. *DNS → Records*: apague os registros `A`/`CNAME` de `deunatela.com` e `www` que apontam para o Lovable (ex.: `185.158.133.1`).
   2. No Worker: *Settings → Domains & Routes → Add → Custom domain*: `deunatela.com`; repita para `www.deunatela.com`. O Cloudflare cria o DNS e o certificado sozinho (leva poucos minutos).
   3. No Lovable: *Project Settings → Domains*, remova `deunatela.com` (a documentação do Lovable pede isso quando há proxy/CDN na frente).
5. **Conferir:** cole `https://deunatela.com/artigo/serie-de-harry-potter-tiago-e-lilian-potter` no [Sharing Debugger do Facebook](https://developers.facebook.com/tools/debug/) (botão *Scrape Again*) e no WhatsApp.

O WhatsApp e o Facebook guardam a prévia antiga por um tempo. Para um link que já tinha sido compartilhado, use o *Scrape Again* do Facebook. No WhatsApp, a prévia nova aparece quando o link é colado de novo, depois que o cache dele expira.

## Para desfazer

Remova os *Custom domains* do Worker, recrie no DNS o registro `A` de `deunatela.com` (e `www`) para o IP indicado pelo Lovable e conecte o domínio de novo em *Project Settings → Domains* no Lovable.
