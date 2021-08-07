// Word-relay
const $numberForm = document.querySelector('#number__form');
const $numberButton = document.querySelector('.number__btn');
const $input = document.querySelector('#word__input');
const $numberInput = document.querySelector('#number__input');
const $number= document.querySelector('#number');

let number;

$numberButton.addEventListener('click', (event) => {
  // event.preventDefault();
  number = Number($numberInput.value);
  $number.textContent = number;
  $numberButton.style.display = 'none';
  $numberInput.style.display = 'none';
  $number.style.display = 'none';
  
  number = Number($number.textContent);
  
  if (number) {
    const $wordButton = document.querySelector('.word__btn');
    const $order = document.querySelector('#order');
    const $word = document.querySelector('#word');
    let word; // 제시어
    let newWord;  // 새로 입력한 단어
    console.log(number)
    
    const onInput = function(event) {
      newWord = event.target.value;
    };
  
    // 최적화
    const onBtnClick = function() {
      if (!word || word[word.length - 1] === newWord[0]) {  // 제시어가 비어 있거나 단어가 올바른가?
        // 비어 있거나 올바르다.
        word = newWord; // 입력한 단어를 제시어로 등록(변수 변경)
        $word.textContent = word; // (화면 변경) tag 대다수는 textContent로 내용 조회 가능.
        
        const order = Number($order.textContent); // 현재 순서
        if (order + 1 > number) { // 현재 순서 + 1이 참가자 수를 초과하는가?
          // 초과한다.
          $order.textContent = 1; // 다음 순서를 1로 변경.
        } else {
          // 초과하지 않는다.
          $order.textContent = order + 1; // 다음 순서를 (현재 순서 + 1)로 변경.
        }
      } else {
        alert('올바르지 않은 단어입니다!!')
      }
      
      $input.value = '';  // input 비우기 input 등 입력 tag의 경우 value로 내용 조회 가능.
      $input.focus();  // input tag에 focus 두기
    };
    $input.addEventListener('input', onInput);
    $wordButton.addEventListener('click', onBtnClick);
  };
});




  // 초안
//   const onBtnClick2 = function() {
//     if (!word) {  // 제시어가 비어 있는가?
//       // 비어 있다.
//       word = newWord; // 입력한 단어를 제시어로 등록(변수 변경)
//       $word.textContent = word; // (화면 변경) tag 대다수는 textContent로 내용 조회 가능.
      
//       const order = Number($order.textContent); // 현재 순서
//       if (order + 1 > number) { // 현재 순서 + 1이 참가자 수를 초과하는가?
//         // 초과한다.
//         $order.textContent = 1; // 다음 순서를 1로 변경.
//       } else {
//         // 초과하지 않는다.
//         $order.textContent = order + 1; // 다음 순서를 (현재 순서 + 1)로 변경.
//       }

//       $input.value = '';  // input 비우기 input 등 입력 tag의 경우 value로 내용 조회 가능.
//       $input.focus(); // input tag에 focus 두기
//     } else {
//       // 비어있지 않다.
//       if (word[word.length - 1] === newWord[0]) { // 올바른가?
//         // 올바른 단어를 입력한 경우
//         word = newWord; // 입력한 단어를 제시어로 등록(변수 변경)
//         $word.textContent = word; // (화면 변경) tag 대다수는 textContent로 내용 조회 가능.

//         const order = Number($order.textContent); // 현재 순서
//         if (order + 1 > number) { // 현재 순서 + 1이 참가자 수를 초과하는가?
//           // 초과한다.
//           $order.textContent = 1; // 다음 순서를 1로 변경.
//         } else {
//           // 초과하지 않는다.
//           $order.textContent = order + 1; // 다음 순서를 (현재 순서 + 1)로 변경.
//         }
//         $input.value = '';  // input 비우기 input 등 입력 tag의 경우 value로 내용 조회 가능.
//         $input.focus();  // input tag에 focus 두기
//       } else {
//         alert('올바르지 않은 단어입니다!!')
//         $input.value = '';  // input 비우기 input 등 입력 tag의 경우 value로 내용 조회 가능.
//         $input.focus();  // input tag에 focus 두기
//       }
//     }
//   };

//   // 쿵쿵따게임
//   const onBtnClick3 = function() {
//     if (newWord.length === 3) {
//       if (!word || word[word.length - 1] === newWord[0]) {  // 제시어가 비어 있거나 단어가 올바른가?
//         // 비어 있거나 올바르다.
//         word = newWord; // 입력한 단어를 제시어로 등록(변수 변경)
//         $word.textContent = word; // (화면 변경) tag 대다수는 textContent로 내용 조회 가능.
        
//         const order = Number($order.textContent); // 현재 순서
//         if (order + 1 > number) { // 현재 순서 + 1이 참가자 수를 초과하는가?
//           // 초과한다.
//           $order.textContent = 1; // 다음 순서를 1로 변경.
//         } else {
//           // 초과하지 않는다.
//           $order.textContent = order + 1; // 다음 순서를 (현재 순서 + 1)로 변경.
//         }
//       } else {
//         alert('올바르지 않은 단어입니다!!')
//       }
//     } else {
//       alert('3글자');
//     }
//     $input.value = '';  // input 비우기 input 등 입력 tag의 경우 value로 내용 조회 가능.
//     $input.focus();  // input tag에 focus 두기
//   };

