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
  const html = fs.readFileSync('index.html', 'utf8');
  const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  if (match) {
    const res = spawnSync(process.execPath, ['--input-type=module', '--check', '-'], {
      input: match[1],
      encoding: 'utf8'
    });
    if (res.status !== 0) {
      console.error('index.html:', res.stderr.trim());
      hasError = true;
    }
  }
}

checkFile('src/utils.js');
checkFile('index.html');
checkScriptSyntax();

if (hasError) process.exit(1);
