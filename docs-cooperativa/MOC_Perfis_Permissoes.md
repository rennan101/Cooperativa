# MOC - Perfis e Permissões (RBAC)

Estrutura de controle de acesso baseada em papéis para a plataforma de viagens profissionais.

---

## Matriz de Acesso por Perfil

| Módulo / Ação | Administrador | Gestor | Motorista | Passageiro |
| :--- | :---: | :---: | :---: | :---: |
| **Aprovar/Rejeitar Motoristas** | ✅ | ❌ | ❌ | ❌ |
| **Configurar Parâmetros & Desvios** | ✅ | ❌ | ❌ | ❌ |
| **Visualizar Dashboards Globais** | ✅ | ✅ | ❌ | ❌ |
| **Publicar / Editar Viagem** | ❌ | ❌ | ✅ | ❌ |
| **Cadastrar Veículo & Favoritos** | ❌ | ❌ | ✅ | ❌ |
| **Solicitar Resgate de Ganhos** | ❌ | ❌ | ✅ | ❌ |
| **Buscar Viagens & Reservar** | ❌ | ❌ | ❌ | ✅ |
| **Realizar Pagamento PIX** | ❌ | ❌ | ❌ | ✅ |
| **Chat da Corrida** | ❌ | ❌ | ✅ | ✅ |
| **Avaliação Pós-Viagem** | ❌ | ❌ | ✅ (Avalia Passageiro) | ✅ (Avalia Motorista) |
| **Emitir Recibo** | ✅ | ✅ | ✅ | ✅ |

---

## Detalhamento dos Papéis

### 1. Administrador (`ADMIN`)
- Controle irrestrito de usuários, viagens, travas operacionais e estornos.
- Gerenciamento de taxas da plataforma, prazos de resgate e regras da cooperativa.

### 2. Gestor (`MANAGER`)
- Acesso executivo de visualização e relatórios.
- Acompanhamento de indicadores de receita, volume transacionado, custódia e adesão cooperativa.

### 3. Motorista (`DRIVER`)
- Requer cadastro prévio com validação de e-mail e aprovação administrativa ([[Cadastro_Autenticacao]]).
- Acesso à área de publicação de viagens, controle de assentos, gestão de veículo e resgate de valores.

### 4. Passageiro (`PASSENGER`)
- Cadastro direto com e-mail e WhatsApp.
- Acesso à busca estilo BlaBlaCar ([[Busca_Compatibilidade_Rotas]]), reserva com pagamento PIX e histórico.

---

## Links Relacionados
- [[Cadastro_Autenticacao]]: Fluxo de solicitação e primeiro acesso.
- [[MOC_Regras_Negocio]]: Regras associadas a cada perfil.
- [[MOC_Geral]]: Índice geral.
