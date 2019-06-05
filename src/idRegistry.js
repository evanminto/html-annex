function generateRandomDigits(numDigits) {
  const arr = [];

  for (let i = 0; i < numDigits; i++) {
    arr.push(null);
  }

  return arr.reduce(str => str + Math.floor(Math.random() * 10), '');
}

/**
 * Generates and keeps track of id attribute values to ensure they’re unique.
 */
export class IdRegistry {
  constructor() {
    this.ids = [];
    this.index = 1;
    this.baseId = `pwc_${generateRandomDigits(5)}`;
  }

  generate() {
    const id = `${this.baseId}_${this.index++}`;
    this.ids.push(id);

    return id;
  }
}

export default new IdRegistry();
