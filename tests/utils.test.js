import { buildQuery, debounce } from '../src/utils.js';

describe('buildQuery', () => {
  it('serializes params with numbers formatted', () => {
    const q = buildQuery({a:1,b:0.1234,c:'x'});
    expect(q).toEqual('a=1.00&b=0.12&c=x');
  });
});

describe('debounce', () => {
  it('calls function once after delay', async () => {
    let count = 0;
    const fn = debounce(() => { count++; }, 10);
    fn();
    fn();
    await new Promise(r => setTimeout(r, 30));
    expect(count).toEqual(1);
  });
});
