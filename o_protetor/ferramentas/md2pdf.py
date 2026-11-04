#!/usr/bin/env python3
"""Gera PDF de texto corrido (sinopse, bíblia) a partir de Markdown simples.

Uso: python3 md2pdf.py entrada.md [saida.pdf]

Suporta: # título, ## seção, ### subtítulo, parágrafos, **negrito**, *itálico*,
listas com "- ", citações com "> " e linhas "---" (quebra de página).
"""
import re
import sys

from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (ListFlowable, ListItem, PageBreak, Paragraph,
                                SimpleDocTemplate, Spacer)

D = '/usr/share/fonts/truetype/liberation/'
pdfmetrics.registerFont(TTFont('Serif', D + 'LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Serif-B', D + 'LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Serif-I', D + 'LiberationSerif-Italic.ttf'))
pdfmetrics.registerFont(TTFont('Serif-BI', D + 'LiberationSerif-BoldItalic.ttf'))
pdfmetrics.registerFontFamily('Serif', normal='Serif', bold='Serif-B', italic='Serif-I', boldItalic='Serif-BI')

BODY = ParagraphStyle('body', fontName='Serif', fontSize=12, leading=18, alignment=TA_JUSTIFY,
                      firstLineIndent=1.25 * cm, spaceAfter=6)
H1 = ParagraphStyle('h1', fontName='Serif-B', fontSize=24, leading=30, alignment=TA_CENTER, spaceAfter=18)
H2 = ParagraphStyle('h2', fontName='Serif-B', fontSize=16, leading=22, spaceBefore=18, spaceAfter=10)
H3 = ParagraphStyle('h3', fontName='Serif-B', fontSize=13, leading=18, spaceBefore=12, spaceAfter=6)
QUOTE = ParagraphStyle('quote', parent=BODY, fontName='Serif-I', leftIndent=1.5 * cm, rightIndent=1.5 * cm,
                       firstLineIndent=0, alignment=TA_CENTER)
CENTER = ParagraphStyle('center', parent=BODY, alignment=TA_CENTER, firstLineIndent=0)
ITEM = ParagraphStyle('item', parent=BODY, firstLineIndent=0, spaceAfter=2)


def inline(s):
    s = s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    s = re.sub(r'\*\*\*(.+?)\*\*\*', r'<b><i>\1</i></b>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<i>\1</i>', s)
    return s


def build(md):
    story, para, items = [], [], []

    def flush_para():
        if para:
            story.append(Paragraph(inline(' '.join(para)), BODY))
            para.clear()

    def flush_items():
        if items:
            story.append(ListFlowable([ListItem(Paragraph(inline(t), ITEM), leftIndent=12) for t in items],
                                      bulletType='bullet', start='•', leftIndent=18))
            items.clear()

    first_h1 = True
    for raw in md.splitlines():
        line = raw.rstrip()
        s = line.strip()
        if not s:
            flush_para(); flush_items(); continue
        if re.fullmatch(r'-{3,}|\*{3,}', s):
            flush_para(); flush_items(); story.append(PageBreak()); continue
        m = re.match(r'^(#{1,3})\s+(.*)$', s)
        if m:
            flush_para(); flush_items()
            lvl, txt = len(m.group(1)), inline(m.group(2))
            if lvl == 1:
                if first_h1:
                    story.append(Spacer(1, 6 * cm))
                    first_h1 = False
                story.append(Paragraph(txt, H1))
            else:
                story.append(Paragraph(txt, H2 if lvl == 2 else H3))
            continue
        if s.startswith('>'):
            flush_para(); flush_items()
            story.append(Paragraph(inline(s.lstrip('> ').strip()), QUOTE)); continue
        if re.match(r'^[-*]\s+', s):
            flush_para()
            items.append(re.sub(r'^[-*]\s+', '', s)); continue
        para.append(s)
    flush_para(); flush_items()
    return story


def page_number(canvas, doc):
    if doc.page > 1:
        canvas.setFont('Serif', 10)
        canvas.drawCentredString(A4[0] / 2, 1.5 * cm, str(doc.page))


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else re.sub(r'\.md$', '', src) + '.pdf'
    md = open(src, encoding='utf-8').read()
    title = next((l[2:].strip() for l in md.splitlines() if l.startswith('# ')), 'Documento')
    doc = SimpleDocTemplate(dst, pagesize=A4, leftMargin=3 * cm, rightMargin=2.5 * cm,
                            topMargin=2.5 * cm, bottomMargin=2.5 * cm, title=re.sub(r'[*_]', '', title))
    doc.build(build(md), onFirstPage=page_number, onLaterPages=page_number)
    print(dst)


if __name__ == '__main__':
    main()
