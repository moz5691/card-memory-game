const cards = document.querySelectorAll('.card');
const cardBox = document.querySelector('.card-box');
const cardImg = document.querySelectorAll('.card-img');
const gameStatus = document.getElementById('game-status');
const reloadBtn = document.getElementById('reload-btn');

let isFirstCard = true;
let firstCard, secondCard;
let thatCard;
let score = 0;

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

// if first card, flip the card, wait for the 2nd card.
// if second card, flip the 2nd card and match with 1st card.
// if no match btw 1st and 2nd card,
const gameMain = function() {
  if (isFirstCard) {
    isFirstCard = false;
    firstCard = this.dataset.name;
    console.log(this);
    console.log(firstCard);
    this.classList.toggle('flip');
    thatCard = this;
  } else {
    isFirstCard = true;
    secondCard = this.dataset.name;
    console.log(secondCard);
    // match betweeen first and second card.
    this.classList.toggle('flip');
    that = this;
    if (firstCard !== secondCard) {
      setTimeout(function() {
        thatCard.classList.toggle('flip');
      }, 1000);
      setTimeout(function() {
        that.classList.toggle('flip');
      }, 1000);
    } else {
      score++;
      if (score === 8) {
        gameStatus.textContent = 'You won!';
      }
    }
  }
};
shuffle();
cards.forEach(element => element.addEventListener('click', gameMain));
reloadBtn.addEventListener('click', reload);
