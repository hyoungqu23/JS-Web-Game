const $baseball__form = document.querySelector('#baseball__form');
const $baseball__input = document.querySelector('#baseball__input');
const $baseball__logs = document.querySelector('#baseball__logs');

const baseball__numbers = [];
for (let n = 0; n < 9; n++) {
  baseball__numbers.push(n + 1);
}

const baseball__answerNumber = [];
for (let n = 0; n < 4; n++ ) {  // 4회 반복
  // index로 활용하기 위한 0 ~ 8 정수 무작위 선정
  const baseball__index = Math.floor(Math.random() * baseball__numbers.length);
  // 해당 index의 값을 추출하여 baseball__answerNumber 배열에 추가
  baseball__answerNumber.push(baseball__numbers[baseball__index]);
  // 중복 제거를 위해 baseball__numbers 배열에서 제거
  baseball__numbers.splice(baseball__index, 1)
}

console.log(baseball__answerNumber);

// 예시를 통한 검증
// baseball__numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// baseball__answerNumber = []

// 1st: index = 2
// baseball__numbers = [1, 2, 4, 5, 6, 7, 8, 9]
// baseball__answerNumber = [3, ]

// 2nd: index = 0
// baseball__numbers = [2, 4, 5, 6, 7, 8, 9]
// baseball__answerNumber = [3, 1, ]

// 3rd: index = 1
// baseball__numbers = [2, 5, 6, 7, 8, 9]
// baseball__answerNumber = [3, 1, 4, ]

// 4th: index = 8
// baseball__numbers = [2, 5, 6, 7, 8, 9]
// baseball__answerNumber = [3, 1, 4, undefined] << 예외 발생

// Math.floor(Math.random() * (9 - n) );으로 해결
// 추후 수정을 염두에 두고, 9 - n 를 baseball__numbers.length로 변경

// 답안 검사 코드
const tries = []; // 시도할 때마다 값을 기록

// 입력 값 검사 함수
function checkInput(input) {
  if (input.length !== 4) { // 4자리 숫자인가?
    return alert('4자리 숫자를 입력해주세요.');
  }
  if (new Set(input).size !== 4) {  // 중복된 숫자가 없는가?
    return alert('중복되지 않은 숫자를 입력해주세요.');
  }
  if (tries.includes(input)) { // 이미 시도한 값은 아닌가?
    return alert('이미 시도한 값입니다.');
  }
  return true;
}

let out = 0;
const message = document.createTextNode(`You Lose~ The Answer is ${baseball__answerNumber.join('')}`);

$baseball__form.addEventListener('submit', (e) => {
  e.preventDefault(); // 기본 동작 막기(form, a tag 등)

  const value = $baseball__input.value; // user가 제시한 답을 변수 value에 저장(event.target[0].value와 $baseball__input.value는 동일)
  $baseball__input.value = '';  // 입력 창 비우기(user 친화적)

  if (!checkInput(value)) {  // 답을 검사하는 코드를 포함한 함수에 value를 매개변수로 입력
    // 입력 값 문제 있음
    return;
  }

  // 입력 값 문제 없음
  // 답안의 다음 검사 진행
  if (baseball__answerNumber.join('') === value) {  // string 값이 전부 일치(즉, 자릿수와 숫자 모두 일치)
    $baseball__logs.append = ('Homerun!', document.createElement('br'));  // 화면 출력(Homerun!)
    return;
  }

  // Homerun이 아닌 경우 다음 검사 진행
  if (tries.length >= 9) {  // 시도 횟수 초과(10번째에서 return될 수 있도록 9)
    // text를 만든 후 해당 tag의 자식 요소로 추가하기.
    // const message = document.createTextNode(`You Lose~ The Answer is ${baseball__answerNumber.join('')}`);
    $baseball__logs.append(message);
    return;
  }

  // 시도 횟수가 10보다 작은 경우, Strike-Ball 검사
  let strike = 0;
  let ball = 0;

  // 정답과 답안의 각 숫자 검사
  for (let i = 0; i < baseball__answerNumber.length; i++) { // 0 ~ 3
    const index = value.indexOf(baseball__answerNumber[i]); // 정답의 각 숫자와 일치하는 숫자가 답안에 존재할 때, 그 index를 변수 index에 할당
    if (index > -1) { // 정답과 일치하는 숫자 발견
      if (index === i) { // 자릿수도 동일한 경우
        strike += 1;
      } else {  // 자릿수는 다르고, 숫자만 일치하는 경우
        ball += 1;
      }
    }
  }

  if (ball === 0 && strike === 0) {
    out += 1;
  }

  
  if (out < 3) {
    $baseball__logs.append(`${value}: ${ball} ball ${strike} strike ${out} out`, document.createElement('br'));
  } else {
    $baseball__logs.append(`${out} out! `, message, document.createElement('br'));
  }
  tries.push(value);
});