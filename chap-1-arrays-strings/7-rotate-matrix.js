const runTests = require('../scripts/runTests');

const tests = [
  { args: [[[1, 2], [3, 4]]], expected: [[3, 1],[4, 2]] },
  { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
  { args: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]], expected: [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]] },
];

const rotateMatrix = (matrix = []) => {
  let endCol = matrix.length - 1;
  const array = [];
  for (const row of matrix) {
    array.push([]);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      array[j][endCol] = matrix[i][j];
    }
    endCol--;
  }
  return array;
};

const rotateMatrixInPlace = (matrix = []) => {
  let endCol = matrix.length - 1;

  for (let layer = 0; layer < Math.floor(matrix.length / 2); layer++) {
    let first = layer;
    let last = matrix.length - 1 - layer;

    for (let i = first; i < last; i++) {
      const offset = i - first;
      const top = matrix[first][i]; // save top
      console.log(top, matrix[last - offset][first], matrix[last][last - offset], matrix[i][last])

      matrix[first][i] = matrix[last - offset][first]; // left -> top
      matrix[last - offset][first] = matrix[last][last - offset]; // bottom -> left
      matrix[last][last - offset] = matrix[i][last]; // right -> bottom
      matrix[i][last] = top; // saved top -> right
    }
  }
  return matrix;
};

runTests(rotateMatrix, tests);
