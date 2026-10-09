# Levantamento de Requisitos Funcionais e Não Funcionais — Cooperativa

> **Status Geral do Projeto:** Frontend SPA (Vanilla JavaScript ES6 + Tailwind CSS) implementado com prototipação de alta fidelidade e simulação de estado reativo em memória (`store`). 
> 
> **Legenda de Status:**
> - `[CONCLUÍDO - FRONTEND]`: Interface, lógica de estado local e validações do usuário 100% operacionais.
> - `[PARCIAL]`: Funcionalidade implementada com dados mockados em memória, aguardando integração com serviços externos.
> - `[PENDENTE - BACKEND / PROD]`: Necessita de implementação de API real, banco de dados persistente ou serviços de terceiros (Gateway PIX, SMS/WhatsApp, OCR).

---

## 1. Requisitos Funcionais (RF)

### 1.1 Módulo de Busca e Compatibilidade de Rotas

| ID | Requisito Funcional | Descrição | Status | O que já está feito | O que falta |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **RF-01** | Busca por Origem e Destino | Usuário deve poder pesquisar viagens informando cidades e pontos de embarque/desembarque no Nordeste. | `[CONCLUÍDO - FRONTEND]` | Autocomplete com cidades e pontos reais do Nordeste (CE, PE, BA, RN, PB, AL, MA, PI, SE), botão de inverter cidades. | Persistência de buscas recentes no banco de dados. |
| **RF-02** | Filtros Avançados de Viagem | Filtragem por turno (Manhã, Tarde, Noite), ar-condicionado, tolerância a bagagem e teto de preço. | `[CONCLUÍDO - FRONTEND]` | Filtros interativos com atualização instantânea na listagem. | Salvar preferências padrão do passageiro no perfil. |
| **RF-03** | Visualização de Veículos com Cor Dinâmica | Renderização visual do carro na cor exata cadastrada pelo condutor. | `[CONCLUÍDO - FRONTEND]` | Motor SVG com interpolação de gradientes para 9 cores reais de fábrica (`templates.js`). | Suporte a novos modelos de carro além de Sedans/SUVs padrão. |
| **RF-04** | Matriz de Distâncias e Duração | Estimativa de tempo e quilometragem entre cidades nordestinas. | `[PARCIAL]` | Banco de dados local com 25+ pares de rotas nordestinas e cálculo estimado (`ROUTE_METRICS_DATABASE`). | Integração com Google Distance Matrix / OSRM para rotas dinâmicas em tempo real. |

---

### 1.2 Módulo de Publicação de Viagens (Motorista)

| ID | Requisito Funcional | Descrição | Status | O que já está feito | O que falta |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **RF-05** | Formulário de Criação de Viagem | Motorista define pontos de saída, paradas, destino, data, horário, vagas (1 a 6) e comodidades. | `[CONCLUÍDO - FRONTEND]` | Formulário completo com validação de antecedência, seleção de veículo da garagem e bloqueios. | Gravação em banco de dados centralizado via API. |
| **RF-06** | Precificação Inteligente Sugerida | Sugestão automática de valor justo por assento com base na distância da rota. | `[CONCLUÍDO - FRONTEND]` | Algoritmo de cálculo de piso e teto por km rodado com aviso de preço fora da faixa. | Ajuste dinâmico com base no preço médio do combustível no estado. |
| **RF-07** | Gerenciamento de Vagas Restantes | Controle automático de vagas disponíveis conforme reservas são aceitas. | `[PARCIAL]` | Decremento e incremento reativo no estado local da aplicação. | Concorrência de reserva (locks/transações ACID para evitar overbooking). |

---

### 1.3 Módulo de Reserva, Checkout e Pagamento PIX

