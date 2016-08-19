
var bodyBlock = document.querySelector(".wrapper");
var playerOne = document.getElementById("hero1");
var playerTwo = document.getElementById("hero2");

var resetBtn = document.getElementById("reset");
var bloodStatus = document.querySelector(".blood-status");
var health = 100;

var playerOneHealth = health;
var playerTwoHealth = health;

var levelWrapper = document.querySelector(".wrapper");
var levelWidth = levelWrapper.offsetWidth;


var wastedText = document.createElement('span');
wastedText.classList.add("wasted-text")
wastedText.innerHTML = 'Wasted';



document.querySelector("#hero1-kicks").addEventListener("click", playerOneDamage);
document.querySelector("#hero2-kicks").addEventListener("click", playerTwoDamage);

resetBtn.addEventListener("click", resetFunc);


function playerOneDamage(){
  if(playerOneHealth>0){
    playerOne.classList.toggle("kick");
    playerOneHealth = playerOneHealth - 20;
    document.querySelector("#hero1-level .blood-status").style.width =  playerOneHealth + "%";
  }
  if(playerOneHealth===0){
    playerOne.classList.add("wasted");
    bodyBlock.appendChild(wastedText);
    while(playerOneHealth);
    playerOneHealth = false;
  }
}

function playerTwoDamage(){
  if(playerTwoHealth>0){
    playerTwo.classList.toggle("kick");
    playerTwoHealth = playerTwoHealth - 20;
    document.querySelector("#hero2-level .blood-status").style.width =  playerTwoHealth + "%";
  }
  if(playerTwoHealth===0){
    playerTwo.classList.add("wasted");
    bodyBlock.appendChild(wastedText);
    while(playerTwoHealth);
    playerTwoHealth = false;
  }
}

function resetFunc(){
  document.querySelector("#hero1-level .blood-status").style.width =  health + "%";
  document.querySelector("#hero2-level .blood-status").style.width =  health + "%";
  playerOneHealth, playerTwoHealth = health;
  document.querySelector(".wasted").classList.remove("wasted");
  document.querySelector(".wasted-text").remove();
}

// Movement



var playerOneData = {
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
  jumpEnd: true
};


var playerTwoData = {
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
  jumpEnd: true
};


var playerWidth = 72;
var playerHeight = 262;

var moveForwardInterval = null;
var moveBackInterval = null;
var getPosInterval = null;

// audio

insertAudio('foot_kick');
insertAudio('hand_kick');
insertAudio('syborg_run');
insertAudio('desert_level_track');
insertAudio('jump_end');

//playAudio('desert_level_track', "loop");


function funcKeyDown(event){
  var player;
  if(event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || event.keyCode === 37 || event.keyCode === 65 || event.keyCode === 83 || event.keyCode === 81 || event.keyCode === 87){
    player = playerOne;
  }

  if(event.keyCode === 38 && !playerOneData.block){
    playerOneData.keyPressedJump = true;
    jump(player);
  }

  // Move forward
  if(event.keyCode === 39 && !playerOneData.block && !playerOneData.moverun && !playerOneData.moveBottom && !playerOneData.handkick && !playerOneData.footkick){
    clearInterval(moveForwardInterval);
    player.classList.add("move-forward");
    moveForwardInterval = setInterval(function(){
      moveForwardFunc(player);
    });
  }

  // Moveback
  if(event.keyCode === 37 && !playerOneData.block && !playerOneData.moverun && !playerOneData.moveBottom && !playerOneData.handkick && !playerOneData.footkick){
    clearInterval(moveBackInterval);
    player.classList.add("move-back");
    moveBackInterval = setInterval(function(){
      moveBackFunc(player);
    });
  }

// Move bottom
  if(event.keyCode === 40){
    clearInterval(moveForwardInterval);
    clearInterval(moveBackInterval);
    moveBottomFunc(player);
  }

  // Handkick
  if(event.keyCode === 65 && !playerOneData.handkick && playerOneData.handKickEnd && !playerOneData.footkick){
    playerOneData.keyPressedHandkick = true;
    handKickFunc(player);
  }

  // Footkick
  if(event.keyCode === 83 && !playerOneData.footkick && playerOneData.footKickEnd && !playerOneData.handkick){
    playerOneData.keyPressedFootkick = true;
    footKickFunc(player);
  }

  // Run
  if(event.keyCode === 81 && !playerOneData.block){
    clearInterval(moveForwardInterval);
    clearInterval(moveBackInterval);
    playerOneData.moverun = true;
    player.classList.add("move-run");
    moveForwardInterval = setInterval(function(){
      moveRunFunc(player);
    });
  }

  // Block
  if(event.keyCode === 87){
    clearInterval(moveForwardInterval);
    clearInterval(moveBackInterval);
    blockFunc(player);
  }
}

