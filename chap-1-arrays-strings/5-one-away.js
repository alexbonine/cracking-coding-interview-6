const runTests = require('../scripts/runTests');

const tests = [
  { args: ['pale', 'ple'], expected: true },
  { args: ['pales', 'pale'], expected: true },
  { args: ['pale', 'bale'], expected: true },
  { args: ['pale', 'bae'], expected: false },
  { args: ['pale', 'ball'], expected: false },
];

const checkOneWrong = (str1 = '', str2 = '') => {
  let missedOnce = false;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i] && missedOnce) {
      return false;
    } else if (str1[i] !== str2[i]) {
      missedOnce = true;
    }
  }

  return true;
};

const checkOneMissing = (longer = '', shorter = '') => {
  let missedOnce = false;
  let longerCount = 0;
  let shorterCount = 0;

  while (longerCount < longer.length) {
    if (longer[longerCount] !== shorter[shorterCount] && missedOnce) {
      return false;
    } else if (longer[longerCount] !== shorter[shorterCount]) {
      missedOnce = true;
      longerCount++;
    } else {
      longerCount++;
      shorterCount++;
    }
  }

  return true;
};

const oneAway = (str1 = '', str2 = '') => {
  if (str1.length === str2.length) {
    return checkOneWrong(str1, str2, false);
  } else if (str1.length + 1 === str2.length) {
    return checkOneMissing(str2, str1);
  } else if (str1.length - 1 === str2.length) {
    return checkOneMissing(str1, str2);
  } else {
    return false;
  }
};

runTests(oneAway, tests);
