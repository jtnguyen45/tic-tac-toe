/*----- constants -----*/
const SYMBOL_LOOKUP = {
    "1": "X",
    "-1": "O",
    "null": " ",
};

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
        });
    });
}

function renderMessage() {
    if (winner === "T") {
        messageEl.innerHTML = "TIE GAME!";
        disableBoard();
    } else if (winner) {
        messageEl.innerHTML = `${SYMBOL_LOOKUP[winner]} IS THE WINNER!`;
        disableBoard();
    } else {
        messageEl.innerHTML = `${SYMBOL_LOOKUP[turn]}'S TURN`
    }
}

function disableBoard() {
    document.querySelectorAll("#board > button").disabled = true;
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

    //winner = checkWinner(rowIndex, colIndex);

    turn *= -1;
    render();
}

function checkWinner(rowIndex, colIndex) {
    //TODO: checks horizontal
    //TODO: checks vertical
    //TODO: checks diagonal pos slope
    //TODO: checks diagonal neg slope
    //TODO: checks tie
}