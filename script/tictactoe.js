// 3X3 2차원 빈 배열 준비하기
// const data = [];
// for (let i = 0; i < 3; i++) {
//   data.push([]);
// }

// HTML에 태그 작성하기
const $tictactoeTable = document.createElement('table');
const $tictactoeResult = document.createElement('div');
const rows = [];
let currentTurn = '❌';

for (let i = 0; i < 3; i++) {
  const $tictactoeTr = document.createElement('tr');
  const cells = [];

  for (let j = 0; j < 3; j++) {
    const $tictactoeTd = document.createElement('td');
    cells.push($tictactoeTd);
    $tictactoeTr.append($tictactoeTd);
  }
  rows.push(cells);
  $tictactoeTable.append($tictactoeTr);
};

// rows: 2차원 전체 배열
// row: 2차원 배열 내부의 배열
// cell: 각 요소

const checkWinner = (target) => {
  // click 한 <td>의 index를 알아내기

  // let rowIndex;
  // let cellIndex;
  // rows.forEach((row, rowidx) => {
  //   row.forEach((cell, cellidx) => {
  //     if (cell === target) {
  //       rowIndex = rowidx;
  //       cellIndex = cellidx;
  //     }
  //   });
  // });

  // 참고) 더 쉬운 방법
  // <tr>은 rowIndex 속성을 가지고 있다.
  const rowIndex = target.parentNode.rowIndex;
  // <td>는 cellIndex 속성을 가지고 있다.
  const cellIndex = target.cellIndex;

  // 세 칸 모두 채워져 있는가?
  let hasWinner = false;

  // 가로 줄 검사
  if (rows[rowIndex][0].textContent === currentTurn &&
      rows[rowIndex][1].textContent === currentTurn &&
      rows[rowIndex][2].textContent === currentTurn) {
    hasWinner = true;
  }

  // 세로 줄 검사
  if (rows[0][cellIndex].textContent === currentTurn &&
      rows[1][cellIndex].textContent === currentTurn &&
      rows[2][cellIndex].textContent === currentTurn) {
    hasWinner = true;
  }

  // 대각선 검사
  if (rows[0][0].textContent === currentTurn && 
      rows[1][1].textContent === currentTurn && 
      rows[2][2].textContent === currentTurn) {
    hasWinner = true;
  } else if (rows[0][2].textContent === currentTurn && 
      rows[1][1].textContent === currentTurn &&
      rows[2][0].textContent === currentTurn) {
    hasWinner = true;
  }
  return hasWinner;
};

// 중복 코드 함수 설정
const checkWinnerAndDraw = (targetCell) => {
  const hasWinner = checkWinner(targetCell);
  
  if (hasWinner) {
    $tictactoeResult.textContent = `${currentTurn} 승리!`;
    $tictactoeTable.removeEventListener('click', callback);
    return;
  }
  
  const draw = rows.flat().every((cell) => {cell.textContent});
  
  if (draw) {
    $tictactoeResult.textContent = `무승부`;
    return;
  }
  currentTurn = ((currentTurn === '❌') ? '⭕' : '❌');
};

let tictactoeClickable = true;
const callback = (event) => {
  if (!tictactoeClickable) { return; }
  // 칸이 비어있는지 확인하기
  if (event.target.textContent !== '') { return; } //  클릭하지 못하게 EL을 지우는 것 보다, 함수를 종료하는 것이 더 좋다.
  event.target.textContent = currentTurn;

  // 승부가 났는지 확인하기
  checkWinnerAndDraw(event.target);

  // 컴퓨터의 순서 구현하기
  if (currentTurn === '⭕') {
    const emptyCells = rows.flat().filter((v) => !v.textContent );
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    tictactoeClickable = false;
    setTimeout(() => {
      randomCell.textContent = '⭕';
      checkWinnerAndDraw(randomCell);
      tictactoeClickable = true;
    }, Math.floor(Math.random() * 1000 + 1000))
    
  };
};

$tictactoeTable.addEventListener('click', callback);

document.querySelector('#tictactoe').append($tictactoeTable);
document.querySelector('#tictactoe').append($tictactoeResult);