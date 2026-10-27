---
name: feedback-fluxo-ada-theo-anuncio-novo
description: Anúncio novo: Ada briefing → Theo pacote de nomes/UTM/src ANTES → Ada monta tudo e publica UMA vez; ninguém mexe depois (Meta penaliza); src = ad.name|adset.name|campaign.name ≤67
metadata:
  type: feedback
---
REGRA (15/10/2026): o fluxo antigo (Ada sobe, Theo ajusta nome/UTM depois) estava errado: a Meta considera a 1ª publicação e mexer depois manda pra revisão e pode reiniciar o aprendizado.

Fluxo certo: 1) Ada faz o briefing; 2) Theo devolve o pacote (nomes da campanha/conjuntos/anúncios no padrão, nomes CURTOS, UTMs com nomes completos, src); 3) Ada prepara ativos em paralelo; 4) Ada monta tudo de uma vez; 5) Theo confere na SIMULAÇÃO só a parte dele (Ada é mais sênior; ele não opina em estrutura/público/orçamento/criativo); 6) ok do gestor + como nasce; 7) Ada publica uma vez; 8) Theo, depois, só confere se o tracking e o pacote dele foram aplicados. Depois de publicado só se mexe se for CRÍTICO (link quebrado, tracking zerado, página errada, política), com ok do gestor. Aprovado pelo gestor 15/10.

**src com NOMES, não IDs** (gestor: "precisa ser o nome, senão fica difícil de trackear"): `{{ad.name}}|{{adset.name}}|{{campaign.name}}`, ≤ 67 caracteres, garantido por nomes curtos (ADS30, CJ1-QUENTE, CLI-SITE-01). **Não mexer em dash** por causa disso (gestor, 15/10).

**Why:** penalização da Meta por edição pós-publicação; tracking legível por nome.
**How to apply:** regra gravada em agents/ada.md, agents/theo.md e agents/ORGANOGRAMA.md. Relacionado: [[feedback-campanha-nascimento-4-opcoes]], [[reference_src_atribuicao_formato]].
