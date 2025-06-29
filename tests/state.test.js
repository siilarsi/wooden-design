import fs from 'fs';
import transpile from '../scripts/transpile.js';
import vm from 'vm';
import { createRequire } from 'module';

const code = fs.readFileSync('src/state.ts', 'utf8');
const js = transpile(code);
const realRequire = createRequire(import.meta.url);
const fakeRequire = (id) => {
  if (id === 'zustand') {
    return (init) => {
      const state = {};
      const set = (v) => Object.assign(state, v);
      Object.assign(state, init(set));
      return { getState: () => state };
    };
  }
  return realRequire(id);
};
const context = { module: { exports: {} }, exports: {}, require: fakeRequire };
vm.runInNewContext(js, context);
const { useMaterialStore } = context.module.exports;

describe('material store', () => {
  it('updates state', () => {
    useMaterialStore.getState().set({ roughness: 0.25 });
    expect(useMaterialStore.getState().roughness).toEqual(0.25);
  });

  it('stores texture url', () => {
    expect(useMaterialStore.getState().texture).toEqual(null);
    useMaterialStore.getState().set({ texture: 'foo.png' });
    expect(useMaterialStore.getState().texture).toEqual('foo.png');
  });
});
