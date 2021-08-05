const $lottoRaffleBtn = document.querySelector('.raffle__button');
const $lottoResetBtn = document.querySelector('.reset__button');

// 1 ~ 45까지의 숫자 준비하기
const candidate = Array(45).fill().map((element, index) => index + 1);
// for문 & .push를 사용하지 않고, 숫자 배열 작성하기

// Fisher-Yates Shuffle
// 빈 배열(shuffle)에 무작위로 정렬하기(candidate 배열에서 무작위로 선정해 shuffle에 삽입)
const shuffle = [];
while (candidate.length > 0) {  // for (let i = candidate.length; i > 0; i--) { }과 동일
  // 무작위 index 선정
  const randomIndex = Math.floor(Math.random() * candidate.length);

  // splice의 결과값은 앞에서 선정한 index에 해당하는 요소 값으로 이루어진 배열
  const spliceArray = candidate.splice(randomIndex, 1);

  // 해당 splice 결과값 배열의 요소를 value로 할당
  const value = spliceArray[0];

  // value 값을 shuffle Array에 넣기
  shuffle.push(value);
}

console.log(shuffle);

// 선정한 7개 공 정렬하기
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonusBall = shuffle[6];

console.log(winBalls, bonusBall);

// 공 색상 변경하기
function colorize(lottoNumber, $tag) {
  if (lottoNumber < 10) {
    $tag.style.backgroundColor = 'red';
    $tag.style.color = 'white';
  } else if (lottoNumber < 20) {
    $tag.style.backgroundColor = 'orange';
  } else if (lottoNumber < 30) {
    $tag.style.backgroundColor = 'yellow';
  } else if (lottoNumber < 40) {
    $tag.style.backgroundColor = 'blue';
    $tag.style.color = 'white';
  } else {
    $tag.style.backgroundColor = 'green';
    $tag.style.color = 'white';
  }
}

// Timer 설정하기
const $lottoResult = document.querySelector('#lotto__result');
const $lottoBonus = document.querySelector('#lotto__bonus');

const drawLotto = (lottoNumber, $parent) => {
  const $lottoBall = document.createElement('div');
  $lottoBall.className = 'ball';
  colorize(lottoNumber, $lottoBall);
  $lottoBall.textContent = lottoNumber;
  $parent.appendChild($lottoBall);
}

const raffleClick = () => {
  if ($lottoRaffleBtn.classList.contains('active')) {
    for (let i = 0; i < winBalls.length; i++) {
      setTimeout(() => {
        drawLotto(winBalls[i], $lottoResult);
      }, (i + 1) * 1000);
    }
    
    setTimeout(() => {
      drawLotto(bonusBall, $lottoBonus);
    }, 7000);
    $lottoRaffleBtn.classList.remove('active');
  }
};

$lottoRaffleBtn.addEventListener('click', raffleClick);

function removeChild($parent) {
  const $lottoBall = document.querySelector('.ball')
  $parent.removeChild($lottoBall);
};

const resetClick = () => {
  for (let i = 0; i < winBalls.length; i++) {
    setTimeout(() => {
      removeChild($lottoResult);
    }, (i + 1) * 500);
  }
  removeChild($lottoBonus);
};

$lottoResetBtn.addEventListener('click', resetClick);

// btn 클릭 후 재 클릭시 불능
// reset 버튼 생성