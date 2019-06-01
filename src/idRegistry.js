class IdRegistry {
  constructor() {
    this.ids = [];
    this.index = 1;

    const baseNumber = '' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
    this.baseId = `pwc_${baseNumber}`;
  }

  generate() {
    const id = `${this.baseId}_${this.index++}`;
    this.ids.push(id);

    return id;
  }
}

export default new IdRegistry();
