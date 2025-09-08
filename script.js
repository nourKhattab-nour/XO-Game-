// Get all the elements we need from the HTML page
const gameStatus = document.getElementById("status");
const allCells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("restartButton");

// Set up our game variables
let gameIsRunning = true; // Is the game still going?
let playerTurn = "X"; // Whose turn is it?
let boardState = ["", "", "", "", "", "", "", "", ""]; // Empty board

// Functions to show different messages
function showWinnerMessage() {
  return "Player " + playerTurn + " wins!";
}

function showDrawMessage() {
  return "It's a tie game!";
}

function showCurrentPlayer() {
  return "It's " + playerTurn + "'s turn";
}

// Show the starting message
gameStatus.innerHTML = showCurrentPlayer();

// What happens when a player clicks on a cell
function cellClicked(event) {
  // Find which cell was clicked
  const clickedCell = event.target;

  // Find the number of that cell (0-8)
  const cellNumber = parseInt(clickedCell.getAttribute("data-cell-index"));

  // Check if this cell is already filled or if game ended
  if (boardState[cellNumber] !== "" || gameIsRunning === false) {
    return; // Do nothing if cell is taken or game over
  }

  // Update our game data
  boardState[cellNumber] = playerTurn;

  // Show the player's mark on the board
  clickedCell.innerHTML = playerTurn;

  // Add a class to color the mark (X in red, O in blue)
  if (playerTurn === "X") {
    clickedCell.classList.add("x");
  } else {
    clickedCell.classList.add("o");
  }

  // Check if someone won or if it's a draw
  checkGameOutcome();
}

// Check if someone won or if the game is a draw
function checkGameOutcome() {
  // All the ways to win in Tic Tac Toe
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  let winnerFound = false;

  // Check each winning pattern
  for (let i = 0; i < winPatterns.length; i++) {
    const [pos1, pos2, pos3] = winPatterns[i];

    // Skip if any position in the pattern is empty
    if (
      boardState[pos1] === "" ||
      boardState[pos2] === "" ||
      boardState[pos3] === ""
    ) {
      continue;
    }

    // Check if all three positions have the same mark
    if (
      boardState[pos1] === boardState[pos2] &&
      boardState[pos2] === boardState[pos3]
    ) {
      winnerFound = true;
      break;
    }
  }

  // If someone won
  if (winnerFound) {
    gameStatus.innerHTML = showWinnerMessage();
    gameIsRunning = false; // End the game
    return;
  }

  // Check for a draw (all cells filled, no winner)
  let allCellsFilled = true;
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i] === "") {
      allCellsFilled = false;
      break;
    }
  }

  if (allCellsFilled) {
    gameStatus.innerHTML = showDrawMessage();
    gameIsRunning = false; // End the game
    return;
  }

  // If no winner and not a draw, continue the game
  // Switch to the other player
  if (playerTurn === "X") {
    playerTurn = "O";
  } else {
    playerTurn = "X";
  }

  // Update the message to show whose turn it is
  gameStatus.innerHTML = showCurrentPlayer();
}

// Function to reset the game when the button is clicked
function resetGame() {
  // Reset all game variables
  gameIsRunning = true;
  playerTurn = "X";
  boardState = ["", "", "", "", "", "", "", "", ""];

  // Update the message
  gameStatus.innerHTML = showCurrentPlayer();

  // Clear all cells on the board
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].innerHTML = "";
    allCells[i].classList.remove("x");
    allCells[i].classList.remove("o");
  }
}

// Set up the event listeners
// When any cell is clicked, run the cellClicked function
for (let i = 0; i < allCells.length; i++) {
  allCells[i].addEventListener("click", cellClicked);
}

// When the reset button is clicked, run the resetGame function
resetButton.addEventListener("click", resetGame);
