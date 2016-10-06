//
// Main code
//

// Keyboard controls

var playerUsedCodes = [];
var player2UsedCodes = [];

var playerKeys = {
  jump: 87,
  forward: 68,
  back: 65,
  bottom: 83,
  handkick: 69,
  footkick: 82,
  run: 81,
  block: 70
}

var player2Keys = {
  jump: 38,
  forward: 39,
  back: 37,
  bottom: 40,
  handkick: 103,
  footkick: 104,
  run: 100,
  block: 101
}

// Data

var playerOneData = {
  playerSelector: document.getElementById("player1"),
  playerLifeSelector: document.getElementById("player1-level"),
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


var playerTwoData = {
  playerSelector: document.getElementById("player2"),
  playerLifeSelector: document.getElementById("player2-level"),
  moveTop: false,
  moveForward: false,
  moveBottom: false,
  moveBack: false,
  handkick: false,
  footkick: false,
  moverun: false,
  block: false,
  playerPosX: 500,
  playerPosY: 262,
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
  defeated: false
};

var player;
var player2;

var playerWidth = 72;
var playerHeight = 262;

var getPosInterval = null;

var handKickDamage = 5;
var footKickDamage = 10;


var playerPosDiff;
var playerPosDiffJump;

var levelWrapper = document.querySelector(".wrapper");
var levelWidth = levelWrapper.offsetWidth;

// audio

insertAudio('foot_kick');
insertAudio('hand_kick');
insertAudio('syborg_run');
insertAudio('desert_level_track');
insertAudio('jump_end');
insertAudio('foot_damage');
insertAudio('hand_damage');
insertAudio('kick-blocked');

//playAudio('desert_level_track', "loop");




// get player keys function

function getPlayerKeys(playerKeys, player2Keys){
  for(var i in playerKeys) {
    playerUsedCodes.push(playerKeys[i]);
  }
  for(var j in player2Keys) {
    player2UsedCodes.push(player2Keys[j]);
  }
}

getPlayerKeys(playerKeys, player2Keys);


///////////////////////////

function getPlayerSide(event){
  if(playerUsedCodes.includes(event.keyCode)){
    player = playerOneData;
    player2 = playerTwoData;
  }
  if(player2UsedCodes.includes(event.keyCode)){
    player = playerTwoData;
    player2 = playerOneData;
  }
}


function funcKeyDown(event){

  getPlayerSide(event);

  // jump
  if((event.keyCode === playerKeys.jump || event.keyCode === player2Keys.jump ) && !playerOneData.block && !playerOneData.moverun){
    player.keyPressedJump = true;
    jump(player);
  }


  // Move forward
  if(event.keyCode === playerKeys.forward && !playerOneData.block && !playerOneData.moverun && !playerOneData.moveBottom && !playerOneData.handkick && !playerOneData.footkick){
    clearInterval(playerOneData.moveForwardInterval);
    playerOneData.playerSelector.classList.add("move-forward");
    playerOneData.moveForwardInterval = setInterval(function(){
      moveForwardFunc(playerOneData);
    });
  }

  // Move forward2
  if(event.keyCode === player2Keys.forward && !playerTwoData.block && !playerTwoData.moverun && !playerTwoData.moveBottom && !playerTwoData.handkick && !playerTwoData.footkick){
    clearInterval(playerTwoData.moveForwardInterval);
    playerTwoData.playerSelector.classList.add("move-forward");
    playerTwoData.moveForwardInterval = setInterval(function(){
      moveForwardFunc(playerTwoData);
    });
  }

  // Move back
  if(event.keyCode === playerKeys.back && !playerOneData.block && !playerOneData.moverun && !playerOneData.moveBottom && !playerOneData.handkick && !playerOneData.footkick){
    clearInterval(playerOneData.moveBackInterval);
    playerOneData.playerSelector.classList.add("move-back");
    playerOneData.moveBackInterval = setInterval(function(){
      moveBackFunc(playerOneData);
    });
  }

  // Move back2
  if(event.keyCode === player2Keys.back && !playerTwoData.block && !playerTwoData.moverun && !playerTwoData.moveBottom && !playerTwoData.handkick && !playerTwoData.footkick){
    clearInterval(playerTwoData.moveBackInterval);
    playerTwoData.playerSelector.classList.add("move-back");
    playerTwoData.moveBackInterval = setInterval(function(){
      moveBackFunc(playerTwoData);
    });
  }

  // Move bottom
  if(event.keyCode === playerKeys.bottom || event.keyCode === player2Keys.bottom){
    clearInterval(player.moveForwardInterval);
    clearInterval(player.moveBackInterval);
    moveBottomFunc(player);
  }

  // Hand kick
  if(event.keyCode === playerKeys.handkick && !playerOneData.handkick && playerOneData.handKickEnd && !playerOneData.footkick){
    playerOneData.keyPressedHandkick = true;
    handKickFunc();
  }

  // Hand kick2
  if(event.keyCode === player2Keys.handkick && !playerTwoData.handkick && playerTwoData.handKickEnd && !playerTwoData.footkick){
    playerTwoData.keyPressedHandkick = true;
    handKickFunc2();
  }

  // Foot kick
  if(event.keyCode === playerKeys.footkick && !playerOneData.footkick && playerOneData.footKickEnd && !playerOneData.handkick){
    playerOneData.keyPressedFootkick = true;
    footKickFunc();
  }

  // Foot kick2
  if(event.keyCode === player2Keys.footkick && !playerTwoData.footkick && playerTwoData.footKickEnd && !playerTwoData.handkick){
    playerTwoData.keyPressedFootkick = true;
    footKickFunc2();
  }

  // Run
  if(event.keyCode === playerKeys.run && !playerOneData.block && !playerOneData.moveTop && playerOneData.jumpEnd && !playerOneData.moveForward && !playerOneData.moveBack){
    clearInterval(playerOneData.moveRunInterval);
    playerOneData.moveRunInterval = setInterval(function(){
      moveRunFunc(playerOneData);
    });
  }

  // Run2
  if(event.keyCode === player2Keys.run && !playerTwoData.block && !playerTwoData.moveTop && playerTwoData.jumpEnd && !playerTwoData.moveForward && !playerTwoData.moveBack){
    clearInterval(playerTwoData.moveRunInterval);
    playerTwoData.moveRunInterval = setInterval(function(){
      moveRunFunc(playerTwoData);
    });
  }

  // Block
  if(event.keyCode === playerKeys.block || event.keyCode === player2Keys.block){
    clearInterval(player.moveForwardInterval);
    clearInterval(player.moveBackInterval);
    clearInterval(player.moveRunInterval);
    blockFunc(player);
  }
}




function funcKeyUp(event){
    getPlayerSide(event);
  // jump
  if(event.keyCode === playerKeys.jump || event.keyCode === player2Keys.jump){
    player.moveTop = false;
    player.keyPressedJump = false;
    player.playerSelector.classList.remove("move-up");
  }


  // Move forward
  if(event.keyCode === playerKeys.forward){
    playerOneData.moveForward = false;
    playerOneData.playerSelector.classList.remove("move-forward");
    clearInterval(playerOneData.moveForwardInterval);
  }

  // Move forward2
  if(event.keyCode === player2Keys.forward){
    playerTwoData.moveForward = false;
    playerTwoData.playerSelector.classList.remove("move-forward");
    clearInterval(playerTwoData.moveForwardInterval);
  }

  // Move back
  if(event.keyCode === playerKeys.back){
    playerOneData.moveBack = false;
    playerOneData.playerSelector.classList.remove("move-back");
    clearInterval(playerOneData.moveBackInterval);
  }

  // Move back2
  if(event.keyCode === player2Keys.back){
    playerTwoData.moveBack = false;
    playerTwoData.playerSelector.classList.remove("move-back");
    clearInterval(playerTwoData.moveBackInterval);
  }

  // Move bottom
  if(event.keyCode === playerKeys.bottom || event.keyCode === player2Keys.bottom){
    player.moveBottom = false;
    player.playerSelector.classList.remove("move-down");
  }

  // Hand kick
  if(event.keyCode === playerKeys.handkick){
    playerOneData.keyPressedHandkick = false;
    playerOneData.handkick = false;
  }

  // Hand kick2
  if(event.keyCode === player2Keys.handkick){
    playerTwoData.keyPressedHandkick = false;
    playerTwoData.handkick = false;
  }

  // Foot kick
  if(event.keyCode === playerKeys.footkick){
    playerOneData.keyPressedFootkick = false;
    playerOneData.footkick = false;
  }

    // Foot kick
  if(event.keyCode === player2Keys.footkick){
    playerTwoData.keyPressedFootkick = false;
    playerTwoData.footkick = false;
  }

  // Run
  if(event.keyCode === playerKeys.run){
    playerOneData.moverun = false;
    playerOneData.playerSelector.classList.remove("move-run");
    clearInterval(playerOneData.moveRunInterval);
  }

  // Run2
  if(event.keyCode === player2Keys.run){
    playerTwoData.moverun = false;
    playerTwoData.playerSelector.classList.remove("move-run");
    clearInterval(playerTwoData.moveRunInterval);
  }

  // Block
  if(event.keyCode === playerKeys.block || event.keyCode === player2Keys.block){
    player.block = false;
    player.playerSelector.classList.remove("block");
    if(player.moveForward){
         player.moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
    if(player.moveBack){
       player.moveBackInterval = setInterval(function(){
        moveBackFunc(player)
      });
    }
  }
}

// Kicks

function handKickFunc(){
  if(!playerOneData.moveTop && playerOneData.moveForward || playerOneData.jumpEnd && playerOneData.moveTop && playerOneData.moveForward ){
    clearInterval(playerOneData.moveForwardInterval);
  }
  if(!playerOneData.moveTop && playerOneData.moveBack || playerOneData.jumpEnd && playerOneData.moveTop && playerOneData.moveBack){
    clearInterval(playerOneData.moveBackInterval);
  }
  if(playerOneData.footKickEnd && !playerOneData.isDamaged){
    playerOneData.handkick = true;
    playerOneData.playerSelector.classList.add("hand-kick");
    playAudio('hand_kick');
    playerOneData.handKickEnd = false;
    setTimeout(function(){
      if(playerOneData.moveForward){
         clearInterval(playerOneData.moveForwardInterval);
         playerOneData.moveForwardInterval = setInterval(function(){
           moveForwardFunc(playerOneData)
        });
      }
      if(playerOneData.moveBack){
         clearInterval(playerOneData.moveBackInterval);
         playerOneData.moveBackInterval = setInterval(function(){
          moveBackFunc(playerOneData);
        });
      }
      playerOneData.handkick = false;
      playerOneData.playerSelector.classList.remove("hand-kick");
      stopAudio('hand_kick');
      playerOneData.handKickEnd = true;
      if(playerOneData.keyPressedHandkick){
        playerOneData.handkick = true;
      }
      else{
        playerOneData.handkick = false;
      }
    }, 300);
    if(playerPosDiff > -85 && playerPosDiff < 85 && playerPosDiffJump < 150){
      if(!playerOneData.jumpEnd){
        playerTwoData.playerSelector.classList.add("hand-damaged");
        
        playerTwoData.isDamaged = true;
        if(playerTwoData.block){
          makeDamage(handKickDamage/3);
          playAudio('kick-blocked');
        }
        else{
          playAudio('hand_damage');
          makeDamage(handKickDamage);
          startBlood(player2);
        }
        setTimeout(function(){
          playerTwoData.playerSelector.classList.remove("hand-damaged");
          playerTwoData.isDamaged = false;
          stopAudio('hand_damage');
          stopAudio('kick-blocked');
        }, 150);
      }
      else{
        setTimeout(function(){
          playerTwoData.playerSelector.classList.add("hand-damaged");
          
          playerTwoData.isDamaged = true;
          if(playerTwoData.block){
            playAudio('kick-blocked');
            makeDamage(handKickDamage/3);
          }
          else{
            playAudio('hand_damage');
            makeDamage(handKickDamage);
            startBlood(player2);
          }
        }, 100);
        setTimeout(function(){
          playerTwoData.playerSelector.classList.remove("hand-damaged");
          playerTwoData.isDamaged = false;
          stopAudio('hand_damage');
          stopAudio('kick-blocked');
        }, 250);
      }
    }
  }
}

function handKickFunc2(){
  if(!playerTwoData.moveTop && playerTwoData.moveForward || playerTwoData.jumpEnd && playerTwoData.moveTop && playerTwoData.moveForward ){
    clearInterval(playerTwoData.moveForwardInterval);
  }
  if(!playerTwoData.moveTop && playerTwoData.moveBack || playerTwoData.jumpEnd && playerTwoData.moveTop && playerTwoData.moveBack){
    clearInterval(playerTwoData.moveBackInterval);
  }
  if(playerTwoData.footKickEnd && !playerTwoData.isDamaged){
    playerTwoData.handkick = true;
    playerTwoData.playerSelector.classList.add("hand-kick");
    playAudio('hand_kick');
    playerTwoData.handKickEnd = false;
    setTimeout(function(){
      if(playerTwoData.moveForward){
         clearInterval(playerTwoData.moveForwardInterval);
         playerTwoData.moveForwardInterval = setInterval(function(){
           moveForwardFunc(playerOneData)
        });
      }
      if(playerTwoData.moveBack){
         clearInterval(playerTwoData.moveBackInterval);
         playerTwoData.moveBackInterval = setInterval(function(){
          moveBackFunc(playerOneData);
        });
      }
      playerTwoData.handkick = false;
      playerTwoData.playerSelector.classList.remove("hand-kick");
      stopAudio('hand_kick');
      playerTwoData.handKickEnd = true;
      if(playerTwoData.keyPressedHandkick){
        playerTwoData.handkick = true;
      }
      else{
        playerTwoData.handkick = false;
      }
    }, 300);
    if(playerPosDiff > -85 && playerPosDiff < 85 && playerPosDiffJump < 150){
      if(!playerTwoData.jumpEnd){
        playerOneData.playerSelector.classList.add("hand-damaged");
        
        playerTwoData.isDamaged = true;
        if(playerOneData.block){
          playAudio('kick-blocked');
          makeDamage(handKickDamage/3);
        }
        else{
          playAudio('hand_damage');
          makeDamage(handKickDamage);
          startBlood(player2);
        }
        setTimeout(function(){
          playerOneData.playerSelector.classList.remove("hand-damaged");
          playerOneData.isDamaged = false;
          stopAudio('hand_damage');
          stopAudio('kick-blocked');
        }, 150);
      }
      else{
        setTimeout(function(){
          playerOneData.playerSelector.classList.add("hand-damaged");
          
          playerOneData.isDamaged = true;
          if(playerOneData.block){
            playAudio('kick-blocked');
            makeDamage(handKickDamage/3);
          }
          else{
            playAudio('hand_damage');
            makeDamage(handKickDamage);
            startBlood(player2);
          }
        }, 100);
        setTimeout(function(){
          playerOneData.playerSelector.classList.remove("hand-damaged");
          playerOneData.isDamaged = false;
          stopAudio('hand_damage');
          stopAudio('kick-blocked');
        }, 250);
      }
    }
  }
}

function footKickFunc(){
  if(!playerOneData.moveTop && playerOneData.moveForward || playerOneData.jumpEnd && playerOneData.moveTop && playerOneData.moveForward){
    clearInterval(playerOneData.moveForwardInterval);
  }
  if(!playerOneData.moveTop && playerOneData.moveBack || playerOneData.jumpEnd && playerOneData.moveTop && playerOneData.moveBack){
    clearInterval(playerOneData.moveBackInterval);
  }
  if(playerOneData.handKickEnd && !playerOneData.isDamaged){
    playerOneData.footkick = true;
    playerOneData.playerSelector.classList.add("foot-kick");
    playAudio('foot_kick');
    playerOneData.footKickEnd = false;
    setTimeout(function(){
      if(playerOneData.moveForward){
         clearInterval(playerOneData.moveForwardInterval);
         playerOneData.moveForwardInterval = setInterval(function(){
          moveForwardFunc(playerOneData)
        });
      }
      if(playerOneData.moveBack){
         clearInterval(playerOneData.moveBackInterval);
         playerOneData.moveBackInterval= setInterval(function(){
          moveBackFunc(playerOneData)
        });
      }
      playerOneData.footkick = false;
      playerOneData.playerSelector.classList.remove("foot-kick");
      stopAudio('foot_kick');
      playerOneData.footKickEnd = true;
      if(playerOneData.keyPressedFootkick){
        playerOneData.footkick = true;
      }
      else{
        playerOneData.footkick = false;
      }
    }, 400);
    if(playerPosDiff > -85 && playerPosDiff < 85 && playerPosDiffJump < 150){
      if(!playerOneData.jumpEnd){
        playerTwoData.playerSelector.classList.add("foot-damaged");
        
        playerTwoData.isDamaged = true;
        if(playerTwoData.block){
          playAudio('kick-blocked');
          makeDamage(footKickDamage/3);
        }
        else{
          playAudio('foot_damage');
          makeDamage(footKickDamage);
          startBlood(player2);
        }
        setTimeout(function(){
          playerTwoData.playerSelector.classList.remove("foot-damaged");
          playerTwoData.isDamaged = false;
          stopAudio('foot_damage');
          stopAudio('kick-blocked');
        }, 200);
      }
      else{
        setTimeout(function(){
          playerTwoData.playerSelector.classList.add("foot-damaged");
          
          playerTwoData.isDamaged = true;
          if(playerTwoData.block){
            playAudio('kick-blocked');
            makeDamage(footKickDamage/3);
          }
          else{
            playAudio('foot_damage');
            makeDamage(footKickDamage);
            startBlood(player2);
          }
        }, 300);
        setTimeout(function(){
          playerTwoData.playerSelector.classList.remove("foot-damaged");
          playerTwoData.isDamaged = false;
          stopAudio('foot_damage');
          stopAudio('kick-blocked');
        }, 500);
      }
    }
  }
}

function footKickFunc2(){
  if(!playerTwoData.moveTop && playerTwoData.moveForward || playerTwoData.jumpEnd && playerTwoData.moveTop && playerTwoData.moveForward){
    clearInterval(playerTwoData.moveForwardInterval);
  }
  if(!playerTwoData.moveTop && playerTwoData.moveBack || playerTwoData.jumpEnd && playerTwoData.moveTop && playerTwoData.moveBack){
    clearInterval(playerTwoData.moveBackInterval);
  }
  if(playerTwoData.handKickEnd && !playerTwoData.isDamaged){
    playerTwoData.footkick = true;
    playerTwoData.playerSelector.classList.add("foot-kick");
    playAudio('foot_kick');
    playerTwoData.footKickEnd = false;
    setTimeout(function(){
      if(playerTwoData.moveForward){
         clearInterval(playerTwoData.moveForwardInterval);
         playerTwoData.moveForwardInterval = setInterval(function(){
          moveForwardFunc(playerTwoData)
        });
      }
      if(playerTwoData.moveBack){
         clearInterval(playerTwoData.moveBackInterval);
         playerTwoData.moveBackInterval= setInterval(function(){
          moveBackFunc(playerTwoData)
        });
      }
      playerTwoData.footkick = false;
      playerTwoData.playerSelector.classList.remove("foot-kick");
      stopAudio('foot_kick');
      playerTwoData.footKickEnd = true;
      if(playerTwoData.keyPressedFootkick){
        playerTwoData.footkick = true;
      }
      else{
        playerTwoData.footkick = false;
      }
    }, 400);
    if(playerPosDiff > -85 && playerPosDiff < 85 && playerPosDiffJump < 150){
      if(!playerTwoData.jumpEnd){
        playerOneData.playerSelector.classList.add("foot-damaged");
        
        playerOneData.isDamaged = true;
        if(playerOneData.block){
          playAudio('kick-blocked');
          makeDamage(footKickDamage/3);
        }
        else{
          playAudio('foot_damage');
          makeDamage(footKickDamage);
          startBlood(player2);
        }
        setTimeout(function(){
          playerOneData.playerSelector.classList.remove("foot-damaged");
          playerOneData.isDamaged = false;
          stopAudio('foot_damage');
          stopAudio('kick-blocked');
        }, 200);
      }
      else{
        setTimeout(function(){
          playerOneData.playerSelector.classList.add("foot-damaged");
          
          playerOneData.isDamaged = true;
          if(playerOneData.block){
            playAudio('kick-blocked');
            makeDamage(footKickDamage/3);
          }
          else{
            playAudio('foot_damage');
            makeDamage(footKickDamage);
            startBlood(player2);
          }
        }, 300);
        setTimeout(function(){
          playerOneData.playerSelector.classList.remove("foot-damaged");
          playerOneData.isDamaged = false;
          stopAudio('foot_damage');
          stopAudio('kick-blocked');
        }, 500);
      }
    }
  }
}

// jump

function jump(player){
  if (!player.moveTop && player.jumpEnd) {
    player.moveTop = true;
    player.jumpEnd = false;
    toTop(function(){
      toBottom(function(){
        jumpEnd(player);
      });
    });
  }
  function toTop(callbackFn){
    player.playerSelector.classList.add("move-top");
    setTimeout(function() {
      player.playerSelector.style.bottom = parseInt(player.playerSelector.style.bottom) + 6 + 'px';
      if (parseInt(player.playerSelector.style.bottom) > 180){
        callbackFn();
      } 
      else {
        toTop(callbackFn);
      }
    }, 10);
  }
  function toBottom(callbackFn){
    setTimeout(function() {
      player.playerSelector.style.bottom = parseInt(player.playerSelector.style.bottom) - 6 + 'px';
      if (parseInt(player.playerSelector.style.bottom) > 0){
        toBottom(callbackFn);
      } 
      else {
        callbackFn();
      }
    }, 10);
  }
  function jumpEnd(player){
    playAudio('jump_end');
    player.moveTop = false;
    player.jumpEnd = true;
    player.playerSelector.classList.remove("move-top", "hand-kick", "foot-kick");
    if(player.keyPressedJump){
        player.moveTop = true;
      }
    else{
      player.moveTop = false;
    }
  }
}


// Movement

function moveBackFunc(player){
  if(player.playerPosX >= 0){
    if(player.playerPosY < playerHeight || player.playerPosX < player2.playerPosX + playerWidth || player.playerPosX > player2.playerPosX + playerWidth || player.playerPosX === player2.playerPosX + playerWidth){
      if(!(player.playerPosY < playerHeight && player2.playerPosY < playerHeight && Math.abs(playerPosDiff) < 85)){
        player.moveBack = true;
        player.playerSelector.style.left = parseInt(player.playerSelector.style.left) - 1 + 'px';
      }
    }
  }
}

function moveForwardFunc(player){
  if(player.playerPosX <= levelWidth - player.playerSelector.offsetWidth){
    if(player.playerPosY < playerHeight || player.playerPosX < player2.playerPosX - playerWidth || player.playerPosX > player2.playerPosX - playerWidth || player.playerPosX === player2.playerPosX - playerWidth){
      if(!(player.playerPosY < playerHeight && player2.playerPosY < playerHeight && Math.abs(playerPosDiff) < 85)){
        player.moveForward = true;
        player.playerSelector.style.left = parseInt(player.playerSelector.style.left) + 1 + 'px';
      }
    }
  }
}

function moveBottomFunc(player){
  player.moveBottom = true;
  player.playerSelector.classList.add("move-down");
}

function blockFunc(player){
  if(!player.moveTop){
    player.block = true;
    player.playerSelector.classList.add("block");
  }
}

function moveRunFunc(player){
  if(player.playerPosX <= levelWidth - player.playerWidth && player2.playerPosX > -player.playerWidth/2 && !(playerPosDiff > -85 && playerPosDiff < 85)){
    playerOneData.moverun = true;
    playerOneData.playerSelector.classList.add("move-run");
    playAudio('syborg_run');
    if(player.playerPosX > player2.playerPosX){
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) - 2 + 'px';
    }
    else{
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) + 2 + 'px';
    }
    // setTimeout(function(){
    //   clearInterval(player.moveRunInterval);
    // }, 2000);
  }
}



