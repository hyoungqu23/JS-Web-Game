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
const $startInput = document.querySelector('#start__input');
const $warriorBtn = document.querySelector('#warrior__btn');
const $archorBtn = document.querySelector('#archer__btn');
const $assassinBtn = document.querySelector('#assassin__btn');
const $gameMenu = document.querySelector('#game__menu');
const $gameInput = document.querySelector('#menu__input');
const $adventureBtn = document.querySelector('#menu__adventure');
const $shopBtn = document.querySelector('#menu__shop');
const $restBtn = document.querySelector('#menu__rest');
const $endBtn = document.querySelector('#menu__end');

const $battleMenu = document.querySelector('#battle__menu');
const $battleInput = document.querySelector('#battle__input');
const $attackBtn = document.querySelector('#battle__attack');
const $healBtn = document.querySelector('#battle__heal');
const $defenseBtn = document.querySelector('#battle__defense');
const $runBtn = document.querySelector('#battle__run');

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
    // this.heroJobList = [
    //   { job: 'warrior', atk: 10, def: 20, },
    //   { job: 'archer', atk: 20, def: 10, },
    //   { job: 'assassin', atk: 30, def: 5, },
    // ];
    this.start(name); // 게임 시작
  }
  start(name) { // 게임 시작 후 특정 동작 수행
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
    this.hero = new Hero(this, name, job);
    this.updateHeroStat();
    this.showMessage('');
  }
  changeScreen(screen) {
    if (screen === 'start') {
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu__input'].value;
    if (input === 'adventure') {
      this.changeScreen('battle');
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
      const { hero } = this;
      hero.hp = hero.maxHp;
      this.updateHeroStat();
      this.showMessage(`${hero.name}(Lv. ${hero.lv}) got enough rest.`)
    } else if (input === 'end') {
      this.showMessage('');
      this.quit();
    }
  }
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle__input'].value;
    if (input === 'attack') {
      const { hero, monster } = this;
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) {
        this.showMessage(`${hero.name}(Lv. ${hero.lv}) has been killed. Create a new character.`);
        this.quit();
      } else if (monster.hp <= 0) {
        this.showMessage(`${hero.name}(Lv. ${hero.lv}) has finished ${monster.name}. ${hero.name}(Lv. ${hero.lv}) got ${monster.exp} Exp.`);
        hero.getExp(monster.exp);
        this.monster = null;
        this.changeScreen('game');
      } else {  // 전투 진행중
        this.showMessage(`${hero.name} attacked the monster as much as ${(hero.atk - 0.5 * monster.def >= 0) ? hero.atk - 0.5 * monster.def : 0} damage, and received ${monster.atk - 0.5 * hero.def} damage.`);
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === 'heal') {
      const { hero, monster } = this;
      hero.hp = Math.min(hero.maxHp, hero.hp + 20);
      monster.attack(hero);
      if (hero.hp <= 0) {
        this.showMessage(`${hero.name}(Lv. ${hero.lv}) has been killed. Create a new character.`);
        this.quit();
      } else if (monster.hp <= 0) {
        this.showMessage(`${hero.name}(Lv. ${hero.lv}) has finished ${monster.name}. ${hero.name}(Lv. ${hero.lv}) got ${monster.exp} Exp.`);
        hero.getExp(monster.exp);
        this.monster = null;
        this.changeScreen('game');
      } else {  // 전투 진행중
        this.showMessage(`${hero.name} received ${monster.atk - 0.5 * hero.def} damage.`);
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === 'defense') {
      const { hero, monster } = this;
      hero.defense(monster);
      monster.attack(hero);
      if (hero.hp <= 0) {
        this.showMessage(`${hero.name}(Lv. ${hero.lv}) has been killed. Create a new character.`);
        this.quit();
      } else if (monster.hp <= 0) {
        this.showMessage(`${hero.name}(Lv. ${hero.lv}) has finished ${monster.name}. ${hero.name}(Lv. ${hero.lv}) got ${monster.exp} Exp.`);
        hero.getExp(monster.exp);
        this.monster = null;
        this.changeScreen('game');
      } else {  // 전투 진행중
        this.showMessage(`${hero.name} attacked the monster as much as ${(hero.atk - 0.5 * monster.def >= 0) ? hero.atk - 0.5 * monster.def : 0} damage, and received ${monster.atk - 0.5 * hero.def} damage.`);
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === 'run') {
      this.changeScreen('game');
      this.showMessage(`${this.hero.name}(Lv. ${this.hero.lv}) ran away.`);
      this.monster = null;
      this.updateMonsterStat();
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
    $heroJob.textContent = `Class: ${hero.job}`;
    $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`;
    $heroExp.textContent = `EXP: ${hero.exp} / ${15 * hero.lv}`;
    $heroAtk.textContent = `ATK: ${hero.atk}`;
    $heroDef.textContent = `DEF: ${hero.def}`;
  }
  updateMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterAtk.textContent = '';
      $monsterDef.textContent = '';
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
    $monsterAtk.textContent = `ATK: ${monster.atk}`;
    $monsterDef.textContent = `DEF: ${monster.def}`;
  }
  showMessage(text) {
    $message.textContent = text;
  }
  quit() {  // 게임 종료
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start');
    game = null;
  }
}

// Unit 클래스 생성하기
class Unit {
  constructor(game, name, hp, exp, atk, def) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.exp = exp;
    this.atk = atk;
    this.def = def;
  }
  attack(target) {
    if (this.atk >= target.def * 0.5) {
      target.hp -= (this.atk - target.def * 0.5);
    } else {
      target.hp -= 0;
    }
  }
}

// Hero 클래스 생성하기
class Hero extends Unit {
  constructor(game, name, job) {
    super(game, name, 100, 0, 20, 10);
    this.lv = 1;
    this.job = job;
  }
  defense(target) {
    if (target.atk >= this.def * 0.5) {
      this.hp -= (target.atk - this.def*0.5);
    } else {
      this.showMessage('Defense Success!');
    }
  }
  getExp(exp) {
    this.exp += exp;
    if (this.exp >= this.lv * 15) {
      this.exp -= this.lv * 15;
      this.lv++;
      this.maxHp += 10;
      this.atk += 5;
      this.def += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`Level UP! ${this.name}(Lv. ${this.lv}) has become stronger.`);
    }
  }
}

// Monster 클래스 생성하기
class Monster extends Unit {
  constructor(game, name, hp, exp, atk, def) {
    super(game, name, hp, exp, atk, def);
  }
}

let job;
const selectJob = (event) => {
  job = event.target.textContent;
};

const writeInput = ($input) => (event) => {
  $input.value = event.target.textContent;
}

// Game 시작하기
let game = null;
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['start__input'].value;
  game = new Game(name);
});

$warriorBtn.addEventListener('click', selectJob);
$archorBtn.addEventListener('click', selectJob);
$assassinBtn.addEventListener('click', selectJob);

$adventureBtn.addEventListener('click', writeInput($gameInput));
$shopBtn.addEventListener('click', writeInput($gameInput));
$restBtn.addEventListener('click', writeInput($gameInput));
$endBtn.addEventListener('click', writeInput($gameInput));

$attackBtn.addEventListener('click', writeInput($battleInput));
$healBtn.addEventListener('click', writeInput($battleInput));
$defenseBtn.addEventListener('click', writeInput($battleInput));
$runBtn.addEventListener('click', writeInput($battleInput));