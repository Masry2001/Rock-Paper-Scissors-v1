const Moves = {
  Rock: 1,
  Paper: 2,
  Scissors: 3
};


let Score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Looses: 0,
  Draws: 0
}

function pickPcMove() {
  const rand = Math.ceil(Math.random() * 3);

  for (let move in Moves) {
    if (Moves[move] === rand) return move;
  }
}

function playGame(playerMove) {
  const pcMove = pickPcMove();
  let result = '';

  if (playerMove === pcMove) {
    result = "It's a draw!";
    Score.Draws++;
  }
  else if (
    (playerMove === 'Rock' && pcMove === 'Scissors') ||
    (playerMove === 'Paper' && pcMove === 'Rock') ||
    (playerMove === 'Scissors' && pcMove === 'Paper')
  ) {
    result = "You win!";
    Score.Wins++;
  } else {
    result = "PC wins!";
    Score.Looses++;
  }
  localStorage.setItem('score', JSON.stringify(Score));

  document.querySelector('.js-result').innerText =
    `${result}`;


  document.querySelector('.js-moves').innerHTML =
    `You 
        <img class="move-icon" title="${playerMove}" src="images/${playerMove.toLowerCase()}-emoji.png">
        <img class="move-icon" title="${pcMove}" src="images/${pcMove.toLowerCase()}-emoji.png"> Computer `;

  updateScore();
}

function ResetGame() {
  Score.Wins = 0;
  Score.Looses = 0;
  Score.Draws = 0;
  localStorage.removeItem('score');

  document.querySelector('.js-result').innerText =
    `Scores Are Reset`;

  updateScore();

  document.querySelector('.js-moves').innerHTML = '';


}


function updateScore() {
  document.querySelector('.js-score').innerText =
    `Wins: ${Score.Wins}, Looses: ${Score.Looses}, Draws: ${Score.Draws}`;
}
