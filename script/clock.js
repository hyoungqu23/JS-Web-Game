// Clock
const $hour = document.querySelector('#clock__hour');
const $minutes = document.querySelector('#clock__minutes');
const $seconds = document.querySelector('#clock__seconds');

const clock = () => {
  let date = new Date()
  let h = date.getHours() * 30
  let m = date.getMinutes() * 6
  let s = date.getSeconds() * 6

  $hour.style.transform = `rotateZ(${h + m / 12}deg)`;
  $minutes.style.transform = `rotateZ(${m}deg)`
  $seconds.style.transform = `rotateZ(${s}deg)`
}

setInterval(clock, 1000);

// Text
const $textHour = document.querySelector('#text-hour');
const $textMinutes = document.querySelector('#text-minutes');
const $textSeconds = document.querySelector('#text-seconds');
const $textAmPm = document.querySelector('#text-ampm');
const $dateYear = document.querySelector('#date-year');
const $dateMonth = document.querySelector('#date-month');
const $dateDay = document.querySelector('#date-day');

const clockText = () => {
  let date = new Date();
  
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm;
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  if (h >= 12) {
    h = h -12;
    ampm = 'PM';
  } else {
    ampm = 'AM';
  }

  $textAmPm.innerHTML = ampm;

  if (h == 0) {
    h = 12
  }

  if (h < 10) {
    h = `0${h}`;
  }

  $textHour.innerHTML = `${h}:`;

  if (m < 10) {
    m = `0${m}`
  }

  $textMinutes.innerHTML = `${m}:`;

  if (s < 10) {
    s = `0${s}`
  }

  $textSeconds.innerHTML = `${s}`;
  
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  $dateDay.innerHTML = day;
  $dateMonth.innerHTML = `${months[month]}`;
  $dateYear.innerHTML = year;
}

setInterval(clockText, 1000);