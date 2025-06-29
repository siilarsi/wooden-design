import fs from 'fs';
import ts from 'typescript';
import vm from 'vm';
import { createRequire } from 'module';
import React from 'react';
import { renderToString } from 'react-dom/server';

const code = fs.readFileSync('app/page.tsx', 'utf8');
const js = ts.transpileModule(code, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const context = { module: { exports: {} }, exports: {}, require: createRequire(import.meta.url) };
vm.runInNewContext(js, context);
const Page = context.module.exports.default;

describe('page component', () => {
  it('renders to string', () => {
    const html = renderToString(React.createElement(Page));
    expect(typeof html).toEqual('string');
  });
});
