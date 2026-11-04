#!/usr/bin/env python3
"""Gera PDF em formato padrão de roteiro a partir de um arquivo Fountain.

Uso: python3 fountain2pdf.py entrada.fountain [saida.pdf]

Layout: A4, fonte monoespaçada 12 pt (Liberation Mono, métrica de Courier),
10 caracteres por polegada e 6 linhas por polegada.
"""
import re
import sys

from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

FONT_DIR = '/usr/share/fonts/truetype/liberation/'
for name, f in (('Mono', 'LiberationMono-Regular.ttf'), ('Mono-B', 'LiberationMono-Bold.ttf'),
                ('Mono-I', 'LiberationMono-Italic.ttf'), ('Mono-BI', 'LiberationMono-BoldItalic.ttf')):
    pdfmetrics.registerFont(TTFont(name, FONT_DIR + f))

IN = 72
PW, PH = A4
SIZE = 12
LH = 12                       # 6 linhas por polegada
CW = SIZE * 0.6               # largura do caractere
TOP = PH - 1 * IN
BOTTOM = 1 * IN
LINES_PER_PAGE = int((TOP - BOTTOM) / LH)

# (recuo esquerdo em polegadas, largura em caracteres)
LAYOUT = {
    'scene': (1.5, 58),
    'action': (1.5, 60),
    'center': (1.5, 60),
    'character': (3.7, 38),
    'paren': (3.1, 26),
    'dialogue': (2.5, 35),
    'transition': (1.5, 60),
}

SCENE_RE = re.compile(r'^(INT|EXT|EST|INT\./EXT|INT/EXT|I/E)[\.\s]', re.I)
SCENE_NUM_RE = re.compile(r'\s*#([^#]+)#\s*$')
TRANSITION_RE = re.compile(r'^[A-ZÀ-Ý\s]+(TO|PARA|EM):$|^(CORTA PARA|FUSÃO|CORTE SECO|FADE OUT|FADE IN|FADE PARA PRETO)[\.:]?$')
CHAR_RE = re.compile(r"^[A-ZÀ-Ý0-9][A-ZÀ-Ý0-9 \.\-'’ºª]*(\s*\([^)]*\))*\s*(\^)?$")


# ---------------------------------------------------------------- análise
def parse_title_page(lines):
    if not lines or not re.match(r'^[A-Za-z ]+:', lines[0]):
        return {}, 0
    fields, key, i = {}, None, 0
    while i < len(lines) and lines[i].strip() != '':
        line = lines[i]
        m = re.match(r'^([A-Za-z ]+):\s*(.*)$', line)
        if m and not line.startswith((' ', '\t')):
            key = m.group(1).strip().lower()
            fields[key] = [m.group(2).strip()] if m.group(2).strip() else []
        elif key:
            fields[key].append(line.strip())
        i += 1
    return fields, i


def parse(src):
    text = src.replace('\r\n', '\n').replace('\t', '    ')
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    text = re.sub(r'\[\[.*?\]\]', '', text, flags=re.S)
    lines = text.split('\n')
    tp, start = parse_title_page(lines)
    lines = lines[start:]
    els = []  # (tipo, texto, extra)
    i, n = 0, len(lines)
    while i < n:
        line = lines[i].strip()
        if not line:
            i += 1; continue
        prev_blank = i == 0 or lines[i - 1].strip() == ''
        nxt = lines[i + 1].strip() if i + 1 < n else ''
        if line.startswith('#') or (line.startswith('=') and not line.startswith('===')):
            i += 1; continue
        if re.fullmatch(r'={3,}', line):
            els.append(('pagebreak', '', None)); i += 1; continue
        if line.startswith('>') and line.endswith('<'):
            els.append(('center', line[1:-1].strip(), None)); i += 1; continue
        forced_scene = line.startswith('.') and not line.startswith('..')
        if prev_blank and (forced_scene or SCENE_RE.match(line)):
            h = line[1:] if forced_scene else line
            m = SCENE_NUM_RE.search(h)
            num = m.group(1).strip() if m else None
            h = SCENE_NUM_RE.sub('', h)
            els.append(('scene', h.strip().upper(), num)); i += 1; continue
        if line.startswith('>') or (prev_blank and nxt == '' and TRANSITION_RE.match(line)):
            els.append(('transition', line.lstrip('>').strip(), None)); i += 1; continue
        forced_char = line.startswith('@')
        if prev_blank and nxt and (forced_char or (CHAR_RE.match(line) and any(c.isalpha() for c in line))):
            name = (line[1:] if forced_char else line).rstrip('^').strip()
            block = [('character', name)]
            i += 1
            while i < n and lines[i].strip() != '':
                d = lines[i].strip()
                block.append(('paren' if d.startswith('(') and d.endswith(')') else 'dialogue', d))
                i += 1
            els.append(('speech', block, None))
            continue
        block = [line.lstrip('!')]
        i += 1
        while i < n and lines[i].strip() != '':
            block.append(lines[i].strip().lstrip('!'))
            i += 1
        els.append(('action', '\n'.join(block), None))
    return tp, els


# ---------------------------------------------------------------- texto com estilo
def styled_chars(s):
    """Lista de (caractere, estilo) interpretando *, **, *** e _."""
    out, bold, ital, und = [], False, False, False
    for tok in re.split(r'(\*\*\*|\*\*|\*|_)', s):
        if tok == '***':
            bold, ital = not bold, not ital
        elif tok == '**':
            bold = not bold
        elif tok == '*':
            ital = not ital
        elif tok == '_':
            und = not und
        else:
            out += [(c, (bold, ital, und)) for c in tok]
    return out


