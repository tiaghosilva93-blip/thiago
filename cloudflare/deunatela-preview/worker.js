// Deu na Tela — Worker na frente de deunatela.com.
// Repassa o site publicado no Lovable e, nas páginas /artigo/<slug>,
// troca as meta tags padrão pelas do post (título, resumo e capa), para que
// WhatsApp, Facebook, X, LinkedIn e Telegram mostrem a pré-visualização certa.

const SITE = "https://deunatela.com";
const DEFAULT_IMAGE = `${SITE}/og-default.png`;
const SUPABASE_URL = "https://nuxuichypvsqlbjppjvh.supabase.co";
// Chave pública (anon) — é a mesma que já vai no JavaScript do site.
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51eHVpY2h5cHZzcWxianBwanZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3Nzk1MDcsImV4cCI6MjA5MjM1NTUwN30.KPc4YMdHAkEhqnwEcAYv5WGCJCz4iyBZ89IbsOfQ4UU";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const absolute = (u) => {
  if (!u) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("//")) return `https:${u}`;
  return `${SITE}${u.startsWith("/") ? "" : "/"}${u}`;
};

async function getPost(slug) {
  const params = new URLSearchParams({
    select: "title,slug,excerpt,cover_image,og_image,seo_title,seo_description,published_at,category:categories(name)",
    slug: `eq.${slug}`,
    status: "eq.published",
    published_at: `lte.${new Date().toISOString()}`,
    limit: "1",
  });
  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?${params}`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] ?? null;
}

function postMeta(post) {
  const url = `${SITE}/artigo/${post.slug}`;
  const title = post.seo_title || post.title;
  const desc = (post.seo_description || post.excerpt || "Cinema, séries, streaming e cultura pop no Deu na Tela.").slice(0, 300);
  const img = absolute(post.og_image || post.cover_image);
  const tags = [
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="Deu na Tela">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:image" content="${esc(img)}">`,
    `<meta property="og:image:alt" content="${esc(post.title)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    post.published_at ? `<meta property="article:published_time" content="${esc(post.published_at)}">` : "",
    post.category?.name ? `<meta property="article:section" content="${esc(post.category.name)}">` : "",
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(desc)}">`,
    `<meta name="twitter:image" content="${esc(img)}">`,
  ];
  return { title: `${title} — Deu na Tela`, html: tags.filter(Boolean).join("\n") };
}

const remove = { element: (el) => el.remove() };

export default {
  async fetch(request, env) {
    const origin = env.LOVABLE_ORIGIN || "https://deunatelanews.lovable.app";
    const incoming = new URL(request.url);

    // www → domínio principal
    if (incoming.hostname.startsWith("www.")) {
      incoming.hostname = incoming.hostname.slice(4);
      return Response.redirect(incoming.toString(), 301);
    }

    const target = new URL(incoming.pathname + incoming.search, origin);
    let response = await fetch(new Request(target, request), { redirect: "manual" });

    // Redirecionamentos da origem continuam no domínio do site
    const location = response.headers.get("Location");
    if (location) {
      const loc = new URL(location, origin);
      if (loc.host === new URL(origin).host) {
        loc.protocol = "https:";
        loc.host = incoming.host;
        response = new Response(response.body, response);
        response.headers.set("Location", loc.toString());
      }
      return response;
    }

    const match = incoming.pathname.match(/^\/artigo\/([a-z0-9_-]+)\/?$/i);
    const isHtml = (response.headers.get("Content-Type") || "").includes("text/html");
    if (!match || !isHtml || request.method !== "GET") return response;

    let post = null;
    try {
      post = await getPost(match[1]);
    } catch {
      // Se o banco falhar, o site segue com as meta tags padrão.
    }
    if (!post) return response;

    const meta = postMeta(post);
    return new HTMLRewriter()
      .on('meta[property^="og:"]', remove)
      .on('meta[property^="article:"]', remove)
      .on('meta[name^="twitter:"]', remove)
      .on('meta[name="description"]', remove)
      .on('link[rel="canonical"]', remove)
      .on("title", { element: (el) => el.setInnerContent(meta.title) })
      .on("head", { element: (el) => el.append(meta.html, { html: true }) })
      .transform(response);
  },
};
