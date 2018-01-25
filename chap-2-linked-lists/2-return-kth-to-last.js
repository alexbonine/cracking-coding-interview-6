const runTests = require('../scripts/runTests');
const Node = require('./node');

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
a.next = b;
b.next = c;
c.next = d;
d.next = e;

const tests = [
  { args: [3, a], expected: c },
  { args: [1, a], expected: e },
  { args: [8, a], expected: null },
];

const returnKthToLast = (k, startNode) => {
  let fast = startNode;
  let slow = startNode;

  for (let i = 0; i < k; i++) {
    if (fast.next) {
      fast = fast.next;
    } else {
      return null;
    }
  }

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
};

runTests(returnKthToLast, tests);
