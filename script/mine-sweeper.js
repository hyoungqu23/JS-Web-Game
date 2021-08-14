const $mineSweeperTbody = document.querySelector('#minesweeper__table tbody');
const $mineSweeperResult = document.querySelector('#minesweeper__result');

const row = 10;   // 줄
const cell = 10;  // 칸
const mine = 10;  // 지뢰 개수
const CODE = {
  Opened: 0,      // 0 이상이면 열린 칸(주변 지뢰 개수를 표현)
  Normal: -1,     // 닫힌 칸(지뢰 없음)
  Question: -2,
  Flag: -3,
  Question_Mine: -4,
  Flag_Mine: -5,
  Mine: -6,
}
let data;

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
  });
}

drawTable();