"use strict";

const cells = document.querySelectorAll(".cell");
const message = document.querySelector("#message");
const reset = document.querySelector("#reset");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let possibilities = ["", "", "", "", "", "", "", "", ""];
let activePlayer = "X";
let running = false;

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClick));
  message.textContent = `${activePlayer}'s turn`;
  reset.addEventListener("click", resetGame);
  running = true;
}

function cellClick() {
  const cellIndex = this.getAttribute("cellIndex");
  if (possibilities[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  possibilities[index] = activePlayer;
  cell.textContent = activePlayer;
}

function changePlayer() {
  activePlayer = activePlayer == "X" ? "0" : "X";
  message.textContent = `${activePlayer}'s turn`;
}

function checkWinner() {
  let winner = false;

  for (let i = 0; i < winConditions.length; i++) {
    const conditions = winConditions[i];
    const cellA = possibilities[conditions[0]];
    const cellB = possibilities[conditions[1]];
    const cellC = possibilities[conditions[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      winner = true;
      break;
    }
  }

  if (winner) {
    message.textContent = `${activePlayer} wins`;
    running = false;
  } else if (!possibilities.includes("")) {
    message.textContent = `Game Draw`;
    running = false;
  } else {
    changePlayer();
  }
}

function resetGame() {
  activePlayer = "X";
  possibilities = ["", "", "", "", "", "", "", "", ""];
  message.textContent = `${activePlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}

initializeGame();
