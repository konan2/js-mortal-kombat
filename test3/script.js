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

const cyrax = {
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

const kabal = {
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
    kickHand: false,
    kickFoot: false,
    moveRunning: false,
    makeBlock: false
  };

const defautlPlayerData = {
  life: 100,
  keyPressedJump: false,
  footKickEnd: true,
  handKickEnd: true,
  attack: false,
  jumpEnd: true,
  jumpHeight: 2000,
  handKicktime: 500,
  footKicktime: 1000,
  isDamaged: false,
  defeated: false,
  canRun: true,
  keycodes: undefined,
  controls: {}
};


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

  isMovementAction(event) { // Check is this key for movements
    let movementCodes = [];
    for (let code of Object.keys(this.playerData.keycodes)) {
      if (["moveForward", "moveBackward", "moveDown"].includes(this.playerData.keycodes[code])) {
        movementCodes.push(code);
      }
    }
    return movementCodes.includes(event.keyCode.toString()); // returns true or false
  }

  doAction(eventCode, eventType){
    var AllkeyCodes = Object.keys(this.playerData.keycodes);
    if(AllkeyCodes.includes(eventCode.toString())){
      let actionName = this.playerData.keycodes[eventCode];
      if(eventType === "keydown") {
        if(!this.playerData.controls[actionName]){
          this.setDataClass(actionName);
          if(actionName == 'kickHand'){
            setTimeout(
              () => { // let _this = this;
                 this.removeDataClass(actionName);
              }, this.playerData.handKicktime
            );
          }
          if(actionName == 'kickFoot'){
            setTimeout(
              () => { // let _this = this;
                 this.removeDataClass(actionName);
              }, this.playerData.footKicktime
            );
          }
          if(actionName == 'moveTop'){
            setTimeout(
              () => { // let _this = this;
                 this.removeDataClass(actionName);
              }, this.playerData.jumpHeight
            );
          }
        }
      }
      if(eventType === "keyup" && this.isMovementAction(event)){
        this.removeDataClass(actionName);
      }
    }
  }

  setDataClass(action){
    this.playerData.controls[action] = true;
    this.playerData.playerSelector.classList.add([action]);
  }

  removeDataClass(action){
    this.playerData.controls[action] = false;
    this.playerData.playerSelector.classList.remove([action]);
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
    //this.movePlayer("top", this.playerData.speed);
  }
  moveDown(){
    //this.movePlayer("bottom", this.playerData.speed);
  }
  kickHand(){
    
  }
  kickFoot(){
    
  }
  moveRunning(){
    
  }
  makeBlock(){
    
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



































// Arenas

const defaultArena = {
  width: '100%',
  height: '100%',
  selector: document.querySelector("#arena"),
  decorSelectors: {
    skySelector: document.querySelector(".arena-decor__item_sky"),
    cloudsSelector: document.querySelector(".arena-decor__item_clouds"),
    decorSelector: document.querySelector(".arena-decor__item_decor"),
    groundSelector: document.querySelector(".arena-decor__item_ground")
  }
}

const temple = {
  name: 'temple',
  sky: 'url(img/levels/temple/temple-bg.jpg)',
  clouds: 'transparent',
  decor: 'url(img/levels/temple/temple-decor.png)',
  ground: 'url(img/levels/temple/temple-floor.png)'
}

const church = {
  name: 'church',
  sky: 'url(img/levels/church/church-bg.png)',
  clouds: 'transparent',
  decor: 'transparent',
  ground: 'url(img/levels/church/church-floor.png)'
}

const shaoKahnPlace = {
  name: 'shaoKahnArena',
  sky: 'url(img/levels/arena/arena-bg.jpg)',
  clouds: 'transparent',
  decor: 'transparent',
  ground: 'transparent'
}

const plant = {
  name: 'plant',
  sky: 'url(img/levels/plant/plant-bg.jpg)',
  clouds: 'transparent',
  decor: 'url(img/levels/plant/floor-decor.png)',
  ground: 'url(img/levels/plant/plant-floor.jpg)'
}

const spaceship = {
  name: 'spaceship',
  sky: 'url(img/levels/spaceship/spaceship-bg.png)',
  clouds: 'url(img/levels/spaceship/space-sky.jpg)',
  decor: 'transparent',
  ground: 'transparent'
}

const vulkano = {
  name: 'vulkano',
  sky: 'url(img/levels/vulkano/vulkano-bg.png)',
  clouds: 'transparent',
  decor: 'transparent',
  ground: 'transparent'
}

const bunker = {
  name: 'bunker',
  sky: 'url(img/levels/bunker/bunker-bg.jpg)',
  clouds: 'transparent',
  decor: 'transparent',
  ground: 'transparent'
}

const mars = {
  name: 'mars',
  sky: 'url(img/levels/mars/mars-bg.png)',
  clouds: 'url(img/levels/desert/clouds3.png)',
  decor: 'url(img/levels/mars/2.jpg)',
  ground: 'transparent'
}

const desert = {
  name: 'desert',
  sky: 'url(img/levels/desert/8.jpg)',
  clouds: 'url(img/levels/desert/clouds3.png)',
  decor: 'url(img/levels/desert/p_2.png)',
  ground: 'url(img/levels/desert/p_1.gif)'
}


const portal = {
  name: 'portal',
  sky: 'url(img/levels/portal/sky-portal.jpg)',
  clouds: 'url(img/levels/portal/portal-cloud.png)',
  decor: 'url(img/levels/desert/p_2.png)',
  ground: 'url(img/levels/portal/p_1.png)'
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
    this.setArenaDecorStyles(allArenas[index]);
  }
  setArenaDecorStyles(object){
    let objKeyIndex = 1;
    let objKeysArray = Object.keys(object);
    for (let property in defaultArena.decorSelectors) {
      defaultArena.decorSelectors[property].setAttribute("style", "background:" + object[objKeysArray[objKeyIndex]] + ";");
      objKeyIndex++;
    }
  }
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

