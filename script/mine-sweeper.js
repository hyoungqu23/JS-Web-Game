const $mineSweeperTbody = document.querySelector('#minesweeper__table tbody');
const $mineSweeperResult = document.querySelector('#minesweeper__result');

const row = 10;   // 줄
const cell = 10;  // 칸
const mine = 10;
const CODE = {
  Opened: 0,      // 0 이상이면 열린 칸
  Normal: -1,
  Question: -2,
  Flag: -3,
  Question_Mine: -4,
  Flag_Mine: -5,
  Mine: -6,
}
let data;

function plantMine() {
  const candidate = Array(row * cell).fill().map((arr, i) => i);

  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  };

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.Normal);
    }
  }
}

function drawTable() {
  data = plantMine();

  $mineSweeperTr = document.createElement('tr');
  row.forEach((cell) => {
    const $mineSweeperTd = document.createElement('td');
    $mineSweeperTr.append($mineSweeperTd);
  });
  $mineSweeperTbody.append($mineSweeperTr);
}

drawTable();