import fs from 'fs';

const css = fs.readFileSync('style.css', 'utf8');

describe('style.css', () => {
  it('sets full-page height', () => {
    const rule = /html,\nbody,\n#root \{\n  height: 100%;\n\}/m;
    expect(rule.test(css)).toEqual(true);
  });
});
