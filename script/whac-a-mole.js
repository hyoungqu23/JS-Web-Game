const $WAMTimer = document.querySelector('#WAM-timer');
const $WAMScore = document.querySelector('#WAM-score');
const $WAMGame = document.querySelector('#WAM-game');
const $WAMStart = document.querySelector('#WAM-start');
const $WAMLife = document.querySelector('#WAM-life');
const $$WAMCells = document.querySelectorAll('.WAM-cell');

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let WAMStarted = false;
let WAMScore = 0;
let WAMTime = 60;
let gopherPercent = 0.3;
let bombPercent = 0.5;
let life = 3;
let timerId;
let tickId;

$WAMStart.addEventListener('click', () => {
  if (WAMStarted) return; // 한 번만 사용하는 버튼의 경우, flag 변수로 처리하면 된다.
  WAMStarted = true;
  console.log('시작');
  timerId = setInterval(() => {
    WAMTime = (WAMTime * 10 - 1) / 10;  // 소수점으로 계산하면 문제가 생길 수 있어서 WAMTime -= 0.1 은 잘 사용하지 않는다.
    $WAMTimer.textContent = WAMTime;
    if (WAMTime === 0) {
      setTimeout(() => {
        clearInterval(timerId);
        clearInterval(tickId);
        alert(`게임 오버, 점수는 ${WAMScore}점!`);  // 화면을 그리는 것을 막기 때문에 setTimeout으로 화면이 그려질 시간을 부여해야 한다.
      }, 50)
    };
  }, 100);
  tickId = setInterval(tick, 1000); // 그 후 2초마다(1초로 하면, Call Stack 오류 발생함. 걸리는 시간이 2초인데 1초로 설정하면, add가 된 후 remove 하고, 바로 다시 add 하기 때문)
  tick(); // 바로
})

function tick() {
  holes.forEach((hole, index) => {  // (0, 0)
    if (hole) return;   // 원시값인 hole(참조 관계가 끊김)이기에 setTimeout ID를 대입할 수 없다.
    const randomValue = Math.random();
    if (randomValue < gopherPercent) {
      const $gopher = $$WAMCells[index].querySelector('.WAM-gopher');
      holes[index] = setTimeout(() => { // setTimeout의 ID를 holes 배열의 각 요소에 대입한다.(hole와 달리 참조 관계 유지)
        $gopher.classList.add('hidden');
        // console.log('add', $gopher.classList);
        holes[index] = 0;
      }, 1000);
      $gopher.classList.remove('hidden');   // setTimeout보다 먼저 실행된다.
      // console.log('remove', $gopher.classList);
    } else if (randomValue < bombPercent) {
      const $bomb = $$WAMCells[index].querySelector('.WAM-bomb');
      holes[index] = setTimeout(() => {
        $bomb.classList.add('hidden');
        // console.log('add', $bomb.classList);
        holes[index] = 0;
      }, 1000);
      $bomb.classList.remove('hidden');
      // console.log('remove', $bomb.classList);
    }
  })
};

// 두더지 잡기
$$WAMCells.forEach(($cell, index) => {
  $cell.querySelector('.WAM-gopher').addEventListener('click', (event) => {
    if (!event.target.classList.contains('dead')) { // 하나의 두더지를 다중 click하는 경우 방지
      WAMScore += 1;
      $WAMScore.textContent = WAMScore;
    }
    event.target.classList.add('dead');
    event.target.classList.add('hidden');
    clearTimeout(holes[index]);
    setTimeout(() => {
      event.target.classList.remove('dead');
      holes[index] = 0;
    }, 1000);
  });

  $cell.querySelector('.WAM-bomb').addEventListener('click', (event) => {
    event.target.classList.add('exploded');
    event.target.classList.add('hidden');
    clearTimeout(holes[index]);
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove('exploded');
    }, 1000);
    life--;
    $WAMLife.textContent = life;
    if (life === 0) {
      clearInterval(timerId);
      clearInterval(tickId);
      setTimeout(() => {
        alert(`게임 오버! 점수는 ${WAMScore}점`);
      }, 50);
    }
  });
});
