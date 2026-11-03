#!/usr/bin/env python3
"""Converte um roteiro Fountain (.fountain) em Final Draft (.fdx).

Uso: python3 fountain2fdx.py entrada.fountain [saida.fdx]
"""
import re
import sys
from xml.sax.saxutils import escape

SCENE_RE = re.compile(r'^(INT|EXT|EST|INT\./EXT|INT/EXT|I/E)[\.\s]', re.I)
SCENE_NUM_RE = re.compile(r'\s*#([^#]+)#\s*$')
TRANSITION_RE = re.compile(r'^[A-ZÀ-Ý\s]+(TO|PARA|EM):$|^(CORTA PARA|FUSÃO|CORTE SECO|FADE OUT|FADE IN|FADE PARA PRETO)[\.:]?$')
CHAR_RE = re.compile(r"^[A-ZÀ-Ý0-9][A-ZÀ-Ý0-9 \.\-'’ºª]*(\s*\([^)]*\))*\s*(\^)?$")


def styled_text(s):
    """Converte ênfase Fountain (***, **, *, _) em <Text Style=...>."""
    out = []
    tokens = re.split(r'(\*\*\*|\*\*|\*|_)', s)
    bold = italic = underline = False
    buf = ''

    def flush():
        nonlocal buf
        if buf:
            styles = [n for n, on in (('Bold', bold), ('Italic', italic), ('Underline', underline)) if on]
            attr = f' Style="{"+".join(styles)}"' if styles else ''
            out.append(f'<Text{attr}>{escape(buf)}</Text>')
            buf = ''

    for t in tokens:
        if t == '***':
            flush(); bold = not bold; italic = not italic
        elif t == '**':
            flush(); bold = not bold
        elif t == '*':
            flush(); italic = not italic
        elif t == '_':
            flush(); underline = not underline
        else:
            buf += t
    flush()
    return ''.join(out) or '<Text></Text>'


def para(ptype, text, extra=''):
    return f'    <Paragraph Type="{ptype}"{extra}>{styled_text(text)}</Paragraph>'


def parse_title_page(lines):
    """Retorna (dict de campos, índice onde o corpo começa)."""
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


def title_page_xml(f):
    def p(text, align='Center', ptype='Text'):
        return (f'      <Paragraph Alignment="{align}" FirstIndent="0.00" Leading="Regular" '
                f'LeftIndent="1.00" RightIndent="7.50" SpaceBefore="0" Spacing="1" '
                f'StartsNewPage="No" Type="{ptype}">{styled_text(text)}</Paragraph>')
    rows = [p('') for _ in range(12)]
    for t in f.get('title', []):
        rows.append(p(t))
    rows.append(p(''))
    for k in ('credit', 'author', 'authors', 'source'):
        for t in f.get(k, []):
            rows.append(p(t))
    rows += [p('') for _ in range(14)]
    for k in ('draft date', 'contact', 'copyright', 'notes'):
        for t in f.get(k, []):
            rows.append(p(t, align='Left'))
    return '  <TitlePage>\n    <Content>\n' + '\n'.join(rows) + '\n    </Content>\n  </TitlePage>\n'


