# Spec: Carteira no Perfil + Fix Horário de Chegada + Ajustes Mobile

**Status:** Aprovada para implementação
**Última atualização:** 2026-10-09

---

## PARTE 1 — Carteira no Perfil (motorista e passageiro)

### Requisitos
- Todo usuário (motorista e passageiro) tem uma **carteira** acessível na tela de **Perfil** (`#/perfil`, `viewProfile`).
- **Cada usuário só vê a PRÓPRIA carteira.**
- **Somente o ADMIN visualiza a carteira de todos** (visão consolidada).

### Modelo de dados
Adicionar ao estado do usuário (com migração suave + guarda defensiva, pois
estado antigo em localStorage não tem o campo):

```
wallet = {
  balance: number,          // saldo disponível
  pending: number,          // em custódia / aguardando liberação
  transactions: [ { id, type: 'CREDIT'|'DEBIT', amount, description, status, createdAt } ]
}
```

- `type CREDIT`: repasse liberado, estorno recebido.
- `type DEBIT`: pagamento de sinal, pagamento final.
- `status`: 'CONFIRMED' | 'PENDING' | 'PROCESSING'.

### Regras de acesso
- `viewProfile`: mostra a carteira do usuário logado (`currentUser.wallet`).
- Se `role === 'ADMIN'`: exibir **lista/tabela de todos os usuários** com saldo
  e pendente, mais a própria carteira. Admin **não** edita valores de terceiros.
- Passageiro/motorista: **apenas** os próprios dados. Nunca expor carteira alheia.

### UI (design system da plataforma)
Card no perfil com: saldo em destaque, valor pendente, lista de transações
(ícone, descrição, valor com sinal, status, data). Reaproveitar classes
`uber-black`, `uber-charcoal`, `uber-gray`, `rounded-xl`, bordas `uber-border`.
Valores em `R$` com `toLocaleString('pt-BR', {minimumFractionDigits:2})`.

### Migração
No `AppStore`, garantir `currentUser.wallet` existe (default com balance 0,
pending 0, transactions []) para estados salvos antes desta feature.

---

## PARTE 2 — Fix: horário de chegada `undefined` na busca

### Bug
Na tela de busca (`#/buscar`, `viewSearchResults`), o horário de **chegada**
aparece como `undefined` em viagens publicadas pelo usuário.

### Causa raiz
`handleFinishPublishRide` cria a viagem **sem** `estimatedArrivalTime`. Só o
seed (dados fixos) tem esse campo. A view renderiza `${ride.estimatedArrivalTime}`
direto (app.js:2836) → `undefined`.

### Correção (duas camadas, obrigatórias as duas)
1. **Calcular na criação:** em `handleFinishPublishRide`, derivar
   `estimatedArrivalTime` a partir de `departureTime` + `estimatedDuration`
   (ex.: `06:30` + `6h 30m` = `13:00`). Criar helper `calcArrivalTime(depTime, duration)`
   que soma hora+minutos e faz o módulo 24h. Usar nos trechos de ida e volta.
2. **Defesa na renderização:** onde qualquer view exibe horário de chegada,
   usar fallback: `ride.estimatedArrivalTime || '—'`. Aplicar pelo menos em
   `viewSearchResults` (linha ~2836) e na timeline da home (~2452).

### Critérios
- Publicar viagem → buscar → horário de chegada aparece correto (nunca `undefined`).
- Viagens antigas já salvas (sem `estimatedArrivalTime`) continuam renderizando
  com fallback, sem quebrar.

---

## PARTE 3 — Ajustes Mobile

### 3a. Sem zoom
O `<meta viewport>` em `index.html` **já** tem `user-scalable=no`. Reforçar:
- adicionar `touch-action: manipulation` e `-webkit-text-size-adjust: 100%`
  no `body`/`html` para evitar zoom por duplo-toque em iOS.
- garantir `maximum-scale=1.0` mantido.

### 3b. Proporção correta em todos os aparelhos
- Revisar breakpoints: o app usa `sm:`/`md:` (Tailwind). Garantir que em telas
  pequenas (≤375px) nada estoure horizontalmente: cards, wizard, tabelas.
- Em `style.css` adicionar `overflow-x: hidden` no `body` e garantir que
- containers usem `max-w-*` + `w-full`.
- Testar as telas principais em viewports 320px, 375px e 414px: home, busca,
  publicar (wizard), minhas-viagens, perfil, admin, chat. Nenhuma deve ter
  scroll horizontal indesejado.

### Critérios
- Duplo toque não dá zoom.
- Nenhum overflow horizontal em 320/375/414px.
- Textos legíveis, botões com área de toque adequada.

---

## Gates (não negociável)
- `node test-app.js` passa antes do commit.
- Migração suave + guarda defensiva para `wallet` (lição do crash anterior).
- Teste no navegador: publicar viagem e buscar (sem `undefined`), abrir perfil
  (carteira), checar mobile em 320px.
