import { spawnSync } from 'child_process';

describe('main module syntax', () => {
  it('contains valid JavaScript', () => {
    const res = spawnSync(process.execPath, ['--check', 'src/main.js']);
    expect(res.status).toEqual(0);
  });
});
