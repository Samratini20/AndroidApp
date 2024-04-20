const confettiContainer = document.getElementById('confetti-container');
const board = document.getElementById("board");
const restartButton = document.getElementById("restart-btn");
const message = document.getElementById("message");

const X_CLASS = "x";
const O_CLASS = "o";
let currentPlayer = X_CLASS;
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

function startGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = X_CLASS;
  board.classList.remove(X_CLASS, O_CLASS);
  board.innerHTML = "";
  message.textContent = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.cell = i;
    cell.addEventListener("click", handleClick, { once: true });
    board.appendChild(cell);
  }
}

function handleClick(event) {
  const cell = event.target;
  const cellIndex = cell.dataset.cell;

  if (boardState[cellIndex] !== "" || !gameActive) return;

  placeMark(cell, cellIndex);
  updateBoardState(cellIndex);
  checkResult();
}
function placeMark(cell, cellIndex) {
  cell.classList.add(currentPlayer);
  cell.innerText = currentPlayer.toUpperCase();
}

function updateBoardState(cellIndex) {
  boardState[cellIndex] = currentPlayer;
}

function generateConfetti() {
    board.classList.add('winner');
    gameActive = false;
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random()}s`;
      confettiContainer.appendChild(confetti);
    }
  }

function checkResult() {
  const isWin = winningCombinations.some((combination) => {
    return combination.every((index) => {
      return boardState[index] === currentPlayer;
    });
  });
  if (isWin) {
    message.textContent = `${currentPlayer.toUpperCase()} wins!`;
    generateConfetti();
  } else if (boardState.every((cell) => cell !== "")) {
    message.textContent = "It's a draw!";
    generateConfetti();
  } else {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
  }
}

restartButton.addEventListener("click", startGame);


