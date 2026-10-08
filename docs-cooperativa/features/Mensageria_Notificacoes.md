# Funcionalidade: Mensageria e Notificações

Comunicação em tempo real entre motoristas e passageiros vinculada estritamente às viagens e central de notificações.

---

## Requisitos de Mensageria

- **Chat Vinculado**: Cada conversa é associada a uma viagem / reserva específica.
- **Metadados de Mensagem**: Texto, timestamp (data/hora), identificação do remetente e foto de perfil.
- **Alertas**: Notificação imediata de novas mensagens via badge no app e push/e-mail.

---

## Eventos Notificáveis da Plataforma

1. **Cadastro & Acesso**: Solicitação recebida, aprovação/rejeição, senha provisória enviada.
2. **Operação de Viagens**: Nova reserva confirmada, alteração de horário/rota pelo motorista, cancelamento de passageiro.
3. **Financeiro**: Pagamento PIX identificado, valor liberado para resgate (72h), resgate concluído, aviso de mensalidade.
4. **Reputação & Cooperativa**: Nova avaliação recebida, alcance de meta de volume mensal de corridas.

---

## Componentes de Interface (BlaBlaCar Style)

- `ChatModal`: Drawer ou janela flutuante com balões de conversa diferenciados por cor e foto de perfil.
- `NotificationCenter`: Dropdown no cabeçalho com lista de eventos não lidos e filtros por categoria.
- `ToastAlert`: Alertas rápidos no topo da tela para confirmações assíncronas.

---

## Links Relacionados
- [[Design_System_BlaBlaCar]]: Padrões do componente `ChatThread`.
- [[Sprint_06_Mensageria_Notificacoes]]: Implementação da mensageria e notificações.
- [[MOC_Geral]]: Retorno ao índice geral.
