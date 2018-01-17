const runTests = require('../scripts/runTests');

const tests = [
  { args: [], expected: true },
  { args: ['abc', 'cba'], expected: true },
  { args: ['ab', 'abc'], expected: false },
  { args: ['cba', 'Cba'], expected: false },
  { args: ['abc', 'a bc'], expected: false },
];

const sort = (str = '') => {
  return str.split('')
    .sort()
    .join('');
}

// Assumes whitespace and case are significant
const checkPermutation = (str1 = '', str2 = '') => {
  if (str1.length !== str2.length) {
    return false;
  }

  return sort(str1) === sort(str2);
};

runTests(checkPermutation, tests);