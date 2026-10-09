# Spec: Popup "Adicionar à Tela de Início" (PWA) com detecção de aparelho

**Status:** Aprovada para implementação
**Última atualização:** 2026-10-09

---

## Objetivo

Popup que convida o usuário a instalar o app na tela de início. O site detecta
o aparelho (Android / iOS / Desktop) e mostra **as instruções corretas** para
cada um. No Android, o fluxo é 1 clique (prompt nativo); no iOS, passo a passo
porque a Apple não tem API de instalação.

---

## PARTE 1 — Base PWA

Já preparado por Hermes:
- `manifest.webmanifest` (standalone, portrait, theme #000, ícones 192/512/maskable).
- `assets/icons/icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `icon.svg`.

Falta implementar no `index.html` (`<head>`):
- `<link rel="manifest" href="manifest.webmanifest">`
- `<meta name="theme-color" content="#000000">`
- `<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">`
- `<meta name="apple-mobile-web-app-capable" content="yes">`
- `<meta name="apple-mobile-web-app-status-bar-style" content="black">`
- `<meta name="apple-mobile-web-app-title" content="Cooperativa">`
- favicon: `<link rel="icon" href="assets/icons/icon-192.png">`

---

## PARTE 2 — Detecção de aparelho

```js
function detectPlatform() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
  return 'desktop';
}
```

Também detectar se **já está instalado** (não mostrar popup):
- `display-mode: standalone` (Android/desktop) ou `navigator.standalone === true` (iOS).

---

## PARTE 3 — Popup

- **Quando mostrar:** após ~8s de uso (ou 2ª visita), UMA vez, se não estiver
  instalado e não tiver sido dispensado. Guardar dispensa em `localStorage`
  (`coop.install.dismissed`).
- **Visual:** card/bottom-sheet no design system (fundo branco, `rounded-2xl`,
  borda `uber-border`, `shadow-2xl`, botão primário preto). Ícone do app +
  título + texto + ações. Fechar no X, no clique fora e no `Esc`.
- **Mobile:** bottom-sheet que sobe de baixo. **Desktop:** modal central.

### Conteúdo por plataforma

**Android** — 1 clique:
> **Instale o Cooperativa**
> Tenha acesso rápido direto da sua tela de início.
> [botão: **Instalar**]  → dispara `beforeinstallprompt` (prompt nativo).
> Fallback (sem prompt nativo): "Toque em ⋮ → *Adicionar à tela inicial*".

**iOS (Safari)** — passo a passo com ícones:
> **Instale o Cooperativa**
> 1. Toque no botão **Compartilhar** (ícone de compartilhar) na barra do Safari.
> 2. Role e toque em **Adicionar à Tela de Início**.
> 3. Confirme em **Adicionar**.
> [botão: Entendi]

**Desktop:**
> **Instale o Cooperativa**
> Use o ícone de instalação na barra de endereço para adicionar o app.
> [botão: Entendi]

---

## PARTE 4 — Lógica de instalação (Android)

```js
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // habilita o botao Instalar
});
// no clique do botao:
async function installApp() {
  if (!deferredPrompt) return showManualHint();
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  if (outcome === 'accepted') markInstalled();
}
```

`beforeinstallprompt` **só dispara com HTTPS + manifest válido + service worker**.
Em `localhost` (dev) pode não disparar — por isso o fallback manual é obrigatório.

---

## PARTE 5 — Service Worker (mínimo, para o prompt nativo funcionar)

Criar `sw.js` simples (cache-first do shell):
```js
const CACHE = 'coop-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
```
Registrar no fim do `app.js` ou no `index.html`:
`if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');`

> Escopo: manter **mínimo** — não é exigido cache elaborado agora, só o
> suficiente para o `beforeinstallprompt` disparar. Cache-first completo
> (offline real) fica para uma spec futura.

---

## PARTE 6 — Critérios de aceite

- [ ] Popup detecta Android/iOS/Desktop e mostra as instruções certas.
- [ ] Android: botão "Instalar" dispara o prompt nativo; fallback manual se não houver.
- [ ] iOS: passo a passo com os ícones de Compartilhar → Adicionar à Tela de Início.
- [ ] Não aparece se já instalado (standalone) ou se dispensado antes.
- [ ] Aparece no máximo 1x por sessão; dispensa persiste.
- [ ] Fecha no X / clique fora / Esc.
- [ ] Funciona em 320px (bottom-sheet) e desktop (modal central).
- [ ] `node test-app.js` passa; sem quebrar o app.

---

## Gates
- `node test-app.js` verde antes do commit.
- Testar no navegador: forçar cada plataforma (user-agent) e ver o texto correto.
