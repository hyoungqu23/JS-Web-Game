const $2048Table = document. getElementById('2048__table');
const $2048Score = document.getElementById('2048__score');
const $2048Section = document.querySelector('#game__2048');

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

function moveCells(direction) {
  switch (direction) {
    case 'left':
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            newData[i].push(cellData);
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = newData[i][j] || 0;
        });
      });
      break;
    case 'right':
      break;
    case 'up':
      break;
    case 'down':
      break;
  }
  draw();
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

  // 기준점에 따른 좌표 계산하기
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