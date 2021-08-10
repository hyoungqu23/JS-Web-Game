const $pairingcardWrapper = document.querySelector('#pairingcard__wrapper');

// card number shuffling
const total = 20;
const numbers = Array(10).fill().map((element, index) => index + 1);

let numbersCopy = numbers.concat(numbers);  // 2 pair cards(1 ~ 10): 새로운 배열로 생성.
let shuffled = [];
let isClickable = false;

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

let clicked = [];
let correctCards = [];

function onClickCard() {
  if (!isClickable || correctCards.includes(this) || clicked[0] === this) {
    return;
  }
  this.classList.toggle('flipped'); // addEventListener 내부에서 this는 event.target과 동일.
  clicked.push(this);
  // 2장의 card를 뒤집었는가?
  if (clicked.length !== 2) {
    return;
  }

  // 2장의 card가 동일한가?
  const firstCardNumber = clicked[0].querySelector('.pairing__card--back').textContent
  const secondCardNumber = clicked[1].querySelector('.pairing__card--back').textContent
  if (firstCardNumber === secondCardNumber) {
    // correctCards = correctCards.concat(clicked);
    correctCards.push(clicked[0]);
    correctCards.push(clicked[1]);
    clicked[0].removeEventListener('click', onClickCard);
    clicked[1].removeEventListener('click', onClickCard);
    clicked = [];

    // 모두 완료되었는가?
    if (correctCards.length !== total) {
      return
    }
    setTimeout(() => {
      alert('Victory!');
      resetGame();
    }, 1000);
    return;
  } 
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
  }, 1000);
}

function startGame() {
  isClickable = false;

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
    isClickable = true;
  }, 5000);

  let startTime = new Date();
}

startGame();

function resetGame() {
  $pairingcardWrapper.innerHTML = '';
  isClickable = false;
  numbersCopy = numbers.concat(numbers);
  shuffled = [];
  correctCards = [];
  startGame();
}