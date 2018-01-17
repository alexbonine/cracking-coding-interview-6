const runTests = require('../scripts/runTests');

const tests = [
  { args: [[[1, 1], [1, 1]]], expected: [[1, 1], [1, 1]] },
  { args: [[[1, 1, 1], [1, 1, 1]]], expected: [[1, 1, 1], [1, 1, 1]] },
  { args: [[[1, 0, 1, 1], [1, 1, 0, 1], [1, 1, 1, 1]]], expected: [[0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 1]] },
];

const zeroMatrix = (matrix = []) => {
  const row = new Set();
  const col = new Set();

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        row.add(i);
        col.add(j);
      }
    }
  }

  for (let x of row) {
    matrix[x] = matrix[x].map(() => 0);
  }

  for (let y of col) {
    for (let k = 0; k < matrix.length; k++) {
      matrix[k][y] = 0;
    }
  }

  return matrix;
};

runTests(zeroMatrix, tests);
