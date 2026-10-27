---
name: meta-success-que-nao-grava
description: A Graph API responde success e ignora o campo em silêncio quando ele não vale para aquela estrutura; o caso confirmado é data de encerramento em campanha com CBO diário
metadata: 
  node_type: memory
  type: reference
  originSessionId: c976ef06-3b2f-4c72-a42b-c15d88ac805b
  modified: 2026-08-14T23:43:25.162Z
---

**A Graph API do Meta tem duas formas de recusar: erro com subcode, e `{"success": true}` sem gravar nada.** A segunda é a perigosa, porque `validate_only` também passa.

**Caso confirmado (14/08/2026, campanha de captação de um cliente de concursos):** `POST /{campaign_id}` com `end_time` numa campanha **CBO de orçamento diário** devolveu `success` no teste seco E na aplicação real. A releitura veio sem `stop_time`. Nada foi gravado, sem nenhum aviso.
**O lugar certo é o CONJUNTO:** `POST /{adset_id}` com `end_time` grava normal, mesmo com orçamento diário. (Data de fim em campanha só existe com orçamento vitalício.)

🔑 **Toda escrita na Graph API só está feita depois de uma LEITURA que devolva o campo.** `success` prova que a chamada foi aceita, não que o valor entrou. Isso vale em dobro para campos que dependem do tipo de orçamento ou do objetivo.

⚠️ Sem a conferência, o encerramento teria sido dado como programado e a campanha rodaria depois da aula, gastando à toa. O erro não aparece como erro: aparece como tarefa concluída.

Parente do mesmo problema em leitura: [[reference_apis_paginam_sempre]], onde o truncamento também é silencioso.

Ver [[reference_otimizacao_meta_cbo]].
