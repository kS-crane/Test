const fs = require('fs');
const path = require('path');

console.log('Vérification du code — @banque-centrale-galactique/taux-change\n');

let avertissements = 0;

function verifierFichier(chemin) {
  const contenu = fs.readFileSync(chemin, 'utf8');
  const lignes = contenu.split('\n');
  const relatif = path.relative(process.cwd(), chemin);

  lignes.forEach((ligne, i) => {
    if (ligne.length > 120 && !ligne.trim().startsWith('*') && !ligne.trim().startsWith('//')) {
      console.log(`   ${relatif}:${i + 1} — ligne trop longue (${ligne.length} car.)`);
      avertissements++;
    }
    if (ligne.match(/console\.error/) && !chemin.includes('lint.js')) {
      console.log(`   ${relatif}:${i + 1} — préférer un logger structuré`);
      avertissements++;
    }
  });
}

// Vérifier src/
const srcDir = path.join(__dirname, '..', 'src');
if (fs.existsSync(srcDir)) {
  fs.readdirSync(srcDir).filter(f => f.endsWith('.js')).forEach(f => {
    verifierFichier(path.join(srcDir, f));
  });
}

// Vérifier scripts/
fs.readdirSync(__dirname).filter(f => f.endsWith('.js')).forEach(f => {
  verifierFichier(path.join(__dirname, f));
});

if (avertissements > 0) {
  console.log(`\n  ${avertissements} avertissement(s)`);
} else {
  console.log(' Aucun problème détecté.');
}
