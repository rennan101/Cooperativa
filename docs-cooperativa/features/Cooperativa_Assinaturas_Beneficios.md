# Funcionalidade: Cooperativa, Assinaturas e Benefícios

Mecanismos de incentivo ao cooperativismo, planos recorrentes de assinatura e descontos progressivos por volume.

---

## Estrutura da Cooperativa e Benefícios

- **RN-19 / RN-23**: Usuários associados recebem selo/badge de "Cooperado Ativo", bônus e campanhas exclusivas. Não associados não recebem o badge.
- **RN-20**: Benefício base de 15% para cooperados em situações operacionais/cancelamentos.
- **RN-21**: Motoristas assinantes possuem benefícios percentuais adicionais em políticas de cancelamento.
- **RN-24**: Motoristas não associados pagam a mensalidade integral.

---

## Tabela de Desconto por Volume Mensal (RN-22)

| Corridas Concluídas no Mês | Desconto na Mensalidade | Status |
| :--- | :---: | :--- |
| **0 a 9 viagens** | 0% | Valor integral |
| **10 a 19 viagens** | 25% de desconto | Nível Bronze |
| **20 a 29 viagens** | 50% de desconto | Nível Prata |
| **30+ viagens** | 100% (Mensalidade Gratuita) | Nível Ouro |

*Nota: Os limites de viagens e faixas de desconto são totalmente parametrizáveis no painel administrativo.*

---

## Componentes de Interface

- `CoopBadge`: Selo visual verde com ícone da cooperativa exibido nos cards de viagem e perfis.
- `SubscriptionTierCard`: Card comparativo de planos de mensalidade (Gratuito vs Cooperado Pro).
- `VolumeProgressBar`: Barra de progresso mostrando corridas restantes no mês para desbloquear o próximo desconto.

---

## Links Relacionados
- [[Design_System_BlaBlaCar]]: Padrões visuais do badge de cooperado.
- [[MOC_Regras_Negocio]]: Regras RN-19 a RN-24.
- [[Sprint_07_Avaliacoes_Cooperativa]]: Sprint de desenvolvimento do módulo.
- [[MOC_Geral]]: Retorno ao índice geral.
