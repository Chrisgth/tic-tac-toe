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
                    game.checkWin()
                } else {
                    currentCell.textContent = 'o'
                    gameBoard.gameBoardArray[cellsArray.indexOf(currentCell)] = 'o'
                    currentPlayer = playerOne
                    game.checkWin()
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
// check if the positions defined in the winconditions array all have the same value in the main array
        for ( i=0; i<winConditions.length; i++ ){
            winConditionSelector = winConditions[i]
            console.log(winConditionSelector);
            if(gameBoard.gameBoardArray[winConditionSelector[0]] === 'x' && gameBoard.gameBoardArray[winConditionSelector[1]] === 'x' && gameBoard.gameBoardArray[winConditionSelector[2]] === 'x' || gameBoard.gameBoardArray[winConditionSelector[0]] === 'o' && gameBoard.gameBoardArray[winConditionSelector[1]] === 'o' && gameBoard.gameBoardArray[winConditionSelector[2]] === 'o'){
                let gameOver = document.createElement('div')
                let main = document.querySelector('main')
                gameOver.textContent = 'Game over'
                main.appendChild(gameOver)
            }
        }
    }

    addListeners()
    return {
        cells,
        cellsArray,
        currentPlayer,
        checkWin,
        winConditions,
    }
})();
