// ==================== 클래스 문법 활용 XX ==================== //
// const $startScreen = document.querySelector('#start__screen');
// const $gameMenu = document.querySelector('#game__menu');
// const $battleMenu = document.querySelector('#battle__menu');
// const $heroName = document.querySelector('#hero__name');
// const $heroJob = document.querySelector('#hero__job');
// const $heroLevel = document.querySelector('#hero__level');
// const $heroHp = document.querySelector('#hero__hp');
// const $heroExp = document.querySelector('#hero__exp');
// const $heroAtk = document.querySelector('#hero__atk');
// const $heroDef = document.querySelector('#hero__def');
// const $heroItem = document.querySelector('#hero__item');
// const $monsterName = document.querySelector('#monster__name');
// const $monsterHp = document.querySelector('#monster__hp');
// const $monsterAtk = document.querySelector('#monster__atk');
// const $monsterDef = document.querySelector('#monster__def');
// const $message = document.querySelector('#message');


//   // { name: '', job: 'archer', lv: 1, maxHp: 80, hp: 80, exp: 0, atk: 20, def: 10, item: '', },
//   // { name: '', job: 'assassin', lv: 1, maxHp: 70, hp: 70, exp: 0, atk: 30, def: 5, item: '', },
//   // 직업 선택 어떻게?
// // 초기 캐릭터 능력치 설정하기
// const heroInitialStats = { 
//   job: 'warrior', 
//   name: '', 
//   lv: 1, 
//   maxHp: 100, 
//   hp: 100, 
//   exp: 0, 
//   atk: 10, 
//   def: 20, 
//   item: '',
//   attack(monster) {
//     monster.hp -= (this.atk - 0.5 * monster.def);
//     this.hp -= (monster.atk - 0.5 * this.def);
//   },
//   heal(monster) {
//     this.hp += 20;
//     this.hp -= (monster.atk - 0.5 * this.def);
//   },
//   defense(monster) {
//     if (monster.atk >= this.def) {
//       this.hp -= (monster.atk - this.def);
//     } else {
//       alert('defence success!');
//     }
//   }
// };

// // 랜덤 몬스터 만들기
// let monster = null;

// const monsterList = [
//   { name: 'slime', hp: 25, atk: 10, exp: 5, def: 0,},
//   { name: 'ghost', hp: 20, atk: 10, exp: 20, def: 40, },
//   { name: 'skeleton', hp: 45, atk: 15, exp: 20, def: 20, },
//   { name: 'death knight', hp: 75, atk: 25, exp: 35, def: 25, },
//   { name: 'revenant', hp: 150, atk: 35, exp: 70, def: 25, },
// ];

// $startScreen.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const name = event.target['start__input'].value;
//   $startScreen.style.display = 'none';
//   $gameMenu.style.display = 'block';
//   $heroName.textContent = name;
//   heroInitialStats.name = name;
//   $heroLevel.textContent = `Level ${heroInitialStats.lv}`;
//   $heroHp.textContent = `HP: ${heroInitialStats.hp} / ${heroInitialStats.maxHp}`;
//   $heroExp.textContent = `EXP: ${heroInitialStats.exp} / ${heroInitialStats.lv * 15}`;
//   $heroAtk.textContent = `ATK: ${heroInitialStats.atk}`;
//   $heroDef.textContent = `DEF: ${heroInitialStats.def}`;
//   // item?
// });

// $gameMenu.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const input = event.target['menu__input'].value;
//   if (input === 'adventure') {
//     $gameMenu.style.display = 'none';
//     $battleMenu.style.display = 'block';
//     // Deep Copy
//     monster = JSON.parse(JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)]));
//     monster.maxHp = monster.hp;
//     $monsterName.textContent = monster.name;
//     $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
//     $monsterAtk.textContent = `ATK: ${monster.atk}`;
//     $monsterDef.textContent = `DEF: ${monster.def}`;
//   } else if (input === 'menu__shop') {

//   } else if (input === 'menu__rest') {

//   } else if (input === 'menu__end') {

//   }
// });

// $battleMenu.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const input = event.target['battle__input'].value;
//   if (input === 'attack') {
//     heroInitialStats.attack(monster);
//     monster.attack(heroInitialStats);
//     $heroHp.textContent = `HP: ${heroInitialStats.hp} / ${heroInitialStats.maxHp}`;
//     $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
//     $message.textContent = `${heroInitialStats.name} attacked the monster as much as ${this.atk - 0.5 * monster.def} damage, and received ${monster.atk - 0.5 * this.def} damage.`;
//   } else if (input === 'heal') {
//     heroInitialStats.heal(monster);
//     $message.textContent = `${heroInitialStats.name} has recovered his/her HP by 20.`
//   } else if (input === 'defense') {
//     heroInitialStats.defense(monster);

