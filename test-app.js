#!/usr/bin/env node
/**
 * test-app.js — Suíte de smoke tests da aplicação Cooperativa.
 *
 * Roda ANTES de todo commit. Detecta regressões que quebram o app
 * (ex.: campos de estado faltando após migração, erros de sintaxe,
 * funções de notificação quebrando em localStorage antigo).
 *
 * Uso:  node test-app.js
 * Pré-requisito: nenhum (Node puro, sem dependências).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APP = path.join(__dirname, 'app.js');
let pass = 0, fail = 0;
const failures = [];

function test(name, fn) {
  try { fn(); pass++; console.log(`  \u2713 ${name}`); }
  catch (e) { fail++; failures.push({ name, e }); console.log(`  \u2717 ${name}\n      ${e.message}`); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || 'asserção falhou'); }

// ---- 1. Sintaxe válida -------------------------------------------------------
console.log('\n[1] Sintaxe');
test('app.js faz parse sem erros de sintaxe', () => {
  const src = fs.readFileSync(APP, 'utf8');
  new vm.Script(src, { filename: 'app.js' }); // lança SyntaxError se inválido
});

// ---- 2. Estado inicial completo (contrato de campos) -------------------------
console.log('\n[2] Contrato do INITIAL_STATE');
test('INITIAL_STATE declara notifications como array', () => {
  const src = fs.readFileSync(APP, 'utf8');
  const m = src.match(/const INITIAL_STATE = \{[\s\S]*?notifications:\s*\[\]/);
  assert(m, 'campo "notifications: []" ausente em INITIAL_STATE — pushNotification vai quebrar');
});

// ---- 3. Migração de localStorage antigo (o bug que quebrou) ------------------
console.log('\n[3] Migração de estado antigo (localStorage sem notifications)');

// Simula um navegador mínimo para executar o AppStore de forma isolada.
function makeBrowserEnv(savedState) {
  const storage = {};
  if (savedState) storage['cooperativa_state_v3'] = JSON.stringify(savedState);
  const sandbox = {
    console,
    localStorage: {
      getItem: k => (k in storage ? storage[k] : null),
      setItem: (k, v) => { storage[k] = String(v); },
      removeItem: k => { delete storage[k]; },
    },
    document: { getElementById: () => null, querySelector: () => null, addEventListener: () => {} },
    window: { addEventListener: () => {}, location: { hash: '' } },
    navigator: {},
    Date, JSON, Math, Array, Object, String, Number, Boolean, Error, RegExp, Set, Map,
    setTimeout, clearTimeout, setInterval, clearInterval,
  };
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.globalThis = sandbox;
  return { sandbox, storage };
}

function loadAppStore(savedState) {
  const { sandbox, storage } = makeBrowserEnv(savedState);
  let src = fs.readFileSync(APP, 'utf8');
  // Corta o init do DOM (DOMContentLoaded) — só queremos as classes/funções.
  src = src.replace(/window\.addEventListener\('DOMContentLoaded'[\s\S]*$/, '');
  // Expõe `store` (um const de módulo) para o ambiente de teste poder assertar.
  src += '\n;globalThis.store = store;\n';
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: 'app.js' });
  return { sandbox, storage };
}

test('estado salvo SEM notifications é migrado para [] (não quebra)', () => {
  const oldState = {
    role: 'PASSENGER',
    currentUser: { id: 'u1', name: 'Teste', avatarUrl: '', cpf: '1', phone: '2' },
    platformSettings: { platformFeePercent: 10 },
    searchParams: { origin: '', destination: '' },
    rides: [], bookings: [],
  };
  const { sandbox } = loadAppStore(oldState);
  assert(Array.isArray(sandbox.store.state.notifications),
    'store.state.notifications deveria ser [] após migração, veio: ' + typeof sandbox.store.state.notifications);
});

test('pushNotification funciona sobre estado migrado (sem unshift em undefined)', () => {
  const oldState = {
    role: 'PASSENGER',
    currentUser: { id: 'u1', name: 'Teste', avatarUrl: '', cpf: '1', phone: '2' },
    platformSettings: { platformFeePercent: 10 },
    searchParams: { origin: '', destination: '' },
    rides: [], bookings: [],
  };
  const { sandbox } = loadAppStore(oldState);
  sandbox.pushNotification({ title: 't', body: 'b' });
  assert(sandbox.store.state.notifications.length === 1, 'pushNotification deveria inserir 1 item');
});

test('pushNotification é defensivo mesmo se notifications vier undefined', () => {
  const { sandbox } = loadAppStore(null); // estado fresco (INITIAL_STATE, tem notifications)
  sandbox.store.state.notifications = undefined; // força o pior caso
  sandbox.pushNotification({ title: 't' });
  assert(Array.isArray(sandbox.store.state.notifications) && sandbox.store.state.notifications.length === 1,
    'pushNotification deveria se auto-corrigir quando notifications é undefined');
});

// ---- 4. Funções de notificação existem --------------------------------------
console.log('\n[4] API de notificações');
test('todas as funções de notificação estão definidas', () => {
  const { sandbox } = loadAppStore(null);
  for (const fn of ['pushNotification', 'unreadCount', 'updateNotificationBadge',
                    'toggleNotificationCenter', 'markNotificationRead',
                    'markAllNotificationsRead', 'renderNotificationPanel',
                    'loadNotifications', 'saveNotifications', 'timeAgo']) {
    assert(typeof sandbox[fn] === 'function', `função "${fn}" não está definida`);
  }
});

// ---- 4b. Regressão: perfil com conta demo não quebra -------------------------
console.log('\n[4b] Perfil com conta demo');
// Simula um DOM mínimo para viewProfile conseguir montar o HTML.
function makeDomEnv() {
  const els = {};
  const mkEl = () => ({
    _html: '', innerHTML: '', style: {}, children: [],
    set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; },
    getBoundingClientRect: () => ({ x:0, y:0, width:0, height:0 }),
    addEventListener: () => {}, querySelector: () => null, querySelectorAll: () => [],
    contains: () => false, classList: { add(){}, remove(){}, toggle(){} },
    scrollIntoView(){}, click(){}, setAttribute(){}, getAttribute(){ return null; },
  });
  return {
    getElementById: (id) => (els[id] = els[id] || mkEl()),
    querySelector: () => null, querySelectorAll: () => [],
    addEventListener: () => {},
  };
}

test('viewProfile() renderiza com conta demo mínima (sem toFixed em undefined)', () => {
  const { sandbox } = loadAppStore(null);
  // simular uma conta demo pobre (só o que o cadastro gravaria)
  sandbox.store.state.currentUser = {
    id: 'user-demo', name: 'Ana Teste', cpf: '111.444.777-35',
    email: 'ana@demo.com', phone: '(85) 98888-7777',
  };
  sandbox.document = makeDomEnv();
  sandbox.window = sandbox.window || {};
  sandbox.window.location = { hash: '#/perfil' };
  let html;
  try { html = sandbox.viewProfile(); }
  catch (e) { throw new Error('viewProfile lançou com conta demo: ' + e.message); }
  assert(typeof html === 'string' && html.length > 100, 'viewProfile deveria retornar HTML');
  assert(/Carteira|R\$/.test(html), 'viewProfile deveria conter a carteira/saldo');
});

// ---- 5. Header contém o sino + badge ----------------------------------------
console.log('\n[5] Header');
test('renderHeader injeta sino, badge e painel de notificações', () => {
  const src = fs.readFileSync(APP, 'utf8');
  assert(/id="notif-badge"/.test(src), 'badge notif-badge ausente no header');
  assert(/id="notification-panel"/.test(src), 'painel notification-panel ausente no header');
  assert(/toggleNotificationCenter\(\)/.test(src), 'botão do sino não chama toggleNotificationCenter');
});

// ---- 6. Init não referencia notifications antes de existir -------------------
console.log('\n[6] Ordem de init');
test('DOMContentLoaded faz loadNotifications antes de semear', () => {
  const src = fs.readFileSync(APP, 'utf8');
  const init = src.match(/window\.addEventListener\('DOMContentLoaded'[\s\S]*?\}\);/);
  assert(init, 'bloco DOMContentLoaded não encontrado');
  const block = init[0];
  const iLoad = block.indexOf('loadNotifications');
  const iSeed = block.indexOf('pushNotification');
  assert(iLoad !== -1, 'loadNotifications não é chamado no init');
  assert(iLoad < iSeed, 'loadNotifications deve rodar ANTES do seed de pushNotification');
});

// ---- Resumo -----------------------------------------------------------------
console.log(`\n${'='.repeat(50)}`);
console.log(`RESULTADO: ${pass} passaram, ${fail} falharam`);
if (fail > 0) {
  console.log('\nFALHAS:');
  failures.forEach(f => console.log(`  - ${f.name}: ${f.e.message}`));
  process.exit(1);
} else {
  console.log('OK — aplicação íntegra, seguro para commit.');
  process.exit(0);
}
