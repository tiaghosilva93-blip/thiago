// Uso: node html2pdf.js entrada.html saida.pdf
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [inp, out] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.resolve(inp));
  await p.pdf({ path: out, preferCSSPageSize: true, displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;font-family:monospace;font-size:9pt;text-align:right;padding-right:1in;"><span class="pageNumber"></span>.</div>' });
  await b.close();
})();
