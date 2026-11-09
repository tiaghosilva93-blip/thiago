#!/usr/bin/env python3
"""Converte arquivos .fountain (subconjunto) em HTML no formato padrao de roteiro.
Uso: fountain2html.py saida.html [--titulo "Titulo"] [--autor "Nome"] cap01.fountain cap02.fountain ..."""
import html, re, sys

def parse(path):
    lines = open(path, encoding="utf-8").read().replace("\r", "").split("\n")
    meta, i = {}, 0
    while i < len(lines) and re.match(r"^[A-Za-zÀ-ú ]+:\s", lines[i]):
        k, v = lines[i].split(":", 1); meta[k.strip().lower()] = v.strip(); i += 1
    body, out = lines[i:], []
    n = 0
    while n < len(body):
        raw = body[n]; s = raw.strip()
        prev_blank = n == 0 or body[n-1].strip() == ""
        nxt = body[n+1].strip() if n + 1 < len(body) else ""
        if not s:
            n += 1; continue
        if s.startswith(".") and not s.startswith(".."):
            out.append(("scene", s[1:].strip())); n += 1; continue
        if s.startswith(">") and s.endswith("<"):
            out.append(("center", s[1:-1].strip())); n += 1; continue
        if s.startswith(">"):
            out.append(("transition", s[1:].strip())); n += 1; continue
        if re.match(r"^(INT|EXT|INT\./EXT|I/E)[\. ]", s):
            out.append(("scene", s)); n += 1; continue
        if prev_blank and s.isupper() and s.endswith(":") and not nxt:
            out.append(("transition", s)); n += 1; continue
        name = s[1:] if s.startswith("@") else s
        base = re.sub(r"\(.*?\)", "", name).strip()
        if prev_blank and nxt and base and (s.startswith("@") or (base.upper() == base and re.search(r"[A-ZÀ-Ú]", base))):
            out.append(("character", name)); n += 1
            while n < len(body) and body[n].strip():
                t = body[n].strip()
                out.append(("paren" if t.startswith("(") and t.endswith(")") else "dialogue", t)); n += 1
            continue
        para = [s]; n += 1
        while n < len(body) and body[n].strip():
            para.append(body[n].strip()); n += 1
        out.append(("action", "\n".join(para)))
    return meta, out

def inline(t):
    t = html.escape(t).replace("\n", "<br>")
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"\*(.+?)\*", r"<i>\1</i>", t)
    return re.sub(r"_(.+?)_", r"<u>\1</u>", t)

CSS = """
@page { size: A4; margin: 1in 1in 1in 1.5in; }
body { font-family: 'Courier Prime','Courier New','Liberation Mono','FreeMono',monospace; font-size: 12pt; line-height: 1.0; color:#000; margin:0; }
.page { break-after: page; }
.page:last-child { break-after: auto; }
.cap { text-align:center; font-weight:bold; text-decoration: underline; margin: 0 0 24pt; }
.scene { font-weight:bold; text-transform:uppercase; margin: 24pt 0 12pt; break-after: avoid; }
.action { margin: 0 0 12pt; }
.character { margin: 12pt 0 0 2.2in; text-transform:uppercase; break-after: avoid; }
.paren { margin: 0 0 0 1.6in; width: 2in; break-after: avoid; }
.dialogue { margin: 0 0 0 1in; width: 3.5in; }
.dialogue + .character, .dialogue + .action, .dialogue + .scene, .dialogue + .transition { }
.dialogue:last-of-type { }
.dblock { margin-bottom: 12pt; break-inside: avoid; }
.transition { text-align:right; text-transform:uppercase; margin: 12pt 0; }
.center { text-align:center; margin: 12pt 0; }
.title { height: 9in; display:flex; flex-direction:column; justify-content:center; text-align:center; }
.title h1 { font-size:12pt; font-weight:bold; text-transform:uppercase; text-decoration:underline; margin:0 0 24pt; }
.title p { margin: 0 0 12pt; }
"""

def render(meta, els):
    h, block = [], None
    def close():
        nonlocal block
        if block is not None: h.append("<div class='dblock'>" + "".join(block) + "</div>"); block = None
    for kind, t in els:
        if kind == "character":
            close(); block = [f"<div class='character'>{inline(t)}</div>"]
        elif kind in ("paren", "dialogue") and block is not None:
            block.append(f"<div class='{kind}'>{inline(t)}</div>")
        else:
            close(); h.append(f"<div class='{kind}'>{inline(t)}</div>")
    close()
    return "".join(h)

def main():
    args = sys.argv[1:]; out = args.pop(0); titulo = autor = None
    while args and args[0].startswith("--"):
        flag = args.pop(0); val = args.pop(0)
        if flag == "--titulo": titulo = val
        elif flag == "--autor": autor = val
    pages = []
    if titulo:
        tp = f"<div class='page title'><h1>{html.escape(titulo)}</h1>"
        tp += "<p>Novela vertical &mdash; comédia romântica</p><p>40 capítulos de 2 minutos</p>"
        if autor: tp += f"<p>&nbsp;</p><p>escrita por</p><p>{html.escape(autor)}</p>"
        pages.append(tp + "</div>")
    for f in args:
        meta, els = parse(f)
        head = " — ".join(html.escape(x.upper()) for x in [meta.get("title", ""), meta.get("episode", "")] if x)
        pages.append(f"<div class='page'><div class='cap'>{head}</div>{render(meta, els)}</div>")
    doc = f"<!doctype html><html lang='pt-BR'><head><meta charset='utf-8'><style>{CSS}</style></head><body>{''.join(pages)}</body></html>"
    open(out, "w", encoding="utf-8").write(doc)

if __name__ == "__main__":
    main()
