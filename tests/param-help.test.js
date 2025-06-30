import fs from 'fs';

const code = fs.readFileSync('app/page.tsx', 'utf8');

describe('ParamHelp integration', () => {
  it('imports ParamHelp component', () => {
    expect(
      /import ParamHelp from '\.\.\/components\/ParamHelp'/.test(code),
    ).toEqual(true);
  });

  it('renders ParamHelp element', () => {
    expect(/<ParamHelp \/>/.test(code)).toEqual(true);
  });
});
