export default function transpile(code) {
  let out = code;
  // convert TypeScript imports to CommonJS
  out = out.replace(/import\s+([^;]+)\s+from\s+'([^']+)'/g, (_, imports, mod) => {
    const m = imports.match(/^([^,{]+)\s*,\s*({[^}]+})$/);
    if (m) {
      const def = m[1].trim();
      const named = m[2];
      return `const ${def} = require("${mod}"); const ${named} = require("${mod}")`;
    }
    return `const ${imports} = require("${mod}")`;
  });
  // drop interface declarations
  out = out.replace(/export\s+interface\s+[^{]+{[^}]+}\n?/gs, '');
  // remove type annotations like ': number' but avoid object literal values
  out = out.replace(/:\s*[A-Za-z_][A-Za-z0-9_<>\[\]]+(?=\s*[,;=\)])/g, '');
  // remove generics like '<string>'
  out = out.replace(/<[^>]+>/g, '');
  // transform export const
  const named = [];
  out = out.replace(/export const (\w+)/g, (_, name) => {
    named.push(name);
    return 'const ' + name;
  });
  // transform export default function
  out = out.replace(/export default function (\w+)/, (_, name) => {
    named.push('default:' + name);
    return 'function ' + name;
  });
  // append exports
  if (named.length) {
    out += '\n';
    named.forEach(n => {
      if (n.startsWith('default:')) {
        const name = n.split(':')[1];
        out += `module.exports.default = ${name};\n`;
      } else {
        out += `module.exports.${n} = ${n};\n`;
      }
    });
  }
  return out;
}
