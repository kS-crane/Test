const assert = require('assert');

console.log('Tests — @banque-stellaire/taux-change\n');

let reussis = 0;
let echoues = 0;

function test(nom, fn) {
  try {
    fn();
    console.log(`  ${nom}`);
    reussis++;
  } catch (e) {
    console.log(`  ${nom}: ${e.message}`);
    echoues++;
  }
}

const sdk = require('../src/index');

test('convertir CM vers JL', () => {
  const r = sdk.convertir(100, 'CM', 'JL');
  assert(r.montant > 0, 'Le montant converti doit être positif');
  assert.strictEqual(r.de, 'CM');
  assert.strictEqual(r.vers, 'JL');
});

test('convertir vers soi-même retourne le même montant', () => {
  const r = sdk.convertir(250, 'CT', 'CT');
  assert.strictEqual(r.montant, 250);
  assert.strictEqual(r.taux, 1);
});

test('devise inconnue lance une erreur', () => {
  assert.throws(() => sdk.convertir(100, 'FAKE', 'CT'), /inconnue/);
});

test('montant négatif lance une erreur', () => {
  assert.throws(() => sdk.convertir(-50, 'CM', 'CT'), /positif/);
});

test('obtenirTaux retourne un nombre', () => {
  const taux = sdk.obtenirTaux('CM', 'JL');
  assert(typeof taux === 'number');
  assert(taux > 0);
});

test('listerDevises retourne toutes les devises', () => {
  const devises = sdk.listerDevises();
  assert(devises.length >= 5, 'Au moins 5 devises attendues');
  const codes = devises.map(d => d.code);
  assert(codes.includes('CT'), 'CT doit être présent');
  assert(codes.includes('CM'), 'CM doit être présent');
});

test('evaluerPortefeuille calcule le total', () => {
  const r = sdk.evaluerPortefeuille({ CM: 500, JL: 200 });
  assert(r.totalCT > 0, 'Le total doit être positif');
  assert.strictEqual(r.details.length, 2);
});

test('VERSION est définie', () => {
  assert.strictEqual(sdk.VERSION, '3.2.1');
});

console.log(`\n${reussis} réussis, ${echoues} échoués`);
if (echoues > 0) process.exit(1);

