const runTests = require('../scripts/runTests');

const tests = [
  { args: [], expected: '' },
  { args: ['nospaces'], expected: 'nospaces' },
  { args: ['has space'], expected: 'has%20space' },
  { args: ['one  two  '], expected: 'one%20%20two%20%20' },
];

const urlify = (str = '') => {
  return str.replace(/ /g, '%20');
};

runTests(urlify, tests);