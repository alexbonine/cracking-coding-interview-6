const runTests = require('../scripts/runTests');

const tests = [
  { args: ['abc'], expected: true },
  { args: ['aaa'], expected: false },
  { args: ['abBc'], expected: true },
  { args: [], expected: true },
];

// assumes lower and upper cases different
const isUnique = (str = '') => {
  const map = {};

  for (let letter of str) {
    if (map[letter]) {
      return false;
    } else {
      map[letter] = true;
    }
  }

  return true;
};

runTests(isUnique, tests);
