import fs from 'fs';
import ts from 'typescript';
import vm from 'vm';
import { createRequire } from 'module';

const code = fs.readFileSync('src/state.ts', 'utf8');
const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const context = { module: { exports: {} }, exports: {}, require: createRequire(import.meta.url) };
vm.runInNewContext(js, context);
const { useMaterialStore } = context.module.exports;

describe('material store', () => {
  it('updates state', () => {
    useMaterialStore.getState().set({ roughness: 0.25 });
    expect(useMaterialStore.getState().roughness).toEqual(0.25);
  });
});
