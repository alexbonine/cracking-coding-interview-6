const runTests = require('../scripts/runTests');
const { createLL } = require('./lltest');
const Node = require('./node');

const tests = [
  { args: [createLL([7, 1, 6]), createLL([5, 9, 2])], expected: createLL([2, 1, 9]) },
  { args: [createLL([0]), createLL([0])], expected: createLL([0]) },
];

const sum = (one) => {
  let total = '';
  let current = one;

  while (current) {
    total = `${current.data}` + total; // total += `${current.data}`
    current = current.next;
  }
  return parseInt(total, 10) || 0;
};

const sumLists = (one, two) => {
  let total = sum(one) + sum(two);

  if (total === 0) {
    return new Node(0);
  }

  let startNode = null;
  let current = null;

  while (total > 0) {
    const digit = total % 10;  // use string and slice off first char
    total = Math.floor(total / 10);
    const newNode = new Node(digit);
    
    if (startNode) {
      current.next = newNode;
      current = current.next;
    } else {
      startNode = newNode;
      current = newNode;
    }
  }

  return startNode;
};

runTests(sumLists, tests);
