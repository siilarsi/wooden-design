import { spawnSync } from 'child_process';

describe('utils module syntax', () => {
  it('contains valid JavaScript', () => {
    const res = spawnSync(process.execPath, ['--check', 'src/utils.js']);
    expect(res.status).toEqual(0);
  });
});
