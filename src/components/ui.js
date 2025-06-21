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
        let cells = board.querySelectorAll(".cell");
        for(let i = 0; i < gameboard.missedAttacks.length; i++){
            let [x, y] = gameboard.missedAttacks[i];
            cells[y * 10 + x].classList.add("missed");
        }
        for(let i = 0; i < gameboard.hitAttacks.length; i++){
            let [x, y] = gameboard.hitAttacks[i];
            cells[y * 10 + x].classList.add("hit");
        }

        let nameComponent = document.createElement("h2");
        nameComponent.textContent = name;

        boardContainer.appendChild(board);
        boardContainer.appendChild(nameComponent)

        document.querySelector(".boards").appendChild(boardContainer);
    }

    createCell(){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        return cell
    }
}

export {Renderer}