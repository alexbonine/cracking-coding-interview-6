const cloneDeep = require('clone-deep');
const Node = require('./node');

const checkOrderOfLL = (func) => {
  return (startNode, expected = []) => {
    const checkStartNode = cloneDeep(startNode);

    func(cloneDeep(startNode));

    try {
      let current = checkStartNode;
      for (let i = 0; i < expected.length; i++) {
        if (current.data !== expected[i].data) {
          return false;
        } else {
          current = current.next;
        }
      }

      return true;
    } catch (e) {
      return false;
    }
  }
};

const createLL = (data = []) => {
  if (data.length === 0) {
    return null;
  }

  const startNode = new Node(data[0]);
  let current = startNode;

  for (let i = 1; i < data.length; i++) {
    current.next = new Node(data[i]);
    current = current.next;
  }
  
  return startNode;
}

module.exports = {
  checkOrderOfLL,
  createLL,
};
