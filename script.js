function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3);
  const moves = ["Rock", "Paper", "Scissors"];

  return moves[choice];
}

console.log(getComputerChoice());
