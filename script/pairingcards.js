const $pairingcardWrapper = document.querySelector('#pairingcard__wrapper');

// card number shuffling
const total = 20;
const numbers = Array(10).fill().map((element, index) => index + 1);

let numbersCopy = numbers.concat(numbers);  // 2 pair cards(1 ~ 10): 새로운 배열로 생성.
let shuffled = [];
let clickable;

// Fisher-Yates Shuffle
function cardShuffle() {
  for (let i = 0; numbersCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * numbersCopy.length);
    shuffled = shuffled.concat(numbersCopy.splice(randomIndex, 1));
  }
}

// adding cards to HTML
function createCard(i) {
  const card = document.createElement('div');
  card.className = 'pairing__card';
  
  const cardInner = document.createElement('div');
  cardInner.className = 'pairing__card--inner';
  
  const cardFront = document.createElement('div');
  cardFront.className = 'pairing__card--front';

  const cardBack = document.createElement('div');
  cardBack.className = 'pairing__card--back';
  cardBack.textContent = shuffled[i];

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card;
}

function onClickCard() {
  
}

function startGame() {
  clickable = false;

  // cards 생성하기
  cardShuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    // card click
    card.addEventListener('click', onClickCard);
    $pairingcardWrapper.appendChild(card);
  }

  // cards 순서대로 앞면 보여주기
  document.querySelectorAll('.pairing__card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  // cards 모두 뒷면 보여주기
  setTimeout(() => {
    document.querySelectorAll('.pairing__card').forEach((card) => {
      card.classList.remove('flipped');
    });
  }, 5000);

  let startTime = new Date();
}

startGame();