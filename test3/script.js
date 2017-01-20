'use strict';

let mainInterval = null;

const playerOneSelector = document.querySelector("#player-one");
const playerTwoSelector = document.querySelector("#player-two");

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

















// Arenas

const defaultArena = {
  arenaWidth: undefined,
  arenaHeight: undefined,
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
    this.arenaData.arenaWidth = this.arenaData.selector.offsetWidth;
    this.arenaData.arenaHeight = this.arenaData.selector.offsetHeight;
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






















const cyrax = {
  name: "cyrax",
  soundName: new Audio('audio/names/cyrax.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/cyrax.gif",
  previewImg: "img/players-list/versus/cyrax.png",
  playerPosX: 0,
  playerPosY: 0,
  playerWidth: 100,
  playerHeight: 150,
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
  playerWidth: 100,
  playerHeight: 150,
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
  jumpHeight: 200,
  handKicktime: 500,
  footKicktime: 1000,
  isDamaged: false,
  defeated: false,
  canRun: true,
  pushing: false,
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
    if(this.playerData.playerPosX >= 0 && this.playerData.playerPosX <= currentArena.arenaData.arenaWidth){
      let newPosition = parseInt(this.playerData.playerSelector.style[direction]) - speed
      if (newPosition < 0) {
        newPosition = 0;
      }
      if (newPosition > currentArena.arenaData.arenaWidth - this.playerData.playerWidth) {
        newPosition = currentArena.arenaData.arenaWidth - this.playerData.playerWidth;
      }
      this.playerData.playerSelector.style[direction] = newPosition + 'px';
      this.playerData.playerPosX = newPosition;
    }
    
  }

  setStartData(){
    this.playerData.playerSelector.style.width = this.playerData.playerWidth + 'px';
    this.playerData.playerSelector.style.height = this.playerData.playerHeight + 'px';
  }

  moveForward(){
    this.movePlayer("right", this.playerData.speed);
  }
  moveBackward(){
    this.movePlayer("left", this.playerData.speed);
  }
  moveTop(){
    jump(this);
  }
  moveDown(){
   
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
playerOne.playerData.playerSelector = playerOneSelector;
playerOne.setStartData();
setPlayerStartPos(playerOne);



// Create player 2
let playerTwo = new player(kabal);
playerTwo.playerData.keycodes = playerTwoKeycodes;
playerTwo.playerData.playerSelector = playerTwoSelector;
playerTwo.setStartData();
setPlayerStartPos(playerTwo);





document.addEventListener("keydown", funcKeyDown);
document.addEventListener("keyup", funcKeyUp);

mainInterval = setInterval(game,10);

















//let playerPosDiff;



// Functions ------------------------------------------------------------------------------------------------------------

function setPlayerStartPos(player){
  let playersDistance = currentArena.arenaData.arenaWidth / 8;
  if(player == playerOne){
    playersDistance = -playersDistance - player.playerData.playerWidth;
  }
  player.playerData.playerPosX = parseInt((currentArena.arenaData.arenaWidth / 2) + playersDistance);
  player.playerData.playerSelector.style.left = player.playerData.playerPosX +'px';
  player.playerData.playerSelector.style.bottom = player.playerData.playerPosY + 'px';
}

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
  if(playerTwo.playerData.playerPosX > playerOne.playerData.playerPosX){
    if(!playerTwo.playerData.playerSelector.classList.contains("flipped")){
      playerTwo.playerData.playerSelector.classList.add("flipped")
      if(playerOne.playerData.playerSelector.classList.contains("flipped")){
        playerOne.playerData.playerSelector.classList.remove("flipped")
      }
    }
  }
  else{
    if(playerTwo.playerData.playerSelector.classList.contains("flipped")){
      playerTwo.playerData.playerSelector.classList.remove("flipped")
      if(!playerOne.playerData.playerSelector.classList.contains("flipped")){
        playerOne.playerData.playerSelector.classList.add("flipped")
      }
    }
  }
  playerPosDiff()
}

function funcKeyDown(event){
  playerOne.doAction(event.keyCode, event.type);
  playerTwo.doAction(event.keyCode, event.type);
}

function funcKeyUp(event){
  playerOne.doAction(event.keyCode, event.type);
  playerTwo.doAction(event.keyCode, event.type);
}




function jump(player){
  if (player.playerData.jumpEnd) {
    player.playerData.keyPressedJump = true;
    player.playerData.jumpEnd = false;
    player.setDataClass("moveTop");
    toTop(function(){
      toBottom(function(){
        jumpEnd(player);
      });
    });
  }
  function toTop(callbackFn){
    setTimeout(function() {
      player.playerData.playerSelector.style.bottom = parseInt(player.playerData.playerSelector.style.bottom) + 6 + 'px';
      if (parseInt(player.playerData.playerSelector.style.bottom) > player.playerData.jumpHeight){
        callbackFn();
      } 
      else {
        toTop(callbackFn);
      }
    }, 10);
  }
  function toBottom(callbackFn){
    setTimeout(function() {
      player.playerData.playerSelector.style.bottom = parseInt(player.playerData.playerSelector.style.bottom) - 6 + 'px';
      if (parseInt(player.playerData.playerSelector.style.bottom) > 0){
        toBottom(callbackFn);
      } 
      else {
        callbackFn();
      }
    }, 10);
  }
  function jumpEnd(player){
    player.playerData.jumpEnd = true;
    player.removeDataClass("moveTop");
  }
}




function playerPosDiff(){
  let posDiff = playerOne.playerData.playerPosX - playerTwo.playerData.playerPosX;
 // console.log(posDiff);
  if(posDiff + playerOne.playerData.playerWidth > 0){
    playerTwo.playerData.playerPosX += 1;
  }
}
