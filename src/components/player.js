import { Gameboard } from "./gameboard";

class Player{
    constructor(name){
        this.name = name;
        this.gameboard = new Gameboard;
    }

    addShip(name, position){
        this.gameboard.placeShip(name, position);
    }
}

class User extends Player{
    constructor(name){
        super(name);
    }

    attack(opponentBoard, position){
        if(!opponentBoard.isAttacked(position)){
            opponentBoard.recieveAttack(position);
            return true;
        }
        return false;
    }
}

class Computer extends Player{
    constructor(name){
        super(name);
        this.generateShips();
    }

    generateShips(){
        let sizes = {
            "Patrol Boat": 2,
            "Submarine": 3,
            "Destroyer": 3,
            "Battleship": 4,
            "Carrier": 5
        }

        for (let [key, value] of Object.entries(sizes)){
            let placed = false;
            let position;
            while(!placed){
                position = []
                let isHorizontal = Math.floor(Math.random() * 2);
                let x, y;

                if(isHorizontal === 1){
                    x = Math.floor(Math.random() * (10 - value));
                    y = Math.floor(Math.random() * 10);
                    for(let i = 0; i < value; i++){
                        position.push([x + i, y])
                    }
                }else{
                    y = Math.floor(Math.random() * (10 - value));
                    x = Math.floor(Math.random() * 10);
                    for(let i = 0; i < value; i++){
                        position.push([x, y + i]);
                    }
                }

                let found = false;
                for(let i = 0; i < position.length; i++){
                    if(this.gameboard.isOccupied(position[i])) found = true;
                }

                placed = !found;
            }
            this.addShip(key, position);
        }
    }

    attack(opponentBoard){
        let hasAttacked = false
        while(!hasAttacked){
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            if(!opponentBoard.isAttacked([x, y])){
                opponentBoard.recieveAttack([x, y]);
                hasAttacked = true;
            }
        }
    }
}

export {User, Computer}