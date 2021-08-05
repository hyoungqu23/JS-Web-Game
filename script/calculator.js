// 변수 선언하기
let numOne = '';
let opreator = '';
let numTwo = '';

// 태그 선택하기
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

// 숫자 버튼 클릭 - event 객체 활용하기
const onBtnClick = (event) => {
  if (!opreator) {
    // 비어있다.
    numOne += event.target.textContent;
    // 화면의 데이터 변경하기
    $result.value += event.target.textContent;
    return;
  }

  // 비어있지 않다.
  if (!numTwo) {
    // numTwo가 없다면, 
    $result.value = '';
  }
  numTwo += event.target.textContent;
  // 화면의 데이터 변경하기
  $result.value += event.target.textContent;

}

// 숫자 버튼 클릭 -  고차 함수(high order function: 함수가 함수를 return하는 함수) 설정하기
// const onBtnClick2 = (number) => () => {  // return과 {} 생략 가능
//   if (opreator) {
//     // 비어있지 않다.
//     numTwo += number;
//   } else {
//     // 비어있다.
//     numOne += number;
//   }
//   // 화면의 데이터 변경하기
//   $result.value += number;
// };

// 연산자 버튼 클릭 - 고차 함수 활용하기
const onOperatorBtnClick = (op) => () => {
  if (numOne) {
    if (numTwo) {
      onEqualBtnClick();
    }
    opreator = op;
    $operator.value = op;
  } else {
    alert('숫자를 먼저 입력하세요.')
  }
}

// 등호 버튼 클릭
const onEqualBtnClick = () => {
  if (numTwo) {
    switch (opreator) {
      case '+':
        $result.value = parseInt(numOne) + parseInt(numTwo);
        break;
      case '-':
        $result.value = parseInt(numOne) - parseInt(numTwo);
        break;
      case '/':
        $result.value = parseInt(numOne) / parseInt(numTwo);
        break;
      case '*':
        $result.value = parseInt(numOne) * parseInt(numTwo);
        break;
      default:
        break;
    }
    $operator.value = '';
    numOne = $result.value;
    opreator = '';
    numTwo = '';
  } else {
    alert('숫자를 먼저 입력하세요.')
  }
}

// 초기화 버튼 클릭
const onClearBtnClick = () => {
  numOne = '';
  opreator = '';
  numTwo = '';
  $operator.value = '';
  $result.value = '';
}

// 각 버튼에 Event 설정하기
document.querySelector('#num-0').addEventListener('click', onBtnClick);
document.querySelector('#num-1').addEventListener('click', onBtnClick);
document.querySelector('#num-2').addEventListener('click', onBtnClick);
document.querySelector('#num-3').addEventListener('click', onBtnClick);
document.querySelector('#num-4').addEventListener('click', onBtnClick);
document.querySelector('#num-5').addEventListener('click', onBtnClick);
document.querySelector('#num-6').addEventListener('click', onBtnClick);
document.querySelector('#num-7').addEventListener('click', onBtnClick);
document.querySelector('#num-8').addEventListener('click', onBtnClick);
document.querySelector('#num-9').addEventListener('click', onBtnClick);
document.querySelector('#plus').addEventListener('click', onOperatorBtnClick('+'));
document.querySelector('#minus').addEventListener('click', onOperatorBtnClick('-'));
document.querySelector('#divide').addEventListener('click', onOperatorBtnClick('/'));
document.querySelector('#multiply').addEventListener('click', onOperatorBtnClick('*'));
document.querySelector('#calculate').addEventListener('click', onEqualBtnClick);
document.querySelector('#clear').addEventListener('click', onClearBtnClick);