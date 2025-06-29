import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const count = (html.match(/src=".*main\.tsx"/g) || []).length;

describe('index.html', () => {
  it('references main.tsx only once', () => {
    expect(count).toEqual(1);
  });
});
