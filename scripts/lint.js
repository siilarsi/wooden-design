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
  const res = spawnSync(process.execPath, ['--check', 'src/utils.js']);
  if (res.status !== 0) {
    console.error('src/utils.js:', res.stderr.toString().trim());
    hasError = true;
  }
}

checkFile('src/utils.js');
['components/Viewer.tsx', 'components/DropZone.tsx', 'components/FinishSelect.tsx', 'components/EventLog.tsx', 'app/page.tsx'].forEach(f => {
  if (fs.existsSync(f)) checkFile(f);
});
checkScriptSyntax();

if (hasError) process.exit(1);
