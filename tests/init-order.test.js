import fs from 'fs';

const script = fs.readFileSync('src/main.js', 'utf8');

describe('initialization order', () => {
  it('declares updateURL before first loadModel call', () => {
    const callIndex = script.indexOf('loadModel(params.model)');
    const declIndex = script.indexOf('const updateURL');
    expect(declIndex < callIndex).toEqual(true);
  });

  it('declares currentTexture before first loadModel call', () => {
    const callIndex = script.indexOf('loadModel(params.model)');
    const declIndex = script.indexOf('let currentTexture');
    expect(declIndex < callIndex).toEqual(true);
  });
});
