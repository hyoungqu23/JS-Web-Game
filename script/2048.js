const $2048Table = document. getElementById('game2048__table');
const $2048Score = document.getElementById('game2048__score');
const $2048Section = document.querySelector('#game2048');
const $2048Btn = document.querySelector('#game2048__btn');


let tableData = [];

// 2차원 배열(*표) 생성하고 게임 시작하기
function start2048() {
  // 메모리에 fragment로 표 저장하기
  const $fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    tableData.push(rowData);
    const $tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0);
      const $td = document.createElement('td');
      $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
  });

  $2048Table.appendChild($fragment);  // 한 번만 화면에 전부 표시하여 성능 보장

  place2randomly();
  draw2048Table();
}

// 2를 임의의 위치에 삽입하기
function place2randomly() {
  const emptyCells = [];  // 빈 칸의 줄과 칸 번호를 저장하기 위해 변수 선언

  // 빈 칸의 줄과 칸 번호를 저장하기
  tableData.forEach(function (rowData, i) {
    rowData.forEach(function (cellData, j) {
      if (!cellData) {
        emptyCells.push([i, j]);
      }
    })
  })

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];  // 빈 칸들 중에 하나를 임의로 선정하기
  tableData[randomCell[0]][randomCell[1]] = 2;  // 해당 칸에 숫자 2 넣기
}

// 화면에 숫자 표시하기
function draw2048Table() {
  tableData.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $2048Target = $2048Table.children[i].children[j]; // <td>
      if (cellData > 0) { // 2, 4, 8, 16, 32, ... , 2048인 경우
        $2048Target.textContent = cellData;
        $2048Target.className = 'color-' + cellData;
      } else {  // 0인 경우
        $2048Target.textContent = '';
        $2048Target.className = '';
      }
    })
  })
}

start2048();

// dummy Data 활용하기(개발 완료 후 제거)
// tableData = [
//   [32, 2, 4, 2],
//   [64, 4, 8, 4],
//   [2, 1024, 1024, 32],
//   [32, 16, 64, 4],
// ]

// draw2048Table();
let history = [];

// 되돌리기
$2048Btn.addEventListener('click', () => {
  const prevData = history.pop();
  if (!prevData) return;
  $2048Score.textContent = prevData.score;
  tableData = prevData.table;
  draw2048Table();
})

