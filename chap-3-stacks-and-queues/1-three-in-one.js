const runTests = require('../scripts/runTests');

const tests = [
  {
    args: [
      [
        { type: 'push', stack: 0, value: 1 },
        { type: 'push', stack: 1, value: 1 },
        { type: 'push', stack: 2, value: 1 },
        { type: 'push', stack: 2, value: 2 },
        { type: 'push', stack: 1, value: 2 },
        { type: 'push', stack: 2, value: 3 },
        { type: 'peek', stack: 0 }, // 1
        { type: 'peek', stack: 1 }, // 2
        { type: 'pop', stack: 0 }, // 1
        { type: 'isEmpty', stack: 0 }, // true
        { type: 'isEmpty', stack: 2 }, // false
        { type: 'pop', stack: 1 }, // 2
        { type: 'pop', stack: 1 }, // 1
        { type: 'pop', stack: 2 }, // 3
        { type: 'pop', stack: 2 }, // 2
        { type: 'pop', stack: 2 }, // 1
      ],
    ],
    expected: [1, 2, 1, true, false, 2, 1, 3, 2, 1],
  },
];

class ArrayStacks {
  constructor (numStacks = 3) {
    this.array = [];

    for (let i = 0; i < numStacks; i++) {
      this.array.push([]);
    }
  }

  pop (stack) {
    return this.array[stack].pop();
  }

  push (stack, data) {
    this.array[stack].push(data);
  }

  peek (stack) {
    return this.array[stack][this.array[stack].length - 1];
  }

  isEmpty (stack) {
    return this.array[stack].length === 0;
  }
}

const threeInOne = (actions = []) => {
  const stacks = new ArrayStacks();
  const actual = [];

  for (let action of actions) {
    if (action.type === 'push') {
      stacks.push(action.stack, action.value);
    } else if (action.type === 'isEmpty') {
      actual.push(stacks.isEmpty(action.stack));
    } else {
      actual.push(stacks[action.type](action.stack));
    }
  }

  return actual;
};

runTests(threeInOne, tests);
