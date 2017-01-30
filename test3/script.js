'use strict';

let mainInterval = null;
let posDiff = undefined;


const playerOneSelector = document.querySelector("#player-one");
const playerOneSelectorShadow = document.querySelector("#player-one .shadow");
const playerTwoSelectorShadow = document.querySelector("#player-two .shadow");
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
  sky: 'url(img/levels/temple/temple-bg.jpg) no-repeat center 70%',
  clouds: 'transparent',
  decor: 'url(img/levels/temple/temple-decor.png)',
  ground: 'url(img/levels/temple/temple-floor.png) repeat-x center/100% 100%'
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

class Arena{
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

let currentArena = new Arena();

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
  speed: 4,
  kickHandDamage: 2,
  kickFootDamage: 4,
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
  kickHandDamage: 3,
  kickFootDamage: 5,
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
  jumpHeight: 300,
  jumpTime: 10,
  kickTime: 100, // time while opponent is damaged
  kickHandTime: 500, // time before kick
  kickFootTime: 1000, // time before kick
  isDamaged: false,
  defeated: false,
  canRun: true,
  pushing: false,
  keycodes: undefined,
  opponent: undefined,
  controls: {}
};


class Player {
  constructor(params) {
    this.name = params.name;
    this.playerData = Object.assign({}, defautlPlayerData, params, {
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
      if(eventType === "keydown" && !this.playerData.controls[actionName]) {// if control action is false
        if(this.isMovementAction(event) || actionName == "moveTop"){
          this.setDataClass(actionName);
        }
        else{
          this.playerData.playerSelector.classList.add(actionName);
          setTimeout(() => { 
            this.playerData.controls.kickHand = true;
            console.log(this.playerData.controls.kickHand);
            console.log(posDiff);
            if(posDiff <= this.opponent.playerData.playerWidth + this.opponent.playerData.playerWidth / 10){ // if kick zone == opponent width + 10
              this.makeDamage(actionName);
            }
            setTimeout(() => { 
              this.playerData.controls.kickHand = false;
              this.playerData.playerSelector.classList.remove(actionName);
              console.log(this.playerData.controls.kickHand);
            }, this.playerData.kickTime); // time while opponent is damaged
          }, this.playerData[actionName + "Time"]); // time before kick
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


  setPlayerData(){
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
    this.playerData.playerPosY = parseInt(this.playerData.playerSelector.style.bottom);
    if (this.playerData.jumpEnd) {
      this.playerData.keyPressedJump = true;
      this.playerData.jumpEnd = false;
      this.setDataClass("moveTop");
      this.toTop( () => {
        this.toBottom( () =>{
          this.jumpEnd();
        });
      });
    }
  }
  toTop(callbackFn){
    setTimeout(() => {
      this.playerData.playerSelector.style.bottom = parseInt(this.playerData.playerSelector.style.bottom) + 6 + 'px';
      this.playerData.playerSelectorShadow.style.left = parseInt(this.playerData.playerSelectorShadow.style.left) - 3 + 'px';
      this.playerData.playerSelectorShadow.style.bottom = parseInt(this.playerData.playerSelectorShadow.style.bottom) - 5 + 'px';
      if (parseInt(this.playerData.playerSelector.style.bottom) > this.playerData.jumpHeight){
        callbackFn();
      } 
      else {
        this.toTop(callbackFn);
      }
    }, this.playerData.jumpTime);
  }
  toBottom(callbackFn){
    setTimeout(() => {
      this.playerData.playerSelector.style.bottom = parseInt(this.playerData.playerSelector.style.bottom) - 6 + 'px';
      this.playerData.playerSelectorShadow.style.left = parseInt(this.playerData.playerSelectorShadow.style.left) + 3 + 'px';
      this.playerData.playerSelectorShadow.style.bottom = parseInt(this.playerData.playerSelectorShadow.style.bottom) + 5 + 'px';
      if (parseInt(this.playerData.playerSelector.style.bottom) > 0){
        this.toBottom(callbackFn);
      } 
      else {
        callbackFn();
      }
    }, this.playerData.jumpTime);
  }
  jumpEnd(){
    this.playerData.jumpEnd = true;
    this.removeDataClass("moveTop");
  }

  makeDamage(kicktype){
    this.opponent.playerData.playerSelector.classList.add("damaged");
    this.opponent.playerData.isDamaged = true;
    this.opponent.playerData.life = this.opponent.playerData.life - this.playerData[kicktype + "Damage"];
    if(this.opponent.playerData.life < 0){
      this.opponent.playerData.life = 0;
    }
    console.log(this.opponent.name + " life level is:" + this.opponent.playerData.life);
    setTimeout(() => {
      this.opponent.playerData.playerSelector.classList.remove("damaged");
      this.opponent.playerData.isDamaged = false;
    }, this.playerData.kickTime); // time while opponent is damaged
  }

  kickHand(){}
  
  kickFoot(){}

  moveRunning(){
    
  }

  moveDown(){
    
  }

  makeBlock(){
    
  }
  
  playerPosDiff(){
    posDiff = Math.abs(this.playerData.playerPosX - this.opponent.playerData.playerPosX);

    // Set flipped class
    if(this.playerData.playerPosX > this.opponent.playerData.playerPosX){
      this.playerData.playerSelector.classList.add("flipped");
      this.opponent.playerData.playerSelector.classList.remove("flipped");
    }

    // Pushing
    if(posDiff <= this.opponent.playerData.playerWidth && 
       this.playerData.playerPosY < this.opponent.playerData.playerHeight * 0.8 && 
       this.playerData.playerPosY >= this.opponent.playerData.playerPosY * 0.8 || 
       // Jump collision
       posDiff < this.opponent.playerData.playerWidth && 
       this.playerData.playerPosY > 10 && this.opponent.playerData.playerPosY > 10
       ){
      if(this.playerData.playerPosX <= this.opponent.playerData.playerPosX){
        this.movePlayer("left", this.playerData.speed);
        this.opponent.movePlayer("right", this.opponent.playerData.speed);
      }
      if(this.playerData.playerPosX > this.opponent.playerData.playerPosX){
        this.movePlayer("right", this.playerData.speed);
        this.opponent.movePlayer("left", this.opponent.playerData.speed);
      }
    }
  }
}


// Create player 1
let playerOne = new Player(cyrax);
playerOne.playerData.keycodes = playerOneKeycodes;
playerOne.playerData.playerSelector = playerOneSelector;
playerOne.playerData.playerSelectorShadow = playerOneSelectorShadow;
playerOne.setPlayerData();
setPlayerStartPos(playerOne);





// Create player 2
let playerTwo = new Player(kabal);
playerTwo.playerData.keycodes = playerTwoKeycodes;
playerTwo.playerData.playerSelector = playerTwoSelector;
playerTwo.playerData.playerSelectorShadow = playerTwoSelectorShadow;
playerTwo.setPlayerData();
setPlayerStartPos(playerTwo);



playerOne.opponent = playerTwo;
playerTwo.opponent = playerOne;


document.addEventListener("keydown", funcKeyDown);
document.addEventListener("keyup", funcKeyUp);

mainInterval = setInterval(game,10);










// class Game{
//    constructor(player1, player2, arena){
    
//   }
// }

// let game = new Game(playerOne, playerTwo, currentArena);











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

  // Pushing feature, flipped class setting
  playerOne.playerPosDiff();
  playerTwo.playerPosDiff();

}



function funcKeyDown(event){
  playerOne.doAction(event.keyCode, event.type);
  playerTwo.doAction(event.keyCode, event.type);
  // console.log(playerOne.playerData.controls.kickHand)
}

function funcKeyUp(event){
  playerOne.doAction(event.keyCode, event.type);
  playerTwo.doAction(event.keyCode, event.type);
  // console.log(playerOne.playerData.controls.kickHand)
}




