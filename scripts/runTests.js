const runTests = (func, tests = []) => {
  let allPass = true;
  let failures = 0;

  console.log(`----Running Tests: ${new Date().toTimeString()}----`);

  if (!func) {
    console.log(`Error in params: missing function`);
    return;
  } else if (typeof func !== 'function') {
    console.log(`Error in params: first param is not a function`);
    return;
  } else if (tests.length === 0) {
    console.log(`----No Tests to Run----`);
    return;
  }

  for (let i = 0; i < tests.length; i++) {
    const { args, expected } = tests[i];
    if (!args) {
      console.log(`Error in test ${i}: args = ${args}`);
      allPass = false;
    }

    const actual = func(...args);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      failures++;
      allPass = false;

      /* Can't use template literal as it prints out arrays as comma-separated strings */
      console.log(`Failure in test ${i}: expected = `, expected, '; actual = ', actual, '; args = ', args);
    }
  }
  
  if (allPass) {
    console.log('----All Tests Pass----');
  } else {
    console.log(`----${failures} Test Failures----`);
  }
}

module.exports = runTests;