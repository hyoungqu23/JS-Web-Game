const $WAMTimer = document.querySelector('#WAM-timer');
const $WAMScore = document.querySelector('#WAM-score');
const $WAMGame = document.querySelector('#WAM-game');
const $WAMStart = document.querySelector('#WAM-start');
const $$WAMCells = document.querySelectorAll('.WAM-cell');

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let WAMStarted = false;
let WAMScore = 0;

$WAMStart.addEventListener('click', () => {
  if (WAMStarted) return; // 한 번만 사용하는 버튼의 경우, flag 변수로 처리하면 된다.
  WAMStarted = true;
  console.log('시작');
  tick();
})

function tick() {
  holes.forEach((hole, index) => {
    const $gopher = $$WAMCells[index].querySelector('.WAM-gopher');
    holes[index] = setTimeout(() => {
      $gopher.classList.add('hidden');
      holes[index] = 0;
    }, 1000);
    $gopher.classList.remove('hidden');
  })
}