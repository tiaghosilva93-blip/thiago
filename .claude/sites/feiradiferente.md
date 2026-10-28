# Perfil do site: Feira Diferente

- **URL:** https://feiradiferente.com.br
- **blog_id (WordPress.com / Jetpack):** 255660940
- **Público:** Feira de Santana (BA) e região — "Princesa do Sertão".

## Editoria: Esportes

- **Posts por dia:** 5, um por horário (fuso de Brasília / Salvador):

  | Período | Horário |
  |---|---|
  | Manhã | 06h00 |
  | Manhã | 11h00 |
  | Tarde | 13h00 |
  | Tarde | 15h00 |
  | Noite | 20h00 |

- **Status de publicação:** publicado no horário do slot. A tarefa agendada roda antes do horário e cria o post com `status: "future"` e `date` = horário do slot (fuso -03:00). Se a execução atrasar e o horário já tiver passado, use `status: "publish"`.
- **Fontes para acompanhar as notícias:** ge (ge.globo.com), ESPN Brasil (espn.com.br), Gazeta Esportiva (gazetaesportiva.com), UOL Esporte (uol.com.br/esporte), Lance! (lance.com.br). Para o futebol de Feira, complementar com veículos baianos (Bahia Notícias, A Tarde, Acorda Cidade) e perfis oficiais dos clubes.
- **Pauta por horário (sugestão):** 06h resumo/resultado da noite anterior; 11h notícia quente da manhã (contratação, lesão, coletiva); 13h futebol de Feira ou Baianão; 15h pré-jogo do dia ("onde assistir", escalações); 20h assunto da noite (jogo em andamento/próximo, repercussão).
- **Autor:** Thiago Silva — `author: 3`
- **Categorias:** Blog (1), Esportes (112), Notícias (31) → `categories: [1, 112, 31]`
- **Link interno padrão:** https://feiradiferente.com.br/category/esportes-campeonato/

### Prioridade de pautas

1. Futebol de Feira de Santana: Fluminense de Feira, Feira FC, Campeonato Baiano (Séries A e B), atletas feirenses em qualquer esporte (ex.: MMA).
2. Dupla Ba-Vi: Bahia e Vitória (Brasileirão, Copa do Brasil, Baianão, Copa do Nordeste).
3. Seleção Brasileira e brasileiros de destaque no exterior.
4. Grandes eventos esportivos do dia.

Evite repetir pauta já publicada nas últimas 48 h.

### Tags existentes (use antes de criar novas)

| Tag | ID |
|---|---|
| bahia | 35 |
| feira de santana | 33 |
| Brasileirão | 178 |
| futebol | 106 |
| Esporte | 88 |
| campeonatobaiano | 162 |
| feirafc | 160 |
| fludefeira | 161 |
| Seleção Brasileira | 114 |
| mma | 186 |

### Tom de voz

Referência: **Vitor Sérgio Rodrigues (VSR)** — Blog do VSR, TNT Sports: https://tntsports.com.br/blog-do-vsr-t1079
Leia 3–5 textos dele antes de escrever (o domínio `tntsports.com.br` está liberado na rede do ambiente).

Traços já identificados:
- abre com afirmação forte e direta ("É fato:");
- análise apoiada em dados, histórico e números;
- frases curtas, conversa com o leitor ("Pense comigo:");
- opinião clara, mas sem ofensa a jogadores ou torcidas;
- fecho curto e opinativo.

### Imagens

- **Cada post, uma capa diferente.** Nunca repetir imagem já usada em outro post (capa ou corpo). Conferir os `featured_media` dos últimos 50 posts antes de escolher.

- Acervo do site tem fotos locais (Feira de Santana); buscar com `media.list`.
- Já usadas (não repetir): Arena Fonte Nova (ID 3863, David Campbell / Wikimedia Commons, CC BY 3.0 BR); Jóia da Princesa (ID 3870, Wikimedia Commons); Barradão (ID 3869, Carol Garcia / AGECOM, CC BY 2.0).

### Observações

- O site usa Yoast SEO (`_yoast_wpseo_focuskw`, `_yoast_wpseo_title`, `_yoast_wpseo_metadesc`).
- O site também usa Elementor, mas os posts são em blocos Gutenberg.
- Primeiro post feito com este padrão: https://feiradiferente.com.br/blog/bahia-x-sao-paulo-hoje-horario-onde-assistir-escalacoes/
