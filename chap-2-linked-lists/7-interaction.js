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
const f = new Node('f');
const g = new Node('g');
f.next = g;
g.next = c;
const h = new Node('h');
const j = new Node('j');
const k = new Node('k');
h.next = j;
j.next = k;

const tests = [
  { args: [a, f], expected: c },
  { args: [a, h], expected: false },
  { args: [], expected: false },
];

const findLastNode = (startNode) => {
  let current = startNode;
  let count = 1;
  while (current && current.next) {
    current = current.next;
    count++;
  }
  return { count, tail: current };
};

const moveForward = (startNode, diff) => {
  let current = startNode;
  for (let i = 0; i < diff; i++) {
    current = current.next;
  }
  return current;
}

const interaction = (one, two) => {
  const oneParsed = findLastNode(one);
  const twoParsed = findLastNode(two);
  if (!one || !two || oneParsed.tail !== twoParsed.tail) {
    return false;
  }

  let oneCurrent = moveForward(one, one - two);
  let twoCurrent = moveForward(two, two - one);

  while (oneCurrent !== twoCurrent) {
    oneCurrent = oneCurrent.next;
    twoCurrent = twoCurrent.next;
  }

  return oneCurrent;
};

runTests(interaction, tests);
