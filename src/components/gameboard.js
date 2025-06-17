import { Ship } from "./ship";

class Gameboard{
    constructor(){
        this.ships = [];
        this.hitAttacks = [];
        this.missedAttacks = [];
    }

    placeShip(name, position){
        this.ships.push(new Ship(name, position))
    }

    recieveAttack(position){
        for(let i = 0; i < this.ships.length; i++){
            if(this.ships[i].contains(position)){
                this.ships[i].hit();
                this.hitAttacks.push(position);
                return;
            }
        }
        this.missedAttacks.push(position);
    }

    isGameOver(){
        for(let i = 0; i < this.ships.length; i++){
            if(!this.ships[i].isSunk()){
                return false;
            }
        }
        return true;
    }

    isAttacked(position){
        for(let i = 0; i < this.missedAttacks.length; i++){
            if(position[0] == this.missedAttacks[i][0] && position[1] == this.missedAttacks[i][1]) return true;
        }
        for(let i = 0; i < this.hitAttacks.length; i++){
            if(position[0] == this.hitAttacks[i][0] && position[1] == this.hitAttacks[i][1]) return true;
        }
        return false;
    }
}

export { Gameboard };