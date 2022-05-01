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
    let playerOne
    let playerTwo
    let currentPlayer
    const currentPlayerDiv = document.querySelector('.currentPlayer')
    const cells = document.querySelectorAll('.cell')
    const cellsArray = Array.from(cells)
    let filledSquares = 0;
    const addListeners = () => {
        for (i=0; i<cells.length; i++){
            let currentCell = cellsArray[i]

            cells[i].addEventListener('click', () => {
                if (currentCell.textContent != '') {
                    return;
                } else if (game.currentPlayer.playerSign === 'X') {
                    currentCell.textContent = 'X'
                    gameBoard.gameBoardArray[cellsArray.indexOf(currentCell)] = 'X'
                    game.currentPlayer = game.playerTwo
                    filledSquares++
                    game.checkWin()
                } else {
                    currentCell.textContent = 'O'
                    gameBoard.gameBoardArray[cellsArray.indexOf(currentCell)] = 'O'
                    game.currentPlayer = game.playerOne
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
            if(gameBoard.gameBoardArray[winConditionSelector[0]] === 'X' && gameBoard.gameBoardArray[winConditionSelector[1]] === 'X' && gameBoard.gameBoardArray[winConditionSelector[2]] === 'X' || gameBoard.gameBoardArray[winConditionSelector[0]] === 'O' && gameBoard.gameBoardArray[winConditionSelector[1]] === 'O' && gameBoard.gameBoardArray[winConditionSelector[2]] === 'O'){
                console.log('Game Over')
                for ( i=0; i<cells.length; i++ ) {
                    cells[i].classList.remove('active')
                }
            } 
        }
        if (filledSquares === 9){
            console.log('Tie')
            for ( i=0; i<cells.length; i++ ) {
                cells[i].classList.remove('active')
            }
        }
    }
    const startGame = document.getElementById('startGame')
    startGame.addEventListener('click', () => {
        const formData = document.getElementById('playerNames')
        const requiredFields = document.getElementById('required')
        for ( i=0; i<formData.length-1; i++ ) {
            if (formData[i].value === '') {
                requiredFields.textContent = '*Please fill out the fields'
                return
            }
        }
        for ( i=0; i<cells.length; i++) {
            let currentCell = cellsArray[i]
            cellsArray[i].textContent = ''
            gameBoard.gameBoardArray[cellsArray.indexOf(currentCell)] = ''
        }
        const playerOneName = formData[0].value
        const playerTwoName = formData[1].value
        game.playerOne = playerFactory(playerOneName, 'X')
        game.playerTwo = playerFactory(playerTwoName, 'O')
        game.currentPlayer = game.playerOne
        const playerOneDiv = document.querySelector('.playerOneName')
        const playerTwoDiv = document.querySelector('.playerTwoName')
        playerOneDiv.textContent = `Playing as X: ${game.playerOne.playerName}`
        playerTwoDiv.textContent = `Playing as O: ${game.playerTwo.playerName}`
        console.log(game.playerOne)
        console.log(game.playerTwo)
        requiredFields.textContent = ''
        currentPlayerDiv.textContent = `${game.currentPlayer.playerName}'s turn`
        for ( i=0; i<cells.length; i++ ) {
            cells[i].classList.add('active')
        }
    })
    addListeners()
    return {
        cells,
        cellsArray,
        currentPlayer,
        playerOne,
        playerTwo,
        checkWin,
        winConditions,
        currentPlayerDiv,
    }
})();