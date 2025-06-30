import fs from 'fs';

const code = fs.readFileSync('app/page.tsx', 'utf8');

describe('help link', () => {
  it('links to help page', () => {
    expect(/href="\/help"/.test(code)).toEqual(true);
  });
});
