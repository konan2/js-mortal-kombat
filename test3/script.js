'use strict';

let mainInterval = null;

let playerOneKeycodes = {
  87: "moveTop",
  68: "moveForward",
  65: "moveBackward",
  83: "moveDown",
  82: "kickHand",
  84: "kickFoot",
  81: "moveRunning",
  70: "makeBlock"
}

let playerTwoKeycodes = {
  38: "moveTop",
  39: "moveForward",
  37: "moveBackward",
  40: "moveDown",
  103: "kickHand",
  104: "kickFoot",
  100: "moveRunning",
  101: "makeBlock"
}

let cyrax = {
  name: "cyrax",
  soundName: new Audio('audio/names/cyrax.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/cyrax.gif",
  previewImg: "img/players-list/versus/cyrax.png",
  playerPosX: 0,
  playerPosY: 0,
  playerWidth: 150,
  playerHeight: 262,
  speed: 3,
  handKickDamage: 2,
  footKickDamage: 4,
  blockedDamage: 1
}

let kabal = {
  name: "kabal",
  soundName: new Audio('audio/names/kabal.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/kabal.gif",
  previewImg: "img/players-list/versus/kabal.png",
  playerPosX: 0,
  playerPosY: 0,
  playerWidth: 150,
  playerHeight: 262,
  speed: 2,
  handKickDamage: 3,
  footKickDamage: 5,
  blockedDamage: 2
}

const gameData = {
  roundDuration: 20,
  roundTime: undefined,
  roundsMaxCount: 3,
  currentRound: 0,
  musicEnabled: true,
  soundsEnabled: true,
  playerOneChoosen: false,
  playerTwoChoosen: false,
  playersAreChoosen: false,
  roundStarted: false,
  roundEnded: false
}

const defaultControls = {
    moveTop: false,
    moveForward: false,
    moveDown: false,
    moveBackward: false,
    handkick: false,
    footkick: false,
    moverun: false,
    block: false
  };

const defautlPlayerData = {
  life: 100,
  keyPressedJump: false,
  footKickEnd: true,
  handKickEnd: true,
  attack: false,
  jumpEnd: true,
  jumpHeight: 180,
  isDamaged: false,
  defeated: false,
  canRun: true,
  keycodes: undefined,
  controls: {}
};










// Arenas

const defaultArena = {
  width: '100%',
  height: '100%',
  selector: document.querySelector("#arena"),
  skySelector: document.querySelector(".arena-decor__item_sky"),
  decorSelector: document.querySelector(".arena-decor__item_decor"),
  groundSelector: document.querySelector(".arena-decor__item_ground")
}




let temple = {
  name: 'temple',
  sky: 'img/levels/temple/temple-bg.jpg',
  decor: 'img/levels/temple/temple-decor.png',
  ground: 'img/levels/temple/temple-floor.png'
}

let church = {
  name: 'church',
  sky: 'img/levels/church/church-bg.png',
  ground: 'img/levels/church/church-floor.png'
}

let shaoKahnPlace = {
  name: 'shaoKahnArena',
  sky: 'img/levels/arena/arena-bg.jpg'
}

let plant = {
  name: 'plant',
  sky: 'img/levels/plant/plant-bg.jpg',
  decor: 'img/levels/plant/floor-decor.png',
  ground: 'img/levels/plant/plant-floor.jpg'
}

let spaceship = {
  name: 'spaceship',
  sky: 'img/levels/spaceship/spaceship-bg.png',
  clouds: 'img/levels/spaceship/space-sky.jpg',
  decor: 'img/levels/plant/floor-decor.png',
  ground: 'img/levels/plant/plant-floor.jpg'
}

let vulkano = {
  name: 'vulkano',
  sky: 'img/levels/vulkano/vulkano-bg.png'
}

let bunker = {
  name: 'bunker',
  sky: 'img/levels/bunker/bunker-bg.jpg'
}

let mars = {
  name: 'mars',
  sky: 'img/levels/mars/mars-bg.png',
  clouds: 'img/levels/desert/clouds3.png',
  decor: 'img/levels/mars/2.jpg'
}

let desert = {
  name: 'desert',
  sky: 'img/levels/desert/8.jpg',
  clouds: 'img/levels/desert/clouds3.png',
  decor: 'img/levels/desert/p_2.png',
  ground: 'img/levels/desert/p_1.gif'
}


let portal = {
  name: 'portal',
  sky: 'img/levels/portal/sky-portal.jpg',
  clouds: 'img/levels/portal/portal-cloud.png',
  ground: 'img/levels/portal/p_1.png'
}


let allArenas = [temple, church, shaoKahnPlace, plant, spaceship, vulkano, bunker, mars, desert, portal];
let allArenasSize = allArenas.length;

class arena{
  constructor(){
    this.arenaCount = 0;
    this.setArena(0);
  }
  setArena(index){
    this.arenaData = Object.assign({}, defaultArena, allArenas[index]);
    this.arenaData.selector.classList = allArenas[index].name;
    this.arenaData.skySelector.setAttribute("style", "background: url(" + this.arenaData.sky + ");");
    if(this.arenaData.decor){
      this.arenaData.decorSelector.setAttribute("style", "background: url(" + this.arenaData.decor + ");");
    }
    else{
      this.arenaData.decorSelector.removeAttribute("style");
    }
    if(this.arenaData.ground){
      this.arenaData.groundSelector.setAttribute("style", "background: url(" + this.arenaData.ground + ");");
    }
    else{
      this.arenaData.decorSelector.removeAttribute("style");
    }
    //this.setArenaDecorStyles(allArenas[index]);
  }
  // setArenaDecorStyles(object){
  //   for (var property in object) {
  //     console.log(property)
  //     this.arenaData.skySelector.setAttribute("style", "background: url(" + object[property] + ");");
  //   }
  // }
  nextArena(){
    this.arenaCount++;
    if (this.arenaCount >= allArenasSize){
      this.arenaCount = 0;
    }
    this.setArena(this.arenaCount);
  }
  prevArena(){
    this.arenaCount--;
    if (this.arenaCount < 0){
      this.arenaCount = 9;
    }
    this.setArena(this.arenaCount);
  }
  randomArena(){
    this.setArena(RandomValue(allArenasSize));
  }
}

let currentArena = new arena();

// Utility functions

function RandomValue(max){
  return Math.floor(Math.random() * max);
}








class player {
  constructor(params) {
    this.name = params.name;
    this.playerData = Object.assign({}, 
      defautlPlayerData, 
      params, 
      {
        controls: Object.assign({}, defaultControls)
      });
  }

  doAction(eventCode, eventType){
    var AllkeyCodes = Object.keys(this.playerData.keycodes);
    if(AllkeyCodes.includes(eventCode.toString())){
      let actionName = this.playerData.keycodes[eventCode];
      if(eventType === "keydown") {
        if(!this.playerData.controls[actionName]){
          this.playerData.controls[actionName] = true;
        }
      }
      if(eventType === "keyup"){
        this.playerData.controls[actionName] = false;
      }
    }
  }

  movePlayer(direction, speed){
    if(direction === "right"){
      speed = -speed;
      direction = "left";
    }
    if(direction === "top"){
      speed = -speed;
      direction = "bottom";
    }

    this.playerData.playerSelector.style[direction] = parseInt(this.playerData.playerSelector.style[direction]) - speed + 'px';
  }
  moveForward(){
    this.movePlayer("right", this.playerData.speed);
  }
  moveBackward(){
    this.movePlayer("left", this.playerData.speed);
  }
  moveTop(){
    this.movePlayer("top", this.playerData.speed);
  }
  moveDown(){
    this.movePlayer("bottom", this.playerData.speed);
  }
  kickHand(){
    console.log("Hand kick");
  }
  kickFoot(){
    console.log("Foot kick");
  }
  moveRunning(){
    console.log("Move running");
  }
  makeBlock(){
    console.log("Make block");
  }
}

// Create player 1
let playerOne = new player(cyrax);
playerOne.playerData.keycodes = playerOneKeycodes;
playerOne.playerData.playerSelector = document.querySelector("#player-one");


// Create player 2
let playerTwo = new player(kabal);
playerTwo.playerData.keycodes = playerTwoKeycodes;
playerTwo.playerData.playerSelector = document.querySelector("#player-two");




function funcKeyDown(event){
  playerOne.doAction(event.keyCode, event.type);
  playerTwo.doAction(event.keyCode, event.type);
}

function funcKeyUp(event){
  playerOne.doAction(event.keyCode, event.type);
  playerTwo.doAction(event.keyCode, event.type);
}


document.addEventListener("keydown", funcKeyDown);
document.addEventListener("keyup", funcKeyUp);

function game(){
  for(let actionName of Object.keys(playerOne.playerData.controls)){
    if(playerOne.playerData.controls[actionName]){
      playerOne[actionName]();
    }
  }

  for(let actionName of Object.keys(playerTwo.playerData.controls)){
    if(playerTwo.playerData.controls[actionName]){
      playerTwo[actionName]();
    }
  }
}


mainInterval = setInterval(game,10);
