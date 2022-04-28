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
    const addListeners = () => {
        for (i=0; i<cells.length; i++){
            let currentCell = cells[i]
            cells[i].addEventListener('click', () => {
                if (currentCell.textContent != ''){
                    return;
                } else if (currentPlayer.playerSign === 'x') {
                    currentCell.textContent = 'x'
                    currentPlayer = playerTwo
                } else {
                    currentCell.textContent = 'o'
                    currentPlayer = playerOne
                }
            })
        }
    }
    addListeners();
    return {
        cells,
        currentPlayer,
    }
})();
