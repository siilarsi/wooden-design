import fs from 'fs';
const code = fs.readFileSync('app/page.tsx', 'utf8');

describe('finish presets', () => {
  it('handles matte preset', () => {
    expect(/finish === 'matte'/.test(code)).toEqual(true);
  });
  it('handles satin preset', () => {
    expect(/finish === 'satin'/.test(code)).toEqual(true);
  });
  it('handles gloss preset', () => {
    expect(/finish === 'gloss'/.test(code)).toEqual(true);
  });
});
