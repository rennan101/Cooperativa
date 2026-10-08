# Funcionalidade: Cancelamento, Estorno e Repasse

Políticas financeiras de cancelamento, regras de devolução e prazos operacionais.

---

## Políticas de Cancelamento do Passageiro

| Cenário de Cancelamento | Reembolso ao Passageiro | Repasse ao Motorista | Retenção Plataforma |
| :--- | :---: | :---: | :---: |
| **Mais de 1 hora antes da partida** | 70% do valor pago | 0% | 30% (taxa operacional) |
| **Menos de 1 hora antes da partida (Tardio)** | 50% do valor pago | 30% (compensação) | 20% |

---

## Prazos e Operações Financeiras

- **RN-14 (Resgate do Motorista)**: O motorista tem até **72 horas** para solicitar o resgate do saldo disponível após a realização da viagem.
- **RN-18 (Prazo de Estorno)**: Registro e processamento de estorno parametrizado (referência de 92 horas operacionais no PRD).
- **Chave PIX Segura**: Armazenamento criptografado da chave PIX do passageiro exclusivamente para devolução de estornos.

---

## Telas e Componentes

1. **Modal de Confirmação de Cancelamento**: Alerta claro com cálculo exato em reais do valor a ser estornado com base no horário.
2. **Extrato Financeiro do Motorista**: Saldo em custódia, saldo disponível para resgate, botão "Solicitar Resgate PIX" e histórico de repasses.
3. **Painel de Gestão de Estornos (Admin)**: Lista de devoluções pendentes, processamento e comprovantes.

---

## Links Relacionados
- [[Reserva_Checkout_PIX]]: Pagamento inicial de reserva.
- [[MOC_Regras_Negocio]]: Regras RN-14 a RN-18.
- [[Sprint_05_Reserva_Checkout_PIX]]: Implementação do fluxo no front-end.
- [[MOC_Geral]]: Retorno ao índice geral.
