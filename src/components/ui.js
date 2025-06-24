class Renderer{
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

    renderBoards(user, computer){
        let userBoard = this.createBoard(user.name, user.gameboard);
        userBoard.classList.add("user");
        this.showShips(user.gameboard, userBoard);
        let computerBoard = this.createBoard(computer.name, computer.gameboard);
        computerBoard.classList.add("computer");

        let transparentOverlay = document.createElement("div");
        transparentOverlay.classList.add("transparent-overlay");

        computerBoard.appendChild(transparentOverlay);

        this.addUserAttackEventListeners(user, computer, computerBoard);
        let boards = document.querySelector(".boards");
        boards.innerHTML = "";
        boards.appendChild(userBoard);
        boards.appendChild(computerBoard);
    }

    addUserAttackEventListeners(user, computer, computerBoardDiv){
        let cell = computerBoardDiv.querySelectorAll(".cell");
        let statusText = document.querySelector("body > span");
        for(let i = 0; i < cell.length; i++){
            if(!cell[i].classList.contains("missed") && !cell[i].classList.contains("hit")){
                cell[i].addEventListener("click", () => {
                    let attack = [i % 10, Math.floor(i / 10)]
                    let result = user.attack(computer.gameboard, attack);
                    this.renderText(user, result);
                    this.renderBoards(user, computer);
                    let overlay = document.querySelector(".transparent-overlay");
                    overlay.style.display = "block";

                    if (computer.gameboard.isGameOver()) {
                    setTimeout(() => {
                        this.renderWinDialog(user.name);
                        statusText.textContent = user.name + " wins!";
                    }, 1500);
                    return;
                    }

                    setTimeout(() => {
                    let result = computer.attack(user.gameboard);
                    this.renderBoards(user, computer);
                    this.renderText(computer, result)

                    if (user.gameboard.isGameOver()) {
                        setTimeout(() => {
                            this.renderWinDialog(computer.name);
                            statusText.textContent = computer.name + " wins!";
                        }, 1500);
                    }
                }, 1500); // wait 1.5s before computer move
            }, { once: true });
                }
            }
        }

    renderText(player, result){
        let statusText = document.querySelector("body > span");
        if(result.hit){
            console.log(result)
            if(result.ship.isSunk()){
                statusText.textContent = player.name + " has sunk the " + result.ship.name + "!";
            }else{
                statusText.textContent = player.name + " has hit a boat!";
            }
        }else{
            statusText.textContent = player.name + " has missed!";
        }
    }

    renderWinDialog(name){
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

        let closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.classList.add("close");

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons");
        buttonsDiv.appendChild(playAgainButton);
        buttonsDiv.appendChild(closeButton)

        dialog.appendChild(nameHeading)
        dialog.appendChild(buttonsDiv);

        dialog.show();

        closeButton.addEventListener("click", () => {
            dialog.close();
            dialog.style.display = "none";
            overlay.style.display = "none";
            //there needs to be logic for disabling user inputs and displaying a play again button down below
        })

        playAgainButton.addEventListener("click", () => {
            dialog.close();
            dialog.style.display = "none";
            overlay.style.display = "none";
            //there needs to be a play again function used here
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