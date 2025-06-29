import fs from 'fs';

const script = fs.readFileSync('src/main.js', 'utf8');

describe('main imports', () => {
  it('imports utils from same directory', () => {
    const regex = /from\s+['"]\.\/utils.js['"]/;
    expect(regex.test(script)).toEqual(true);
  });
});
