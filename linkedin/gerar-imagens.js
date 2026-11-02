// Gera as imagens dos posts (1080x1350) a partir de posts.json.
// Uso: node linkedin/gerar-imagens.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf8'));
const outDir = path.join(__dirname, 'imagens');
fs.mkdirSync(outDir, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// títulos podem ter <br>
const title = (s) => esc(s).replace(/&lt;br&gt;/g, '<br>');

function html(p, total) {
  const i = p.img;
  const long = i.title.replace(/<br>/g, '').length;
  const tSize = i.bullets ? (long > 40 ? 76 : 88) : long > 45 ? 92 : 108;
  const bullets = i.bullets
    ? `<ol class="bullets">${i.bullets.map((b) => `<li><span>${esc(b)}</span></li>`).join('')}</ol>`
    : '';
  const stats = i.stats
    ? `<div class="stats">${i.stats.map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('')}</div>`
    : '';
  const highlight = i.highlight ? `<div class="stats"><div class="stat"><b>${esc(i.highlight)}</b><span>${esc(i.sub)}</span></div></div>` : '';
  const sub = i.sub && !i.highlight ? `<p class="sub">${esc(i.sub)}</p>` : '';
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1350px; background: #0E1A2B; color: #F4F1EA;
         font-family: 'Inter', sans-serif; overflow: hidden; }
  .wrap { position: absolute; inset: 0; padding: 96px 88px 88px; display: flex; flex-direction: column; }
  .bar { position: absolute; left: 0; top: 0; width: 18px; height: 100%; background: #F2B544; }
  .tag { font: 600 26px 'JetBrains Mono', monospace; letter-spacing: 3px; color: #F2B544; margin-bottom: 56px; }
  h1 { font-family: 'Inter Display', 'Inter', sans-serif; font-weight: 800; font-size: ${tSize}px;
       line-height: 1.04; letter-spacing: -2px; }
  .sub { margin-top: 44px; font-size: 40px; line-height: 1.3; color: #B9C2CF; font-weight: 400; max-width: 860px; }
  .stats { margin-top: auto; display: flex; flex-direction: column; gap: 34px; padding-bottom: 40px; }
  .stat { display: flex; align-items: baseline; gap: 28px; border-top: 2px solid #26364D; padding-top: 30px; }
  .stat b { font-family: 'Inter Display', sans-serif; font-weight: 800; font-size: 104px; color: #F2B544;
            letter-spacing: -3px; min-width: 300px; line-height: 1; white-space: nowrap; flex-shrink: 0; }
  .stat span { font-size: 34px; color: #D5DBE3; line-height: 1.25; }
  .bullets { margin-top: 52px; list-style: none; counter-reset: c; display: flex; flex-direction: column; gap: 22px; }
  .bullets li { counter-increment: c; display: flex; gap: 28px; align-items: baseline;
                font-size: ${i.bullets && i.bullets.length > 6 ? 34 : 38}px; line-height: 1.25; color: #E6E9EE;
                border-top: 2px solid #26364D; padding-top: 20px; }
  .bullets li::before { content: counter(c, decimal-leading-zero); font: 700 30px 'JetBrains Mono', monospace;
                        color: #F2B544; min-width: 52px; }
  .foot { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end;
          padding-top: 36px; border-top: 2px solid #F2B544; }
  .stats + .foot, .bullets + .foot { margin-top: ${i.bullets ? 'auto' : '0'}; }
  .name { font-weight: 800; font-size: 36px; }
  .role { font-size: 26px; color: #B9C2CF; margin-top: 6px; }
  .num { font: 600 24px 'JetBrains Mono', monospace; color: #7E8CA0; }
  </style></head><body><div class="bar"></div><div class="wrap">
    <div class="tag">${esc(i.tag)}</div>
    <h1>${title(i.title)}</h1>
    ${sub}${bullets}${stats}${highlight}
    <div class="foot"><div><div class="name">Thiago Silva</div>
      <div class="role">Performance + Copy · SEO, AEO e GEO</div></div>
      <div class="num">linkedin.com/in/thiaghosilva</div></div>
  </div></body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const p of posts) {
    await page.setContent(html(p, posts.length), { waitUntil: 'load' });
    const file = path.join(outDir, `post-${String(p.n).padStart(2, '0')}.png`);
    await page.screenshot({ path: file });
    console.log(file);
  }
  await browser.close();
})();
