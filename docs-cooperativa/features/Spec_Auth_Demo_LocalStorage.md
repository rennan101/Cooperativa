# Spec: Login/Cadastro em Modo Demo (localStorage, sem backend)

**Status:** Aprovada para implementação
**Última atualização:** 2026-10-09

---

## Objetivo

Fazer os botões **"Entrar"** e **"Criar conta"** funcionarem em **modo demo**:
salvar os dados no `localStorage` (sem backend), permitir login/cadastro de
verdade no front e entrar na plataforma. O botão Google continua **sem
integração** (só visual).

---

## Contexto

Telas já implementadas (`viewLogin`, `viewSignup`, `viewSignupDriver`) com
`isValidCPF`, máscaras, uploads com preview. Falta only o handler que persiste
e autentica no front.

---

## Modelo de dados (localStorage)

Conta criada no cadastro:
```
account = {
  id, name, cpf, email, phone, password,
  role: 'PASSENGER' | 'DRIVER',
  documents: { cnh: dataUrl|null, antecedentes: dataUrl|null },  // só motorista
  verified: false,          // motorista começa false (aguarda análise)
  wallet: { balance: 0, pending: 0, transactions: [] },  // reaproveitar estrutura
  createdAt
}
```

Chaves:
- `coop.accounts` → array de contas (a "base" demo).
- `coop.session` → id da conta logada (ou null).

---

## Comportamento

### Cadastro (passageiro e motorista)
1. Validar todos os campos (já existe validação front + CPF).
2. Conferir se o e-mail já não está cadastrado em `coop.accounts` → se sim, erro
   inline "E-mail já cadastrado".
3. Criar a conta, adicionar em `coop.accounts`.
4. **Logar automaticamente**: setar `coop.session = conta.id`.
5. Popular `store.state.currentUser` com nome/email/CPF/telefone/avatar e
   `store.state.role` = PASSENGER ou DRIVER. Motorista: `verified=false`,
   guardar `documents` no currentUser.
6. Navegar para `#/` (home) com toast de boas-vindas
   ("Bem-vindo, <nome>!" ou "Cadastro realizado! Aguarde verificação." p/ motorista).

### Login
1. Validar e-mail/senha preenchidos.
2. Buscar conta em `coop.accounts` por e-mail.
3. Se não existir → toast/erro "Conta não encontrada. Cadastre-se.".
4. Se senha não bater → erro "Senha incorreta.".
5. Se ok → setar `coop.session`, popular currentUser/role, navegar `#/`, toast
   "Bem-vindo de volta, <nome>!".

### Sessão persistente
- No init (`DOMContentLoaded`), se existir `coop.session` válido em
  `coop.accounts`, popular currentUser/role automaticamente (mantém logado ao
  recarregar). Fazer isso com **migração suave/guarda** para não quebrar quem
  já tem estado antigo.

---

## Segurança/escopo (honesto)

- Senha guardada em texto plano no localStorage é **apenas demo** — marcar com
  comentário `// DEMO ONLY: sem backend, não usar em produção`.
- Nenhuma chamada de rede/backend.
- Botão Google: continua só visual (toast "em breve").

---

## Critérios de aceite

- [ ] "Criar conta" (passageiro) cria conta, loga e vai pra home.
- [ ] "Criar conta" (motorista) idem, com `verified=false` e documentos salvos.
- [ ] E-mail duplicado é barrado com erro inline.
- [ ] "Entrar" com conta existente e senha correta → loga e vai pra home.
- [ ] Senha/e-mail incorretos → erro claro, não loga.
- [ ] Recarregar a página mantém o usuário logado (sessão persistente).
- [ ] Dados persistem em `localStorage` (`coop.accounts`, `coop.session`).
- [ ] Botão Google segue sem integração.
- [ ] Migração suave: quem já tem estado antigo não quebra no init.
- [ ] `node test-app.js` passa; app não quebra.

---

## Gates
- `node test-app.js` verde antes do commit.
- Testar no navegador: cadastrar → deslogar → logar → recarregar (sessão mantida).

## Decisão em aberto (implementação)
- "Deslogar": adicionar botão de sair? (Recomendo sim, no perfil, para poder
  testar o login de novo. Se simples, incluir.)