//   } else if (input === 'run') {

//   }
// });




// ==================== 클래스 문법 활용 ==================== //
const $startScreen = document.querySelector('#start__screen');
const $gameMenu = document.querySelector('#game__menu');
const $battleMenu = document.querySelector('#battle__menu');
const $heroName = document.querySelector('#hero__name');
const $heroJob = document.querySelector('#hero__job');
const $heroLevel = document.querySelector('#hero__level');
const $heroHp = document.querySelector('#hero__hp');
const $heroExp = document.querySelector('#hero__exp');
const $heroAtk = document.querySelector('#hero__atk');
const $heroDef = document.querySelector('#hero__def');
const $heroItem = document.querySelector('#hero__item');
const $monsterName = document.querySelector('#monster__name');
const $monsterHp = document.querySelector('#monster__hp');
const $monsterAtk = document.querySelector('#monster__atk');
const $monsterDef = document.querySelector('#monster__def');
const $message = document.querySelector('#message');

// Game 클래스 생성하기: Game의 초기 값과 관련 함수를 작성
class Game {
  constructor(name) { // 초기값
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: 'slime', hp: 25, exp: 5, atk: 10, def: 0,},
      { name: 'ghost', hp: 20, exp: 20, atk: 10, def: 40, },
      { name: 'skeleton', hp: 45, exp: 20, atk: 15, def: 20, },
      { name: 'death knight', hp: 75, exp: 35, atk: 25, def: 25, },
      { name: 'revenant', hp: 100, exp: 50, atk: 30, def: 15, },
      { name: 'devil', hp: 150, exp: 70, atk: 50, def: 35, },
    ];
    this.heroJobList = [
      { job: 'warrior', atk: 10, def: 20, },
      { job: 'archer', atk: 20, def: 10, },
      { job: 'assassin', atk: 30, def: 5, },
    ];
    this.start(name); // 게임 시작
  }
  start(name) { // 게임 시작 후 특정 동작 수행
    console.log(this);
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game__menu');
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }
  changeScreen(screen) {
    if (screen === 'start__screen') {
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game__menu') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle__menu') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu__input'].value;
    if (input === 'adventure') {
      this.changeScreen('battle__menu');
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.exp,
        randomMonster.atk,
        randomMonster.def,
      );
      this.updateMonsterStat();
      this.showMessage(`It's a monster! I think it's a ${this.monster.name}!`);
    } else if (input === 'shop') {

    } else if (input === 'rest') {
      
    } else if (input === 'end') {
      this.changeScreen('game__menu');
    }
  }
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle__input'].value;
    if (input === 'attack') {
      this.changeScreen('battle__menu');
    } else if (input === 'heal') {

    } else if (input === 'defense') {
      
    } else if (input === 'run') {
      
    }
  }
  updateHeroStat() {
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroJob.textContent = '';
      $heroHp.textContent = '';
      $heroExp.textContent = '';
      $heroAtk.textContent = '';
      $heroDef.textContent = '';
      return;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `Lv: ${hero.lv}`;
    $heroJob.textContent = hero.job;
    $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`;
    $heroExp.textContent = `EXP: ${hero.exp} / ${15 * hero.lv}`;
    $heroAtk.textContent = `ATK: ${hero.atk}`;
    $heroDef.textContent = `DEF: ${hero.def}`;
  }
}

// Hero 클래스 생성하기
class Hero {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.lv = 1;
    this.maxHp = 100;
    this.hp = 100;
    this.exp = 0;
    this.atk = 10;
    this.def = 10;
  }
  attack(target) {
    if (this.atk >= target.def) {
      target.hp -= (this.atk - target.def*0.5);
    } else {
      target.hp -= 0;
    }
  }
  heal(monster) {
    this.hp += 20;
    if (monster.atk >= this.def) {
      this.hp -= (monster.atk - this.def*0.5);
    } else {
      this.hp -= 0;
    }
  }
  defense(target) {
    if (target.atk >= this.def) {
      this.hp -= (monster.atk - this.def);
    } else {
      $message.textContent = `Defense Success!`;
    }
  }
}

// Monster 클래스 생성하기
class Monster {
  constructor(game, name, hp, exp, atk, def) {
    this.game = game;
    this.name = name;
    this.lv = 1;
    this.maxHp = hp;
    this.hp = hp;
    this.exp = exp;
    this.atk = atk;
    this.def = def;
  }
  attack(target) {
    target.hp -= (this.atk - target.def*0.5);
  }
}

let game = null;
// Game 시작하기
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['start__input'].value;
  game = new Game(name);
});