import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

describe('instructions', () => {
  it('does not mention developer setup', () => {
    const hasHint = /http\.server/.test(html);
    expect(hasHint).toEqual(false);
  });
});
