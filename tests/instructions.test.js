import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

describe('instructions', () => {
  it('mentions running a local server', () => {
    const hasHint = /http\.server/.test(html);
    expect(hasHint).toEqual(true);
  });
});
