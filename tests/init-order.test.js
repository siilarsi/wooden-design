import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
const script = match ? match[1] : '';

describe('initialization order', () => {
  it('declares updateURL before first loadModel call', () => {
    const callIndex = script.indexOf('loadModel(params.model)');
    const declIndex = script.indexOf('const updateURL');
    expect(declIndex < callIndex).toEqual(true);
  });
});
