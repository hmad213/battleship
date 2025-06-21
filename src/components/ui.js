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
        nameComponent.textContent = name;

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
        let boards = document.querySelector(".boards");
        boards.appendChild(userBoard);
        boards.appendChild(computerBoard);
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