///// Get the positions

function getPosition(player) {
  player.playerPosX = 0;
  player.playerPosY = 0;
  player.playerPosX += (player.playerSelector.offsetLeft - player.playerSelector.scrollLeft + player.playerSelector.clientLeft);
  player.playerPosY += (player.playerSelector.offsetTop - player.playerSelector.scrollTop + player.playerSelector.clientTop);
  var coords = "Player X:" + player.playerPosX + " Player Y:" + player.playerPosY;
  document.getElementById("position-info").innerHTML =  coords;

  playerPosDiffJump = Math.abs(playerOneData.playerPosY - playerTwoData.playerPosY);
  var diffCoords = "Diff x: " + playerPosDiff + " Diff y: " + playerPosDiffJump;
  document.getElementById("position-diff-info").innerHTML =  diffCoords;
}

function getPosition2(player) {
  player.playerPosX = 0;
  player.playerPosY = 0;
  player.playerPosX += (player.playerSelector.offsetLeft - player.playerSelector.scrollLeft + player.playerSelector.clientLeft);
  player.playerPosY += (player.playerSelector.offsetTop - player.playerSelector.scrollTop + player.playerSelector.clientTop);
  var coords = "Player X:" + player.playerPosX + " Player Y:" + player.playerPosY;
  document.getElementById("position-info2").innerHTML =  coords;
}



