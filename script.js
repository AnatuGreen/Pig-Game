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

//NOTE://Javascript for Modal

const modalButton = document.querySelectorAll('.show-modal');
const modalMessage = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');

function closeModalActions() {
  modalMessage.classList.add('hidden');
  overlay.classList.add('hidden'); //add the class hidden
}

function openModalActions() {
  modalMessage.className = 'modal';
  overlay.className = 'overlay';
}

for (let i = 0; i < modalButton.length; i++) {
  modalButton[i].addEventListener('click', function () {
    modalMessage.className = 'modal';
    overlay.className = 'overlay';
  });

  closeModal.addEventListener('click', function () {
    closeModalActions();
  });
  overlay.addEventListener('click', closeModalActions);
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modalMessage.classList.contains('hidden')) {
    closeModalActions();
  }
});
