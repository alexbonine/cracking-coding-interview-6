const runTests = require('../scripts/runTests');
const { createLL } = require('./lltest');
const Node = require('./node');

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');
const g = new Node('g');
const h = new Node('h');
const i = new Node('i');
const j = new Node('j');
const k = new Node('k');
a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;
f.next = g;
g.next = h;
h.next = i;
i.next = j;
j.next = d;

const tests = [
  { args: [createLL(['a', 'b', 'c', 'd'])], expected: null },
  // { args: [a], expected: d },
];

const loopDetection = (startNode) => {
  let fast = startNode;
  let slow = startNode;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      break;
    }
  }

  if (!fast || !fast.next) {
    return null;
  }

  slow = startNode;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};

runTests(loopDetection, tests);
console.log('Get around circular reference', loopDetection(a) === d);
