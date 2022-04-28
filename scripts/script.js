// create a module that contains the gameboard which is stored in an array
const gameBoard = (() => {
    let gameBoardArray = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']
    return {
        gameBoardArray,
    };
})();