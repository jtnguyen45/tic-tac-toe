/*----- constants -----*/
const SYMBOL_LOOKUP = {
    "1": "X",
    "-1": "O",
    "null": " ",
};

const COLOR_LOOKUP = {
    "1": "--x-color",
    "-1": "--y-color",
}

/*----- state variables -----*/
let board;
let winner;
let turn;

/*----- cached elements  -----*/
const messageEl = document.querySelector("h1");
const resetBtn = document.querySelector("#resetBtn");
const boardEls = Array.from(document.querySelectorAll("#board > button"));

/*----- event listeners -----*/
resetBtn.addEventListener("click", init);
document.getElementById("board").addEventListener("click", handlePlacement);

/*----- functions -----*/
init();

function init() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    winner = null;
    turn = 1;
    resetBtn.innerHTML = "RESET GAME";

    render();
}

function render() {
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard() {
    board.forEach(function(colArray, rowIndex) {
        colArray.forEach(function(cellValue, colIndex) {
            const cellId = `c${colIndex}r${rowIndex}`;
            const cellElement = document.getElementById(cellId);

            cellElement.innerHTML = `${SYMBOL_LOOKUP[cellValue]}`
            cellElement.style.color = `var(${COLOR_LOOKUP[cellValue]})`;
        });
    });
}

function renderMessage() {
    if (winner === "T") {
        messageEl.innerHTML = "TIE GAME!";
    } else if (winner) {
        messageEl.innerHTML = `<span style="color:var(${COLOR_LOOKUP[winner]})">${SYMBOL_LOOKUP[winner]}</span> IS THE WINNER!`;
    } else {
        messageEl.innerHTML = `<span style="color: var(${COLOR_LOOKUP[turn]})">${SYMBOL_LOOKUP[turn]}</span>'S TURN`
    }
}

function renderControls() {
    if (winner) resetBtn.innerHTML = "PLAY AGAIN";
}

function handlePlacement(evt) {
    const button = evt.target;
    const cellId = button.id;
    
    const rowIndex = parseInt(cellId.charAt(3));
    const colIndex = parseInt(cellId.charAt(1));

    if (board[rowIndex][colIndex] !== null || winner) return;
    board[rowIndex][colIndex] = turn;

    winner = checkWinner(rowIndex, colIndex);

    turn *= -1;
    render();
}

function checkWinner(rowIndex, colIndex) {
    return checkHorizontalWin(rowIndex, colIndex) 
        || checkVerticalWin(rowIndex, colIndex)
        || checkNeSwWin(rowIndex, colIndex)
        || checkNwSeWin(rowIndex, colIndex)
        || checkTie();
}

function checkHorizontalWin(rowIndex, colIndex) {
    const adjCountLeft = checkAdjacent(rowIndex, colIndex, 0, -1);
    const adjCountRight = checkAdjacent(rowIndex, colIndex, 0, 1);
    return adjCountLeft + adjCountRight >= 2 ? board[rowIndex][colIndex] : null;
}

function checkVerticalWin(rowIndex, colIndex) {
    const adjCountUp = checkAdjacent(rowIndex, colIndex, -1, 0);
    const adjCountDown = checkAdjacent(rowIndex, colIndex, 1, 0);
    return adjCountUp + adjCountDown >= 2 ? board[rowIndex][colIndex] : null;
}

function checkNeSwWin(rowIndex, colIndex) {
    const adjCountNE = checkAdjacent(rowIndex, colIndex, -1, 1);
    const adjCountSW = checkAdjacent(rowIndex, colIndex, 1, -1);
    return adjCountNE + adjCountSW >= 2 ? board[rowIndex][colIndex] : null;
}

function checkNwSeWin(rowIndex, colIndex) {
    const adjCountNW = checkAdjacent(rowIndex, colIndex, -1, -1);
    const adjCountSE = checkAdjacent(rowIndex, colIndex, 1, 1);
    return adjCountNW + adjCountSE >= 2 ? board[rowIndex][colIndex] : null;
}

function checkTie() {
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            if (board[row][col] === null) return null;
        }
    }
    return "T";
}

function checkAdjacent(rowIndex, colIndex, rowOffset, colOffset) {
    let count = 0;
    const playerValue = board[rowIndex][colIndex];

    rowIndex += rowOffset;
    colIndex += colOffset;
    while (rowIndex >= 0 && rowIndex < 3 &&
           colIndex >= 0 && colIndex < 3 &&
           board[rowIndex][colIndex] === playerValue) {
        count++;
        rowIndex += rowOffset;
        colIndex += colOffset;
    }
    return count;
}