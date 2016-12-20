//
// Main code
//

var playerData = {
  moveTop: false,
  moveForward: false,
  moveDown: false,
  moveBackward: false,
  handkick: false,
  footkick: false,
  moverun: false,
  block: false,
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
  life: 100,
  isDamaged: false,
  defeated: false,
  canRun: true,
  speed: 1,
  handKickDamage: 1,
  footKickDamage: 1,
  blockedDamage: 1,
  pushing: false,
  kick: kickFunc
}



var playerOneData = {
  parent: playerData,
  playerModel: "test"
}


function kickFunc(param){
  console.log(this.moveTop + " " + param);
}


playerData.kick(1);
