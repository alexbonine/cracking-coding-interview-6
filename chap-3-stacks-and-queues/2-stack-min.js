const runTests = require('../scripts/runTests');

const tests = [
  {
    args: [
      [
        { type: 'push', value: 1 }, // 1 1
        { type: 'push', value: 2 }, // 1-2 1
        { type: 'push', value: 3 }, // 1-2-3 1
        { type: 'push', value: -1 }, // 1-2-3--1 -1
        { type: 'check' }, // -1
        { type: 'pop' }, // -1
        { type: 'check' }, // 1
        { type: 'pop' }, // 3
        { type: 'check' }, // 1
        { type: 'pop' }, // 2
        { type: 'check' }, // 1
        { type: 'push', value: 4 }, // 1-4
        { type: 'check' }, // 1
        { type: 'pop' }, // 4
        { type: 'pop' }, // 1
        { type: 'check' }, // null
      ],
    ],
    expected: [-1, -1, 1, 3, 1, 2, 1, 1, 4, 1, null]
  },
];

class Node {
  constructor (data, min) {
    this.data = data;
    this.next = null;
    this.minBelow = min;
  }
}

class Stack {
  constructor () {
    this.head = null;
    this.currentMin = null;
  }

  pop () {
    if (this.head === null) {
      return null;
    }

    const node = this.head;
    this.head = this.head.next;

    if (node.data === this.currentMin) {
      this.currentMin = node.minBelow;
    } else if (this.head === null) {
      this.currentMin = null;
    }

    return node.data;
  }

  push (data) {
    const newNode = new Node(data, this.currentMin);
    
    if (!this.head) {
      this.head = newNode;
      this.currentMin = data;
    } else {
      newNode.next = this.head;
      this.head = newNode;

      if (data < this.currentMin) {
        this.currentMin = data;
      }
    }
  }

  min () {
    return this.currentMin;
  }
}

const stackMin = (actions = []) => {
  const stack = new Stack();
  const actual = [];

  for (let action of actions) {
    if (action.type === 'push') {
      stack.push(action.value);
    } else if (action.type === 'pop') {
      actual.push(stack.pop());
    } else if (action.type === 'check') {
      actual.push(stack.min());
    }
  }

  return actual;
};

runTests(stackMin, tests);
