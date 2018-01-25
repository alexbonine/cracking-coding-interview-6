const runTests = require('../scripts/runTests');

class Stack {
  constructor () {
    this.stack = [];
  }

  push (data) {
    this.stack.push(data);
  }

  pop (data) {
    return this.stack.pop();
  }

  peek () {
    return this.stack[this.stack.length - 1];
  }

  isEmpty () {
    return this.stack.length == 0;
  }
}

const stackAActual = new Stack();
stackAActual.push(3);
stackAActual.push(1);
stackAActual.push(2);
stackAActual.push(5);
stackAActual.push(4);

const stackAExpected = new Stack();
stackAExpected.push(1);
stackAExpected.push(2);
stackAExpected.push(3);
stackAExpected.push(4);
stackAExpected.push(5);

const tests = [
  { args: [stackAActual], expected: stackAExpected },
];

const sortStack = (stack) => {
  const localStack = new Stack();

  while (!stack.isEmpty()) {
    const next = stack.pop();

    if (localStack.isEmpty() || next >= localStack.peek()) {
      localStack.push(next);
    } else {
      while (next <= localStack.peek()) {
        stack.push(localStack.pop());
      }
      localStack.push(next);
    }
  }

  return localStack;
};

runTests(sortStack, tests);
