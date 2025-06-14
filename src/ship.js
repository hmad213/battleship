class Ship{
    constructor(length){
        this.length = (length < 0 ? 0 : length);
        this.timesHit = 0;
    }

    hit(){
        this.timesHit++;
    }

    isSunk(){
        return this.timesHit >= this.length;
    }
}

export { Ship }