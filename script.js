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

function game() {
  let score = 0;

  for (let i = 1; i <= 5; ++i) {
    // Get player's choice and finish the game in case of cancelation
    const playerSelection = getPlayerChoice(i);
    if (playerSelection === null) {
      console.log("You exited the game");
      return;
    }

    // Play the round and print the message describing the round
    const computerSelection = getComputerChoice();
    const result = playRound(playerSelection, computerSelection);
    console.log(getRoundMessage(result, playerSelection, computerSelection));

    // Update the score
    switch (result) {
      case "Win":
        score += 1.0;
        break;
      case "Draw":
        score += 0.5;
    }
  }

  // Print the final result
  alert(getGameResult(score));
}

game();
