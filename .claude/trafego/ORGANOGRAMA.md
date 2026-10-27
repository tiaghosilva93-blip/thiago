# Organograma e Protocolo de Loop

> Como os agentes trabalham juntos. Todo agente lê este arquivo antes de aceitar uma tarefa que veio de outro agente.

## Organograma

```
                          ⛳ GESTOR
                     (dono de toda decisão)
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   outros agentes          📊 ADA             outros agentes
   (estratégia,          mídia paga           (copy, criativo,
    receita...)               │                 conteúdo...)
                         nomenclatura
                          e tracking
                           ⚙️ THEO
```

## O loop

Todo trabalho roda em 4 fases. Nenhuma pula.

```
⚡ 1. BRIEFING
   quem delega escreve: objetivo, contrato de entrega, critério de aprovação
        │
⚙️ 2. EXECUÇÃO
   o agente entrega no formato do contrato, nada além
        │
❓ 3. VERIFICAÇÃO
   o verificador roda o critério e devolve APROVADO ou REPROVADO + o que falta
        │
   ┌────┴────┐
  SIM       NÃO
   │         │
   │    ⚙️ 4. CORREÇÃO ──> volta pra fase 3
   │         │
   │    (máximo 2 voltas)
   │         │
   │    ⛔ 3ª reprovação = para e leva pro gestor
   │         decidir, com as 2 tentativas e o motivo da falha
   ↓
⛳ GATE DO GESTOR
```

## Contrato de entrega e verificação

| Agente | Entrega (contrato) | Quem verifica | Critério de aprovação |
|---|---|---|---|
| **Ada** | Proposta de otimização em tabela: campanha, de → para, motivo | Gestor | Venda lida do dashboard por LTV, nunca de pixel. Nenhuma mudança aplicada |
| **Theo** | Pacote de nomes e tracking ANTES de subir (nomes curtos, UTM, src `ad\|adset\|campaign` ≤67) + conferência da simulação | Ada | Nome no padrão, src ≤67 em 100% dos anúncios, UTM completa, nada publicado antes da conferência |

## Regras de delegação

**Quem pode chamar quem:**

- O agente de estratégia aciona a Ada quando o gargalo é mídia
- Anúncio novo: Ada faz o briefing → Theo devolve o pacote de nomes e tracking → Ada monta tudo de uma vez → Theo confere só a parte dele na simulação → ok do gestor → Ada publica UMA vez. Depois de publicado, Theo só confere se o tracking foi aplicado; mexer só se for crítico, com ok do gestor
- Outros agentes (ex.: disparos) podem pedir ao Theo a UTM dos links

**Regras duras:**

1. **Briefing sem contrato de entrega volta.** Se não está escrito o que é pra entregar e como se aprova, o agente pergunta em uma linha antes de executar.
2. **Um agente, uma função.** O agente de copy não desenha, o de design não escreve copy nova, Theo não decide otimização. Precisou de outra função, delega.
3. **Verificador nunca é o autor.** Quem escreveu não aprova o próprio trabalho.
4. **Nada gasta dinheiro nem vai pro público sem o "ok" do gestor.** Vale pra orçamento, ativar campanha, publicar página, disparar mensagem. Subir pausado pra revisão é permitido.
5. **Reprovação vem com o que falta, não com nota.** "Reprovado" sozinho não é verificação.
6. **Duas voltas e para.** Na terceira reprovação, o caso sobe pro gestor com as duas tentativas e o motivo. Não fica girando.
7. **Quem delega herda a entrega.** A Ada responde pelo que o Theo entregou dentro da estrutura dela.