function playerPositionFix(){
  playerPosDiff = playerOneData.playerPosX - playerTwoData.playerPosX;
  if(   playerOneData.playerPosX > playerTwoData.playerPosX - playerWidth 
     && playerOneData.playerPosX < playerTwoData.playerPosX + playerWidth 
     && playerOneData.playerPosY > playerHeight - 10 
     && playerTwoData.playerPosY > playerHeight - 10
     ){
    if (playerPosDiff > 0 ){
      playerOneData.playerPosX += 5;
      playerTwoData.playerPosX -= 5;
    } 
    else {
      playerOneData.playerPosX -= 5;
      playerTwoData.playerPosX += 5;
    }
    // move opponent while push
    playerOneData.playerSelector.style.left = playerOneData.playerPosX + 'px';
    playerTwoData.playerSelector.style.left = playerTwoData.playerPosX + 'px';
  }

  /// Player direction
  if(playerOneData.playerPosX > playerTwoData.playerPosX){
    playerOneData.playerSelector.setAttribute("flipped", "flipped");
    playerTwoData.playerSelector.removeAttribute("flipped", "flipped");
  }
  else{
    playerOneData.playerSelector.removeAttribute("flipped", "flipped");
    playerTwoData.playerSelector.setAttribute("flipped", "flipped");
  }
}

