/*
 * Create a list that holds all of your cards
 */

const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
let openCards = [];
let moves = 0;
let counter = document.querySelector('.moves');
let seconds = 0;
let timer = document.querySelector('.timer');
let interval;

const stars = document.querySelector('.stars');
const restart = document.querySelector('.restart');
let isGameRunning = false;



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Display the cards on the page
//  *   - shuffle the list of cards using the provided "shuffle" method below

const shuffledCards = shuffle([...cards]);

 // - loop through each card and create its HTML
 // - add each card's HTML to the page

shuffledCards.forEach(card => deck.appendChild(card));

function restartGame() {
  seconds = 0;
  timer.innerHTML = seconds;
  moves = 0;
  counter.innerHTML = moves;
  clearTimeout(interval);
}

function startGame() {
  startTimer();
  // set up the event listener for a card. If a card is clicked:

  cards.forEach(card => {
    card.addEventListener('click', event => {
      const card = event.currentTarget;

      openCard(card);
      addOpenCard(card);
      lockCards();
      unlockCards();
      moveCounter();
      displayMessage();
    });
  });
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



// - display the card's symbol (put this functionality in another function that you call from this one)

function openCard(card) {
  card.classList.add('open');
  card.classList.add('show');
}

//  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

function addOpenCard(card) {
	openCards.push(card);
}

//  - if the list already has another card, check to see if the two cards match
function isMatching() {
  if (openCards.length > 1) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      openCards.forEach(card => {
        card.classList.add('match');
      });
      removeOpenCards();
      return true;
    } else {
      return false;
    }
  }
}

//  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

function lockCards() {
  if (isMatching()) {
    openCards.forEach(card => {
      card.classList.add('match');
    });
  }
}

//  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

function removeOpenCards() {
  openCards = [];
}

function closeCard(card) {
  card.classList.remove('open');
  card.classList.remove('show');
  card.classList.remove('match');
}

function unlockCards() {
  if (openCards.length > 1) {
    if (!isMatching()) {
      setTimeout(() => {
        openCards.forEach(card => {
          closeCard(card);
        });
        removeOpenCards();
      }, 1000);
    }
  }
}

// + increment the move counter and display it on the page (put this functionality in another function that you call from this one)



function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  if (moves % 15 === 0) {
    const remaningStars = [...stars.children];
    remaningStars.pop();

    stars.innerHTML = '';
    remaningStars.forEach(star => stars.appendChild(star));
  }
}

// + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function displayMessage() {
  const notMatchingCards = deck.querySelectorAll('.card:not(.match)');
  if (notMatchingCards.length === 0) {
    alert('Finally!');
  }
}


function startTimer() {
  interval = setInterval(function() {
    seconds++;
    timer.innerHTML = seconds;
  }, 1000);
}

restart.addEventListener('click', () => {
  restartGame();
});


startGame();