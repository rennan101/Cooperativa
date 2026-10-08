# Sprint 04 - Publicação e Gestão de Viagens

**Objetivo da Sprint**: Construir o fluxo completo de publicação de viagens pelo motorista, edição de rotas e pontos favoritos.

---

## Tarefas de Desenvolvimento

1. **Wizard de Publicação de Viagem ([[Publicacao_Viagem]])**:
   - Etapa 1: Origem e destino com pontos de referência e mapa interativo.
   - Etapa 2: Data e horário com **trava obrigatória de antecedência mínima de 2 horas** (**RN-06**).
   - Etapa 3: Quantidade de assentos disponíveis e preço sugerido.
   - Etapa 4: Seleção do veículo cadastrado e observações de bagagem.

2. **Pontos Favoritos do Motorista**:
   - Modal de gerenciamento de pontos favoritos para preenchimento em 1 clique.

3. **Painel "Minhas Viagens Ofertadas"**:
   - Lista de viagens ativas, concluídas e rascunhos.
   - Ações: Editar dados, visualizar passageiros confirmados e cancelar viagem com disparador de notificações.

---

## Critérios de Aceite
- [ ] Validação rigorosa que impede publicação de viagens com menos de 2 horas de antecedência (**RN-06**).
- [ ] Controle dinâmico de ocupação de vagas por veículo (**RN-08**).

---

## Links Relacionados
- [[Publicacao_Viagem]]: Especificação funcional.
- [[Sprint_05_Reserva_Checkout_PIX]]: Próxima sprint.