// Life

function makeDamage(damage){ 
  player2.life = player2.life - damage;
  if(player2.life < 5){
    player2.life = 0;
    player2.defeated = true;
    if(player2 === playerTwoData){
      player2Keys = {};
    }
    else{
      playerKeys = {};
    }
    if(!player.defeated){
      setTimeout(function() {
        player2.playerSelector.classList.add("defeated");
      }, 500);
    }
  }
  player2.playerLifeSelector.style.width = player2.life + "%";
}


// Main interval

getPosInterval = setInterval(function(){
  getPosition(playerOneData);
  getPosition2(playerTwoData);
  playerPositionFix();
});

//////////////////////////////////////////////////

/// sounds

function insertAudio(trackname){
  var audioSection = document.getElementById("audio-section");
  var audioRun = "<audio id=" + trackname + " src='audio/" + trackname + ".mp3' type='audio/mp3'></audio>";
  audioRun.loop = false;
  audioSection.innerHTML = audioSection.innerHTML + audioRun;
}

function playAudio(trackname, loop){
  document.getElementById(trackname).play();
  if(loop){
    document.getElementById(trackname).setAttribute("loop", "");
  }
}

function stopAudio(trackname){
  document.getElementById(trackname).pause();
  document.getElementById(trackname).currentTime = 0;
}

