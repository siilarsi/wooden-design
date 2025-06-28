import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

describe('viewer container', () => {
  it('contains #viewer element', () => {
    expect(/<div id="viewer">/.test(html)).toEqual(true);
  });

  it('contains #eventLog element', () => {
    expect(/<div id="eventLog">/.test(html)).toEqual(true);
  });

  it('viewer uses full viewport', () => {
    const regex = /#viewer\s*{[^}]*width:\s*100vw;[^}]*height:\s*100vh;/;
    expect(regex.test(html)).toEqual(true);
  });

  it('event viewer fixed to bottom', () => {
    const regex = /#eventViewer\s*{[^}]*position:\s*fixed;[^}]*bottom:\s*0;/;
    expect(regex.test(html)).toEqual(true);
  });
});