function funcKeyUp(event){
  var player;
  if(event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || event.keyCode === 37 || event.keyCode === 65 || event.keyCode === 83 || event.keyCode === 81 || event.keyCode === 87){
    player = playerOne;
  }
  if(event.keyCode === 38){
    playerOneData.moveTop = false;
    playerOneData.keyPressedJump = false;
    player.classList.remove("move-up");
  }
  if(event.keyCode === 39){
    playerOneData.moveForward = false;
    player.classList.remove("move-forward");
    clearInterval(moveForwardInterval);
  }
  if(event.keyCode === 40){
    playerOneData.moveBottom = false;
    player.classList.remove("move-down");
  }
  if(event.keyCode === 37){
    playerOneData.moveBack = false;
    player.classList.remove("move-back");
    clearInterval(moveBackInterval);
  }
  if(event.keyCode === 65){
    playerOneData.keyPressedHandkick = false;
    playerOneData.handkick = false;
  }
  if(event.keyCode === 83){
    playerOneData.keyPressedFootkick = false;
    playerOneData.footkick = false;
  }
  if(event.keyCode === 81){
    playerOneData.moverun = false;
    player.classList.remove("move-run");
    clearInterval(moveForwardInterval);
  }
  if(event.keyCode === 87){
    playerOneData.block = false;
    player.classList.remove("block");
    if(playerOneData.moveForward){
         moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
    if(playerOneData.moveBack){
       moveBackInterval = setInterval(function(){
        moveBackFunc(player)
      });
    }
  }
}


// Kicks

function handKickFunc(player){
  if(!playerOneData.moveTop && playerOneData.moveForward || playerOneData.jumpEnd && playerOneData.moveTop && playerOneData.moveForward ){
    clearInterval(moveForwardInterval);
  }
  if(!playerOneData.moveTop && playerOneData.moveBack || playerOneData.jumpEnd && playerOneData.moveTop && playerOneData.moveBack){
    clearInterval(moveBackInterval);
  }
  if(playerOneData.footKickEnd){
    playerOneData.handkick = true;
    player.classList.add("hand-kick");
    playAudio('hand_kick');
    playerOneData.handKickEnd = false;
    setTimeout(function(){
      if(playerOneData.moveForward){
         clearInterval(moveForwardInterval);
         moveForwardInterval = setInterval(function(){
           moveForwardFunc(player)
        });
      }
      if(playerOneData.moveBack){
         clearInterval(moveBackInterval);
         moveBackInterval = setInterval(function(){
          moveBackFunc(player);
        });
      }
      playerOneData.handkick = false;
      player.classList.remove("hand-kick");
      stopAudio('hand_kick');
      playerOneData.handKickEnd = true;
      if(playerOneData.keyPressedHandkick){
        playerOneData.handkick = true;
      }
      else{
        playerOneData.handkick = false;
      }
    }, 300);
  }
}

function footKickFunc(player){
  if(!playerOneData.moveTop && playerOneData.moveForward || playerOneData.jumpEnd && playerOneData.moveTop && playerOneData.moveForward){
    clearInterval(moveForwardInterval);
  }
  if(!playerOneData.moveTop && playerOneData.moveBack || playerOneData.jumpEnd && playerOneData.moveTop && playerOneData.moveBack){
    clearInterval(moveBackInterval);
  }
  if(playerOneData.handKickEnd){
    playerOneData.footkick = true;
    player.classList.add("foot-kick");
    playAudio('foot_kick');
    playerOneData.footKickEnd = false;
    setTimeout(function(){
      if(playerOneData.moveForward){
         clearInterval(moveForwardInterval);
         moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
      if(playerOneData.moveBack){
         clearInterval(moveBackInterval);
         moveBackInterval= setInterval(function(){
          moveBackFunc(player)
        });
      }
      playerOneData.footkick = false;
      player.classList.remove("foot-kick");
      stopAudio('foot_kick');
      playerOneData.footKickEnd = true;
      if(playerOneData.keyPressedFootkick){
        playerOneData.footkick = true;
      }
      else{
        playerOneData.footkick = false;
      }
    }, 400);
  }
}

// jump

function jump(player){
  if (!playerOneData.moveTop && playerOneData.jumpEnd) {
    playerOneData.moveTop = true;
    playerOneData.jumpEnd = false;
    toTop(function(){
      toBottom(function(){
        jumpEnd(player);
      });
    });
  }
  function toTop(callbackFn){
    player.classList.add("move-top");
    setTimeout(function() {
      player.style.bottom = parseInt(player.style.bottom) + 5 + 'px';
      if (parseInt(player.style.bottom) > 150){
        callbackFn();
      } 
      else {
        toTop(callbackFn);
      }
    }, 10);
  }
  function toBottom(callbackFn){
    setTimeout(function() {
      player.style.bottom = parseInt(player.style.bottom) - 5 + 'px';
      if (parseInt(player.style.bottom) > 0){
        toBottom(callbackFn);
      } 
      else {
        callbackFn();
      }
    }, 10);
  }
  function jumpEnd(player){
    player.classList.remove("move-top");
    playAudio('jump_end');
    playerOneData.moveTop = false;
    playerOneData.jumpEnd = true;
    if(playerOneData.keyPressedJump){
        playerOneData.moveTop = true;
      }
    else{
      playerOneData.moveTop = false;
    }
  }
}


// Movement

function moveBackFunc(player){
  if(playerOneData.playerPosX >= 0){
    if(playerOneData.playerPosY < playerHeight || playerOneData.playerPosX < playerTwoData.playerPosX + playerWidth || playerOneData.playerPosX > playerTwoData.playerPosX + playerWidth){
      playerOneData.moveBack = true;
      player.style.left = parseInt(player.style.left) - 1 + 'px';
    }
  }
}

function moveForwardFunc(player){
  if(playerOneData.playerPosX <= levelWidth - player.offsetWidth){
    if(playerOneData.playerPosY < playerHeight || playerOneData.playerPosX < playerTwoData.playerPosX - playerWidth || playerOneData.playerPosX > playerTwoData.playerPosX - playerWidth){
      playerOneData.moveForward = true;
      player.style.left = parseInt(player.style.left) + 1 + 'px';
    }
  }
}

function moveBottomFunc(player){
  playerOneData.moveBottom = true;
  player.classList.add("move-down");
}

function blockFunc(player){
  if(!playerOneData.moveTop){
    playerOneData.block = true;
    player.classList.add("block");
  }
}

function moveRunFunc(player){
  if(playerOneData.playerPosX <= levelWidth - player.offsetWidth){
    playAudio('syborg_run');
    if(playerOneData.playerPosX > playerTwoData.playerPosX){
      player.style.left = parseInt(player.style.left) - 2 + 'px';
    }
    else{
      player.style.left = parseInt(player.style.left) + 2 + 'px';
    }
  }
}


///// Get the positions

function getPosition(player) {
  playerOneData.playerPosX = 0;
  playerOneData.playerPosY = 0;
  playerOneData.playerPosX += (player.offsetLeft - player.scrollLeft + player.clientLeft);
  playerOneData.playerPosY += (player.offsetTop - player.scrollTop + player.clientTop);
  var coords = "x:" + playerOneData.playerPosX + " y:" + playerOneData.playerPosY;
  player.innerHTML =  coords;

  if(playerOneData.playerPosX > playerTwoData.playerPosX){
    playerOne.setAttribute("flipped", "flipped");
    playerTwo.removeAttribute("flipped", "flipped");
  }
  else{
    playerOne.removeAttribute("flipped", "flipped");
    playerTwo.setAttribute("flipped", "flipped");
  }
  playerPositionFix();
}




getPosInterval = setInterval(function(){
  getPosition(playerOne);
});



function playerPositionFix(){
  var playerPosDiff = playerOneData.playerPosX - playerTwoData.playerPosX;
  if(playerOneData.playerPosX > playerTwoData.playerPosX - playerWidth && playerOneData.playerPosX < playerTwoData.playerPosX + playerWidth && playerOneData.playerPosY > playerHeight - 10){
    if (playerPosDiff > 0 ){
      playerOneData.playerPosX += 10;
      playerTwoData.playerPosX -= 10;
    } 
    else {
      playerOneData.playerPosX -= 10;
      playerTwoData.playerPosX += 10;
    }
    playerOne.style.left = playerOneData.playerPosX + 'px';
    playerTwo.style.left = playerTwoData.playerPosX + 'px';
  }
  //////////////// move opponent when moveTo
  if(playerOneData.playerPosX === playerTwoData.playerPosX - playerWidth && playerOneData.moveForward && playerOneData.playerPosX < levelWidth - playerWidth){
    playerOne.style.left = parseInt(playerOne.style.left) + 1 + 'px';
    playerTwo.style.left = parseInt(playerTwo.style.left) + 1 + 'px';
  }
  if(playerOneData.playerPosX === playerTwoData.playerPosX + playerWidth && playerOneData.moveBack && playerTwoData.playerPosX >= 0){
    playerOne.style.left = parseInt(playerOne.style.left) - 1 + 'px';
    playerTwo.style.left = parseInt(playerTwo.style.left) - 1 + 'px';
  }
}



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

