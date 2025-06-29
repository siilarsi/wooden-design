import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

describe('package config', () => {
  it('includes next dependency', () => {
    expect(typeof (pkg.dependencies && pkg.dependencies.next)).toEqual(
      'string',
    );
  });

  it('defines build script', () => {
    expect(typeof (pkg.scripts && pkg.scripts.build)).toEqual('string');
  });

  it('pins drei to a published version', () => {
    expect(pkg.dependencies['@react-three/drei']).toEqual('9.99.7');
  });
});
