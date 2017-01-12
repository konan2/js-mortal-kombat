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

var cyrax = {
  name: "cyrax",
  soundName: new Audio('audio/names/cyrax.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/cyrax.gif",
  previewImg: "img/players-list/versus/cyrax.png",
  speed: 3,
  handKickDamage: 2,
  footKickDamage: 4,
  blockedDamage: 1
}

var kabal = {
  name: "kabal",
  soundName: new Audio('audio/names/kabal.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/kabal.gif",
  previewImg: "img/players-list/versus/kabal.png",
  speed: 2,
  handKickDamage: 3,
  footKickDamage: 5,
  blockedDamage: 2
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
  playerPosX: 0,
  playerPosY: 0,
  playerWidth: 150,
  playerHeight: 262,
  keyPressedJump: false,
  footKickEnd: true,
  handKickEnd: true,
  attack: false,
  jumpEnd: true,
  jumpHeight: 180,
  isDamaged: false,
  defeated: false,
  canRun: true,
  speed: 1,
  handKickDamage: 1,
  footKickDamage: 1,
  blockedDamage: 1,
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

  doAction(eventCode, eventType){
    var AllkeyCodes = Object.keys(this.playerData.keycodes);

    if(AllkeyCodes.includes(eventCode.toString())){
      let actionName = this.playerData.keycodes[eventCode];
      if(eventType === "keydown") {
        if(!this.playerData.controls[actionName]){
          this.playerData.controls[actionName] = true;
        }

        //this[actionName]();
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
    this.movePlayer("right", 1);
  }
  moveBackward(){
    this.movePlayer("left", 1);
  }
  moveTop(){
    this.movePlayer("top", 1);
  }
  moveDown(){
    this.movePlayer("bottom", 1);
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

// создать игрока 1
let playerOne = new player(cyrax);
playerOne.playerData.keycodes = playerOneKeycodes;
playerOne.playerData.playerSelector = document.querySelector("#player-one");


// создать игрока 2
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
