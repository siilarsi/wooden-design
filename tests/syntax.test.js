import fs from 'fs';
import { spawnSync } from 'child_process';

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
const script = match ? match[1] : '';

describe('index.html script syntax', () => {
  it('contains valid JavaScript', () => {
    const res = spawnSync(process.execPath, ['--input-type=module', '--check', '-'], {
      input: script,
      encoding: 'utf8'
    });
    expect(res.status).toEqual(0);
  });
});
