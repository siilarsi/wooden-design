import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

describe('viewer container', () => {
  it('contains #viewer element', () => {
    expect(/<div id="viewer">/.test(html)).toEqual(true);
  });
});
