import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

describe('package config', () => {
  it('includes next dependency', () => {
    expect(typeof (pkg.dependencies && pkg.dependencies.next)).toEqual('string');
  });

  it('defines build script', () => {
    expect(typeof (pkg.scripts && pkg.scripts.build)).toEqual('string');
  });
});
