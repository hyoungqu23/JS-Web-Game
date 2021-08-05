const $startScreen = document.querySelector('#start__screen');
const $gameMenu = document.querySelector('#game__menu');
const $battleMenu = document.querySelector('#battle__menu');
const $heroName = document.querySelector('#hero__name');

$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target.value;
  console.log(name);
  $startScreen.style.display = 'none';
  $gameMenu.style.display = 'grid';
  $heroName.textContent = name;
});