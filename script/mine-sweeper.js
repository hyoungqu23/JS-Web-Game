const $mineSweeperTbody = document.querySelector('#minesweeper__table tbody');
const $mineSweeperResult = document.querySelector('#minesweeper__result');

const row = 50;   // 줄
const cell = 50;  // 칸
const mine = 100;  // 지뢰 개수
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
    target.textContent = "X";
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
  if (data[rowIndex]?.[cellIndex] >= CODE.Opened) return; // 한 번 연 칸은 다시 열지 않음

  const target = $mineSweeperTbody.children[rowIndex].children[cellIndex];
  if (!target) return;  // 칸 이외의 경계선, 외부 click 방지

  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || '';
  target.className = 'opened';
  data[rowIndex][cellIndex] = count;

  openCount++;
  if (openCount === row + cell - mine) {
    const time = (new Date() - startTime);
    clearInterval(interval);
    $mineSweeperTbody.removeEventListener('contextmenu', onRightClick);
    $mineSweeperTbody.removeEventListener('click', onLeftClick);
    setTimeout(() => {
      alert(`승리! ${time}초가 걸렸습니다.`);
    }, 0);
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

function onLeftClick(event) {
  const target = event.target;  // event.target: <td>
  const rowIndex = target.parentNode.rowIndex;  // target.parentNode: <tr>
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];

  if (cellData === CODE.Normal) {   // 일반 닫힌 칸인 경우
    openAround(rowIndex, cellIndex);
    // const count = countMine(rowIndex, cellIndex);
    // target.textContent = count || ''; // count가 존재하지 않으면 ''을 입력하는데, count = 0 인 경우에 falsy value 이므로, '' 가 입력된다.
    // // 만약 0도 작성하고, null, undefined인 경우에만 공백을 입력하고자 하면, nullish coalescing을 활용해 `??` 로 작성하면 된다.
    // target.className = 'opened';
    // data[rowIndex][cellIndex] = count;
  } else if (cellData === CODE.Mine) {  // 지뢰 칸인 경우
    // 펑
    target.textContent = '펑';
    target.className = 'opened';
    $mineSweeperTbody.removeEventListener('contextmenu', onRightClick);
    $mineSweeperTbody.removeEventListener('click', onLeftClick);
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
        $mineSweeperTd.textContent = 'X'; //  개발 편의를 위해
      }
    });
    $mineSweeperTbody.append($mineSweeperTr);
    $mineSweeperTbody.addEventListener('contextmenu', onRightClick);  // Event Bubbling
    $mineSweeperTbody.addEventListener('click', onLeftClick);  // Event Bubbling
  });
}

drawTable();