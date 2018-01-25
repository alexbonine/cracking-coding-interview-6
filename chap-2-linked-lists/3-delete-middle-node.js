const runTests = require('../scripts/runTests');
const { createLL } = require('./lltest');
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
  { args: [c, a], expected: createLL(['a', 'b', 'd', 'e']) },
  { args: [c, a], expected: createLL(['a', 'b', 'e']) },
  { args: [c, a], expected: false },
];

const deleteMiddleNode = (nodeToDelete, startNodeForTesting) => {
  if (!nodeToDelete || !nodeToDelete.next) {
    return false;
  }

  const next = nodeToDelete.next;
  nodeToDelete.data = next.data;
  nodeToDelete.next = next.next;

  return startNodeForTesting;
};

runTests(deleteMiddleNode, tests);
