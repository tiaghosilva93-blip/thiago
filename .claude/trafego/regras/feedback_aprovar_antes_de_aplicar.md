---
name: feedback-aprovar-antes-de-aplicar
description: "REGRA DURA: qualquer alteração em conta de anúncio (orçamento, pausar, subir, otimizar) SEMPRE passa por aprovação do gestor ANTES de aplicar. Nunca aplicar direto."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 0b076963-55c8-4dad-88d5-d15abdec3737
  modified: 2026-07-24T03:25:07.530Z
---

**REGRA DURA, NUNCA FURAR:** o processo de otimização/alteração em conta de anúncio (Meta ou Google) é SEMPRE em duas etapas separadas:

1. **MANDAR a proposta pro gestor** (tabela de mudanças, número por número) e **PARAR**.
2. **Esperar o "ok / pode aplicar" explícito** dele.
3. **Só então aplicar** via API.

**NUNCA aplicar direto**, mesmo quando o gestor disser "quero otimizar", "vamos otimizar", "manda ver na otimização". "Otimizar" = ele quer VER a sugestão pra aprovar, NÃO uma ordem pra executar. Interpretar pedido de otimização como "mande a proposta", jamais como "aplique agora".

**Vale pra:** mudar orçamento, pausar/ativar campanha/conjunto/anúncio, realocar verba, ativar campanha nova (subir pausado é ok, ATIVAR precisa de ok), qualquer mexida que gaste ou mude entrega. Construir/subir PAUSADO pra revisão é permitido; qualquer coisa que fique ATIVA ou mude orçamento de campanha que já roda precisa de aprovação antes.

**Por quê:** é a conta e o dinheiro do gestor (e dos clientes dele). A decisão de executar é dele, sempre. Já furei isso em 24/07/2026 (apliquei uma realocação de R$2.200 no Cliente A sem mandar pra aprovar antes) e ele reforçou que NUNCA pode acontecer de novo.

**Como aplicar:** apresentar a mudança em tabela clara (campanha, valor de/para, motivo), terminar perguntando "aplico?" e aguardar. Mesma lógica do relatório de ads: só dispara com ok explícito.
