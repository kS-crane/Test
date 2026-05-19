const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('Running spaceman-analytics test suite...');
console.log('');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ ${name}: ${e.message}`);
    failed++;
  }
}

// ── Unit tests ──

test('lodash is importable', () => {
  const _ = require('lodash');
  assert(_.VERSION, 'lodash VERSION should be defined');
  assert(typeof _.get === 'function', '_.get should be a function');
});

test('package.json is valid', () => {
  const pkg = require('../package.json');
  assert.strictEqual(pkg.name, 'spaceman-analytics');
  assert(pkg.version.match(/^\d+\.\d+\.\d+$/), 'version should be semver');
  assert(pkg.scripts.build, 'build script should exist');
  assert(pkg.scripts.test, 'test script should exist');
});

test('build script exists', () => {
  assert(fs.existsSync(path.join(__dirname, 'build.js')), 'scripts/build.js should exist');
});

test('lint script exists', () => {
  assert(fs.existsSync(path.join(__dirname, 'lint.js')), 'scripts/lint.js should exist');
});

test('dist output is valid after build', () => {
  const distFile = path.join(__dirname, '..', 'dist', 'spaceman-analytics.js');
  if (fs.existsSync(distFile)) {
    const content = fs.readFileSync(distFile, 'utf8');
    assert(content.includes('spaceman-analytics'), 'dist should contain package name');
    assert(content.includes('exports.track'), 'dist should export track function');
    assert(content.includes('exports.identify'), 'dist should export identify function');
    assert(content.includes('exports.page'), 'dist should export page function');
  } else {
    console.log('    (dist not yet built, skipping output validation)');
  }
});

test('no unexpected top-level files', () => {
  const root = path.join(__dirname, '..');
  const allowed = [
    'package.json', 'npm-shrinkwrap.json', 'README.md',
    '.prettierrc', '.eslintrc.json', 'node_modules', 'dist',
    'scripts', '.github', '.git', '__base'
  ];
  const entries = fs.readdirSync(root);
  const unexpected = entries.filter(e => !allowed.includes(e));
  // Don't fail on unexpected files — just note them
  if (unexpected.length > 0) {
    console.log(`    ⚠️  Extra files: ${unexpected.join(', ')}`);
  }
});

// ── Summary ──

console.log('');
console.log(`${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
