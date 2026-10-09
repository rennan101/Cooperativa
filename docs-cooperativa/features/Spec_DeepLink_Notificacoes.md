# Spec: Deep-link das Notificações (clique → página correta)

**Relacionado a:** [[Spec_Notificacoes_Header]], [[Mensageria_Notificacoes]], RF-17
**Status:** Aprovada para implementação
**Última atualização:** 2026-10-09

---

## 1. Problema

Ao clicar numa notificação, o usuário deve ir para a **página correta daquele evento**. Hoje o deep-link está quebrado em 3 pontos:

1. **Reserva confirmada** (app.js:4388) aponta para `#/chat/<rideId>` — deveria levar à reserva/viagem, não ao chat.
2. **Cadastro aprovado/rejeitado, Repasse liberado, Pagamento confirmado, Novo passageiro, Sinal em custódia** → **sem `href`**: o clique não navega para lugar algum.
3. As 3 notificações de exemplo (seed) apontam todas para `#/minhas-viagens`, genérico demais.

## 2. Rotas existentes no app (renderApp, app.js:7917)

| Rota | View | Uso |
|---|---|---|
| `#/viagem/<rideId>` | `viewRideDetails` | detalhe da viagem |
| `#/chat/<rideId>` | `viewChat` | chat da viagem |
| `#/avaliar/<rideId>` | `viewRating` | avaliar viagem |
| `#/minhas-viagens` | `viewMyTrips` | lista de viagens do usuário |
| `#/motorista/<driverId>` | `viewDriverProfile` | perfil do motorista |
| `#/admin` | `viewAdmin` | painel (abas: REQUESTS, FINANCE, RATES) |
| `#/perfil` | `viewProfile` | perfil do usuário |

## 3. Mapa de destino por notificação

| Evento | Categoria | Destino (`href`) | Base |
|---|:-:|---|---|
| Nova mensagem (passageiro/motorista) | `message` | `#/chat/<rideId>` | ✅ já correto |
| Reserva **confirmada** | `booking` | `#/viagem/<rideId>` | ⚠️ corrigir (hoje `#/chat/`) |
| Reserva **recusada** | `booking` | `#/minhas-viagens` | ➕ adicionar |
| **Pagamento do sinal** confirmado (passageiro) | `payment` | `#/minhas-viagens` | ➕ adicionar |
| **Novo passageiro** confirmado (motorista) | `payment` | `#/viagem/<rideId>` | ➕ adicionar |
| **Repasse** liberado (motorista) | `payment` | `#/perfil` (carteira/repasse) | ➕ adicionar |
| Cadastro **aprovado** | `system` | `#/perfil` | ➕ adicionar |
| Cadastro **rejeitado** | `system` | `#/perfil` | ➕ adicionar |
| Sinal em **custódia** (admin) | `payment` | `#/admin` | ➕ adicionar |

Nota: `#/perfil` é o destino dos eventos de conta/repasse porque é onde o
motorista acompanha valores e status. Se existir rota de carteira dedicada no
futuro, trocar o destino.

## 4. Mudanças necessárias

1. **Corrigir** o `href` de "Reserva confirmada" (app.js:4388) para `#/viagem/${b.rideId}`.
2. **Adicionar `href`** nas 7 notificações que hoje não têm, conforme a tabela §3.
   Usar os identificadores já disponíveis em cada escopo (`b.rideId`, `ride.driverId`,
   `ride.id`, etc.) — **não inventar IDs**.
3. **Seed (app.js:7980-7982)**: apontar cada exemplo para seu destino real
   (mensagem→chat, sinal→minhas-viagens, reserva→viagem) para refletir o comportamento.
4. **Navegação no clique** (app.js:1357): hoje é
   `markNotificationRead(id); window.location.hash='<href>'`. Manter, mas garantir
   que o painel **feche** após navegar. Como `hashchange` → `renderApp` →
   `renderHeader` reconstrói o header (e o painel), o painel some naturalmente;
   ainda assim, fechar explicitamente em `markNotificationRead` é mais seguro.

## 5. Critérios de aceite

- [ ] Clicar em notificação de mensagem abre o chat daquela viagem.
- [ ] Clicar em "Reserva confirmada" abre os detalhes da viagem/reserva.
- [ ] Clicar em "Pagamento do sinal confirmado" abre "Minhas viagens".
- [ ] Clicar em "Repasse liberado" abre o perfil.
- [ ] Clicar em "Cadastro aprovado/rejeitado" abre o perfil.
- [ ] Clicar em "Sinal em custódia" (admin) abre o painel admin.
- [ ] Notificação sem `href` (se sobrar alguma) não quebra o clique.
- [ ] O painel fecha após o clique.
- [ ] `node test-app.js` passa; app carrega sem erro no navegador.

## 6. Fora de escopo

- Rota dedicada de carteira/repasse (`#/carteira`) — criar se necessário depois.
- Scroll/Highlight do item específico na página de destino (ex.: destacar a
  reserva na lista) — melhoria futura.
