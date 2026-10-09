# Spec: Telas de Login e Cadastro (Passageiro e Motorista)

**Status:** Planejada — pronta para implementação
**Última atualização:** 2026-10-09

---

## Escopo

Criar as telas de **autenticação** da plataforma, separadas por perfil
(**Passageiro** e **Motorista**), no design system existente.

**Fora de escopo (nesta fase):**
- Integração real com backend/Auth (Firebase, Supabase, OAuth).
- O botão **"Continuar com Google"** fica **visível e preparado**, mas sem
  handler funcional — apenas um `data-attribute`/comentário marcando o ponto
  de integração futura.
- Validação real de CPF (apenas máscara + dígitos verificadores no front).

---

## Rotas

| Rota | Tela |
|---|---|
| `#/login` | Login (escolha/seleção de perfil + formulário) |
| `#/cadastro` | Cadastro passageiro |
| `#/cadastro-motorista` | Cadastro motorista (com documentos) |

Registrar as 3 no `renderApp` (app.js). Sem role ativo, qualquer rota protegida
redireciona para `#/login`.

---

## PARTE 1 — Tela de Login (`#/login`)

### Layout
Card centralizado (`max-w-md`), sobre fundo branco, com o logo Cooperativa no topo.

### Elementos
1. **Título:** "Entrar" + subtítulo "Acesse sua conta Cooperativa".
2. **Seletor de perfil (tabs/segmented):** dois botões — **Passageiro** / **Motorista**.
   O perfil escolhido define para onde leva o "Criar conta".
3. **Campo E-mail** (`type=email`, label "E-mail").
4. **Campo Senha** (`type=password`, label "Senha") + link "Esqueci minha senha".
5. **Botão primário:** "Entrar" (preto, `bg-uber-black text-white`).
6. **Divisor:** "ou".
7. **Botão Google:** "Continuar com Google" — contorno, com o ícone/GColorido do
   Google. **PREPARADO, sem integração** (comentário `// TODO: integrar OAuth Google`).
8. **Rodapé:** "Não tem conta? **Cadastre-se**" → leva ao cadastro do perfil selecionado.

### Estados (front-end apenas)
- Validação de campos vazios/formato antes de "entrar".
- Como não há backend, o "Entrar" pode mostrar um toast informativo
  ("Login será habilitado em breve") OU um estado de carregamento — **definir
  na implementação**, sem quebrar. Recomendado: manter o botão desabilitado até
  preencher, e ao submeter mostrar toast de "em breve".

---

## PARTE 2 — Cadastro Passageiro (`#/cadastro`)

### Campos
- **Nome completo** (texto)
- **CPF** (máscara `000.000.000-00`, obrigatório) — input com máscara em tempo real
- **E-mail** (email)
- **Telefone** (máscara `(00) 00000-0000`)
- **Senha** (password, mínimo 6 caracteres)
- **Confirmar senha**
- **Checkbox:** aceitar Termos de Uso e Política de Privacidade (obrigatório)

### Ações
- Botão primário: "Criar conta"
- Botão Google: "Continuar com Google" (preparado, sem handler)
- Link: "Já tem conta? **Entrar**"

### Validações (front)
- CPF: máscara + validar dígitos verificadores (algoritmo padrão). Mostrar erro
  inline se inválido.
- E-mail: formato válido.
- Senha: mínimo 6 caracteres; "confirmar" deve coincidir.
- Checkbox de termos obrigatório.
- Erros inline em vermelho (`text-red-500`), abaixo de cada campo.

---

## PARTE 3 — Cadastro Motorista (`#/cadastro-motorista`)

### Campos (além dos do passageiro)
- Nome completo, **CPF** (obrigatório, igual passageiro), e-mail, telefone,
  senha + confirmar, termos.
- **Upload de foto da CNH** (obrigatório) — campo de upload de imagem com preview.
  Aceitar `image/*`, mostrar miniatura após selecionar. Limite ~5MB.
- **Upload de Certidão de Antecedentes Criminais** (obrigatório) — mesma lógica
  de upload/preview.
