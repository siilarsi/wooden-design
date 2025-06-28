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

  it('event viewer starts open', () => {
    const hasOpen = /<details id="eventViewer"[^>]*open/.test(html);
    expect(hasOpen).toEqual(true);
  });

  it('event viewer has no max-height limit', () => {
    const regex = /#eventViewer\s*{[^}]*max-height:/;
    expect(regex.test(html)).toEqual(false);
  });

  it('loads viewer module via script tag', () => {
    const regex = /<script type="module" src="\.\/src\/main.js"><\/script>/;
    expect(regex.test(html)).toEqual(true);
  });
});
