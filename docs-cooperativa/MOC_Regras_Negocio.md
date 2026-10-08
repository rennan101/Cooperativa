# MOC - Regras de Negócio e Estados

Consolidação de regras operacionais, financeiras e de integridade extraídas do [[PRD_Plataforma_Viagens_Profissionais]].

---

## Tabela de Regras de Negócio (RN)

| ID | Resumo da Regra | Módulo / Nota |
| :--- | :--- | :--- |
| **RN-01** | Motorista deve solicitar autorização para operar | [[Cadastro_Autenticacao]] |
| **RN-02** | Cadastro inicial exige nome, WhatsApp e e-mail validado | [[Cadastro_Autenticacao]] |
| **RN-03** | Administrador aprova ou rejeita motorista | [[Dashboard_Admin_Gestor]] |
| **RN-04** | Motorista aprovado recebe senha provisória | [[Cadastro_Autenticacao]] |
| **RN-05** | Senha provisória deve ser alterada no primeiro acesso | [[Cadastro_Autenticacao]] |
| **RN-06** | Viagem criada com antecedência mínima de 2 horas do horário atual | [[Publicacao_Viagem]] |
| **RN-07** | Viagem possui obrigatoriamente origem, destino, data e horário | [[Publicacao_Viagem]] |
| **RN-08** | Múltiplos passageiros até o limite de vagas do veículo | [[Publicacao_Viagem]] |
| **RN-09** | Busca compatibiliza passageiros pelo trajeto real | [[Busca_Compatibilidade_Rotas]] |
| **RN-10** | Sistema bloqueia recomendações com desvios incompatíveis | [[Busca_Compatibilidade_Rotas]] |
| **RN-11** | Passageiro paga 50% do valor no momento da reserva | [[Reserva_Checkout_PIX]] |
| **RN-12** | Saldo restante de 50% é pago no encerramento da corrida | [[Reserva_Checkout_PIX]] |
| **RN-13** | Todos os pagamentos são centralizados na plataforma via PIX | [[Reserva_Checkout_PIX]] |
| **RN-14** | Motorista pode solicitar resgate do saldo disponível em até 72 horas | [[Cancelamento_Estorno_Repasse]] |
| **RN-15** | Cancelamento com mais de 1h de antecedência: devolve 70% ao passageiro | [[Cancelamento_Estorno_Repasse]] |
| **RN-16** | Cancelamento com menos de 1h: devolve 50% ao passageiro | [[Cancelamento_Estorno_Repasse]] |
| **RN-17** | Cancelamento tardio (<1h): 50% passageiro, 30% motorista, 20% plataforma | [[Cancelamento_Estorno_Repasse]] |
| **RN-18** | Prazo operacional de estorno parametrizável (referência 92h) | [[Cancelamento_Estorno_Repasse]] |
| **RN-19** | Associados da cooperativa recebem badges e benefícios | [[Cooperativa_Assinaturas_Beneficios]] |
| **RN-20** | Benefício cooperativa de 15% aplicado conforme parâmetro | [[Cooperativa_Assinaturas_Beneficios]] |
| **RN-21** | Assinantes mensais possuem benefícios adicionais em cancelamentos | [[Cooperativa_Assinaturas_Beneficios]] |
| **RN-22** | Desconto/isenção na mensalidade por volume mensal de corridas (ex: 10+, 20+, 30+) | [[Cooperativa_Assinaturas_Beneficios]] |
| **RN-23** | Não associados não recebem badge de cooperado | [[Cooperativa_Assinaturas_Beneficios]] |
| **RN-24** | Não associados pagam mensalidade integral | [[Cooperativa_Assinaturas_Beneficios]] |
| **RN-25** | Avaliações são estritamente bidirecionais (motorista ↔ passageiro) | [[Avaliacoes_Reputacao]] |
| **RN-26** | Emissão obrigatória de recibos para operações financeiras | [[Reserva_Checkout_PIX]] |

---

## Máquinas de Estado do Sistema

### 1. Ciclo de Vida da Viagem
`Rascunho` ➔ `Publicada` ➔ `Com Vagas` / `Lotada` ➔ `Em Andamento` ➔ `Concluída` / `Cancelada`

### 2. Ciclo de Vida da Reserva
`Aguardando Pagamento` ➔ `Parcialmente Paga (50%)` ➔ `Confirmada` ➔ `Paga Integral` ➔ `Concluída` / `Cancelada (Estorno Solicitado ➔ Estornada)`

### 3. Ciclo de Vida do Repasse
`Indisponível` ➔ `Disponível` ➔ `Solicitado` ➔ `Processando` ➔ `Concluído` / `Falhou`

---

## Links Relacionados
- [[MOC_Geral]]: Hub central de documentação.
- [[MOC_Frontend]]: Implementação das validações de interface.
- [[MOC_Perfis_Permissoes]]: Restrições de acesso por perfil.
