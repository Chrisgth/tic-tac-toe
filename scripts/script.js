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
    const playerOne = playerFactory('Bob', 'X')
    const playerTwo = playerFactory('Bill', 'O')
    let currentPlayer = playerOne
    const cells = document.querySelectorAll('.cell')
    const cellsArray = Array.from(cells)
    let filledSquares = 0;
    const addListeners = () => {
        for (i=0; i<cells.length; i++){
            let currentCell = cellsArray[i]

            cells[i].addEventListener('click', () => {
                if (currentCell.textContent != '') {
                    return;
                } else if (currentPlayer.playerSign === 'X') {
                    currentCell.textContent = 'X'
                    gameBoard.gameBoardArray[cellsArray.indexOf(currentCell)] = 'X'
                    currentPlayer = playerTwo
                    filledSquares++
                    game.checkWin()
                } else {
                    currentCell.textContent = 'O'
                    gameBoard.gameBoardArray[cellsArray.indexOf(currentCell)] = 'O'
                    currentPlayer = playerOne
                    filledSquares++
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
            if(gameBoard.gameBoardArray[winConditionSelector[0]] === 'X' && gameBoard.gameBoardArray[winConditionSelector[1]] === 'X' && gameBoard.gameBoardArray[winConditionSelector[2]] === 'X' || gameBoard.gameBoardArray[winConditionSelector[0]] === 'O' && gameBoard.gameBoardArray[winConditionSelector[1]] === 'O' && gameBoard.gameBoardArray[winConditionSelector[2]] === 'O'){
                let gameOver = document.createElement('div')
                let main = document.querySelector('main')
                gameOver.textContent = 'Game over'
                main.appendChild(gameOver)
            } 
        }
        if (filledSquares === 9){
                let gameOver = document.createElement('div')
                let main = document.querySelector('main')
                gameOver.textContent = 'Tie'
                main.appendChild(gameOver)               
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
