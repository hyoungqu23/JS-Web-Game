const $mineSweeperForm = document.querySelector('#minesweeper__form');
const $mineSweeperTimer = document.querySelector('#minesweeper__timer');
const $mineSweeperTbody = document.querySelector('#minesweeper__table tbody');
const $mineSweeperResult = document.querySelector('#minesweeper__result');

let row   // 줄
let cell  // 칸
let mine  // 지뢰 개수
const CODE = {
  Opened: 0,      // 0 이상이면 열린 칸(주변 지뢰 개수를 표현)
  // 지뢰 없음
  Normal: -1,     // 닫힌 칸(지뢰 없음)
  Question: -2,
  Flag: -3,
  // 지뢰 있음 -> 마우스 우클릭 이벤트 시, 구분하기 위함
  Question_Mine: -4,
  Flag_Mine: -5,
  Mine: -6,
}
let data;
let openCount;

const dev = false;

// 게임 시간 타이머
let mineSweeperStartTime;
let interval

// row, cell, mine 개수 입력 받기
$mineSweeperForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  row = parseInt(event.target.minesweeper__row.value);
  cell = parseInt(event.target.minesweeper__cell.value);
  mine = parseInt(event.target.minesweeper__mine.value);
  openCount = 0;
  $mineSweeperTbody.innerHTML = '';
  clearInterval(interval);
  drawTable();
  mineSweeperStartTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - mineSweeperStartTime) / 1000);
    $mineSweeperTimer.textContent = `${time}초`;
  }, 1000);
}

// 무작위로 칸을 선택하여, 지뢰 칸으로 설정하기(DATA 설정)
function plantMine() {
  // 빈 배열에 0 ~ (row X cell)까지를 넣은 배열 생성하기
  const candidate = Array(row * cell).fill().map((arr, i) => i);

  // 무작위로 10가지 칸 선정하기
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  };

  // 2차원 배열 만들기
  const data = [];
  for (let i = 0; i < row; i++) {
    // 줄 만들기
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      // 칸 만들고 기본 값으로 '닫힌 칸' 설정하기
      rowData.push(CODE.Normal);
    }
  }

  // 지뢰 넣기
  for (let k = 0; k < shuffle.length; k++) {
    const verticalMinePosition = Math.floor(shuffle[k] / cell); // a번째 줄(몫)
    const horizontalMinePosition = shuffle[k] % cell; // b번째 칸(나머지)
    data[verticalMinePosition][horizontalMinePosition] = CODE.Mine; // 10a + b가 (a, b)에 삽입됨
  }
  
  return data;
}

function onRightClick(event) {
  event.preventDefault();
  const target = event.target;  // event.target: <td>
  const rowIndex = target.parentNode.rowIndex;  // target.parentNode: <tr>
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];
  
  if (cellData >= 0) { return; } // 열린 칸

  if (cellData === CODE.Mine) { // 지뢰가 있는 닫힌 칸
    data[rowIndex][cellIndex] = CODE.Question_Mine;
    target.className = "question";
    target.textContent = "?";
  } else if (cellData === CODE.Question_Mine) { // 칸에 물음표 표시가 있는가?
    data[rowIndex][cellIndex] = CODE.Flag_Mine;
    target.className = "flag";
    target.textContent = "!";
  } else if (cellData === CODE.Flag_Mine) { // 칸에 깃발 표시가 있는가?
    data[rowIndex][cellIndex] = CODE.Mine;
    target.className = "";
    dev && (target.textContent = "X");
  } else if (cellData === CODE.Normal) {  // 지뢰가 없는 닫힌 칸
    data[rowIndex][cellIndex] = CODE.Question;
    target.className = "question";
    target.textContent = "?";
  } else if (cellData === CODE.Question) { // 칸에 물음표 표시가 있는가?
    data[rowIndex][cellIndex] = CODE.Flag;
    target.className = "flag";
    target.textContent = "!";
  }  else if (cellData === CODE.Flag) { // 칸에 깃발 표시가 있는가?
    data[rowIndex][cellIndex] = CODE.Normal;
    target.className = "";
    target.textContent = "";
  }
}

