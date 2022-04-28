// create player factory
const playerFactory = (name, sign) => {
    playerName = name;
    playerSign = sign;
    return {
        playerName,
        playerSign,
    }
}
// create a module that contains the gameboard which is stored in an array
const gameBoard = (() => {
    let gameBoardArray = ['', '', '', '', '', '', '', '', '']
    return {
        gameBoardArray,
    };
})();

// create render module that displays game board
const render = (() => {
    const display = () => {
        const board = document.querySelector('.board')
        for ( i=0; i<gameBoard.gameBoardArray.length; i++ ) {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.textContent = gameBoard.gameBoardArray[i]
            board.appendChild(cell);
        }
    }
    return {
        display,
    }
})();
render.display();
// build the functions that allow players to add marks
// to a specific spot on the board
const game = (() => {
    const cells = document.querySelectorAll('.cell')
    const addListeners = () => {
        for (i=0; i<cells.length; i++){
            let currentCell = cells[i]
            cells[i].addEventListener('click', () =>{
                currentCell.textContent = 'x'
            })
        }
    }
    return {
        addListeners,
        cells,
    }
})();
game.addListeners();
