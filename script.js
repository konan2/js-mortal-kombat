
var bodyBlock = document.querySelector(".wrapper");
var heroOne = document.getElementById("hero1");
var heroTwo = document.getElementById("hero2");

var resetBtn = document.getElementById("reset");
var bloodStatus = document.querySelector(".blood-status");
var health = 100;

var HeroOneHealth = health;
var HeroTwoHealth = health;

var levelWrapper = document.querySelector(".wrapper");
var levelWidth = levelWrapper.offsetWidth;


var wastedText = document.createElement('span');
wastedText.classList.add("wasted-text")
wastedText.innerHTML = 'Wasted';



document.querySelector("#hero1-kicks").addEventListener("click", heroOneDamage);
document.querySelector("#hero2-kicks").addEventListener("click", heroTwoDamage);

resetBtn.addEventListener("click", resetFunc);


function heroOneDamage(){
  if(HeroOneHealth>0){
    heroOne.classList.toggle("kick");
    HeroOneHealth = HeroOneHealth - 20;
    document.querySelector("#hero1-level .blood-status").style.width =  HeroOneHealth + "%";
  }
  if(HeroOneHealth===0){
    heroOne.classList.add("wasted");
    bodyBlock.appendChild(wastedText);
    while(HeroOneHealth);
    HeroOneHealth = false;
  }
}

function heroTwoDamage(){
  if(HeroTwoHealth>0){
    heroTwo.classList.toggle("kick");
    HeroTwoHealth = HeroTwoHealth - 20;
    document.querySelector("#hero2-level .blood-status").style.width =  HeroTwoHealth + "%";
  }
  if(HeroTwoHealth===0){
    heroTwo.classList.add("wasted");
    bodyBlock.appendChild(wastedText);
    while(HeroTwoHealth);
    HeroTwoHealth = false;
  }
}

function resetFunc(){
  document.querySelector("#hero1-level .blood-status").style.width =  health + "%";
  document.querySelector("#hero2-level .blood-status").style.width =  health + "%";
  HeroOneHealth, HeroTwoHealth = health;
  document.querySelector(".wasted").classList.remove("wasted");
  document.querySelector(".wasted-text").remove();
}

// Movement



