const fs = require('fs');
const path = require('path');

console.log(' Construction de @banque-stellaire/taux-change...');

const srcFile = path.join(__dirname, '..', 'src', 'index.js');
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Lire le source et ajouter un en-tête de distribution
const source = fs.readFileSync(srcFile, 'utf8');
const banner = `/**
 * @banque-stellaire/taux-change v3.2.1
 * SDK de conversion de devises interplanétaires
 * (c) Banque Stellaire S.A. — Licence MIT
 * Cycle solaire 2184
 */\n\n`;

fs.writeFileSync(path.join(distDir, 'index.js'), banner + source);

const stats = fs.statSync(path.join(distDir, 'index.js'));
console.log(`dist/index.js généré (${stats.size} octets)`);
