const fs = require('fs');
const path = require('path');

console.log('Running spaceman-analytics linter...');
console.log('');

let warnings = 0;
let errors = 0;

function lintFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  const relative = path.relative(process.cwd(), filepath);

  lines.forEach((line, i) => {
    const lineNum = i + 1;

    // Check for console.error (should use proper logging)
    if (line.includes('console.error') && !filepath.includes('lint.js')) {
      console.log(`  ⚠️  ${relative}:${lineNum} — prefer structured logging over console.error`);
      warnings++;
    }

    // Check for very long lines
    if (line.length > 120 && !line.trim().startsWith('*') && !line.trim().startsWith('//')) {
      console.log(`  ⚠️  ${relative}:${lineNum} — line exceeds 120 characters (${line.length})`);
      warnings++;
    }

    // Check for var usage (prefer const/let)
    if (line.match(/\bvar\s+/) && filepath.includes('scripts/')) {
      // Allow var in dist output (build.js generates UMD with var)
      if (!filepath.includes('build.js') || lineNum < 5) {
        console.log(`  ⚠️  ${relative}:${lineNum} — prefer const/let over var`);
        warnings++;
      }
    }

    // Check for trailing whitespace
    if (line !== lines[lines.length - 1] && line.match(/\s+$/)) {
      warnings++;
    }
  });
}

// Lint all JS files in scripts/
const scriptsDir = path.join(__dirname);
const files = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  lintFile(path.join(scriptsDir, file));
});

console.log('');
if (errors > 0) {
  console.log(`❌ ${errors} error(s), ${warnings} warning(s)`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`⚠️  ${warnings} warning(s), 0 errors — passed with warnings`);
} else {
  console.log('✅ No issues found.');
}
