class Ship {
  constructor(name, position) {
    this.name = name;
    this.position = position;
    this.timesHit = 0;
  }

  hit() {
    this.timesHit++;
  }

  isSunk() {
    return this.timesHit >= this.position.length;
  }

  contains(position) {
    for (let i = 0; i < this.position.length; i++) {
      if (
        position[0] == this.position[i][0] &&
        position[1] == this.position[i][1]
      ) {
        return true;
      }
    }
    return false;
  }
}

export { Ship };
