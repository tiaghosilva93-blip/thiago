# Perfil do site: Deu na Tela

- **URL:** https://deunatela.com — posts em `https://deunatela.com/artigo/<slug>`, categorias em `https://deunatela.com/categoria/<slug>`
- **Plataforma:** Lovable (React) + Lovable Cloud (Supabase). Não é WordPress.
- **Projeto Lovable:** `4a9f98d2-39fa-4d12-92a3-5cf82d4ee43a` ("BLOG: Deu na Telha"), workspace `NUhYbS6Jd9dErk6pIBcu`
- **Acesso:** conector Lovable → `query_database` (SQL direto no banco de produção). Só faça INSERT/UPDATE em `posts`, `tags` e `post_tags`. Nunca DELETE nem DDL.
- **Público:** brasileiro, fã de cinema, séries, streaming, TV, música e cultura pop. O site traduz sozinho para EN/ES/FR — escreva só em português.
- **Agentes:** editor `editor-de-pauta` → redatores `redator-cultura-pop`.

## Publicação

- **Status:** direto ao ar. Grave `status = 'published'` com `published_at` = horário do slot (fuso -03:00). O site só mostra o post quando `published_at <= now()`, então isso funciona como agendamento.
- **Autor:** Thiago Silva — `author_id = '3d19cc74-9716-4c42-a895-21fb5b8b6611'`
- **Destaque do dia:** só **um** post fica com `is_featured = true` por vez. Ele vira a manchete grande da home; a coluna lateral mostra os mais recentes. Os redatores sempre gravam `is_featured = false`; quem escolhe o destaque é o editor-de-pauta, **uma vez por dia, na execução do slot das 11h**, depois de revisar os posts desse slot.
  - Candidatos: posts publicados desde 22h do dia anterior até o slot das 11h (inclusive os agendados para 11h).
  - Critérios, nesta ordem: maior interesse do público brasileiro no dia (estreia, anúncio grande, nome muito buscado); fato principal confirmado por fonte oficial ou dois veículos; capa forte e funcionando; sem spoiler no título; não repetir a mesma franquia/artista/categoria do destaque do dia anterior.
  - Gravação (troca o destaque de uma vez): `update posts set is_featured = (slug = '<slug-escolhido>') where is_featured or slug = '<slug-escolhido>';`
  - Se nenhum candidato for bom o bastante, mantenha o destaque atual e diga no relato.

## Grade diária: 7 categorias × 3 posts = 21 posts

| Horário | Categorias |
|---|---|
| 06:00 | Cinema, Séries, Música |
| 09:00 | TV, Streaming, Cultura Pop |
| 11:00 | Bastidores, Cinema, Séries |
| 13:00 | Música, TV, Streaming |
| 15:00 | Cultura Pop, Bastidores, Cinema |
| 17:00 | Séries, Música |
| 20:00 | TV, Streaming |
| 22:00 | Cultura Pop, Bastidores |

Sugestão de foco: 06h o que saiu durante a noite (EUA); 09h audiência/novelas e estreias do dia; 11h e 13h notícias quentes da manhã; 15h e 17h lançamentos, trailers e anúncios; 20h TV ao vivo, realities e novelas da noite; 22h repercussão e bastidores.

### Mix de pautas (regra obrigatória — não é só lançamento)

O site não pode virar só agenda de estreias. Alterne estes tipos em todas as categorias:

| Tipo | Exemplos |
|---|---|
| **Elenco e escalações** | Quem foi confirmado (ou saiu) em um filme, série ou novela; quem vai dirigir; quem vai apresentar um reality. |
| **Bastidores** | Como foram as filmagens, conflitos e mudanças na produção, orçamento, troca de diretor, gravação de novela, bastidores de emissora e de reality, bastidores da indústria musical. |
| **Música** | Artista anuncia álbum ou turnê, música que conquistou a Billboard ou o Spotify, recordes, prêmios, parcerias, clipes. |
| **TV e novelas** | O que vai acontecer na novela, audiência, mudanças na grade, contratações e saídas de emissora, realities. |
| **Curiosidades** | Histórias por trás de um filme ou música, recordes, easter eggs, "você sabia". |
| **Prêmios e números** | Indicações, vencedores, bilheteria, audiência, paradas. |
| **Lançamentos** | Estreias, trailers, datas, "onde assistir". |

- **Em cada horário, no máximo 1 pauta pode ser de Lançamentos.** As outras categorias do horário saem de outros tipos.
- No dia, **pelo menos 5 dos 21 posts** devem ser de Bastidores ou Elenco, e **pelo menos 3** de Curiosidades ou Prêmios/Números.
- Na categoria **Música**, a maioria deve ser sobre artistas, paradas, álbuns anunciados, turnês e bastidores — não só "saiu hoje".
- Na categoria **TV**, priorize novelas, realities, audiência e bastidores das emissoras (Notícias da TV, Splash).
- Antes de pautar, veja os tipos dos posts já publicados no dia e escolha o tipo que ainda falta.

Repercussão da crítica (como a crítica recebeu um filme/série/álbum, com crédito aos veículos e sem avaliação própria) vai na categoria **Críticas**, no lugar de Cinema/Séries/Música daquele slot, quando for o assunto mais forte.

## Categorias (IDs)

