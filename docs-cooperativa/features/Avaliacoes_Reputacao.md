# Funcionalidade: Avaliações e Reputação

Sistema de avaliação mútua e formação de pontuação de confiança entre profissionais.

---

## Regras de Avaliação

- **RN-25**: Avaliação **estritamente bidirecional**:
  - Passageiro avalia Motorista (pontualidade, condução, limpeza do veículo).
  - Motorista avalia Passageiro (pontualidade no ponto de encontro, respeito).
- **Campos Obrigatórios**: Nota de 1 a 5 estrelas e comentário opcional.
- **Cálculo da Média**: Média aritmética simples de todas as viagens concluídas.
- **Separação de Conceitos**: Separação clara entre nota média real e benefícios da cooperativa, evitando notas artificiais para novos associados.

---

## Componentes de Interface

- `StarRatingInput`: Seletor interativo de estrelas com feedback visual e chips de tags rápidas (ex: "Pontual", "Direção segura", "Carro limpo").
- `ReviewSummaryCard`: Exibição de distribuição de notas (5, 4, 3, 2, 1 estrela) e lista de comentários recentes.
- `DriverReputationBadge`: Badge compacto com nota e quantidade de viagens nos cards do BlaBlaCar.

---

## Links Relacionados
- [[Design_System_BlaBlaCar]]: Componente de reputação visual.
- [[MOC_Regras_Negocio]]: Regra RN-25.
- [[Sprint_07_Avaliacoes_Cooperativa]]: Sprint de entrega.
- [[MOC_Geral]]: Retorno ao índice geral.
