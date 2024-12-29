// script.js

let turn = "X"; // Initial turn
let gameOver = false;

// Function to change the turn
const changeTurn = () => (turn === "X" ? "O" : "X");

// Function to check for a win
const checkWin = () => {
  const boxtexts = document.getElementsByClassName("boxtext");
  const winConditions = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  winConditions.forEach((condition) => {
    if (
      boxtexts[condition[0]].innerText === boxtexts[condition[1]].innerText &&
      boxtexts[condition[1]].innerText === boxtexts[condition[2]].innerText &&
      boxtexts[condition[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText = `Winner: ${boxtexts[condition[0]].innerText}`;
      gameOver = true;

      // Show the winning celebration image
      document.querySelector(".imgbox img").style.display = "block";
    }
  });

  // Check for a draw
  if (!gameOver && Array.from(boxtexts).every((box) => box.innerText !== "")) {
    document.querySelector(".info").innerText = "It's a Draw!";
    gameOver = true;
  }
};

// Function for computer's turn
const computerTurn = () => {
  const boxtexts = document.getElementsByClassName("boxtext");
  const emptyBoxes = Array.from(boxtexts).filter((box) => box.innerText === "");

  if (emptyBoxes.length > 0 && !gameOver) {
    // Randomly select an empty box for the computer
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = turn;
    checkWin();
    if (!gameOver) {
      turn = changeTurn();
      document.querySelector(".info").innerText = `Turn for ${turn}`;
    }
  }
};

// Game logic
const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((box) => {
  let boxtext = box.querySelector(".boxtext");
  box.addEventListener("click", () => {
    if (boxtext.innerText === "" && turn === "X" && !gameOver) {
      boxtext.innerText = turn;
      checkWin();
      if (!gameOver) {
        turn = changeTurn();
        document.querySelector(".info").innerText = `Turn for ${turn}`;
        setTimeout(computerTurn, 500); // Delay computer's turn for better UX
      }
    }
  });
});

// Reset button functionality
document.getElementById("reset").addEventListener("click", () => {
  Array.from(boxes).forEach((box) => {
    box.querySelector(".boxtext").innerText = "";
  });
  turn = "X";
  gameOver = false;
  document.querySelector(".info").innerText = "Turn for X";
  document.querySelector(".line").style.display = "none";
  document.querySelector(".imgbox img").style.display = "none";
});