//////////////////////////////////////////////////

document.addEventListener("keydown", funcKeyDown);
document.addEventListener("keyup", funcKeyUp);

// Change level 

function changeLevel(level){
  document.getElementById("page-wrapper").classList = [];
  document.getElementById("page-wrapper").className += level;
}

/////  Sparks


var particles = [];
var alreadyRendering = false;
var canvas = document.getElementById('canvas');

// originally from Rachel Smith on CodePen http://codepen.io/rachsmith/pen/oXBOwg
/* global particles */
function sparkShower(startx, starty, sparkWidth, sparkHeight) {
  var ctx = canvas.getContext('2d');
  var width = canvas.width = sparkWidth;
  var height = canvas.height = sparkHeight;
  var colors = ['#ff0000', '#e40c0c', '#ce0505'];
  // this is only used for simple gravity
  var gravity = 0.08;
  //var particles = [];
  var floor = sparkHeight;
  var currentlySparking = false;
  var maxSize = 3;
  // This is the acceleration of Gravity in m/s.
  var ag = 9.81;

  function initParticles() {
    currentlySparking = true;
    for (var i = 0; i < 30; i++) {
      setTimeout(function() {
        createParticle(i);
        //createParticle(i * 2);
      }, i);
    }
  }

  function createParticle(i) {
    // initial position in middle of canvas
    var x = startx;
    var y = starty;
    var z = (Math.random() * 2);
    // randomize the vx and vy a little - but we still want them flying 'up' and 'out'
    var maxex = Math.random() * 20;
    var vx = (Math.random() * maxex) - (maxex / 2);
    var vy = (Math.random() * -20);
    // velocity size?
    var vsize = 0;
    // randomize size and opacity a little & pick a color from our color palette
    var size = 1 + Math.random();
    var color = colors[Math.floor(Math.random() * colors.length)];
    var opacity = 0.5 + Math.random() * 0.5;
    var d = new Date();
    var startTime = d.getTime();
    var p = new Particle(x, y, z, vx, vy, size, vsize, color, opacity, startTime, startTime);
    p.finished = false;
    particles.push(p);
  }

  function Particle(x, y, z, vx, vy, size, vsize, color, opacity, startTime, lastTime) {

    function reset() {
      opacity = 0;
      this.finished = true;
    }

    this.update = function() {
      ///////if a particle has faded to nothing we can reset it to the starting position
      // if (opacity - 0.0005 > 0) opacity -= 0.0005;
      // else reset();
      /////////////simple gravity
      vy += gravity;
      var d = new Date();
      var timeNow = d.getTime();
      // Calculate gravity based on time elapsed since last update in lastTime
      // Pixels per "Meter" = 4735 = 4.7
      // Velocity of Y = Acceleration of Gravity in meters per second * number of seconds since last calc * pixels-per-meter
      if (timeNow > lastTime)
        vy += (ag * ((timeNow - lastTime) / 1000) * 4.7);
      lastTime = timeNow;
      x += vx;
      y += vy;
      if (y > (floor + 10)) this.finished = true;
      if (size < maxSize) size += vsize * z;
      if ((opacity < 0.5) && (y < floor)) {
        vsize = 0.55 - opacity;
      } else {
        vsize = 0;
      }
      ///////// add bouncing off the floor
      if (y > floor) {
        vy = vy * -0.4;
        vx = vx * 0.96;
      }
    };

    this.draw = function() {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      //ctx.fillRect(x, y, size, size);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    };
  }

  function render() {
    alreadyRendering = true;
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
      if (typeof particles[i] !== "undefined") {
        if (particles[i].finished === true) {
          particles.splice(i, 1);
        } else {
          particles[i].update();
          particles[i].draw();
        }
      }
    }
    requestAnimationFrame(render);
  }

  // resize
  // window.addEventListener('resize', resize);

  // function resize() {
  //   width = canvas.width = window.innerWidth;
  //   height = canvas.height = window.innerHeight;
  // }

  // init
  initParticles();
  if (!alreadyRendering)
    render();
}

function startBlood(player2) {
  var initialX = player2.playerPosX + player.playerWidth/2;
  var initialY = player2.playerPosY + player.playerHeight/2;
  var sparkWidth = canvas.offsetWidth;
  var sparkHeight = canvas.offsetHeight;
  sparkShower(initialX, initialY, sparkWidth, sparkHeight);
}
