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
  moveRunInterval: null,
  defeated: false
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

//playAudio('desert_level_track', "loop");

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
    if(playerPosDiff > -85 && playerPosDiff < 85){
      makeDamage(handKickDamage);
      playerTwoData.isDamaged = true;
      if(!playerOneData.jumpEnd){
        playerTwoData.playerSelector.classList.add("hand-damaged");
        playAudio('hand_damage');
        setTimeout(function(){
          playerTwoData.playerSelector.classList.remove("hand-damaged");
          playerTwoData.isDamaged = false;
          stopAudio('hand_damage');
        }, 150);
      }
      else{
        setTimeout(function(){
          playerTwoData.playerSelector.classList.add("hand-damaged");
          playAudio('hand_damage');
        }, 100);
        setTimeout(function(){
          playerTwoData.playerSelector.classList.remove("hand-damaged");
          playerTwoData.isDamaged = false;
          stopAudio('hand_damage');
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
    if(playerPosDiff > -85 && playerPosDiff < 85){
      makeDamage(handKickDamage);
      playerOneData.isDamaged = true;
      if(!playerTwoData.jumpEnd){
        playerOneData.playerSelector.classList.add("hand-damaged");
        playAudio('hand_damage');
        setTimeout(function(){
          playerOneData.playerSelector.classList.remove("hand-damaged");
          playerOneData.isDamaged = false;
          stopAudio('hand_damage');
        }, 150);
      }
      else{
        setTimeout(function(){
          playerOneData.playerSelector.classList.add("hand-damaged");
          playAudio('hand_damage');
        }, 100);
        setTimeout(function(){
          playerOneData.playerSelector.classList.remove("hand-damaged");
          playerOneData.isDamaged = false;
          stopAudio('hand_damage');
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
    if(playerPosDiff > -85 && playerPosDiff < 85){
      makeDamage(footKickDamage);
      playerTwoData.isDamaged = true;
      if(!playerOneData.jumpEnd){
        playerTwoData.playerSelector.classList.add("foot-damaged");
        playAudio('foot_damage');
        setTimeout(function(){
          playerTwoData.playerSelector.classList.remove("foot-damaged");
          playerTwoData.isDamaged = false;
          stopAudio('foot_damage');
        }, 200);
      }
      else{
        setTimeout(function(){
          playerTwoData.playerSelector.classList.add("foot-damaged");
          playAudio('foot_damage');
        }, 300);
        setTimeout(function(){
          playerTwoData.playerSelector.classList.remove("foot-damaged");
          playerTwoData.isDamaged = false;
          stopAudio('foot_damage');
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
    if(playerPosDiff > -85 && playerPosDiff < 85){
      makeDamage(footKickDamage);
      playerOneData.isDamaged = true;
      if(!playerTwoData.jumpEnd){
        playerOneData.playerSelector.classList.add("foot-damaged");
        playAudio('foot_damage');
        setTimeout(function(){
          playerOneData.playerSelector.classList.remove("foot-damaged");
          playerOneData.isDamaged = false;
          stopAudio('foot_damage');
        }, 200);
      }
      else{
        setTimeout(function(){
          playerOneData.playerSelector.classList.add("foot-damaged");
          playAudio('foot_damage');
        }, 300);
        setTimeout(function(){
          playerOneData.playerSelector.classList.remove("foot-damaged");
          playerOneData.isDamaged = false;
          stopAudio('foot_damage');
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
    setTimeout(function() {
      player2.playerSelector.classList.add("defeated");
    }, 500);
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

