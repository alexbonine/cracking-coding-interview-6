const runTests = require('../scripts/runTests');
const { createLL } = require('./lltest');
const Node = require('./node');

const tests = [
  { args: [createLL([1, 10, 2, 8, 3, 6, 5]), 5], expected: createLL([1, 2, 3, 10, 8, 6, 5]) },
  { args: [createLL([1, 2, 3, 4, 5]), 3], expected: createLL([1, 2, 3, 4, 5]) },
  { args: [createLL([5, 4, 3, 3, 4, 5]), 3], expected: createLL([5, 4, 3, 3, 4, 5]) },
];

const partition = (startNode, partitionValue) => {
  let less = null;
  let lessStart = null;
  let more = null;
  let moreStart = null;
  let current = startNode;

  while (current) {
    const newNode = new Node(current.data);

    if (current.data < partitionValue && !less) {
      less = newNode;
      lessStart = newNode;
    } else if (current.data < partitionValue) {
      less.next = newNode;
      less = less.next;
    } else if (!more) {
      more = newNode;
      moreStart = newNode;
    } else {
      more.next = newNode;
      more = more.next;
    }

    current = current.next;
  }

  if (less) {
    less.next = moreStart;
  } else {
    lessStart = moreStart;
  }

  return lessStart;
};

runTests(partition, tests);
