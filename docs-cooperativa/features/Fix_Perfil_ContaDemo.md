# Fix: Perfil quebra com conta demo (currentUser sem wallet/rating)

**Status:** Aprovada
**Última atualização:** 2026-10-09

---

## Bug

Ao logar com conta criada no **cadastro demo** (`coop.accounts`/`coop.session`) e
abrir `#/perfil`, a tela cai na home. `viewProfile()` lança
`TypeError: Cannot read properties of undefined (reading 'toFixed')` porque a
conta demo não tem os campos que o perfil/carteira esperam.

## Causa raiz

Quando o login/cadastro popula `store.state.currentUser` a partir da conta do
`localStorage`, ele copia só name/email/cpf/phone. Faltam:
`wallet: {balance, pending, transactions}`, `rating`, `totalTrips`, `avatarUrl`.
O `INITIAL_STATE` padrão tem esses valores, mas a conta demo não.
O `try/catch` do `renderApp` engole o erro e renderiza a home em silêncio.

## Correção

Onde o login/cadastro/sessão popula `currentUser` (funções de auth demo),
**sempre semear os campos obrigatórios** com defaults:

```
currentUser = {
  id, name, cpf, email, phone,
  avatarUrl: DEFAULT_BLANK_AVATAR,
  rating: account.rating ?? 5.0,
  totalTrips: account.totalTrips ?? 0,
  wallet: account.wallet ?? { balance: 0, pending: 0, transactions: [] },
  documents: account.documents ?? { cnh: null, antecedentes: null },
  vehicles: account.vehicles ?? [],
  ...demais campos que viewProfile/viewWallet leem
}
```

Aplicar em: cadastro passageiro, cadastro motorista, login e restore de sessão
no init. Usar `??`/defaults para não sobrescrever dados que a conta já tenha.

## Critérios de aceite

- [ ] Logar com conta demo → abrir Perfil → renderiza sem cair na home.
- [ ] Carteira aparece com saldo R$ 0,00 (default), sem `undefined`/erro.
- [ ] Motorista demo: `verified=false` e documentos preservados.
- [ ] Recarregar mantém sessão e o perfil continua ok.
- [ ] `node test-app.js` passa (incluindo novo teste de regressão abaixo).

## Teste de regressão (adicionar em test-app.js)

Novo caso: criar uma conta demo mínima em `coop.accounts`, logar, e assertar
que `viewProfile()` **não lança** e retorna HTML contendo "Carteira"/"R$".
Assim esse tipo de regressão não passa mais no gate.

## Gates
- `node test-app.js` verde.
