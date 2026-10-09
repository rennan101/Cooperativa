# Spec: Modal de Confirmação ao Salvar no Painel de Gestão (Admin)

**Status:** Aprovada para implementação
**Última atualização:** 2026-10-09

---

## Objetivo

Ao clicar em **"Salvar Alterações"** no painel de gestão do admin
(`handleSavePlatformSettings`), abrir um **modal de confirmação** com um
**resumo das alterações** e perguntando se o admin deseja continuar. Só salvar
de verdade após confirmar.

---

## Contexto atual

- `handleSavePlatformSettings` (app.js) hoje salva direto:
  `store.saveState(); showToast('Porcentagens e taxas salvas...', 'success');`
- Botão: `<button onclick="handleSavePlatformSettings()">Salvar Alterações</button>` (app.js:6690).
- Campos editáveis (`platformSettings`): `driverPayoutPercent`,
  `platformFeePercent`, `signalPercent`, `payOnArrivalPercent`,
  `earlyRefundPercent`, `earlyRetentionPercent`, `lateRefundPercent`,
  `lateRetentionPercent`.

---

## Comportamento

1. Admin clica em **Salvar Alterações**.
2. Abre o modal de confirmação com o **resumo do que vai ser salvo** (os valores
   atuais dos campos, em linguagem legível — ex.: "Repasse ao motorista: 85%").
3. Ações do modal:
   - **Confirmar/Salvar** → aplica `store.saveState()`, fecha o modal, mostra
     o toast de sucesso atual.
   - **Cancelar** (X, botão Cancelar, clique fora, `Esc`) → fecha sem salvar.

---

## Padrão visual (reaproveitar o das plataforma)

Seguir o modal existente (`openAdminContactSupportModal` / `openAdminCancelBookingModal`,
app.js:4294/4366):

```
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
  <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-uber-border">
    ... título, resumo, ações ...
  </div>
</div>
```

- Título: "Confirmar alterações?" (fonte `extrabold`, `text-uber-black`).
- Resumo: lista dos campos alterados com valor → novo valor. Destacar mudanças
  em relação ao padrão/salvo, se simples; senão, listar todos os valores atuais.
- Botão primário (preto, `bg-uber-black text-white rounded-lg`): "Salvar".
- Botão secundário (contorno, `border border-uber-border text-uber-charcoal`): "Cancelar".
- Ícone de aviso (`help`/`info`) no topo, no estilo dos outros modais.
- Renderizar em `#modal-root` (mesmo container dos modais atuais).

---

## Rótulos legíveis dos campos

| Campo | Rótulo |
|---|---|
| `driverPayoutPercent` | Repasse ao motorista |
| `platformFeePercent` | Taxa da cooperativa |
| `signalPercent` | Sinal na reserva (PIX) |
| `payOnArrivalPercent` | Pagamento na chegada |
| `earlyRefundPercent` | Estorno (cancelamento > 1h) |
| `earlyRetentionPercent` | Retenção (cancelamento > 1h) |
| `lateRefundPercent` | Estorno (cancelamento < 1h) |
| `lateRetentionPercent` | Retenção (cancelamento < 1h) |

---

## Critérios de aceite

- [ ] Clicar em "Salvar Alterações" abre o modal de confirmação (não salva direto).
- [ ] Modal mostra o resumo dos valores com rótulos legíveis.
- [ ] "Salvar" aplica e mostra o toast de sucesso; "Cancelar"/X/fora/Esc não salva.
- [ ] Visual idêntico ao padrão dos outros modais da plataforma.
- [ ] Funciona em 320px (modal centralizado, sem estourar).
- [ ] `node test-app.js` passa; app não quebra.

---

## Gates
- `node test-app.js` verde antes do commit.
- Testar no navegador: abrir painel → Salvar → modal aparece → confirmar/cancelar.
