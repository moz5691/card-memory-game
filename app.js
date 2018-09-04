const cards = document.querySelectorAll('.card');
const cardBox = document.querySelector('.card-box');
const cardImg = document.querySelectorAll('.card-img');
const gameStatus = document.getElementById('game-status');
const reloadBtn = document.getElementById('reload-btn');
const timer = document.getElementById('timer');

let isFirstCard = true;
let firstCard, secondCard;
let thatCard;
let score = 0;
let lockCards = false; // lockCards.. won't fire gameMain function.
let totalSeconds = 0;
let timerInterval = null;

// toggle test code
const toggle = function() {
  this.classList.toggle('flip');
  console.log(this.classList);
};

const reload = function() {
  location.reload();
};

const shuffle = function() {
  cards.forEach(element => {
    let random = (Math.random() * 16) << 0;
    element.style.order = random;
  });
};

const timerShow = function() {
  ++totalSeconds;
  timer.innerHTML = totalSeconds + ' sec';
};

const startTimer = function() {
  stopTimer();
  timerInterval = setInterval(timerShow, 1000);
};

const stopTimer = function() {
  clearInterval(timerInterval);
};
//
// future use.  no need for now.
const resetCards = function() {
  [firstCard, secondCard] = [null, null];
  [isFirstCard, lockCards] = [false, false];
};

// if first card, flip the card, wait for the 2nd card.
// if second card, flip the 2nd card and match with 1st card.
// if no match btw 1st and 2nd card,
const gameMain = function() {
  if (lockCards) return;
  if (firstCard === this) return; // Youtube freeCodeCamp.org.. First card is already there.. escape.
  // case for the first card is clicked.
  if (isFirstCard) {
    isFirstCard = false;
    lockCards = false;
    firstCard = this.dataset.name;
    this.classList.toggle('flip');
    firstCard = this;
  } else {
    isFirstCard = true;
    secondCard = this;
    // match betweeen first and second card.
    this.classList.toggle('flip');
    secondCard = this;
    if (firstCard.dataset.name !== secondCard.dataset.name) {
      // case for 2nd card is clicked and no match.
      lockCards = true;
      setTimeout(function() {
        firstCard.classList.toggle('flip');
        secondCard.classList.toggle('flip');
        lockCards = false;
      }, 1000);
    } else {
      firstCard.removeEventListener('click', gameMain);
      secondCard.removeEventListener('click', gameMain);
      score++;
      if (score === 8) {
        gameStatus.textContent = 'You won!';
        stopTimer();
      }
    }
  }
};

shuffle();
startTimer();
cards.forEach(element => element.addEventListener('click', gameMain));
reloadBtn.addEventListener('click', reload);
