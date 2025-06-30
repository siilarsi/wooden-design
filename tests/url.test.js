import fs from 'fs';

const code = fs.readFileSync('app/page.tsx', 'utf8');

describe('url synchronization', () => {
  it('reads roughness from search params', () => {
    expect(/params\.get\('roughness'\)/.test(code)).toEqual(true);
  });

  it('includes roughness in buildQuery call', () => {
    const idxBuild = code.indexOf('buildQuery');
    const idxReplace = code.indexOf('replaceState');
    const snippet = code.slice(idxBuild, idxReplace);
    expect(/roughness/.test(snippet)).toEqual(true);
  });
});