var keys = {
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


var playerTwoPosX = 500;
var playerTwoPosY = 262;
var playerWidth = 72;
var playerHeight = 262;

var moveForwardInterval = null;
var moveBackInterval = null;


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
    player = heroOne;
  }

  if(event.keyCode === 38 && !keys.block){
    keys.keyPressedJump = true;
    jump(player);
  }

  // Move forward
  if(event.keyCode === 39 && !keys.block && !keys.moverun && !keys.moveBottom && !keys.handkick && !keys.footkick){
    clearInterval(moveForwardInterval);
    player.classList.add("move-forward");
    moveForwardInterval = setInterval(function(){
      moveForwardFunc(player);
    });
  }

  // Moveback
  if(event.keyCode === 37 && !keys.block && !keys.moverun && !keys.moveBottom && !keys.handkick && !keys.footkick){
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
  if(event.keyCode === 65 && !keys.handkick && keys.handKickEnd && !keys.footkick){
    keys.keyPressedHandkick = true;
    handKickFunc(player);
  }

  // Footkick
  if(event.keyCode === 83 && !keys.footkick && keys.footKickEnd && !keys.handkick){
    keys.keyPressedFootkick = true;
    footKickFunc(player);
  }

  // Run
  if(event.keyCode === 81 && !keys.block){
    clearInterval(moveForwardInterval);
    clearInterval(moveBackInterval);
    keys.moverun = true;
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
    player = heroOne;
  }
  if(event.keyCode === 38){
    keys.moveTop = false;
    keys.keyPressedJump = false;
    player.classList.remove("move-up");
  }
  if(event.keyCode === 39){
    keys.moveForward = false;
    player.classList.remove("move-forward");
    clearInterval(moveForwardInterval);
  }
  if(event.keyCode === 40){
    keys.moveBottom = false;
    player.classList.remove("move-down");
  }
  if(event.keyCode === 37){
    keys.moveBack = false;
    player.classList.remove("move-back");
    clearInterval(moveBackInterval);
  }
  if(event.keyCode === 65){
    keys.keyPressedHandkick = false;
    keys.handkick = false;
  }
  if(event.keyCode === 83){
    keys.keyPressedFootkick = false;
    keys.footkick = false;
  }
  if(event.keyCode === 81){
    keys.moverun = false;
    player.classList.remove("move-run");
    clearInterval(moveForwardInterval);
  }
  if(event.keyCode === 87){
    keys.block = false;
    player.classList.remove("block");
    if(keys.moveForward){
         moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
    if(keys.moveBack){
       moveBackInterval = setInterval(function(){
        moveBackFunc(player)
      });
    }
  }
}


// Kicks

function handKickFunc(player){
  if(!keys.moveTop && keys.moveForward || keys.jumpEnd && keys.moveTop && keys.moveForward ){
    clearInterval(moveForwardInterval);
  }
  if(!keys.moveTop && keys.moveBack || keys.jumpEnd && keys.moveTop && keys.moveBack){
    clearInterval(moveBackInterval);
  }
  if(keys.footKickEnd){
    keys.handkick = true;
    player.classList.add("hand-kick");
    playAudio('hand_kick');
    keys.handKickEnd = false;
    setTimeout(function(){
      if(keys.moveForward){
         clearInterval(moveForwardInterval);
         moveForwardInterval = setInterval(function(){
           moveForwardFunc(player)
        });
      }
      if(keys.moveBack){
         clearInterval(moveBackInterval);
         moveBackInterval = setInterval(function(){
          moveBackFunc(player);
        });
      }
      keys.handkick = false;
      player.classList.remove("hand-kick");
      stopAudio('hand_kick');
      keys.handKickEnd = true;
      if(keys.keyPressedHandkick){
        keys.handkick = true;
      }
      else{
        keys.handkick = false;
      }
    }, 400);
  }
}

function footKickFunc(player){
  if(!keys.moveTop && keys.moveForward || keys.jumpEnd && keys.moveTop && keys.moveForward){
    clearInterval(moveForwardInterval);
  }
  if(!keys.moveTop && keys.moveBack || keys.jumpEnd && keys.moveTop && keys.moveBack){
    clearInterval(moveBackInterval);
  }
  if(keys.handKickEnd){
    keys.footkick = true;
    player.classList.add("foot-kick");
    playAudio('foot_kick');
    keys.footKickEnd = false;
    setTimeout(function(){
      if(keys.moveForward){
         clearInterval(moveForwardInterval);
         moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
      if(keys.moveBack){
         clearInterval(moveBackInterval);
         moveBackInterval= setInterval(function(){
          moveBackFunc(player)
        });
      }
      keys.footkick = false;
      player.classList.remove("foot-kick");
      stopAudio('foot_kick');
      keys.footKickEnd = true;
      if(keys.keyPressedFootkick){
        keys.footkick = true;
      }
      else{
        keys.footkick = false;
      }
    }, 400);
  }
}

// jump

function jump(player){
  if (!keys.moveTop && keys.jumpEnd) {
    keys.moveTop = true;
    keys.jumpEnd = false;
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
    keys.moveTop = false;
    keys.jumpEnd = true;
    if(keys.keyPressedJump){
        keys.moveTop = true;
      }
    else{
      keys.moveTop = false;
    }
  }
}




// Movement

function moveBackFunc(player){
  if(keys.playerPosX >= 0){
    if(keys.playerPosY < playerHeight || keys.playerPosX < playerTwoPosX + playerWidth || keys.playerPosX > playerTwoPosX + playerWidth){
      keys.moveBack = true;
      player.style.left = parseInt(player.style.left) - 1 + 'px';
    }
  }
}

function moveForwardFunc(player){
  if(keys.playerPosX <= levelWidth - player.offsetWidth){
    if(keys.playerPosY < playerHeight || keys.playerPosX < playerTwoPosX - playerWidth || keys.playerPosX > playerTwoPosX - playerWidth){//
      keys.moveForward = true;
      player.style.left = parseInt(player.style.left) + 1 + 'px';
    }
  }
}

function moveBottomFunc(player){
  keys.moveBottom = true;
  player.classList.add("move-down");
}

function blockFunc(player){
  keys.block = true;
  player.classList.add("block");
}

function moveRunFunc(player){
  if(keys.playerPosX <= levelWidth - player.offsetWidth){
    playAudio('syborg_run');
    player.style.left = parseInt(player.style.left) + 2 + 'px';
  }
}


///// Get the positions

function getPosition(player) {
  keys.playerPosX = 0;
  keys.playerPosY = 0;
  keys.playerPosX += (player.offsetLeft - player.scrollLeft + player.clientLeft);
  keys.playerPosY += (player.offsetTop - player.scrollTop + player.clientTop);
  var coords = "x:" + keys.playerPosX + " y:" + keys.playerPosY;
  player.innerHTML =  coords;

  if(keys.playerPosX > playerTwoPosX){
    heroOne.classList.add("flipped");
    heroTwo.classList.remove("flipped");
  }
  else{
    heroOne.classList.remove("flipped");
    heroTwo.classList.add("flipped");
  }
  playerPositionFix();
}




var getPosInterval = setInterval(function(){
    getPosition(heroOne);
});



function playerPositionFix(){
  var playerPosDiff = keys.playerPosX - playerTwoPosX;
  if(keys.playerPosX > playerTwoPosX - playerWidth && keys.playerPosX < playerTwoPosX + playerWidth && keys.playerPosY > playerHeight - 10){
    if (playerPosDiff > 0 ){
      keys.playerPosX += 10;
      playerTwoPosX -= 10;
    } 
    else {
      keys.playerPosX -= 10;
      playerTwoPosX += 10;
    }
    heroOne.style.left = keys.playerPosX + 'px';
    heroTwo.style.left = playerTwoPosX + 'px';
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

