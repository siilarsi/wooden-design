import fs from 'fs';

const script = fs.readFileSync('app/page.tsx', 'utf8');

describe('page imports', () => {
  it('imports utils from src', () => {
    const regex = /from\s+'\.\.\/src\/utils.js'/;
    expect(regex.test(script)).toEqual(true);
  });
});