- **Aviso de verificação:** texto explicando que os documentos são analisados e
  o motorista só publica viagens após **aprovação** (status "Motorista Verificado").
  Reaproveitar o ícone `verified_user` já usado na home.

### Upload — comportamento
- Input `type=file` estilizado (área clicável com ícone `upload`/`add_a_photo`).
- Após escolher: mostrar nome do arquivo + miniatura (para imagens) + botão remover.
- Validação: tipo imagem e tamanho; erro inline se inválido.
- **Não enviar a lugar nenhum** (sem backend) — só guardar referência/preview
  local. Comentário marcando ponto de integração com storage.

### Ações
- Botão primário: "Enviar para verificação" (deixa claro que depende de análise)
- Botão Google: "Continuar com Google" (preparado)
- Link: "Já tem conta? **Entrar**"

---

## PARTE 4 — Design System (obrigatório seguir)

Reaproveitar as classes e o modal/card existentes:
- Card: `bg-white rounded-2xl border border-uber-border shadow-2xl p-6 sm:p-8`
- Inputs: `w-full px-4 py-3 rounded-xl border border-uber-border bg-white
  text-uber-black placeholder-uber-slate focus:border-uber-black focus:ring-1
  focus:ring-uber-black outline-none transition-colors` (confirmar/padronizar na
  implementação; se já houver classe de input no style.css, reuse).
- Labels: `text-xs font-bold text-uber-charcoal uppercase tracking-wide`
- Botão primário: `bg-uber-black text-white rounded-xl py-3 font-bold
  hover:bg-neutral-900 active:scale-[0.98] transition-all`
- Botão Google: `border border-uber-border text-uber-charcoal rounded-xl py-3
  font-bold hover:bg-uber-gray flex items-center justify-center gap-2`
- Erro inline: `text-xs text-red-500 mt-1`
- Fundo da página de auth: branco (igual ao resto), card centralizado
  vertical/horizontalmente (`min-h-screen flex items-center justify-center`).
- Ícones: helper `icon()` já existente.
- Totalmente **responsivo** (320px → desktop), sem overflow horizontal.

---

## PARTE 5 — Botão Google (preparado, sem integração)

Em todas as telas, o botão "Continuar com Google":
- Visual pronto (contorno + ícone Google).
- **Sem `onclick` funcional de auth.** Apenas um comentário no código:
  `<!-- TODO(auth): integrar OAuth Google (definir provider: Firebase/Supabase) -->`
  e, se clicado, opcionalmente um toast "Disponível em breve".
- NÃO chamar backend, NÃO criar conta, NÃO alterar estado de login.

---

## PARTE 6 — CPF: máscara + validação

- Máscara em tempo real: `000.000.000-00`.
- Validador de dígitos verificadores (algoritmo brasileiro padrão). Função
  utilitária `isValidCPF(cpf)` reutilizável.
- Recusar CPFs inválidos conhecidos (000.000.000-00, sequências repetidas).

---

## Critérios de aceite

- [ ] Rotas `#/login`, `#/cadastro`, `#/cadastro-motorista` funcionam.
- [ ] Login tem seletor Passageiro/Motorista, e-mail, senha, botão Google (preparado).
- [ ] Cadastro passageiro: nome, CPF (máscara+válido), e-mail, telefone, senha,
      confirmar, termos.
- [ ] Cadastro motorista: tudo do passageiro **+ upload CNH + upload antecedentes**,
      ambos obrigatórios, com preview; aviso de verificação.
- [ ] Botão Google visível em todas, sem integração de auth/backend.
- [ ] Validações front com erro inline; CPF inválido barrado.
- [ ] Design system da plataforma; responsivo (320px+).
- [ ] Nenhuma chamada de backend/auth real.
- [ ] `node test-app.js` passa; app não quebra.

---

## Gates
- `node test-app.js` verde antes do commit.
- Testar no navegador: cada rota, máscara de CPF, upload com preview, responsivo.

## Decisão em aberto (implementação)
- O "Entrar"/"Criar conta" sem backend: mostrar toast "em breve" (recomendado)
  ou apenas desabilitar. Escolher o que mantiver a UX limpa.
