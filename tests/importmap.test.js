import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

describe('import map', () => {
  it('defines mapping for three module', () => {
    const regex = /<script type="importmap">[\s\S]*"three"\s*:\s*"https:\/\/unpkg.com\/three@[^"']*three.module.js"[\s\S]*<\/script>/;
    const hasMap = regex.test(html);
    expect(hasMap).toEqual(true);
  });
});