| ID | Requisito Funcional | Descrição | Status | O que já está feito | O que falta |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **RF-08** | Reserva de Assentos | Passageiro seleciona quantidade de vagas e visualiza o breakdown de custos. | `[CONCLUÍDO - FRONTEND]` | Cálculo de subtotal, taxa da cooperativa (5%) e total transparente. | Trava temporária da vaga durante o fluxo de pagamento (hold time). |
| **RF-09** | Pagamento via PIX Dinâmico | Geração de QR Code e código Copia e Cola com prazo de expiração (10 min). | `[PARCIAL]` | Modal de pagamento com QR Code mockado, payload EMV, timer regressivo e cópia rápida. | Conexão com API real de PSP (Gerencianet / Asaas / MercadoPago) e Webhook de confirmação instantânea. |
| **RF-10** | Divisão de Pagamento (50% / 50%) | Regra de cobrança de 50% de sinal na reserva e 50% pago diretamente na chegada. | `[CONCLUÍDO - FRONTEND]` | Regra de negócio exibida no fluxo de reserva e nos detalhes de comprovante. | Cobrança automática da segunda parcela caso optado por PIX no app. |
| **RF-11** | Política de Cancelamento e Estorno | Estorno integral (100%) se cancelado com > 2h de antecedência; 50% se < 2h. | `[CONCLUÍDO - FRONTEND]` | Lógica de cálculo automático de estorno e aviso prévio na tela de cancelamento. | Execução automática de devolução via API PIX (Refund API). |

---

### 1.4 Módulo de Perfis, Garagem e Reputação

| ID | Requisito Funcional | Descrição | Status | O que já está feito | O que falta |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **RF-12** | Alternância de Papéis (Passageiro / Motorista / Admin) | Usuário pode alternar seu papel para testar fluxos distintos. | `[CONCLUÍDO - FRONTEND]` | Toggle global com re-renderização imediata de permissões e menus. | Autenticação real baseada em JWT e controle de acesso RBAC no backend. |
| **RF-13** | Garagem de Veículos | Cadastro, edição e exclusão de carros pelo motorista com cor, placa e capacidade. | `[CONCLUÍDO - FRONTEND]` | Gestão visual de frota com seletor de cor por swatches interativos e preview em tempo real. | Validação automática da placa na base do DETRAN/Sinesp. |
| **RF-14** | Perfil Público do Condutor | Exibição de nota média, total de viagens, selo verificado, carros e avaliações. | `[CONCLUÍDO - FRONTEND]` | Tela completa acessível a partir da busca e dos detalhes da viagem (`#/motorista/:id`). | Carregamento assíncrono paginado de avaliações antigas. |
| **RF-15** | Avaliação Mútua Pós-Viagem | Passageiro avalia motorista com 1 a 5 estrelas, tags rápidas e comentário. | `[CONCLUÍDO - FRONTEND]` | Tela de avaliação interativa com recálculo imediato da reputação no estado local. | Avaliação inversa (motorista avaliando passageiro). |

---

### 1.5 Módulo de Comunicação (Chat) e Gestão

| ID | Requisito Funcional | Descrição | Status | O que já está feito | O que falta |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **RF-16** | Chat da Viagem | Conversa contextual entre os passageiros e o condutor da carona. | `[PARCIAL]` | Interface de mensagens em tempo real com identificação de autor, balões e timestamps. | Conexão WebSocket / Supabase Realtime para troca de mensagens entre dispositivos distintos. |
| **RF-17** | Notificações de Status | Avisos no sistema sobre confirmações de vaga, cancelamentos e novas viagens. | `[PARCIAL]` | Sistema de Toasts dinâmicos e central de notificações na interface. | Disparo de mensagens transacionais via WhatsApp (Z-API/Evolution) ou Push Notifications (FCM). |
| **RF-18** | Painel Administrativo da Cooperativa | Métricas financeiras (GMV, Taxa 5%), gestão de aprovação de condutores e disputas. | `[CONCLUÍDO - FRONTEND]` | Dashboard com KPIs consolidados, fila de aprovação de motoristas e auditoria de cancelamentos. | Exportação de relatórios contábeis em PDF/CSV e conciliação bancária automatizada. |

---

## 2. Requisitos Não Funcionais (RNF)

