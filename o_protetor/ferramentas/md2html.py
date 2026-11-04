#!/usr/bin/env python3
"""Converte Markdown simples em HTML pronto para importar no Google Docs.

Uso: python3 md2html.py entrada.md [saida.html]

Suporta # / ## / ###, parágrafos, **negrito**, *itálico*, listas "- ",
citações "> " e "---" (quebra de página).
"""
import html
import re
import sys

CSS = ('body{font-family:"Times New Roman",serif;font-size:12pt;line-height:1.5}'
       'h1{text-align:center;font-size:24pt}h2{font-size:16pt}h3{font-size:13pt}'
       'p{text-align:justify;text-indent:1.25cm;margin:0 0 6pt 0}'
       'blockquote{font-style:italic;text-align:center}')


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\*\*\*(.+?)\*\*\*', r'<b><i>\1</i></b>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<i>\1</i>', s)
    return s


def convert(md):
    out, para, items = [], [], []

    def flush():
        if para:
            out.append(f'<p>{inline(" ".join(para))}</p>')
            para.clear()
        if items:
            out.append('<ul>' + ''.join(f'<li>{inline(t)}</li>' for t in items) + '</ul>')
            items.clear()

    for raw in md.splitlines():
        s = raw.strip()
        if not s:
            flush(); continue
        if re.fullmatch(r'-{3,}|\*{3,}', s):
            flush(); out.append('<p style="page-break-before:always"></p>'); continue
        m = re.match(r'^(#{1,3})\s+(.*)$', s)
        if m:
            flush(); n = len(m.group(1))
            out.append(f'<h{n}>{inline(m.group(2))}</h{n}>'); continue
        if s.startswith('>'):
            flush(); out.append(f'<blockquote>{inline(s.lstrip("> ").strip())}</blockquote>'); continue
        if re.match(r'^[-*]\s+', s):
            if para:
                out.append(f'<p>{inline(" ".join(para))}</p>'); para.clear()
            items.append(re.sub(r'^[-*]\s+', '', s)); continue
        para.append(s)
    flush()
    return ('<!DOCTYPE html><html><head><meta charset="utf-8"><style>' + CSS +
            '</style></head><body>\n' + '\n'.join(out) + '\n</body></html>\n')


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else re.sub(r'\.md$', '', src) + '.html'
    with open(src, encoding='utf-8') as f:
        doc = convert(f.read())
    with open(dst, 'w', encoding='utf-8') as f:
        f.write(doc)
    print(dst)


if __name__ == '__main__':
    main()
