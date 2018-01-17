const runTests = require('../scripts/runTests');

const tests = [
  { args: ['waterbottle', 'terbottlewa'], expected: true },
  { args: ['waterbottle', 'waterbottle'], expected: true },
  { args: ['waterbottle', 'baterbottle'], expected: false },
  { args: ['waterbottle', 'bottlebater'], expected: false },
];

const stringRotation = (str1 = '', str2 = '') => {
  if (str1.length !== str2.length || str1.length === 0) {
    return false;
  }

  const doubleStr2 = str2 + str2;
  return doubleStr2.search(str1) > -1; // isSubstring(doubleStr2, str1)
};

runTests(stringRotation, tests);
