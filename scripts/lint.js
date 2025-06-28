import fs from 'fs';

let hasError = false;

function checkFile(path) {
  const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
  lines.forEach((l,i) => {
    if (/\s+$/.test(l)) {
      console.error(`${path}:${i+1} Trailing whitespace`);
      hasError = true;
    }
  });
}

checkFile('src/utils.js');
checkFile('index.html');

if (hasError) process.exit(1);