| Categoria | slug | id |
|---|---|---|
| Cinema | cinema | 4763bc7c-e108-4a50-a4c3-10625fcae724 |
| Séries | series | edac469c-5eba-4b12-8212-b7c91e19ebb3 |
| Streaming | streaming | 665e916a-806f-4d78-b0ab-6a5005710efd |
| TV | tv | 29e2260a-3886-4b88-be28-98ec8a227a25 |
| Música | musica | 4e52e675-3ccd-4b63-b6ba-e42d24d75e4b |
| Cultura Pop | cultura-pop | 297f47a5-b81d-4574-b527-6179b8c29c1e |
| Bastidores | bastidores | ab6ca56c-99a3-41e3-b56f-e503cb12c88d |
| Críticas | criticas | bac781bf-f132-4503-ac43-8d37c9ce8f94 |

(Fora da rotina: Cultura, Entretenimento, Opinião, Deu na Tela Agora.)

## Fontes

| Fonte | Para quê |
|---|---|
| Omelete — omelete.com.br | Cobertura geral de cultura pop (filmes, séries, TV, música, animes, games) |
| Papelpop — papelpop.com | Música pop, artistas, bastidores |
| AdoroCinema — adorocinema.com | Cinema, trailers, estreias, onde assistir |
| Cinema com Rapadura — cinemacomrapadura.com.br | Notícias e crítica de cinema |
| CinePOP — cinepop.com.br | Filmes, séries, streaming, terror e franquias |
| Tenho Mais Discos Que Amigos! — tenhomaisdiscosqueamigos.com | Música, shows, indústria musical |
| Papo de Cinema — papodecinema.com.br | Crítica, festivais, cinema brasileiro |
| Observatório do Cinema — observatoriodocinema.com.br | Séries e streaming, plataformas |
| Notícias da TV — noticiasdatv.uol.com.br | TV brasileira, novelas, realities, audiência |
| Splash (UOL) — uol.com.br/splash | Famosos, realities, novelas |

Sempre que possível, confirme na fonte oficial (Netflix, Prime Video, Disney+, HBO Max, Globoplay, Globo, estúdios, gravadoras, perfis dos artistas) e cite veículos internacionais de origem (Variety, Deadline, The Hollywood Reporter, Billboard) quando a notícia nasceu lá.

## Imagens

- **Todo post tem imagem de destaque (obrigatório).** `cover_image` e `og_image` nunca ficam vazios. Post sem capa não é publicado: o redator procura outra imagem válida; se não achar nenhuma, grava como `draft` e relata.
- **Cada post, uma capa diferente.** Nunca repetir `cover_image` de outro post. Conferir com `select slug from posts where cover_image = '<url>';` antes de gravar.

## Formato do conteúdo

HTML simples (o site renderiza o HTML direto): `<p>`, `<h2>`, `<h3>`, `<strong>`, `<em>`, `<ul><li>`, `<blockquote>`, `<a href>`, `<img src alt>`, `<iframe>` do YouTube (`<iframe width="560" height="315" src="https://www.youtube.com/embed/ID" title="Trailer …" allowfullscreen></iframe>`). Sem `<h1>` (o título já é o H1). A capa (`cover_image`) aparece acima do texto; não repita a capa dentro do conteúdo.

## Modelo de gravação (um SQL só)

Antes: `select slug, title, seo_keywords, published_at from posts where created_at > now() - interval '3 days' or published_at > now() - interval '3 days' order by published_at desc;`

```sql
with p as (
  insert into posts (title, slug, excerpt, content, cover_image, og_image, status, published_at,
                     reading_time, seo_title, seo_description, seo_keywords, category_id, author_id, is_featured)
  values (
    $t$Título$t$,
    'slug-do-post',
    $e$Linha fina$e$,
    $c$<p>HTML do texto…</p>$c$,
    'https://url-da-capa.jpg',
    'https://url-da-capa.jpg',
    'published',
    '2026-10-28T13:00:00-03:00',
    3,
    $s$Título SEO (até 45)$s$,
    $d$Meta descrição de 120 a 155 caracteres$d$,
    'palavra-chave, termo 2, termo 3',
    '<id da categoria>',
    '3d19cc74-9716-4c42-a895-21fb5b8b6611',
    false
  )
  returning id, slug
),
t as (
  insert into tags (name, slug) values ('Netflix', 'netflix'), ('Stranger Things', 'stranger-things')
  on conflict (slug) do update set name = excluded.name
  returning id
)
insert into post_tags (post_id, tag_id)
select p.id, t.id from p cross join t
returning (select slug from p);
```

- Use dollar-quoting (`$c$…$c$`) para textos — dispensa escapar aspas e apóstrofos.
- 3 a 6 tags por post: plataforma/canal, título da obra, nomes principais. Slug da tag = nome sem acento, minúsculo, com hífens.
- Depois de gravar: `select title, status, published_at, (select name from categories where id = category_id) from posts where slug = '…';`

## Observações

- O nome público do autor é **Thiago Silva** (`profiles.display_name`, alterado a pedido do usuário em 28/10/2026).
- Se o WebFetch falhar num domínio liberado, leia a página com `curl -sSL -A "Mozilla/5.0" <url>` pelo Bash e extraia os `<p>` com Python.
- Primeiro post feito com este padrão: https://deunatela.com/artigo/serie-de-harry-potter-tiago-e-lilian-potter
- As prévias em redes sociais (WhatsApp/Facebook/X) não leem o SEO por post, porque o site é renderizado no navegador. Melhoria possível no Lovable (pré-renderização), fora da rotina.
