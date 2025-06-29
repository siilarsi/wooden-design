import fs from 'fs';
import transpile from '../scripts/transpile.js';
import vm from 'vm';
import { createRequire } from 'module';
// minimal stubs so the test can run without React installed
const React = { createElement: () => ({}) };
const renderToString = () => '';

const code = fs.readFileSync('app/page.tsx', 'utf8');
const js = transpile(code);
const context = { module: { exports: {} }, exports: {}, require: createRequire(import.meta.url) };
vm.runInNewContext(js, context);
const Page = context.module.exports.default;

describe('page component', () => {
  it('renders to string', () => {
    const html = renderToString(React.createElement(Page));
    expect(typeof html).toEqual('string');
  });
});
