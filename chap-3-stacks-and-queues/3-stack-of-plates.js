const runTests = require('../scripts/runTests');

const tests = [
  {
    args: [
      [
        { type: 'push', value: 1 },
        { type: 'push', value: 2 },
        { type: 'push', value: 3 },
        { type: 'push', value: 4 },
        { type: 'check' }, // 3/1
        { type: 'pop' }, // 4
        { type: 'check' }, // 3/0
        { type: 'pop' }, // 3
        { type: 'check' }, // 2
        { type: 'pop' }, // 2
        { type: 'check' }, // 1
        { type: 'push', value: 5 },
        { type: 'check' }, // 2
        { type: 'pop' }, // 5
        { type: 'pop' }, // 1
        { type: 'check' }, // 0
      ],
    ],
    expected: [[3, 1], 4, [3, 0], 3, [2], 2, [1], [2], 5, 1, [0]]
  },
];

class SetOfStacks {
  constructor (max = 3) {
    this.max = max;
    this.stacks = [];
  }

  pop () {
    if (this.stacks.length === 0) {
      return null;
    } else if (this.stacks[this.stacks.length - 1].length > 0) {
      return this.stacks[this.stacks.length - 1].pop();
    } else {
      this.stacks.pop();
      return this.stacks[this.stacks.length - 1].pop();
    }
  }

  popAt (stackIndex) {
    if (this.stacks[stackIndex]) {
      return this.stacks[stackIndex].pop();
    } else {
      return null;
    }
  }

  push (data) {
    if (this.stacks.length === 0 || this.stacks[this._pushStackIndex()].length === this.max) {
      this.stacks.push([data]);
    } else {
      this.stacks[this._pushStackIndex()].push(data);
    }
  }

  _pushStackIndex () {
    return this.stacks.length - 1;
    /* with popAt
    return this.stacks.findIndex((stack) => stack.length < this.max);
    */
  }
}

const stackOfPlates = (actions = []) => {
  const stack = new SetOfStacks();
  const actual = [];

  for (let action of actions) {
    if (action.type === 'push') {
      stack.push(action.value);
    } else if (action.type === 'pop') {
      actual.push(stack.pop());
    } else if (action.type === 'check') {
      actual.push(stack.stacks.map((st) => st.length));
    }
  }

  return actual;
};

runTests(stackOfPlates, tests);
