const ROUNDS = 5;

function getComputerChoice() {
  // Computer choice is random
  const choice = Math.floor(Math.random() * 3);
  const moves = ["Rock", "Paper", "Scissors"];

  return moves[choice];
}

function getPlayerChoice(roundNumber) {
  // Ask the player for their choice until they enter the valid one
  let keepAsking = true;
  let playerSelection;

  while (keepAsking) {
    playerSelection = prompt(`Round #${roundNumber}. Your choice:`);

    // Report that user canceled the prompt
    if (playerSelection === null) {
      return null;
    }

    // Validate and normalize the player's choice to "Rock", "Paper", "Scissors"
    if (playerSelection === "") {
      continue;
    }

    playerSelection = playerSelection.toLowerCase();
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1);

    keepAsking = playerSelection !== "Rock" && playerSelection !== "Paper" && playerSelection !== "Scissors";
  }

  return playerSelection;
}

function playRound(playerSelection, computerSelection) {
  // Determine the result of the round
  if (playerSelection === computerSelection) {
    return "Draw";
  }

  if (
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Paper" && computerSelection === "Rock") ||
    (playerSelection === "Scissors" && computerSelection === "Paper")
  ) {
    return "Win";
  }

  return "Lose";
}

function getRoundMessage(result, playerSelection, computerSelection) {
  // Build the message, describing the result
  let message;
  switch (result) {
    case "Win":
      message = `You Win! ${playerSelection} beats ${computerSelection}`;
      break;
    case "Draw":
      message = `Draw! ${playerSelection}`;
      break;
    case "Lose":
      message = `You Lose! ${computerSelection} beats ${playerSelection}`;
  }

  return message;
}

function getGameResult(score) {
  const requiredScore = ROUNDS / 2;

  // Get the overall result
  if (score > requiredScore) {
    return "You Win!";
  } else if (score === requiredScore) {
    return "Draw!";
  } else {
    return "You Lose!";
  }
}

let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll(".buttons button");
buttons.forEach(button => button.addEventListener("click", e => {
  // Get player's choice, play the round
  const playerSelection = button.textContent;
  const computerSelection = getComputerChoice();
  const result = playRound(playerSelection, computerSelection);

  // Display round result
  const roundResultElement = document.querySelector(".round-result");
  const message = getRoundMessage(result, playerSelection, computerSelection);
  roundResultElement.textContent = message;

  // Update the score
  const scoreElement = document.querySelector(".score");
  switch (result) {
    case "Win":
      ++playerScore;
      break;
    case "Lose":
      ++computerScore;
      break;
  }
  scoreElement.textContent = playerScore;

  // Check if someone's won and display the game result if so
  if (playerScore === 5 || computerScore === 5) {
    const gameElement = document.querySelector(".game");
    gameElement.style.display = "none";

    const gameResultElement = document.querySelector(".game-result");
    if (playerScore === 5) {
      gameResultElement.textContent = "You Win!";
      gameResultElement.style.color = "green";
    } else if (computerScore === 5) {
      gameResultElement.textContent = "You Lose!";
      gameResultElement.style.color = "red";
    }
  }
}));