def wrap(s, width):
    """Quebra em linhas por largura em caracteres, preservando estilo."""
    lines = []
    for para in s.split('\n'):
        chars = styled_chars(para)
        while len(chars) > width:
            cut = None
            for k in range(width, 0, -1):
                if chars[k][0] == ' ':
                    cut = k; break
            if cut is None:
                cut = width
            lines.append(chars[:cut])
            chars = chars[cut:]
            while chars and chars[0][0] == ' ':
                chars = chars[1:]
        lines.append(chars)
    return lines


# ---------------------------------------------------------------- composição
class Writer:
    def __init__(self, path, title):
        self.c = canvas.Canvas(path, pagesize=A4)
        self.c.setTitle(title)
        self.page = 0
        self.y = None

    def new_page(self):
        if self.page:
            self.c.showPage()
        self.page += 1
        self.y = TOP
        if self.page > 1:
            self.c.setFont('Mono', SIZE)
            self.c.drawRightString(PW - 1 * IN, PH - 0.5 * IN, f'{self.page - 1}.')

    def remaining(self):
        return int(round((self.y - BOTTOM) / LH))

    def draw_line(self, chars, indent_in, align='left', width=60):
        x = indent_in * IN
        if align == 'center':
            x = indent_in * IN + (width - len(chars)) * CW / 2
        elif align == 'right':
            x = indent_in * IN + (width - len(chars)) * CW
        run, style = '', None
        for ch, st in chars + [('', None)]:
            if st != style and run:
                self._run(x, run, style)
                x += len(run) * CW
                run = ''
            style = st
            run += ch
        self.y -= LH

    def _run(self, x, text, style):
        bold, ital, und = style or (False, False, False)
        font = 'Mono' + ('-' if bold or ital else '') + ('B' if bold else '') + ('I' if ital else '')
        self.c.setFont(font, SIZE)
        self.c.drawString(x, self.y, text)
        if und:
            self.c.line(x, self.y - 1.5, x + len(text) * CW, self.y - 1.5)

    def skip(self, n=1):
        self.y -= LH * n

    def save(self):
        self.c.showPage()
        self.c.save()


def title_page(w, tp):
    w.page = 0
    w.c.setFont('Mono', SIZE)
    y = PH - 3.3 * IN
    for t in tp.get('title', []):
        for ln in wrap(t, 60):
            txt = ''.join(c for c, _ in ln)
            w.c.setFont('Mono-B' if t == tp['title'][0] else 'Mono', SIZE)
            w.c.drawCentredString(PW / 2, y, txt)
            y -= LH * 1.5
    y -= LH * 3
    w.c.setFont('Mono', SIZE)
    for k in ('credit', 'author', 'authors', 'source'):
        for t in tp.get(k, []):
            w.c.drawCentredString(PW / 2, y, t)
            y -= LH * 1.5
    y = 1.5 * IN
    for k in ('draft date', 'contact', 'copyright'):
        for t in tp.get(k, []):
            w.c.drawString(1.5 * IN, y, t)
            y -= LH
    w.c.showPage()


def render(src, dst):
    tp, els = parse(src)
    title = ' '.join(tp.get('title', ['Roteiro']))
    w = Writer(dst, title)
    if tp:
        title_page(w, tp)
    w.page = 1
    w.y = TOP
    first = True

    def ensure(lines_needed):
        if w.remaining() < lines_needed:
            w.c.showPage()
            w.page += 1
            w.y = TOP
            w.c.setFont('Mono', SIZE)
            w.c.drawRightString(PW - 1 * IN, PH - 0.5 * IN, f'{w.page}.')

    for idx, (kind, text, extra) in enumerate(els):
        if kind == 'pagebreak':
            if not first:
                ensure(10 ** 6)
            continue
        if kind == 'scene':
            if not first:
                w.skip(2 if w.remaining() < LINES_PER_PAGE else 0)
            ensure(4)
            ind, wd = LAYOUT['scene']
            lines = wrap('**' + text + '**', wd)
            if extra:
                w.c.setFont('Mono-B', SIZE)
                w.c.drawString(0.9 * IN, w.y, extra)
                w.c.drawString(PW - 0.9 * IN - len(extra) * CW, w.y, extra)
            for ln in lines:
                w.draw_line(ln, ind)
        elif kind in ('action', 'center', 'transition'):
            ind, wd = LAYOUT[kind]
            lines = wrap(text, wd)
            if not first:
                w.skip()
            if w.remaining() < min(len(lines), 2):
                ensure(10 ** 6)
            align = {'center': 'center', 'transition': 'right'}.get(kind, 'left')
            for ln in lines:
                if w.remaining() < 1:
                    ensure(10 ** 6)
                w.draw_line(ln, ind, align, wd)
        elif kind == 'speech':
            rendered = []
            for sub, t in text:
                ind, wd = LAYOUT[sub]
                for ln in wrap(t, wd):
                    rendered.append((sub, ln, ind))
            name = rendered[0][1]
            if not first:
                w.skip()
            if w.remaining() < min(len(rendered), 4):
                ensure(10 ** 6)
            k = 0
            while k < len(rendered):
                if w.remaining() < 2 and k < len(rendered) - 1 and k > 0:
                    w.draw_line(styled_chars('(CONTINUA)'), LAYOUT['character'][0])
                    ensure(10 ** 6)
                    cont = [(c, s) for c, s in name] + styled_chars(' (CONT.)')
                    w.draw_line(cont, LAYOUT['character'][0])
                sub, ln, ind = rendered[k]
                w.draw_line(ln, ind)
                k += 1
        first = False
    w.save()


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else re.sub(r'\.fountain$', '', src) + '.pdf'
    with open(src, encoding='utf-8') as f:
        render(f.read(), dst)
    print(dst)


if __name__ == '__main__':
    main()
