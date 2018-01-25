const runTests = require('../scripts/runTests');
const Node = require('./node');
const { createLL } = require('./lltest');

const tests = [
  { args: [createLL(['a', 'b', 'a', 'd', 'a', 'f'])], expected: createLL(['a', 'b', 'd', 'f']) },
  { args: [createLL(['a', 'b', 'c'])], expected: createLL(['a', 'b', 'c']) },
];

const removeDups = (startNode) => {
  const map = {};
  let current = startNode;
  let prev = startNode;

  while (current !== null) {
    if (!map[current.data]) {
      map[current.data] = true;
      prev = current;
    } else {
      prev.next = current.next;
    }

    current = current.next;
  }

  return startNode;
};

runTests(removeDups, tests);
// runTests(checkOrderOfLL(removeDups), tests);