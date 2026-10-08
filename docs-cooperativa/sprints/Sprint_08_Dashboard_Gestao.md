# Sprint 08 - Dashboards, Gestão e Configurações Comerciais

**Objetivo da Sprint**: Desenvolver os painéis de controle para Administrador e Gestor, central de aprovações, métricas financeiras de custódia e parametrização.

---

## Tarefas de Desenvolvimento

1. **Painel de Aprovação de Motoristas ([[Dashboard_Admin_Gestor]])**:
   - Fila de moderação com análise de CNH/RENAVAM e dados de contato (**RN-01**, **RN-03**).
   - Ações de aprovação com envio automático de senha provisória (**RN-04**) e rejeição com motivo.

2. **Dashboard Financeiro e de Custódia**:
   - Visão em tempo real de: Volume transacionado, Receita da plataforma, Saldo em custódia, Resgates pendentes (72h) e Estornos.
   - Gestão de solicitações de resgate de motoristas.

3. **Painel de Parâmetros Operacionais**:
   - Ajuste de margem máxima de desvio de rota ([[Busca_Compatibilidade_Rotas]]).
   - Configuração de faixas de benefícios por volume de corridas e taxas da cooperativa.

---

## Critérios de Aceite
- [ ] Separação correta de permissões RBAC entre Administrador e Gestor ([[MOC_Perfis_Permissoes]]).
- [ ] Visualização de todos os indicadores financeiros e operacionais exigidos no PRD.

---

## Links Relacionados
- [[Dashboard_Admin_Gestor]]: Especificação dos indicadores.
- [[MOC_Perfis_Permissoes]]: Matriz de permissões.
- [[Sprint_Overview]]: Visão geral de todas as sprints.
