import fs from 'fs';

describe('help page html', () => {
  it('has help/index.html', () => {
    expect(fs.existsSync('help/index.html')).toEqual(true);
  });
});
