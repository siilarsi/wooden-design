const tests = [];

global.describe = (name, fn) => { console.log(name); fn(); };

global.it = (msg, fn) => {
  tests.push({ msg, fn });
};

global.expect = (received) => ({
  toEqual(expected) {
    const r = JSON.stringify(received);
    const e = JSON.stringify(expected);
    if (r !== e) throw new Error(`Expected ${e} but got ${r}`);
  }
});

export async function run() {
  for (const { msg, fn } of tests) {
    try {
      await fn();
      console.log('  \x1b[32m✓\x1b[0m', msg);
    } catch (e) {
      console.log('  \x1b[31m✗\x1b[0m', msg);
      console.error(e);
      process.exitCode = 1;
    }
  }
}
