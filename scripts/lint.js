import fs from 'fs';
import { spawnSync } from 'child_process';

let hasError = false;

function checkFile(path) {
  const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/\s+$/.test(l)) {
      console.error(`${path}:${i + 1} Trailing whitespace`);
      hasError = true;
    }
  });
}

function checkScriptSyntax() {
  const script = fs.readFileSync('src/main.js', 'utf8');
  const res = spawnSync(process.execPath, ['--check', 'src/main.js']);
  if (res.status !== 0) {
    console.error('src/main.js:', res.stderr.trim());
    hasError = true;
  }
}

checkFile('src/utils.js');
checkFile('src/main.js');
checkFile('index.html');
checkScriptSyntax();

if (hasError) process.exit(1);
