import fs from 'fs';

const gltf1 = JSON.parse(fs.readFileSync('models/plank1.gltf', 'utf8'));
const gltf2 = JSON.parse(fs.readFileSync('models/plank2.gltf', 'utf8'));

describe('GLTF files', () => {
  it('contain min/max for position accessor', () => {
    [gltf1, gltf2].forEach(gltf => {
      const acc = gltf.accessors[0];
      expect(Array.isArray(acc.min)).toEqual(true);
      expect(Array.isArray(acc.max)).toEqual(true);
      expect(acc.min.length).toEqual(3);
      expect(acc.max.length).toEqual(3);
    });
  });
});
