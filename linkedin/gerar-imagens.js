// Gera as imagens dos posts (1080x1350) a partir de posts.json.
// Estilo: fundo creme, destaques em laranja, títulos em serifa itálica, layout centralizado e limpo.
// Uso: node linkedin/gerar-imagens.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf8'));
const outDir = path.join(__dirname, 'imagens');
fs.mkdirSync(outDir, { recursive: true });

// Fontes locais (Instrument Serif e DM Serif Display) embutidas em base64.
const fontDir = path.join(__dirname, 'fontes');
const fontCss = fs
  .readFileSync(path.join(fontDir, 'fontes.css'), 'utf8')
  .replace(/url\(([^)]+\.woff2)\)/g, (_, f) =>
    `url(data:font/woff2;base64,${fs.readFileSync(path.join(fontDir, f)).toString('base64')})`);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rich = (s) => esc(s).replace(/&lt;br&gt;/g, '<br>');

const CHECK = `<svg viewBox="0 0 48 48" width="52" height="52" fill="none" stroke="#1D4ED8" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="9" width="32" height="32" rx="3"/><path d="M13 24l8 8L43 7"/></svg>`;

function html(p) {
  const i = p.img;
  const isCover = !!i.hl;
  const len = i.title.replace(/<br>/g, '').length;
  const base = isCover ? (len > 26 ? 132 : 150) : len > 48 ? 104 : len > 30 ? 118 : 134;

  const top = isCover
    ? `<div class="hl">${rich(i.hl)}</div><h1 class="cover">${rich(i.title)}</h1>`
    : `<div class="tag">${esc(i.tag)}</div><h1>${rich(i.title)}</h1>`;
  const sub = i.sub && !i.highlight ? `<p class="sub">${esc(i.sub)}</p>` : '';
  const stats = (i.stats || (i.highlight ? [[i.highlight, i.sub]] : []))
    .map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('');
  const bullets = i.bullets
    ? `<ul class="list">${i.bullets.map((b) => `<li>${CHECK}<span>${esc(b)}</span></li>`).join('')}</ul>`
    : '';

  return `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fontCss}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1350px; background: #F5F0EA; color: #161412; overflow: hidden;
         font-family: 'Inter', sans-serif; }
  .wrap { position: absolute; inset: 0; padding: 120px 110px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center; }
  .tag { background: #2563EB; color: #FFFFFF; font-weight: 700; font-size: 40px; letter-spacing: 2px;
         padding: 10px 26px 8px; margin-bottom: 30px; text-transform: uppercase; }
  h1 { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400;
       font-size: ${base}px; line-height: 1.02; letter-spacing: -1.5px; max-width: 880px; }
  .hl { background: #2563EB; color: #FFFFFF; font-family: 'Instrument Serif', serif; font-size: 84px; line-height: 1;
        letter-spacing: -2px; padding: 14px 26px 18px; }
  h1.cover { font-family: 'DM Serif Display', serif; font-style: normal; letter-spacing: -3px;
             line-height: 1.0; margin-top: 10px; }
  .sub { margin-top: 56px; font-size: 38px; line-height: 1.5; color: #2B2724; max-width: 780px; }
  .stats { margin-top: 90px; display: flex; gap: 70px; justify-content: center; }
  .stat { display: flex; flex-direction: column; align-items: center; max-width: 300px; }
  .stat b { font-family: 'DM Serif Display', serif; font-weight: 400; font-size: 120px; line-height: 1;
            color: #1D4ED8; letter-spacing: -2px; white-space: nowrap; }
  .stat span { margin-top: 22px; font-weight: 700; font-size: 32px; line-height: 1.35; }
  .list { margin-top: 70px; list-style: none; text-align: left; display: flex; flex-direction: column;
          gap: ${i.bullets && i.bullets.length > 6 ? 22 : 30}px; }
  .list li { display: flex; align-items: center; gap: 24px; font-size: ${i.bullets && i.bullets.length > 6 ? 36 : 39}px;
             line-height: 1.3; }
  .list svg { flex-shrink: 0; }
  </style></head><body><div class="wrap">${top}${sub}${bullets}${stats ? `<div class="stats">${stats}</div>` : ''}</div></body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const p of posts) {
    await page.setContent(html(p), { waitUntil: 'load' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      // Reduz o título até tudo caber com folga na arte.
      const w = document.querySelector('.wrap'), h = document.querySelector('h1');
      let s = parseFloat(getComputedStyle(h).fontSize);
      while (w.scrollHeight > 1350 && s > 60) { s -= 4; h.style.fontSize = s + 'px'; }
    });
    const file = path.join(outDir, `post-${String(p.n).padStart(2, '0')}.png`);
    await page.screenshot({ path: file });
    console.log(file);
  }
  await browser.close();
})();
