# Spec: Ícone de Notificações no Header + Central de Notificações por Perfil

**Relacionado a:** [[Mensageria_Notificacoes]], [[Sprint_06_Mensageria_Notificacoes]], RF-17
**Status:** Proposta
**Última atualização:** 2026-10-09

---

## 1. Objetivo

Adicionar um **ícone de notificações no header**, imediatamente à esquerda do botão de perfil (avatar), com **badge de contagem de não lidas** e um **dropdown (NotificationCenter)** listando eventos. Cada um dos 3 perfis — **Passageiro, Motorista, Administrador** — tem seu próprio conjunto de eventos.

---

## 2. Local no Header (app.js → `renderHeader`, ~linha 1283)

Inserir entre o link do perfil e o alternador de role:

```html
<!-- Notification Bell + Badge -->
<button onclick="toggleNotificationCenter()"
        class="relative h-8 w-8 flex items-center justify-center rounded-lg hover:bg-uber-iron/20 transition-colors"
        title="Notificações">
  ${icon('notifications', { size: 'sm' })}
  ${unreadCount > 0 ? `
    <span class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center
                 text-[10px] font-bold text-uber-black bg-uber-amber rounded-full">
      ${unreadCount > 99 ? '99+' : unreadCount}
    </span>` : ''}
</button>
```

- Badge **some** quando `unreadCount === 0`.
- Badge **pulsa** (`.animate-pulse`) quando chega evento novo em tempo real.
- Dropdown ancorado com `absolute right-0 top-12`, fecha no clique fora / `Esc`.

---

## 3. Modelo de Dados da Notificação

```js
Notification = {
  id: string,            // uuid
  userId: string,        // destinatário
  role: 'PASSENGER'|'DRIVER'|'ADMIN',
  category: 'message'|'payment'|'booking'|'ride'|'system',
  title: string,         // ex: "Nova mensagem de Ana"
  body: string,          // ex: "\"Chego em 5 min\""
  icon: string,          // material symbol
  href: string|null,     // deep-link (ex: "#/minhas-viagens", "#/chat/abc")
  read: boolean,
  createdAt: ISO8601,
  priority: 'low'|'normal'|'high'
}
```

**Store:** adicionar `store.state.notifications = []` + `store.state.unreadCount`, com `store.pushNotification()`, `store.markRead(id)`, `store.markAllRead()`, `store.unreadCount()`.

**Persistência:** localStorage por usuário (`coop.notifications.<userId>`) — estado sobrevive a reload/F5.

---

## 4. Matriz de Eventos por Perfil

| Categoria | Evento | Passageiro | Motorista | Admin |
|---|:--|:-:|:-:|:-:|
| **Mensagens** | Nova mensagem do motorista/passageiro | ✓ | ✓ | — |
| **Pagamentos** | PIX do sinal (50%) identificado | ✓ enviou | ✓ recebeu | ✓ |
| **Pagamentos** | Pagamento final (50%) confirmado | ✓ | ✓ | ✓ |
| **Pagamentos** | Valor liberado p/ resgate (72h) | — | ✓ | ✓ |
| **Pagamentos** | Resgate solicitado / processando / concluído | — | ✓ | ✓ |
| **Pagamentos** | Estorno solicitado / concluído | ✓ | ✓ | ✓ |
| **Corridas/Reservas** | Reserva confirmada | ✓ | ✓ | ✓ |
| **Corridas/Reservas** | Nova solicitação de reserva (aguardando aceite) | — | ✓ | ✓ |
| **Corridas/Reservas** | Reserva aceita pelo motorista | ✓ | — | ✓ |
| **Corridas/Reservas** | Reserva recusada / cancelada | ✓ | ✓ | ✓ |
| **Corridas/Reservas** | Alteração de rota/horário pelo motorista | ✓ | — | ✓ |
| **Corridas/Reservas** | Lembrete de viagem (ex: 1h antes) | ✓ | ✓ | — |
| **Corridas/Reservas** | Passageiro não compareceu | ✓ | ✓ | ✓ |
| **Cadastro/Acesso** | Cadastro aprovado / rejeitado | ✓ | ✓ | — |
| **Cadastro/Acesso** | Nova solicitação de motorista p/ aprovar | — | — | ✓ |
| **Reputação** | Nova avaliação recebida | ✓ | ✓ | ✓ |
| **Reputação** | Meta mensal de corridas atingida | — | ✓ | — |
| **Financeiro/Admin** | Aviso de mensalidade da cooperativa | — | ✓ | ✓ |

---

## 5. Canais de Entrega (por prioridade)

1. **In-app badge + dropdown** (Sprint 06) — sempre. Fonte da verdade.
2. **ToastAlert** — eventos de alta prioridade (pagamento aprovado, reserva aceita). Reaproveitar `showToast()` (app.js:1197).
3. **Push (FCM)** — requer Service Worker + token por dispositivo.
4. **WhatsApp (Z-API/Evolution)** — eventos transacionais (RF-17 ainda `[PARCIAL]`).

> **Escopo imediato (esta spec):** apenas os canais 1 e 2. Canais 3 e 4 ficam para integração de backend ([[BACKEND_INTEGRATION_SPEC]]).

---

## 6. Tempo Real

- **Supabase Realtime / WebSocket**: `INSERT` na tabela `notifications` filtrado por `userId` → `store.pushNotification()` → re-render do header + toast.
- Canal por reserva para o chat (`messages` table) → notificação categoria `message`.
- Fallback: **polling** de `unreadCount` a cada 30s se WS indisponível.

---

## 7. UI — NotificationCenter (dropdown)

```
┌────────────────────────────────┐
│ Notificações        [Marcar ✓] │  <- header, "marcar todas como lidas"
├────────────────────────────────┤
│ [icon] Nova mensagem de Ana    │
│        "Chego em 5 min"  • 2m  │
│ [icon] Pagamento do sinal OK   │
│        R$ 25,00 · PIX     • 1h │
│ ...                            │
├────────────────────────────────┤
│  Ver todas as notificações  →  │
└────────────────────────────────┘
```

- **Filtros por categoria**: Todas | Mensagens | Pagamentos | Reservas.
- Item não lido: fundo destacado (`bg-uber-charcoal`) + ponto à esquerda.
- Clique no item: `markRead()` + navega para `href`.
- Estado vazio: ilustração + "Nenhuma notificação".
- Max-height com scroll (`max-h-96 overflow-y-auto`).

---

## 8. Tabelas de Backend (referência)

```sql
notifications (id, user_id, role, category, title, body, icon, href,
               read, priority, created_at)
message_threads (id, ride_id, passenger_id, driver_id, created_at)
messages (id, thread_id, sender_id, body, created_at, read_at)
```

---

## 9. Checklist de Implementação

- [ ] `Notification` type + métodos no `store`
- [ ] `renderHeader`: badge + botão do sino (acima)
- [ ] Componente `NotificationCenter` (dropdown + filtros)
- [ ] `toggleNotificationCenter()` + fechar no clique-fora/Esc
- [ ] Persistência localStorage por usuário
- [ ] Disparar notificação nos eventos existentes de `showToast` mapeados na matriz
- [ ] Polling/Realtime de `unreadCount`
- [ ] Preferências de alerta por usuário (tela em `/perfil`)
- [ ] Testes: badge zera ao marcar lido; evento por perfil correto

---

## 10. Decisões em Aberto

1. Push (FCM) e WhatsApp entram nesta fase ou só backend? (Recomendo: só in-app agora.)
2. Notificações de admin são globais (todos os admins) ou por escopo?
3. Retenção: quanto tempo manter notificações lidas? (Sugestão: 90 dias.)
