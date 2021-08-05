// Tag 선택하기
const $RSPComputer = document.querySelector('#RSP__computer');
const $RSPRock = document.querySelector('#RSP__rock');
const $RSPScissors = document.querySelector('#RSP__scissors');
const $RSPPaper = document.querySelector('#RSP__paper');
const $RSPScore = document.querySelector('#RSP__score');
const $RSPResult = document.querySelector('#RSP__result');

// // RSP img 설정하기
const IMG_URL = '../img/rsp_removebg.png';

$RSPComputer.style.background = `url(${IMG_URL}) -220px 0`; // RSP__rock -> background-position: positionX positionY; 
// $RSPComputer.style.background = `url(${IMG_URL}) 0 0`; // RSP__scissors -> background-position: positionX positionY; 
// $RSPComputer.style.background = `url(${IMG_URL}) -440px 0`; // RSP__paper -> background-position: positionX positionY; 
$RSPComputer.style.backgroundSize = 'auto 200px'; // background-size: width height;

// 일정 시간마다 반복 하기

// const rockX = '-220px';
// const scissorsX = '-0';
// const paperX = '-440px';

// positionX라는 공통점이 있으므로, 객체화 가능
const rspX = {
  RSP__rock: '-220px',
  RSP__scissors: '0',
  RSP__paper: '-440px',
};

let computerChoice = 'RSP__rock';

const changeComputerRSP = () => {
  if (computerChoice === 'RSP__rock') {   // rock
    computerChoice = 'RSP__scissors';
  } else if (computerChoice === 'RSP__scissors') {   // scissors
    computerChoice = 'RSP__paper';
  } else if (computerChoice === 'RSP__paper') {   // paper
    computerChoice = 'RSP__rock';
  }
  $RSPComputer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $RSPComputer.style.backgroundSize = 'auto 200px'; // Error 방지를 위해 작성
};

// Timer 멈추기
let intervalId = setInterval(changeComputerRSP, 50);
let clickable = true;

const RSPTable = {
  RSP__rock: 0,
  RSP__scissors: 1,
  RSP__paper: -1,
};

let myScore = 0;
let computerScore = 0;

const clickRSPBtn = () => {
  if (clickable) {
    clearInterval(intervalId);
    clickable = false;
    // 점수 계산 및 화면 표시
    const myChoice = event.target.id; // user가 선택한 RSP
    const myRSP = RSPTable[myChoice];
    const computerRSP = RSPTable[computerChoice];
    const diff = myRSP - computerRSP;

    let message;
    // 2, -1: 승리 조건, 1, -2: 패배 조건, 점수표 참고
    if ([2, -1].includes(diff)) {
      myScore += 3;
      message = 'YOU WIN';
    } else if (diff === 0) {
      myScore += 1;
      computerScore += 1;
      message = 'DRAW';
    } else if ([1, -2].includes(diff)) {
      computerScore += 3;
      message = 'YOU LOSE';
    }

    // $RSPScore.textContent = Number($RSPScore.textContent) + score;
    $RSPScore.textContent = `${message}, ${myScore}점 : ${computerScore}점`;
    
    if (myScore >= 15) {
      $RSPResult.textContent = `Congratulation, YOU WIN!`;  // 게임 종료
    } else if (computerScore >= 15) {
      $RSPResult.textContent = `Continue? YOU LOSE`;  // 게임 종료
    } else {
      setTimeout(() => {
        clickable = true;
        intervalId = setInterval(changeComputerRSP, 50);
      }, 1000);
    }
  }
};

// const clickRSPBtn = () => {
//   clearInterval(intervalId);  // interval 제거(click 즉시)
//   // bug 제거 (2): button의 EventListener를 제거해 click 불능으로 만들기
//   $RSPRock.removeEventListener('click', clickRSPBtn);
//   $RSPScissors.removeEventListener('click', clickRSPBtn);
//   $RSPPaper.removeEventListener('click', clickRSPBtn);
//   // 점수 계산 및 화면 표시


//   setTimeout(() => {  // 다시 interval 시작
//     // bug 제거 (1)
//     clearInterval(intervalId);  // 제거되지 않은 직전 interval이 있는 경우 제거(click 후 1초 후)
//     intervalId = setInterval(changeComputerRSP, 50);  // timer 마다 달라지는 id를 저장해주어야 clear할 수 있다.
//     // bug 제거 (2): 1초 후 button에 EventListener 재설정
//     $RSPRock.addEventListener('click', clickRSPBtn);
//     $RSPScissors.addEventListener('click', clickRSPBtn);
//     $RSPPaper.addEventListener('click', clickRSPBtn);
//   }, 1000);
// };

$RSPRock.addEventListener('click', clickRSPBtn);
$RSPScissors.addEventListener('click', clickRSPBtn);
$RSPPaper.addEventListener('click', clickRSPBtn);

