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

/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
    board = [
        [1, null, null],
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
    //render player turn, win, tie
}

function renderControls() {
    //
}