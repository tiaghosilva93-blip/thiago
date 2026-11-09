#!/usr/bin/env python3
"""Converte .fountain (subconjunto usado nos roteiros) em Final Draft .fdx.
Uso: fountain2fdx.py saida.fdx [--titulo "Titulo"] [--autor "Nome"] cap01.fountain [cap02.fountain ...]"""
import sys, os
from xml.sax.saxutils import escape
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fountain2html import parse

TIPOS = {"scene": "Scene Heading", "action": "Action", "character": "Character",
         "paren": "Parenthetical", "dialogue": "Dialogue", "transition": "Transition",
         "center": "Action"}

def par(tipo, texto, nova_pagina=False, centro=False):
    attrs = f' Type="{tipo}"'
    if nova_pagina: attrs += ' StartsNewPage="Yes"'
    if centro: attrs += ' Alignment="Center"'
    return f"    <Paragraph{attrs}>\n      <Text>{escape(texto)}</Text>\n    </Paragraph>\n"

def main():
    args = sys.argv[1:]; out = args.pop(0); titulo = autor = None
    while args and args[0].startswith("--"):
        f, v = args.pop(0), args.pop(0)
        if f == "--titulo": titulo = v
        elif f == "--autor": autor = v
    corpo = ""
    for n, f in enumerate(args):
        meta, els = parse(f)
        cab = " — ".join(x.upper() for x in [meta.get("title", ""), meta.get("episode", "")] if x)
        corpo += par("Action", cab, nova_pagina=n > 0, centro=True)
        for kind, t in els:
            corpo += par(TIPOS[kind], t.replace("\n", " "), centro=(kind == "center"))
    tp = ""
    if titulo:
        linhas = [("", False)] * 12 + [(titulo.upper(), True), ("", True),
                  ("Novela vertical — comédia romântica", True), ("40 capítulos de 2 minutos", True)]
        if autor: linhas += [("", True), ("escrita por", True), (autor, True)]
        tp = "  <TitlePage>\n    <Content>\n" + "".join(
            f'      <Paragraph Alignment="{"Center" if c else "Left"}" Type="Action">\n        <Text>{escape(t)}</Text>\n      </Paragraph>\n'
            for t, c in linhas) + "    </Content>\n  </TitlePage>\n"
    doc = ('<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n'
           '<FinalDraft DocumentType="Script" Template="No" Version="5">\n'
           f'  <Content>\n{corpo}  </Content>\n{tp}</FinalDraft>\n')
    open(out, "w", encoding="utf-8").write(doc)

if __name__ == "__main__":
    main()
