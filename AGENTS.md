# AGENTS.md — Cooperativa

Protocolo de trabalho multi-agente deste repositório (Hermes + Antigravity 2.0).
Todo agente que editar código aqui segue este documento.

## Papéis

- **Hermes (orquestrador)** — especificação, arquitetura, testes, revisão de diff
  e gates de qualidade. É dono de `test-app.js`, `.git/hooks/` e dos docs de spec.
- **Antigravity 2.0 (executor)** — implementação de código no projeto, refactors
  profundos e commits. É dono de `app.js`, `index.html`, `style.css`.

Regra de ouro: Hermes **não** edita `app.js` para features — especifica e delega.
Edição direta só em hotfix de crash, e sempre acompanhada de teste de regressão.

## Roteamento por demanda (tiers)

| Tier | Modelo Antigravity | Quando usar | Quem executa |
|---|---|---|---|
| `light` | flash_lite | boilerplate, formatação, tarefas triviais | Hermes direto |
| `fast`  | flash      | tarefas bem definidas e pontuais | Hermes direto |
| `deep`  | pro        | features multi-arquivo, regras de negócio, debugging | Antigravity |

Análises e auditorias em paralelo podem rodar como subagentes do Hermes.

## Fluxo de uma demanda

1. Hermes analisa e escreve/atualiza a spec em `docs-cooperativa/features/`.
2. Hermes escolhe o tier e despacha:
   `~/.hermes/bin/hermes-ag run "<prompt>" <tier> "/Volumes/SSD FN501 PRO/Projects/Cooperativa"`
3. Antigravity implementa, roda `node test-app.js` e commita.
4. Hermes revisa o diff e roda os testes antes de qualquer push.
5. Push somente com a suíte verde.

## Gates (não negociável)

- `node test-app.js` passa antes de **todo** commit (pre-commit hook ativo).
- Nenhum push sem revisão do diff pelo orquestrador.
- Toda feature nova em `INITIAL_STATE` exige migração suave no `AppStore` ou
  guarda defensiva — estado antigo em `localStorage` não tem o campo novo e o
  app quebra no init (regressão de 2026-10-09: `notifications` sem migração).
- Um agente não mexe nos arquivos do outro: Antigravity não altera
  `test-app.js` nem `.git/hooks/`; Hermes não altera `app.js` fora de hotfix.

## Convenções

- Commits convencionais: `feat(escopo):`, `fix(escopo):`, `chore(escopo):`.
- Specs e matrizes de eventos vivem em `docs-cooperativa/features/`.
- Notificações: usar `pushNotification({ title, body, icon, href, category })`;
  a matriz de eventos por perfil está em `Spec_Notificacoes_Header.md`.