function countMine(rowIndex, cellIndex) {
  const mines = [CODE.Mine, CODE.Question_Mine, CODE.Flag_Mine];
  let i = 0;
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
  mines.includes(data[rowIndex][cellIndex - 1]) && i++;
  mines.includes(data[rowIndex][cellIndex]) && i++;
  mines.includes(data[rowIndex][cellIndex + 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
  return i;
}

// 해당 칸을 여는 함수
function open(rowIndex, cellIndex) {
  if (data[rowIndex]?.[cellIndex] >= CODE.Opened) returnS; // 한 번 연 칸은 다시 열지 않음(OC로 rowIndex가 존재하지 않는 경우를 보호)

  const target = $mineSweeperTbody.children[rowIndex]?.children[cellIndex]; // (OC로 rowIndex가 존재하지 않는 경우를 보호)
  if (!target) { return; }  // 칸 이외의 경계선, 외부 click 방지

  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || '';
  target.className = 'opened';
  data[rowIndex][cellIndex] = count;

  openCount++;
  console.log(openCount);
  
  // 승리 확인하기
  if (openCount === row * cell - mine) {
    const time = (new Date() - mineSweeperStartTime) / 1000;
    clearInterval(interval);
    $mineSweeperTbody.removeEventListener('contextmenu', onRightClick);
    $mineSweeperTbody.removeEventListener('click', onLeftClick);
    setTimeout(() => {
      alert(`승리! ${time}초가 걸렸습니다.`);
    }, 500);
  }

  return count;
}

// 해당 칸의 값이 0인지 확인하는 함수
function isNormal(cell) {
  return cell === CODE.Normal;
}

// 해당 칸을 열고, 인접 칸이 비어있으면 여는 함수(재귀)
function openAround(rowIndex, cellIndex) {
  const count = open(rowIndex, cellIndex);
  if (count === 0) {
    isNormal(data[rowIndex - 1]?.[cellIndex -1]) && openAround(rowIndex - 1, cellIndex - 1);
    isNormal(data[rowIndex - 1]?.[cellIndex]) && openAround(rowIndex - 1, cellIndex);
    isNormal(data[rowIndex - 1]?.[cellIndex + 1]) && openAround(rowIndex - 1, cellIndex + 1);
    isNormal(data[rowIndex][cellIndex - 1]) && openAround(rowIndex, cellIndex - 1);
    isNormal(data[rowIndex][cellIndex + 1]) && openAround(rowIndex, cellIndex + 1);
    isNormal(data[rowIndex + 1]?.[cellIndex -1]) && openAround(rowIndex + 1, cellIndex - 1);
    isNormal(data[rowIndex + 1]?.[cellIndex]) && openAround(rowIndex + 1, cellIndex);
    isNormal(data[rowIndex + 1]?.[cellIndex + 1]) && openAround(rowIndex + 1, cellIndex + 1);
  }
}

// 첫 click이 지뢰인 경우 방지하기
let normalCellFound = false;
let searched;
let firstClick = true;

function transferMine(rowIndex, cellIndex) {
  if (normalCellFound) return;    // 이미 빈 칸인 경우 종료
  if (rowIndex < 0 || rowIndex >= row || cellIndex < 0 || cellIndex >= cell) return;  // OC를 대신하여 undefined 이면 종료
  if (searched[rowIndex][cellIndex]) return;    // 이미 찾은 칸인 경우 종료

  if (isNormal(data[rowIndex]?.[cellIndex])) {  // 빈 칸인 경우
    normalCellFound = true;
    data[rowIndex][cellIndex] = CODE.Mine;
  } else {
    searched[rowIndex][cellIndex] = true;
    transferMine(rowIndex - 1, cellIndex - 1);
    transferMine(rowIndex - 1, cellIndex);
    transferMine(rowIndex - 1, cellIndex + 1);
    transferMine(rowIndex, cellIndex - 1);
    transferMine(rowIndex, cellIndex + 1);
    transferMine(rowIndex + 1, cellIndex - 1);
    transferMine(rowIndex + 1, cellIndex);
    transferMine(rowIndex + 1, cellIndex + 1);
  }
}

function showMines() {
  const mines = [CODE.Mine, CODE.Question_Mine, CODE.Flag_Mine];
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (mines.includes(cell)) {
        $mineSweeperTbody.children[rowIndex].children[cellIndex].textContent = 'X';
      }
    })
  })
}

function onLeftClick(event) {
  const target = event.target;  // event.target: <td>
  const rowIndex = target.parentNode.rowIndex;  // target.parentNode: <tr>
  const cellIndex = target.cellIndex;
  let cellData = data[rowIndex][cellIndex];
  if (firstClick) {
    firstClick = false;
    searched = Array(row).fill().map(() => []);
    if (cellData === CODE.Mine) {                // 첫 click이 지뢰이면, 
      transferMine(rowIndex, cellIndex);         // 지뢰를 옮기기
      data[rowIndex][cellIndex] = CODE.Normal;   // click한 칸을 비우기
      cellData = CODE.Normal;                    // click한 칸을 비우기
    }
  }

  if (cellData === CODE.Normal) {   // 일반 닫힌 칸인 경우
    openAround(rowIndex, cellIndex);
    // const count = countMine(rowIndex, cellIndex);
    // target.textContent = count || ''; // count가 존재하지 않으면 ''을 입력하는데, count = 0 인 경우에 falsy value 이므로, '' 가 입력된다.
    // // 만약 0도 작성하고, null, undefined인 경우에만 공백을 입력하고자 하면, nullish coalescing을 활용해 `??` 로 작성하면 된다.
    // target.className = 'opened';
    // data[rowIndex][cellIndex] = count;
  } else if (cellData === CODE.Mine) {  // 지뢰 칸인 경우
    // 펑
    showMines();
    target.textContent = '펑';
    target.className = 'opened';
    clearInterval(interval);
    $mineSweeperTbody.removeEventListener('contextmenu', onRightClick);
    $mineSweeperTbody.removeEventListener('click', onLeftClick);
    setTimeout(() => {
      alert('실패!');
    }, 500);
  }
  // 물음표, 깃발인 경우는 아무 동작도 안함.
}

// 지뢰찾기 판 만들기(화면 설정)
function drawTable() {
  data = plantMine();
  data.forEach((row) => {
    const $mineSweeperTr = document.createElement('tr');
    row.forEach((cell) => {
      const $mineSweeperTd = document.createElement('td');
      $mineSweeperTr.append($mineSweeperTd);
      if (cell === CODE.Mine) {
        dev && ($mineSweeperTd.textContent = 'X'); //  개발 편의를 위해
      }
    });
    $mineSweeperTbody.append($mineSweeperTr);
    $mineSweeperTbody.addEventListener('contextmenu', onRightClick);  // Event Bubbling
    $mineSweeperTbody.addEventListener('click', onLeftClick);  // Event Bubbling
  });
}