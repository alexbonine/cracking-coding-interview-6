const runTests = require('../scripts/runTests');

const tests = [
  {
    args: [
      [
        { type: 'add', value: 1 },
        { type: 'add', value: 2 },
        { type: 'add', value: 3 },
        { type: 'add', value: 4 },
        { type: 'remove' }, // 4
        { type: 'remove' }, // 3
        { type: 'remove' }, // 2
        { type: 'add', value: 5 },
        { type: 'remove' }, // 5
        { type: 'remove' }, // 1
        { type: 'remove' }, // null
      ],
    ],
    expected: [1, 2, 3, 4, 5, null],
  },
];

class MyQueue {
  constructor () {
    this.master = [];
    this.slave = [];
  }

  add (data) {
    while (this.master.length > 0) {
      this.slave.push(this.master.pop())
    }

    this.master.push(data);

    while (this.slave.length > 0) {
      this.master.push(this.slave.pop())
    }
  }

  remove () {
    return this.master.pop();
  }
}

const queueViaStacks = (actions = []) => {
  const queue = new MyQueue();
  const actual = [];

  for (let action of actions) {
    if (action.type === 'add') {
      queue.add(action.value);
    } else if (action.type === 'remove') {
      actual.push(queue.remove());
    }
  }

  return actual;
};

runTests(queueViaStacks, tests);
