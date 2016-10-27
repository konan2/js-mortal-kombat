//
// Main code
//

// Data

var player = {
  playerSelector: document.getElementById("player1"),
  moveTop: false,
  moveForward: false,
  moveBottom: false,
  moveBack: false,
  handkick: false,
  footkick: false,
  moverun: false,
  block: false,
  playerPosX: 0,
  playerPosY: 0,
  playerWidth: 150,
  playerHeight: 138,
  keyPressedHandkick: false,
  keyPressedFootkick: false,
  keyPressedJump: false,
  footKickEnd: true,
  handKickEnd: true,
  jumpEnd: true,
  life: 100,
  isDamaged: false,
  moveForwardInterval: null,
  moveBackInterval: null,
  moveRunInterval: null,
  defeated: false,
  canRun: true
};


var playerWidth = 72;
var playerHeight = 262;

var getPosInterval = null;

var handKickDamage = 5;
var footKickDamage = 10;


var playerPosDiff;
var playerPosDiffJump;

var levelWrapper = document.querySelector(".wrapper");

var levelWidth = levelWrapper.offsetWidth;

var direction;

///////////////////////////

function game(){
  document.addEventListener("keydown", funcKeyDown);
  document.addEventListener("keyup", funcKeyUp);
  move();
}



function funcKeyDown(event){

  switch (event.keyCode) {
    case 40:
      player.moveTop = true;
      break;
    case 37:
      player.moveForward = true;
      break; 
    case 38:
      player.moveBottom = true;
      break;
    case 39:
      player.moveBack = true;
      break;
  }
}

function funcKeyUp(event){
   switch (event.keyCode) {
      case 40:
        player.moveTop = false;
        break;
      case 37:
        player.moveForward = false;
        break; 
      case 38:
        player.moveBottom = false;
        break;
      case 39:
        player.moveBack = false;
        break;
    }
}



function move(){
  if(player.moveTop){
    direction = 'bottom';
        player.playerSelector.style[direction] = parseInt(player.playerSelector.style[direction] ) - 1 + 'px';
  }
  if(player.moveForward){
    direction = 'left';
        player.playerSelector.style[direction] = parseInt(player.playerSelector.style[direction] ) - 1 + 'px';
  }
  if(player.moveBottom){
    direction = 'bottom';
        player.playerSelector.style[direction] = parseInt(player.playerSelector.style[direction] ) + 1 + 'px';
  }
  if(player.moveBack){
    direction = 'left';
        player.playerSelector.style[direction] = parseInt(player.playerSelector.style[direction] ) + 1 + 'px';
  }
   

  }




// Main interval

getPosInterval = setInterval(function(){
  game();
});


