const runTests = require('../scripts/runTests');

const tests = [
  { args: ['aabcccccaaa'], expected: 'a2b1c5a3' },
  { args: ['abc'], expected: 'abc' },
  { args: ['aaa'], expected: 'a3' },
];

const mapWord = (str = '') => {
  const mapped = {};

  for (const letter of str.toLowerCase()) {
    mapped[letter] = mapped[letter] + 1 || 1;
  }

  return mapped;
};

const stringCompression = (orig = '') => {
  let count = 0;
  let compressed = '';

  for (let i = 0; i < orig.length; i++) {
    count++;

    if (orig[i] !== orig[i+1]) {
      compressed += `${orig[i]}${count}`;
      count = 0;
    }
  }

  return (compressed.length > orig.length) ? orig : compressed;
};

runTests(stringCompression, tests);