//   // EventListener 설정
//   $input.addEventListener('input', onInput);
//   $button.addEventListener('click', onBtnClick);
// } else {
//   alert('참가자 수를 입력하세요.');
// }



// 대화 상자 3종류
// prompt는 사용자에게 특정 입력을 요구하는데, 이는 문자열로 인식된다. 따라서, 숫자로 활용하기 위해 parseInt(), Number() 함수로 형 변환해야 한다.(차이 확인하기)
// 참고로 '취소'를 누르는 경우 null이 반환되고, 입력 값을 활용하려면 변수에 저장해야 한다.
// const number = parseInt(prompt('How many person participate?'), 10);
// alert은 경고를 띄워주어, 사용자에게 어떤 메시지를 알릴 때 사용한다.
// alert(number);
// confirm은 사용자의 의사를 물어보고, yes, no를 입력받는다. '확인'을 누르면 true, '취소'를 누르면 false 값을 반환한다.
// const yesOrNO = confirm(number, 'is right?');

// HTML Tag 선택하기
// 보통 tag를 저장하는 변수 이름을 설정하는 규칙으로 '$tagName'을 활용한다.
// tag가 여러 개 존재할 때, querySelector()를 사용하면, 첫 번째 tag만 선택된다.
// const $input = document.querySelector('input');
// const $button = document.querySelector('button');
// querySelectorAll()로 반환되는 NodeList는 유사 배열로, 0과 length를 속성 이름으로 가진 객체이다. 다만, 배열의 method, property를 사용하지 못하는 경우도 있다.
// '#'은 id, '.'은 class, ' '는 자손 tag를 의미한다.
// const $order = document.querySelector('#order');
// const $word = document.querySelector('#word');
// const $span = document.querySelector('div span');

// event 설정하기
// addEventListener('event', function)을 통해 선택한 tag에 대한 event를 설정할 수 있다.
// 이때 2번째 매개변수(parameter)를 ListenerFunction, CallbackFunction이라 한다.
// 여기에는 함수 자체(함수 이름만)를 넣어야 하지, '()'를 통해 실행하면 안 된다는 점에 유의해야 한다. 실행하면, return 값이 2번째 매개변수로 삽입된다.(return 기본 값 = undefined)
// CallbackFunction: 특정 동작을 실행된 이후 연이어 추가로 실행되는 함수(ArrowFunction 가능)
// $input.addEventListener('input', function(event) {
//   console.log('글자 입력', event.target.value); // 입력 값 확인을 위해서 event 매개변수를 CallbackFunction에 추가하고, event.target.value로 확인 가능.
// });
// const onClick = function() {
//   console.log('버튼 클릭');
// }
// $button.addEventListener('click', onClick);

// Refactoring
// '제시어가 비어 있다.' && '단어가 올바르다.' =>  '입력한 단어가 제시어가 된다.'
// '제시어가 비어 있다.' && '단어가 올바르지 않다.' =>  '입력한 단어가 제시어가 된다.'
// '제시어가 비어 있지 않다.' && '단어가 올바르다.' =>  '입력한 단어가 제시어가 된다.'
// '제시어가 비어 있지 않다.' && '단어가 올바르지 않다.' =>  '틀렸다고 표시한다.'
// 결국, 두 if문을 '||'(또는) 으로 합칠 수 있다.
// const onBtnClick = function() {
//   if (!word || word[word.length - 1] === newWord[0]) {  // 제시어가 비어 있거나 단어가 올바른가?
//     // 비어 있거나 올바르다.
//     word = newWord; // 입력한 단어를 제시어로 등록(변수 변경)
//     $word.textContent = word; // (화면 변경) tag 대다수는 textContent로 내용 조회 가능.
    
//     const order = Number($order.textContent); // 현재 순서
//     if (order + 1 > participant) { // 현재 순서 + 1이 참가자 수를 초과하는가?
//       // 초과한다.
//       $order.textContent = 1; // 다음 순서를 1로 변경.
//     } else {
//       // 초과하지 않는다.
//       $order.textContent = order + 1; // 다음 순서를 (현재 순서 + 1)로 변경.
//     }
//   } else {
//     alert('올바르지 않은 단어입니다!!')
//   }
//   $input.value = '';  // input 비우기 input 등 입력 tag의 경우 value로 내용 조회 가능.
//   $input.focus();  // input tag에 focus 두기
// };

// 참고 
// 프로그램 절차의 개수는 정해져 있어야 한다.
// 각 절차는 항상 같은 내용이어야 한다.
// 모든 가능성을 고려해야 한다.
// 예시는 절차를 검증할 때 사용한다.
// 사용자의 이벤트(버튼 클릭, 입력창 입력 등)가 필요한 곳에서 순서도를 끊어주어야 한다.