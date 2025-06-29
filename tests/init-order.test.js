import fs from 'fs';

const script = fs.readFileSync('app/page.tsx', 'utf8');

describe('initialization', () => {
  it('uses buildQuery before replacing history', () => {
    const idxBuild = script.indexOf('buildQuery');
    const idxReplace = script.indexOf('replaceState');
    expect(idxBuild !== -1 && idxBuild < idxReplace).toEqual(true);
  });
});
