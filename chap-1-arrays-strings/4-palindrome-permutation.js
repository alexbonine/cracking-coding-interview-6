const runTests = require('../scripts/runTests');

const tests = [
  { args: ['Tact Coa'], expected: true },
  { args: ['ttaacccooo'], expected: false },
  { args: ['a'], expected: true },
];

/* Only includes case-insensitive letters */
const mapWord = (str = '') => {
  const mapped = {};
  const word = str.toLowerCase().replace(/([^a-z])/g, '');

  for (const letter of word) {
    mapped[letter] = mapped[letter] + 1 || 1;
  }
  return mapped;
}

const palindromePermutation = (str = '') => {
  const mapped = mapWord(str);
  let hasOdd = false;

  for (const letter in mapped) {
    const isOdd = mapped[letter] % 2 !== 0;

    if (hasOdd && isOdd) {
      return false;
    } else if (isOdd) {
      hasOdd = true;
    }
  }

  return true;
};

runTests(palindromePermutation, tests);
