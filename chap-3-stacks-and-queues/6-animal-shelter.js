const runTests = require('../scripts/runTests');

const tests = [
  {
    args: [
      [
        { type: 'enqueue', value: ['Alfie', true] },
        { type: 'enqueue', value: ['Billy', false] },
        { type: 'enqueue', value: ['Ceres', false] },
        { type: 'enqueue', value: ['Daisy', true] },
        { type: 'dequeueCat' }, // Billy
        { type: 'dequeueAny' }, // Alfie
        { type: 'dequeueDog' }, // Daisy
        { type: 'enqueue', value: ['Eddie', true] },
        { type: 'dequeueCat' }, // Ceres
        { type: 'dequeueCat' }, // null
        { type: 'dequeueDog' }, // Eddie
        { type: 'dequeueDog' }, // null
      ],
    ],
    expected: ['Billy', 'Alfie', 'Daisy', 'Ceres', null, 'Eddie', null],
  },
];

class AnimalShelter {
  constructor () {
    this.animals = [];
  }

  enqueue (name, isDog) {
    this.animals.push({ name, isDog });
  }

  dequeueAny () {
    if (this.animals.length) {
      return this.animals.shift().name;
    } else {
      return null;
    }
  }

  _findAnimal (isDog) {
    const index = this.animals.findIndex((animal) => animal.isDog === isDog);

    if (index > -1) {
      const adopted = this.animals[index];
      this.animals.splice(index, 1);
      return adopted.name;
    } else {
      return null;
    }
  }

  dequeueDog () {
    return this._findAnimal(true);
  }

  dequeueCat () {
    return this._findAnimal(false);
  }
}

const animalShelter = (actions = []) => {
  const shelter = new AnimalShelter();
  const actual = [];

  for (let action of actions) {
    if (action.type === 'enqueue') {
      shelter.enqueue(...action.value);
    } else {
      actual.push(shelter[action.type]());
    }
  }

  return actual;
};

runTests(animalShelter, tests);
