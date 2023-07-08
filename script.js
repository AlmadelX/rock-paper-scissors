function getComputerChoice() {
  // Computer choice is random
  const choice = Math.floor(Math.random() * 3);
  const moves = ["Rock", "Paper", "Scissors"];

  return moves[choice];
}

function normalizePlayerChoice(playerSelection) {
  // Normalize the player's choice to "Rock", "Paper", "Scissors"
  playerSelection = playerSelection.toLowerCase();
  playerSelection = playerSelection[0].toUpperCase() + playerSelection.substr(1);

  return playerSelection;
}

function getRoundResult(playerSelection, computerSelection) {
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

function playRound(playerSelection, computerSelection) {
  playerSelection = normalizePlayerChoice(playerSelection);
  const result = getRoundResult(playerSelection, computerSelection);

  // Build the message, describing the result and return it
  let message;
  if (result === "Win") {
    message = `You Win! ${playerSelection} beats ${computerSelection}`;
  } else if (result === "Draw") {
    message = `Draw! ${playerSelection}`;
  } else {
    message = `You Lose! ${computerSelection} beats ${playerSelection}`;
  }

  return message;
}

const playerSelection = "rock";
const computerSelection = getComputerChoice();
console.log(playRound(playerSelection, computerSelection));