| ID | Categoria | Requisito Não Funcional | Status | Detalhes da Implementação |
| :--- | :--- | :--- | :---: | :--- |
| **RNF-01** | **Identidade Visual** | **Proibição absoluta de Emojis**. Uso exclusivo de ícones Google Material Symbols. | `[CONCLUÍDO]` | Toda a aplicação utiliza ícones SVG profissionais `@google-symbols` (`directions_car`, `qr_code_2`, `payments`, etc.). |
| **RNF-02** | **Formas de UI** | **Proibição de pílulas (`rounded-full`)**. Uso estrito de cantos suaves estruturados (`rounded-lg` / `rounded-xl`). | `[CONCLUÍDO]` | Botões, cards e inputs usam padrão retangular sólido (raios de 6px a 12px) transmitindo solidez e clareza. |
| **RNF-03** | **Acessibilidade Cognitiva** | Aderência estrita às **10 Heurísticas de Jakob Nielsen** para inclusão de usuários de baixo letramento digital. | `[CONCLUÍDO]` | Textos simples em português claro (sem jargões), ações reversíveis com botões "Voltar", alto contraste e fontes grandes. |
| **RNF-04** | **Performance & Latência** | Tempo de carregamento inicial (FCP) < 1.0s e navegação SPA instantânea (< 50ms). | `[CONCLUÍDO]` | Arquitetura Zero-Build em Vanilla JS ES6 puro com bundle leve (< 250KB) e Tailwind CDN pré-otimizado. |
| **RNF-05** | **Responsividade** | Experiência fluida tanto no Desktop quanto em telas móveis (Mobile-First 360px+). | `[CONCLUÍDO]` | Layout adaptativo com Bottom Navigation Bar fixa no mobile e Header completo no desktop. |
| **RNF-06** | **Segurança e Autenticação** | Proteção de dados sensíveis (LGPD), senhas com hash e validação de chave PIX. | `[PENDENTE - BACKEND]` | Necessário configurar Supabase Auth com OTP via SMS/WhatsApp e criptografia de chaves financeiras. |
| **RNF-07** | **Persistência de Dados** | Armazenamento relacional escalável com backups automáticos e integridade referencial. | `[PENDENTE - BACKEND]` | Necessário provisionar banco PostgreSQL (Supabase / Neon) com schemas migrados. |

---

## 3. Matriz de Conclusão: O que está Pronto vs O que Falta

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          STATUS GERAL DE DESENVOLVIMENTO                        │
├──────────────────────────────────────┬──────────────────────────────────────────┤
│ ✅ FRONTEND SPA (100% PRONTO)        │ ⏳ BACKEND & INFRAESTRUTURA (A FAZER)    │
├──────────────────────────────────────┼──────────────────────────────────────────┤
│ • Todas as 11 Telas e Modais         │ • Banco PostgreSQL & Schemas SQL         │
│ • Design System Uber Monochrome      │ • Autenticação Real (SMS / WhatsApp OTP) │
│ • Motor Dinâmico de Cores de Carros  │ • Gateway de Pagamento PIX com Webhooks  │
│ • Autocomplete de Cidades Nordestinas│ • Conexão WebSocket para Chat Real       │
│ • Lógica de Negócio e Estado (Store) │ • Validação Automática de CNH (OCR)      │
│ • Cálculo de Estorno e Precificação  │ • Disparo Real de Mensagens WhatsApp     │
└──────────────────────────────────────┴──────────────────────────────────────────┘
```

---

## 4. Roadmap Recomendado para Produção (Próximos Passos)

1. **Sprint Backend 1 — Banco de Dados & Schemas**:
   - Provisionar instância PostgreSQL (Supabase).
   - Executar migrações das tabelas `users`, `vehicles`, `rides`, `bookings`, `chat_messages`, `reviews` e `transactions`.
2. **Sprint Backend 2 — Autenticação & Gateway PIX**:
   - Conectar login via número de telefone (OTP WhatsApp/SMS).
   - Integrar SDK do PSP (Asaas / Gerencianet) para emissão de PIX Copia e Cola e Webhook de liquidação automática.
3. **Sprint Backend 3 — Realtime Chat & Notificações**:
   - Conectar o módulo `viewChat` ao canal Realtime do Supabase.
   - Configurar disparos de confirmação de carona direto no WhatsApp do passageiro e do motorista.
