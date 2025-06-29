import fs from 'fs';

const readme = fs.readFileSync('README.md', 'utf8');

describe('instructions', () => {
  it('mentions npm run dev', () => {
    expect(/npm run dev/.test(readme)).toEqual(true);
  });

  it('does not mention python http.server', () => {
    expect(/http\.server/.test(readme)).toEqual(false);
  });
});
