# Spec: Proteger rotas e ações para usuários deslogados

**Status:** Aprovada para implementação
**Última atualização:** 2026-10-09

---

## Objetivo

Usuário **deslogado** só pode usar a **busca**. Qualquer tentativa de acessar
área restrita ou ação de reserva redireciona para `#/login`.

## Regras

1. **Rotas protegidas** → se deslogado, redirecionar para `#/login`:
   - `#/minhas-viagens` (sessão de viagens)
   - `#/perfil`
   - `#/admin`
   - `#/publicar`
2. **Busca (`#/buscar`, `#/`, `#/viagem/<id>`)** permanece **pública** — pode
   navegar e ver viagens.
3. **Reservar / confirmar corrida:** o botão de reserva/confirmação em
   `#/viagem/<id>` e no fluxo de pagamento, se deslogado, redireciona para
   `#/login` (não permite reservar sem conta).
4. **Após logar:** voltar para a página/viagem que ele tentou acessar (guardar
   a rota pretendida e redirecionar após o login).

## Onde está deslogado

Deslogado = **não existe** `coop.session` válido (auth demo em localStorage).
Usar o mesmo critério de "logged in" já usado no header (botão "Entrar" aparece
quando deslogado).

## Implementação (sugestão)

- Helper `isLoggedIn()` → `!!localStorage.getItem('coop.session')`.
- Helper `requireAuth(pathPretendido)` → se deslogado, salvar
  `coop.auth.redirect = pathPretendido` em localStorage e
  `window.location.hash = '#/login'`; retornar true (bloqueado).
- No `renderApp`, antes de renderizar rotas protegidas, chamar `requireAuth`.
- Nos botões de reserva/confirmação, no início do handler, chamar `requireAuth`
  com a rota atual (`#/viagem/<id>`).
- No login bem-sucedido: se existir `coop.auth.redirect`, navegar para ele e
  limpar; senão, ir para `#/`.

## Critérios de aceite

- [ ] Deslogado em `#/minhas-viagens` → vai para `#/login`.
- [ ] Deslogado em `#/perfil` → vai para `#/login`.
- [ ] Deslogado em `#/admin` e `#/publicar` → vai para `#/login`.
- [ ] `#/buscar`, `#/` e `#/viagem/<id>` continuam acessíveis deslogado.
- [ ] Deslogado tentando reservar/confirmar corrida → vai para `#/login`.
- [ ] Após logar, volta para a página/viagem pretendida.
- [ ] `node test-app.js` passa; app não quebra.

## Gates
- `node test-app.js` verde antes do commit.
