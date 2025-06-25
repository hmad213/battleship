import { createPlayers } from "..";

const sizes = [
            ["Patrol Boat", 2],
            ["Submarine", 3],
            ["Destroyer", 3],
            ["Battleship", 4],
            ["Carrier", 5]
        ]
let cur = 0;

class Renderer{
    showStartMenu(){
        let menu = document.querySelector(".menu");

        let form = document.createElement("form");

        let label = document.createElement("label");
        label.textContent = "Enter your name:";

        let input = document.createElement("input");
        input.type = "text";

        let button = document.createElement("button");
        button.textContent = "Play";

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(button);

        menu.appendChild(form)
        
        document.querySelector("body").inse

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let players = createPlayers(input.value);
            menu.remove()
            this.startGame(...players);
        })
    }

    startGame(user, computer){
        cur = 0;
        this.renderBoards(user, computer, false);
        this.addUserShips(user, computer);
    }

    restartGame(user, computer){
        user.gameboard.clear();
        computer.gameboard.clear();
        computer.generateShips();
        this.startGame(user, computer);
    }

    createBoard(name, gameboard){
        let boardContainer = document.createElement("div");
        boardContainer.classList.add("board-container");

        let board = document.createElement("div");
        board.classList.add("board");
        for(let i = 0; i < 10; i++){
            let row = document.createElement("div");
            row.classList.add("row");
            for(let j = 0; j < 10; j++){
                row.appendChild(this.createCell());
            }
            board.appendChild(row);
        }

        this.showAttacks(gameboard, board);

        let nameComponent = document.createElement("h2");
        nameComponent.textContent = name + "'s board";

        boardContainer.appendChild(board);
        boardContainer.appendChild(nameComponent)

        return boardContainer;
    }

    renderBoards(user, computer, hasStarted){
        let userBoard = this.createBoard(user.name, user.gameboard);
        userBoard.classList.add("user");
        let computerBoard = this.createBoard(computer.name, computer.gameboard);
        computerBoard.classList.add("computer");

        let transparentOverlay = document.createElement("div");
        transparentOverlay.classList.add("transparent-overlay");

        computerBoard.appendChild(transparentOverlay);

        let boards = document.querySelector(".boards");
        boards.innerHTML = "";
        boards.appendChild(userBoard);
        boards.appendChild(computerBoard);
        if(hasStarted){
            this.addUserAttackEventListeners(user, computer, document.querySelector(".computer > .board"));
            this.showShips(user.gameboard, userBoard);
        }
    }

    addUserShips(user, computer){
        let userBoard = document.querySelector(".user > .board");
        let vertical = false;

        let coordinates = [];

        document.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === "r") {
                vertical = !vertical;
            }
        });

        let cells = userBoard.querySelectorAll(".cell");
        this.renderText("Place your " + sizes[cur][0] + "! (Press R to rotate)");
        for(let i = 0; i < cells.length; i++){
            cells[i].addEventListener("mouseover", () => {
                this.renderText("Place your " + sizes[cur][0] + "! (Press R to rotate)");

                for(let j = 0; j < coordinates.length; j++){
                    cells[coordinates[j][1] * 10 + coordinates[j][0]].classList.remove("preview");
                }
                coordinates = [];

                for(let j = 0; j < sizes[cur][1]; j++){
                    if(vertical){
                        let [x, y] = [i % 10, Math.floor(i / 10) + j]
                        if(user.gameboard.isOccupied([x, y]) || y > 9) return;
                        coordinates.push([x, y])
                    }else{
                        let [x, y] = [i % 10 + j, Math.floor(i / 10)]
                        if(user.gameboard.isOccupied([x, y]) || x > 9) return;
                        coordinates.push([x, y])
                    }
                }
                for(let j = 0; j < coordinates.length; j++){
                    cells[coordinates[j][1] * 10 + coordinates[j][0]].classList.add("preview");
                }
            })
            cells[i].addEventListener("click", () => {
                let coordinates = [];
                for(let j = 0; j < sizes[cur][1]; j++){
                    if(vertical){
                        let [x, y] = [i % 10, Math.floor(i / 10) + j]
                        if(user.gameboard.isOccupied([x, y]) || y > 9) return;
                        coordinates.push([x, y])
                    }else{
                        let [x, y] = [i % 10 + j, Math.floor(i / 10)]
                        if(user.gameboard.isOccupied([x, y]) || x > 9) return;
                        coordinates.push([x, y])
                    }
                }
                user.addShip(sizes[cur][0], coordinates);
                this.showShips(user.gameboard, userBoard);
                cur++;
                if(cur == 5){
                    this.renderText("Welcome to Battleship!");
                    this.renderBoards(user, computer, true);
                }
            })
        }
    }


    addUserAttackEventListeners(user, computer, computerBoardDiv){
        let cell = computerBoardDiv.querySelectorAll(".cell");
        for(let i = 0; i < cell.length; i++){
            if(!cell[i].classList.contains("missed") && !cell[i].classList.contains("hit")){
                cell[i].addEventListener("click", () => {
                    let attack = [i % 10, Math.floor(i / 10)]
                    let result = user.attack(computer.gameboard, attack);

                    let message;
                    if(result.hit){
                        if(result.ship.isSunk()){
                            message = user.name + " has sunk the " + result.ship.name + "!";
                        }else{
                            message = user.name + " has hit a boat!";
                        }
                    }else{
                        message = user.name + " has missed!";
                    }

                    this.renderText(message);

                    this.renderBoards(user, computer, true);
                    let overlay = document.querySelector(".transparent-overlay");
                    overlay.style.display = "block";

                    if (computer.gameboard.isGameOver()) {
                    setTimeout(() => {
                        this.renderWinDialog(user, computer, user.name);
                        this.renderText(user.name + " wins!");
                    }, 0);
                    return;
                    }

                    setTimeout(() => {
                    let result = computer.attack(user.gameboard);
                    this.renderBoards(user, computer, true);
                    let message;
                    if(result.hit){
                        console.log(result)
                        if(result.ship.isSunk()){
                            message = computer.name + " has sunk the " + result.ship.name + "!";
                        }else{
                            message = computer.name + " has hit a boat!";
                        }
                    }else{
                        message = computer.name + " has missed!";
                    }
                    this.renderText(message);

                    if (user.gameboard.isGameOver()) {
                        setTimeout(() => {
                            this.renderWinDialog(user, computer, computer.name);
                            this.renderText(computer.name + " wins!");
                        }, 0);
                    }
                }, 0); // wait 1.5s before computer move
            }, { once: true });
                }
            }
        }

    renderText(message){
        let statusText = document.querySelector("body > span");
        statusText.textContent = message;
    }

    renderWinDialog(user, computer, name){
        let overlay = document.querySelector(".overlay");
        overlay.style.display = "block";
        let dialog = document.querySelector("dialog");
        dialog.innerHTML = "";
        dialog.style.display = "flex";

        let nameHeading = document.createElement("h1");
        nameHeading.textContent = name + " wins!";

        let playAgainButton = document.createElement("button");
        playAgainButton.textContent = "Play again";
        playAgainButton.classList.add("play-again");


        dialog.appendChild(nameHeading)
        dialog.appendChild(playAgainButton);

        dialog.show();

        playAgainButton.addEventListener("click", () => {
            dialog.close();
            dialog.style.display = "none";
            overlay.style.display = "none";
            //there needs to be a play again function used here
            this.restartGame(user, computer);
        })
    }

    showShips(gameboard, boardDiv){
        let cells = boardDiv.querySelectorAll(".cell");
        for(let i = 0; i < gameboard.ships.length; i++){
            for(let j = 0; j < gameboard.ships[i].position.length; j++){
                let [x, y] = gameboard.ships[i].position[j];
                if(!cells[y * 10 + x].classList.contains("hit") && !cells[y * 10 + x].classList.contains("missed")){
                    cells[y * 10 + x].classList.add("ship");
                }
            }
        }
    }

    showAttacks(gameboard, boardDiv){
        let cells = boardDiv.querySelectorAll(".cell");
        for(let i = 0; i < gameboard.missedAttacks.length; i++){
            let [x, y] = gameboard.missedAttacks[i];
            cells[y * 10 + x].classList.add("missed");
        }
        for(let i = 0; i < gameboard.hitAttacks.length; i++){
            let [x, y] = gameboard.hitAttacks[i];
            cells[y * 10 + x].classList.add("hit");
        }
    }

    createCell(){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        return cell
    }
}

export {Renderer}