def convert(src):
    text = src.replace('\r\n', '\n').replace('\t', '    ')
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)          # boneyard
    text = re.sub(r'\[\[.*?\]\]', '', text, flags=re.S)        # notas
    lines = text.split('\n')
    tp, start = parse_title_page(lines)
    lines = lines[start:]

    out = []
    i, n = 0, len(lines)
    while i < n:
        raw = lines[i]
        line = raw.strip()
        if not line:
            i += 1
            continue
        prev_blank = i == 0 or lines[i - 1].strip() == ''
        nxt = lines[i + 1].strip() if i + 1 < n else ''

        # seções e sinopses: ignorar
        if line.startswith('#') or (line.startswith('=') and not line.startswith('===')):
            i += 1; continue
        if re.fullmatch(r'={3,}', line):
            i += 1; continue

        # centralizado
        if line.startswith('>') and line.endswith('<'):
            out.append(para('Action', line[1:-1].strip(), ' Alignment="Center"'))
            i += 1; continue

        # cabeçalho de cena
        forced_scene = line.startswith('.') and not line.startswith('..')
        if prev_blank and (forced_scene or SCENE_RE.match(line)):
            h = line[1:] if forced_scene else line
            num = ''
            m = SCENE_NUM_RE.search(h)
            if m:
                num = f' Number="{escape(m.group(1).strip())}"'
                h = SCENE_NUM_RE.sub('', h)
            out.append(para('Scene Heading', h.strip().upper(), num))
            i += 1; continue

        # transição
        if line.startswith('>') or (prev_blank and nxt == '' and TRANSITION_RE.match(line)):
            out.append(para('Transition', line.lstrip('>').strip()))
            i += 1; continue

        # personagem + diálogo
        forced_char = line.startswith('@')
        if prev_blank and nxt and (forced_char or (CHAR_RE.match(line) and any(c.isalpha() for c in line))):
            name = line[1:] if forced_char else line
            name = name.rstrip('^').strip()
            out.append(para('Character', name))
            i += 1
            while i < n and lines[i].strip() != '':
                d = lines[i].strip()
                if d.startswith('(') and d.endswith(')'):
                    out.append(para('Parenthetical', d))
                else:
                    out.append(para('Dialogue', d))
                i += 1
            continue

        # ação (bloco até a linha em branco; quebras de linha viram parágrafos)
        block = [line[1:] if line.startswith('!') else line]
        i += 1
        while i < n and lines[i].strip() != '':
            block.append(lines[i].strip().lstrip('!'))
            i += 1
        out.append(para('Action', ' '.join(block)))

    body = '\n'.join(out)
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<FinalDraft DocumentType="Script" Template="No" Version="5">
  <Content>
{body}
  </Content>
{title_page_xml(tp) if tp else ''}  <ElementSettings Type="Scene Heading">
    <FontSpec AdornmentStyle="0" Background="#FFFFFFFFFFFF" Color="#000000000000" Font="Courier Final Draft" RevisionID="0" Size="12" Style="AllCaps"/>
    <ParagraphSpec Alignment="Left" FirstIndent="0.00" Leading="Regular" LeftIndent="1.50" RightIndent="7.50" SpaceBefore="24" Spacing="1" StartsNewPage="No"/>
    <Behavior PaginateAs="Scene Heading" ReturnKey="Action" Shortcut="1"/>
  </ElementSettings>
  <ElementSettings Type="Action">
    <FontSpec AdornmentStyle="0" Background="#FFFFFFFFFFFF" Color="#000000000000" Font="Courier Final Draft" RevisionID="0" Size="12" Style=""/>
    <ParagraphSpec Alignment="Left" FirstIndent="0.00" Leading="Regular" LeftIndent="1.50" RightIndent="7.50" SpaceBefore="12" Spacing="1" StartsNewPage="No"/>
    <Behavior PaginateAs="Action" ReturnKey="Action" Shortcut="2"/>
  </ElementSettings>
  <ElementSettings Type="Character">
    <FontSpec AdornmentStyle="0" Background="#FFFFFFFFFFFF" Color="#000000000000" Font="Courier Final Draft" RevisionID="0" Size="12" Style="AllCaps"/>
    <ParagraphSpec Alignment="Left" FirstIndent="0.00" Leading="Regular" LeftIndent="3.50" RightIndent="7.25" SpaceBefore="12" Spacing="1" StartsNewPage="No"/>
    <Behavior PaginateAs="Character" ReturnKey="Dialogue" Shortcut="3"/>
  </ElementSettings>
  <ElementSettings Type="Parenthetical">
    <FontSpec AdornmentStyle="0" Background="#FFFFFFFFFFFF" Color="#000000000000" Font="Courier Final Draft" RevisionID="0" Size="12" Style=""/>
    <ParagraphSpec Alignment="Left" FirstIndent="-0.10" Leading="Regular" LeftIndent="3.00" RightIndent="5.50" SpaceBefore="0" Spacing="1" StartsNewPage="No"/>
    <Behavior PaginateAs="Parenthetical" ReturnKey="Dialogue" Shortcut="4"/>
  </ElementSettings>
  <ElementSettings Type="Dialogue">
    <FontSpec AdornmentStyle="0" Background="#FFFFFFFFFFFF" Color="#000000000000" Font="Courier Final Draft" RevisionID="0" Size="12" Style=""/>
    <ParagraphSpec Alignment="Left" FirstIndent="0.00" Leading="Regular" LeftIndent="2.50" RightIndent="6.00" SpaceBefore="0" Spacing="1" StartsNewPage="No"/>
    <Behavior PaginateAs="Dialogue" ReturnKey="Action" Shortcut="5"/>
  </ElementSettings>
  <ElementSettings Type="Transition">
    <FontSpec AdornmentStyle="0" Background="#FFFFFFFFFFFF" Color="#000000000000" Font="Courier Final Draft" RevisionID="0" Size="12" Style="AllCaps"/>
    <ParagraphSpec Alignment="Right" FirstIndent="0.00" Leading="Regular" LeftIndent="5.50" RightIndent="7.10" SpaceBefore="12" Spacing="1" StartsNewPage="No"/>
    <Behavior PaginateAs="Transition" ReturnKey="Scene Heading" Shortcut="6"/>
  </ElementSettings>
</FinalDraft>
'''


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else re.sub(r'\.fountain$', '', src) + '.fdx'
    with open(src, encoding='utf-8') as f:
        xml = convert(f.read())
    with open(dst, 'w', encoding='utf-8') as f:
        f.write(xml)
    print(dst)


if __name__ == '__main__':
    main()
