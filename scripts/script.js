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
    const playerOne = playerFactory('Bob', 'x')
    const playerTwo = playerFactory('Bill', 'o')
    let currentPlayer = playerOne
    const cells = document.querySelectorAll('.cell')
    const cellsArray = Array.from(cells)
    const addListeners = () => {
        for (i=0; i<cells.length; i++){
            let currentCell = cellsArray[i]
            cells[i].addEventListener('click', () => {
                if (currentCell.textContent != ''){
                    return;
                } else if (currentPlayer.playerSign === 'x') {
                    currentCell.textContent = 'x'
                    gameBoard.gameBoardArray[cellsArray.indexOf(currentCell)] = 'x'
                    currentPlayer = playerTwo
                } else {
                    currentCell.textContent = 'o'
                    gameBoard.gameBoardArray[cellsArray.indexOf(currentCell)] = 'o'
                    currentPlayer = playerOne
                }
            })
        }
    }
// define win conditions
    const winConditions = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ]
// create function that checks if game has been won
    const checkWin = () => {

    }

    addListeners()
    return {
        cells,
        cellsArray,
        currentPlayer,
        checkGameEnd,
        winConditions,
    }
})();