function moveCells(direction) {
  // 백업하기
  history.push({
    table: JSON.parse(JSON.stringify(tableData)), // 깊은 복사
    score: $2048Score.textContent,
  });

  switch (direction) {
    case 'left': {
      const newData = [[], [], [], []]; // 원본 tableData를 옮길 빈 newData
      // 원본 tableData의 빈 칸을 제외하고 삽입하기
      tableData.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) { // 빈 칸 제외하고
            const currentRow = newData[i];  // 현재 줄
            const prevData = currentRow[currentRow.length - 1]; // 기준 값의 이전 값(반복문을 순회하며 2, 2, 4, 8을 차례로 newData에 삽입하는데, 이때 2를 삽입한 후 다음 2를 삽입할 때 다음 2의 이전 값은 현재 newData에 삽입되어 있는 마지막 값인 2가 된다.)
            if (prevData === cellData) {
              // 점수 추가하기
              const score = parseInt($2048Score.textContent);
              $2048Score.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;  // '이전 값 X -2' 값을 삽입하기
            } else {
              newData[i].push(cellData);
            }
          }
        });
      });
      console.log(newData);
      // 원본 tableData 수정하기
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          tableData[i][j] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
    case 'right': {
      const newData = [[], [], [], []]; // 원본 tableData를 옮길 빈 newData
      // 원본 tableData의 빈 칸을 제외하고 삽입하기
      tableData.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (rowData[3 - j]) { // 빈 칸 제외하고(오른쪽부터 시작하기 위해 3 - j 사용)
            const currentRow = newData[i];  // 현재 줄
            const prevData = currentRow[currentRow.length - 1]; // 기준 값의 이전 값(반복문을 순회하며 2, 2, 4, 8을 차례로 newData에 삽입하는데, 이때 2를 삽입한 후 다음 2를 삽입할 때 다음 2의 이전 값은 현재 newData에 삽입되어 있는 마지막 값인 2가 된다.)
            if (prevData === rowData[3 - j]) {
              // 점수 추가하기
              const score = parseInt($2048Score.textContent);
              $2048Score.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;  // '이전 값 X -2' 값을 삽입하기
            } else {
              newData[i].push(rowData[3 - j]);
            }
          }
        });
      });
      console.log(newData);
      // 원본 tableData 수정하기
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          tableData[i][3 - j] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
    case 'up': {
      const newData = [[], [], [], []]; // 원본 tableData를 옮길 빈 newData
      // 원본 tableData의 빈 칸을 제외하고 삽입하기
      tableData.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) { // 빈 칸 제외하고
            const currentRow = newData[j];  // 현재 줄
            const prevData = currentRow[currentRow.length - 1]; // 기준 값의 이전 값(반복문을 순회하며 2, 2, 4, 8을 차례로 newData에 삽입하는데, 이때 2를 삽입한 후 다음 2를 삽입할 때 다음 2의 이전 값은 현재 newData에 삽입되어 있는 마지막 값인 2가 된다.)
            if (prevData === cellData) {
              // 점수 추가하기
              const score = parseInt($2048Score.textContent);
              $2048Score.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;  // '이전 값 X -2' 값을 삽입하기
            } else {
              newData[j].push(cellData);
            }
          }
        });
      });
      console.log(newData);
      // 원본 tableData 수정하기
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          tableData[j][i] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
    case 'down': {
      const newData = [[], [], [], []]; // 원본 tableData를 옮길 빈 newData
      // 원본 tableData의 빈 칸을 제외하고 삽입하기
      tableData.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (tableData[3 - i][j]) { // 빈 칸 제외하고
            const currentRow = newData[j];  // 현재 줄
            const prevData = currentRow[currentRow.length - 1]; // 기준 값의 이전 값(반복문을 순회하며 2, 2, 4, 8을 차례로 newData에 삽입하는데, 이때 2를 삽입한 후 다음 2를 삽입할 때 다음 2의 이전 값은 현재 newData에 삽입되어 있는 마지막 값인 2가 된다.)
            if (prevData === tableData[3 - i][j]) {
              // 점수 추가하기
              const score = parseInt($2048Score.textContent);
              $2048Score.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;  // '이전 값 X -2' 값을 삽입하기
            } else {
              newData[j].push(tableData[3 - i][j]);
            }
          }
        });
      });
      console.log(newData);
      // 원본 tableData 수정하기
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          tableData[3 - j][i] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
  }

  // 승패 구현하기
  if (tableData.flat().includes(2048)) {    // 2048을 포함하고 있다면,
    draw2048Table();
    setTimeout(() => {
      alert('승리!');
    }, 50);
  } else if (!tableData.flat().includes(0)) {   // 0을 포함하지 않는다면, === 빈 칸이 없다면,
    alert('패배~')
  } else {
    place2randomly();
    draw2048Table();
  }
}

// keyboard Event
window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    moveCells('up');
  } else if (event.key === 'ArrowDown') {
    moveCells('down');
  } else if (event.key === 'ArrowLeft') {
    moveCells('left');
  } else if (event.key === 'ArrowRight') {
    moveCells('right');
  }
});

// mouse Event
let startCoord;
window.addEventListener('mousedown', (event) => {
  startCoord = [event.clientX, event.clientY];
});

window.addEventListener('mouseup', (event) => {
  const endCoord = [event.clientX, event.clientY];
  const diffX = endCoord[0] - startCoord[0];
  const diffY = endCoord[1] - startCoord[1];

  // 기준점에 따른 방향 판단하기
  if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('left');
  } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('down');
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('right');
  } else if (diffX < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('up');
  }
});