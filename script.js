'use strict';

//let score1 = (document.getElementById('score--0').textContent = 0); //I use this shortcut to make the first value of score1 & score 2 to be 0
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentEl1 = document.getElementById('current--0');
const currentEl2 = document.getElementById('current--1');
let scoreEl1 = document.getElementById('score--0');
let scoreEl2 = document.getElementById('score--1');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const rollDiceBtn = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');

let scoresArray, currentScore, activePlayer, gameOn; //declare empty variables that will be re-assigned and used in the initilization fuction that we call at the beggining og the game and when the New Game button is pressed

//create init re-usable function for beginning of game and when New Game button is clicked
const init = function () {
  scoresArray = [0, 0]; //We will use this to hold total scores for player 1 and 2
  currentScore = 0;
  activePlayer = 0;
  gameOn = true;
  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;
  currentEl1.textContent = 0;
  currentEl2.textContent = 0;
  //Hide dice
  dice.classList.add('hidden');
  //Remove the active winner so to no one
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active'); //Remove active player status from player 2 since player 1 (0) should be the number 1 player on game restart, just in case
};

init(); // call the init at start of game

//Switch player re-usable function:
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; //Set the current score back to 0 when switched
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Toggle the player active class to determine which side has what color
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//Rolling the dice

rollDiceBtn.addEventListener('click', function () {
  if (gameOn) {
    const aDiceRoll = Math.floor(Math.random() * 6 + 1);
    dice.classList.remove('hidden'); //Remove hidden class from dice
    dice.setAttribute('src', `dice-${aDiceRoll}.png`); //Change the dice image depending on the dice roll result. we can do dice.src=`dice-${aDiceRoll}.png`

    if (aDiceRoll !== 1) {
      currentScore += aDiceRoll; //Increasing currentscore by dice rolled value
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//Holding the current score

holdBtn.addEventListener('click', function () {
  if (gameOn) {
    //1. Add current score to the score of the active player taking note of array positioning
    scoresArray[activePlayer] += currentScore;
    //Feed the above into the interface for score
    document.getElementById(`score--${activePlayer}`).textContent =
      scoresArray[activePlayer];

    //2. Check if score is up to 100.

    //Finish the game if score is up to 100
    if (scoresArray[activePlayer] >= 100) {
      //Add winner css class to the active player element
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //Remove active player class from the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      gameOn = false;
      dice.classList.add('hidden');
    } else {
      //If not, switch to the next payers
      switchPlayer();
    }
  }
});

//Reset game button

newGameBtn.addEventListener('click', init); //Javascript will call the init function when the button is clicked. NB that there is not need for us to call the function, we only pass it in as a value and when the button is clicked, the function gets called

//What was tried

/*
//Original values of current scores at beginning of game

let currentScore1 = 0;
let currentScore2 = 0;

//Grab the current scores elements by ids
let currentScore1El = document.getElementById('current--0');
let currentScore2El = document.getElementById('current--1');

//Original values of total scores when HOLD is clicked at beginning of game
let totalScores1 = 0;
let totalScores2 = 0;

//Grab the total scores elements by ids
let totalScoreEl1 = document.getElementById('score--0');
let totalScoreEl2 = document.getElementById('score--1');

totalScoreEl1.innerText = 0;
totalScoreEl2.innerText = 0;

//Grab dice and set it to hidden so that at the beginning of game no dice is seen
const dice = document.querySelector('.dice');
dice.classList.add('hidden');

//Grab the 'Roll Dice' and "Hold" buttons
const rollDiceButton = document.querySelector('.btn--roll');
const holdScoreButton = document.querySelector('.btn--hold');

//Set default active player

let activePlayer = 1;

rollDiceButton.addEventListener('click', function () {
  const diceRoll = Math.floor(Math.random() * 6 + 1);
  dice.classList.remove('hidden');
  dice.src = `dice-${diceRoll}.png`;
  if (activePlayer === 1 && diceRoll !== 1) {
    currentScore1 += diceRoll;
    currentScore1El.textContent = currentScore1;
  } else if (diceRoll === 1) {
    activePlayer = 2;
    currentScore1 = 0;
    currentScore1El.textContent = currentScore1;
  }

  if (activePlayer === 2) {
    currentScore2El.textContent = 0;
    currentScore2 += diceRoll;
    currentScore2El.textContent = currentScore2;
    if (diceRoll === 1) {
      activePlayer = 1;
    }
  }
});

holdScoreButton.addEventListener('click', function () {
  if (activePlayer === 1) {
    totalScoreEl1.textContent =
      Number(totalScoreEl1.textContent) + currentScore1; //Increase the value of totalScore1el by itself plus currentScore1
    currentScore1 = 0;
    currentScore1El.textContent = 0;
  } else if (activePlayer === 2) {
    totalScoreEl2.textContent =
      Number(totalScoreEl2.textContent) + currentScore2; //Increase the value of totalScore2El by itself plus currentScore1
    currentScore2 = 0;
    currentScore2El.textContent = 0;
  }

  //   if (currentScore1 !== 0) {
  //     totalScore1El.textContent = document.getElementById('current--0').value; }
});

*/
