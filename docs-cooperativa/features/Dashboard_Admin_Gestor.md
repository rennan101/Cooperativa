# Funcionalidade: Dashboard Admin e Gestor

Painel executivo e administrativo para acompanhamento operacional, financeiro e aprovações.

---

## Indicadores e Módulos Principais

### 1. Fila de Aprovação de Motoristas (Admin)
- Lista de solicitações pendentes com dados pessoais, documentos e veículo.
- Ações: "Aprovar e Enviar Senha Provisória" / "Rejeitar com Justificativa".

### 2. Painel Financeiro e Custódia (Admin e Gestor)
- Volume total transacionado no período.
- Receita líquida da plataforma (taxas de corridas e mensalidades).
- Valores totais retidos em custódia (saldo de viagens não concluídas).
- Saldo liberado para resgate dos motoristas (regra de 72h).
- Total de estornos solicitados e concluídos.

### 3. Painel Operacional de Viagens
- Viagens criadas, realizadas e canceladas.
- Taxa de ocupação média por veículo.
- Total de associados da cooperativa ativos.

### 4. Configurações Comerciais Parametrizadas
- Tolerância de desvio de rotas (km/min).
- Prazos de resgate e estorno.
- Faixas de desconto de mensalidade por volume.

---

## Componentes de Interface

- `MetricCard`: Card KPI com valor destacado, variação percentual e ícone temático.
- `ApprovalQueueTable`: Tabela com filtros de status e botões de ação rápida.
- `FinancialFlowChart`: Gráfico de fluxo financeiro (Entradas PIX, Custódia, Repasses e Taxas).

---

## Links Relacionados
- [[MOC_Perfis_Permissoes]]: Diferenciação entre Administrador e Gestor.
- [[Sprint_08_Dashboard_Gestao]]: Implementação da sprint final.
- [[MOC_Geral]]: Retorno ao índice geral.
