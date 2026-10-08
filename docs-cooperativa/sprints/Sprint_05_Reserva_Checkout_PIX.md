# Sprint 05 - Reserva, Checkout PIX e Cancelamentos

**Objetivo da Sprint**: Implementar o fluxo transacional de reserva de assentos, pagamento de 50% via PIX, cancelamento e recibos.

---

## Tarefas de Desenvolvimento

1. **Fluxo de Reserva & Checkout ([[Reserva_Checkout_PIX]])**:
   - Tela de detalhe da viagem com resumo de rota e motorista.
   - Cálculo e exibição da regra de pagamento: **50% no ato da reserva** (**RN-11**) e **50% no encerramento** (**RN-12**).
   - Modal com QR Code PIX dinâmico, código copia-e-cola e contador de expiração.
   - Listener de confirmação em tempo real.

2. **Fluxo de Cancelamento & Estorno ([[Cancelamento_Estorno_Repasse]])**:
   - Modal de cancelamento com cálculo automático de devolução (70% se >1h [**RN-15**]; 50% se <1h [**RN-16**, **RN-17**]).
   - Exibição de status de estorno (solicitado, em análise, estornado).

3. **Módulo de Recibos Digitais**:
   - Visualizador de recibo com download em PDF para motoristas e passageiros (**RN-26**).

---

## Critérios de Aceite
- [ ] Divisão correta de 50% na reserva e saldo no final.
- [ ] Regras de cancelamento calculadas automaticamente pelo horário.
- [ ] Geração de recibos funcionais.

---

## Links Relacionados
- [[Reserva_Checkout_PIX]]: Fluxo de pagamento.
- [[Cancelamento_Estorno_Repasse]]: Políticas de cancelamento.
- [[Sprint_06_Mensageria_Notificacoes]]: Próxima sprint.
