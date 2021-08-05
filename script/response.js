const $ResponseScreen = document.querySelector('#Response__screen');
const $ResponseResult = document.querySelector('#Response__result');
const $ResponseAverage = document.querySelector('#Response__average');
const $ResponseTopfive = document.querySelector('#Response__topfive');
let startTime;
let endTime;  // 처음 click과 이후 반응속도를 click하는 것은 다른 click이므로, eventListener 내에 변수를 선언하면, 차이를 구할 수 없다.(비동기)
let responseRecords = [];
let timeoutId;  // clear 하기 위함

$ResponseScreen.addEventListener('click', (event) => {
  // 화면을 className으로 구분하고, 각 className마다 코드 작성하기
  if (event.target.classList.contains('ready')) {
    // 시작 화면 코드
    
    // 준비 화면으로 전환하기
    $ResponseScreen.classList.remove('ready');
    $ResponseScreen.classList.add('set');

    // 화면 텍스트 변경하기
    $ResponseScreen.textContent = 'Click Green!';

    // Random Timer 작동하기
    timeoutId = setTimeout(() => {
      // 전환 시간 기록하기
      startTime = new Date();

      // 테스트 화면으로 전환하기
      $ResponseScreen.classList.remove('set');
      $ResponseScreen.classList.add('go');

      // 화면 텍스트 변경하기
      $ResponseScreen.textContent = 'NOW!!!!';
    }, Math.floor(Math.random() * 1000) + 2000);  // 2000ms ~ 3000ms

  } else if (event.target.classList.contains('set')) {
    // 준비 화면 코드

    clearTimeout(timeoutId);
    
    // 시작 화면으로 전환하기
    $ResponseScreen.classList.remove('set');
    $ResponseScreen.classList.add('ready');

    // 성급하다는 message 출력하기
    $ResponseResult.textContent = 'Do NOT Click Red!';
    $ResponseResult.style.color = 'red';

  } else if (event.target.classList.contains('go')) {
    // 테스트 화면 코드

    // click 시간 기록하기
    endTime = new Date();
    
    // 전환 시간과 click 시간의 차이 계산해 저장하기
    const currentTime = endTime - startTime;
    responseRecords.push(currentTime);

    // 저장한 기록을 평균 내기
    const averageTime = responseRecords.reduce((a, c) => a + c) / responseRecords.length;
    $ResponseResult.textContent = `Current Speed: ${currentTime}ms`
    $ResponseResult.style.color = '#FFFFFF';
    $ResponseAverage.textContent = `Average Speed: ${Math.round(averageTime)}ms`;
    $ResponseTopfive.textContent = `Top 5:`

    // Top5 기록하기
    const topFive = responseRecords.sort((p, c) => p - c).slice(0, 5);
    topFive.forEach((top, index) => {
      $ResponseTopfive.append(` ${top}ms`);
    });

    startTime = null;
    endTime = null;     // 초기화
    
    // 시작 화면으로 전환하기
    $ResponseScreen.classList.remove('go');
    $ResponseScreen.classList.add('ready');

    // 화면 텍스트 변경하기
    $ResponseScreen.textContent = 'Click to Start';
  }
});