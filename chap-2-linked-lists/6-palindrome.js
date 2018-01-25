const runTests = require('../scripts/runTests');
const { createLL } = require('./lltest');
const Node = require('./node');

const tests = [
  { args: [createLL(['a', 'b', 'c', 'b', 'a'])], expected: true },
  { args: [createLL(['a', 'b', 'c', 'a', 'a'])], expected: false },
  { args: [createLL(['a', 'b', 'c', 'c', 'b', 'a'])], expected: true },
  { args: [createLL(['a', 'b', 'c', 'c', 'a', 'a'])], expected: false },
  { args: [createLL(['a'])], expected: true },
];

const palindrome = (startNode) => {
  let fast = startNode;
  let slow = startNode;
  let revFirstHalf = new Node(startNode.data);

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    const newNode = new Node(slow.data);
    newNode.next = revFirstHalf;
    revFirstHalf = newNode;
  }

  revFirstHalf = revFirstHalf.next;

  // odd entries so remove middle
  if (fast && !fast.next) {
    slow = slow.next;
  }
  
  while (slow) {
    if (slow.data !== revFirstHalf.data) {
      return false;
    }
    slow = slow.next;
    revFirstHalf = revFirstHalf.next;
  }

  return true;
};

runTests(palindrome, tests);
