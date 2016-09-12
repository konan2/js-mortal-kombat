//
// Main code
//

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
  playerheight: 138,
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
  moveRunInterval: null
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
  playerheight: 138,
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
  moveRunInterval: null
};

var player;
var player2;

var playerWidth = 72;
var playerHeight = 262;

var getPosInterval = null;

var handKickDamage = 5;
var footKickDamage = 10;


var playerPosDiff;

var levelWrapper = document.querySelector(".wrapper");
var levelWidth = levelWrapper.offsetWidth;

// audio

insertAudio('foot_kick');
insertAudio('hand_kick');
insertAudio('syborg_run');
insertAudio('desert_level_track');
insertAudio('jump_end');

//playAudio('desert_level_track', "loop");

// Keyboard controls

var playerUsedCodes = [];
var player2UsedCodes = [];

var playerKeys = {
  jump: 38,
  forward: 39,
  back: 37,
  bottom: 40,
  handkick: 65,
  footkick: 83,
  run: 81,
  block: 87
}

var player2Keys = {
  jump: 104,
  forward: 102,
  back: 100,
  bottom: 98,
  handkick: 103,
  footkick: 105,
  run: 97,
  block: 99
}


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

function funcKeyDown(event){
  if(playerUsedCodes.includes(event.keyCode)){
    player = playerOneData;
    player2 = playerTwoData;
  }
  if(player2UsedCodes.includes(event.keyCode)){
    player = playerTwoData;
    player2 = playerOneData;
  }

  // jump
  if(event.keyCode === playerKeys.jump && !playerOneData.block && !playerOneData.moverun){
    playerOneData.keyPressedJump = true;
    jump(playerOneData);
  }

  // jump2
  if(event.keyCode === player2Keys.jump && !playerTwoData.block && !playerTwoData.moverun){
    playerTwoData.keyPressedJump = true;
    jump(playerTwoData);
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
  if((event.keyCode === playerKeys.handkick || event.keyCode === player2Keys.handkick) && !player.handkick && player.handKickEnd && !player.footkick){
    player.keyPressedHandkick = true;
    handKickFunc(player);
  }

  // Foot kick
  if((event.keyCode === playerKeys.footkick || event.keyCode === player2Keys.footkick) && !player.footkick && player.footKickEnd && !player.handkick){
    player.keyPressedFootkick = true;
    footKickFunc(player);
  }

  // Run
  if(event.keyCode === playerKeys.run && !playerOneData.block && !playerOneData.moveTop && playerOneData.jumpEnd && !playerOneData.moveForward && !playerOneData.moveBack){
    clearInterval(playerOneData.moveRunInterval);
    playerOneData.moverun = true;
    playerOneData.playerSelector.classList.add("move-run");
    playerOneData.moveRunInterval = setInterval(function(){
      moveRunFunc(playerOneData);
    });
  }

  // Run2
  if(event.keyCode === player2Keys.run && !playerTwoData.block && !playerTwoData.moveTop && playerTwoData.jumpEnd && !playerTwoData.moveForward && !playerTwoData.moveBack){
    clearInterval(playerTwoData.moveRunInterval);
    playerTwoData.moverun = true;
    playerTwoData.playerSelector.classList.add("move-run");
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
  if(playerUsedCodes.includes(event.keyCode)){
    player = playerOneData;
    player2 = playerTwoData;
  }
  if(player2UsedCodes.includes(event.keyCode)){
    player = playerTwoData;
    player2 = playerOneData;
  }


  // jump
  if(event.keyCode === playerKeys.jump){
    playerOneData.moveTop = false;
    playerOneData.keyPressedJump = false;
    playerOneData.playerSelector.classList.remove("move-up");
  }

  // jump2
  if(event.keyCode === player2Keys.jump){
    playerTwoData.moveTop = false;
    playerTwoData.keyPressedJump = false;
    playerTwoData.playerSelector.classList.remove("move-up");
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
  if(event.keyCode === playerKeys.handkick || event.keyCode === player2Keys.handkick){
    player.keyPressedHandkick = false;
    player.handkick = false;
  }

  // Foot kick
  if(event.keyCode === playerKeys.footkick || event.keyCode === player2Keys.footkick){
    player.keyPressedFootkick = false;
    player.footkick = false;
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

function handKickFunc(player){
  if(!player.moveTop && player.moveForward || player.jumpEnd && player.moveTop && player.moveForward ){
    clearInterval(player.moveForwardInterval);
  }
  if(!player.moveTop && player.moveBack || player.jumpEnd && player.moveTop && player.moveBack){
    clearInterval(player.moveBackInterval);
  }
  if(player.footKickEnd){
    player.handkick = true;
    player.playerSelector.classList.add("hand-kick");
    playAudio('hand_kick');
    player.handKickEnd = false;
    setTimeout(function(){
      if(player.moveForward){
         clearInterval(player.moveForwardInterval);
         player.moveForwardInterval = setInterval(function(){
           moveForwardFunc(player)
        });
      }
      if(player.moveBack){
         clearInterval(player.moveBackInterval);
         player.moveBackInterval = setInterval(function(){
          moveBackFunc(player);
        });
      }
      player.handkick = false;
      player.playerSelector.classList.remove("hand-kick");
      stopAudio('hand_kick');
      player.handKickEnd = true;
      if(player.keyPressedHandkick){
        player.handkick = true;
      }
      else{
        player.handkick = false;
      }
    }, 300);

    if(playerPosDiff > -85 && playerPosDiff < 85){
      makeDamage(handKickDamage);
      if(!player.jumpEnd){
        player2.playerSelector.classList.add("hand-damaged");
        player2.isDamaged = true;
        setTimeout(function(){
          player2.playerSelector.classList.remove("hand-damaged");
          player2.isDamaged = false;
        }, 150);
      }
      else{
        setTimeout(function(){
          player2.playerSelector.classList.add("hand-damaged");
          player2.isDamaged = true;
        }, 100);
        setTimeout(function(){
          player2.playerSelector.classList.remove("hand-damaged");
          player2.isDamaged = false;
        }, 250);
      }
    }
  }
}

function footKickFunc(player){
  if(!player.moveTop && player.moveForward || player.jumpEnd && player.moveTop && player.moveForward){
    clearInterval(player.moveForwardInterval);
  }
  if(!player.moveTop && player.moveBack || player.jumpEnd && player.moveTop && player.moveBack){
    clearInterval(player.moveBackInterval);
  }
  if(player.handKickEnd){
    player.footkick = true;
    player.playerSelector.classList.add("foot-kick");
    playAudio('foot_kick');
    player.footKickEnd = false;
    setTimeout(function(){
      if(player.moveForward){
         clearInterval(player.moveForwardInterval);
         player.moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
      if(player.moveBack){
         clearInterval(player.moveBackInterval);
         player.moveBackInterval= setInterval(function(){
          moveBackFunc(player)
        });
      }
      player.footkick = false;
      player.playerSelector.classList.remove("foot-kick");
      stopAudio('foot_kick');
      player.footKickEnd = true;
      if(player.keyPressedFootkick){
        player.footkick = true;
      }
      else{
        player.footkick = false;
      }
    }, 400);
    if(playerPosDiff > -85 && playerPosDiff < 85){
      makeDamage(footKickDamage);
      if(!player.jumpEnd){
        player2.playerSelector.classList.add("foot-damaged");
        player2.isDamaged = true;
        setTimeout(function(){
          player2.playerSelector.classList.remove("foot-damaged");
          player2.isDamaged = false;
        }, 200);
      }
      else{
        setTimeout(function(){
          player2.playerSelector.classList.add("foot-damaged");
          player2.isDamaged = true;
        }, 300);
        setTimeout(function(){
          player2.playerSelector.classList.remove("foot-damaged");
          player2.isDamaged = false;
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
      if (parseInt(player.playerSelector.style.bottom) > 150){
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
    player.playerSelector.classList.remove("move-top");
    playAudio('jump_end');
    player.moveTop = false;
    player.jumpEnd = true;
    player.playerSelector.classList.remove("hand-kick", "foot-kick");
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
      player.moveBack = true;
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) - 1 + 'px';
    }
  }
}

function moveForwardFunc(player){
  if(player.playerPosX <= levelWidth - player.playerSelector.offsetWidth){
    if(player.playerPosY < playerHeight || player.playerPosX < player2.playerPosX - playerWidth || player.playerPosX > player2.playerPosX - playerWidth || player.playerPosX === player2.playerPosX - playerWidth){
      player.moveForward = true;
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) + 1 + 'px';
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
  if(player.playerPosX <= levelWidth - player.playerWidth && player2.playerPosX > -player.playerWidth/2){
    playAudio('syborg_run');
    if(player.playerPosX > player2.playerPosX){
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) - 2 + 'px';
    }
    else{
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) + 2 + 'px';
    }
  }
}


///// Get the positions

function getPosition(player) {
  player.playerPosX = 0;
  player.playerPosY = 0;
  player.playerPosX += (player.playerSelector.offsetLeft - player.playerSelector.scrollLeft + player.playerSelector.clientLeft);
  player.playerPosY += (player.playerSelector.offsetTop - player.playerSelector.scrollTop + player.playerSelector.clientTop);
  var coords = "x:" + player.playerPosX + " y:" + player.playerPosY;
  player.playerSelector.innerHTML =  coords;
}



function playerPositionFix(){
  playerPosDiff = playerOneData.playerPosX - playerTwoData.playerPosX;
  if(playerOneData.playerPosX > playerTwoData.playerPosX - playerWidth && playerOneData.playerPosX < playerTwoData.playerPosX + playerWidth && playerOneData.playerPosY > playerHeight - 10 && playerTwoData.playerPosY > playerHeight - 10){
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
  }
  player2.playerLifeSelector.style.width = player2.life + "%";
}


// Main interval

getPosInterval = setInterval(function(){
  getPosition(playerOneData);
  getPosition(playerTwoData);
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

