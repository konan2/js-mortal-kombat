
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
};


var moveInterval = null;


// audio

insertAudio('foot_kick');
insertAudio('hand_kick');
insertAudio('syborg_run');
insertAudio('stage_music_loop');
insertAudio('jump_end');

//playAudio('stage_music_loop', "loop");


function funcKeyDown(event){
  keys.keyPressedHandkick = true;
  keys.keyPressedFootkick = true;

  var player;
  if(event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || event.keyCode === 37 || event.keyCode === 65 || event.keyCode === 83 || event.keyCode === 81 || event.keyCode === 87){
    player = heroOne;
  }

  if(event.keyCode === 38){
    jump(player);
  }
  if(event.keyCode === 39 && !keys.block && !keys.moverun && !keys.moveBottom){
    clearInterval(moveInterval);
    player.classList.add("move-forward");
    moveInterval = setInterval(function(){
      moveForwardFunc(player);
    });
  }
  if(event.keyCode === 40){
    moveBottomFunc(player);
  }
  if(event.keyCode === 37 && !keys.block && !keys.moverun && !keys.moveBottom){
    clearInterval(moveInterval);
    player.classList.add("move-back");
    moveInterval = setInterval(function(){
      moveBackFunc(player);
    });
  }
  if(event.keyCode === 65 && !keys.handkick){
    handKickFunc(player);
  }
  if(event.keyCode === 83 && !keys.footkick){
    footKickFunc(player);
  }
  if(event.keyCode === 81 && !keys.block){
    clearInterval(moveInterval);
    player.classList.add("move-run");
    moveInterval = setInterval(function(){
      moveRunFunc(player);
    });
  }
  if(event.keyCode === 87){
    clearInterval(moveInterval);
    blockFunc(player);
  }
}

function funcKeyUp(event){
   keys.keyPressedHandkick = false;
   keys.keyPressedFootkick = false;
   clearInterval(moveInterval);
   document.querySelector(".hero").classList.remove("move-back", "move-forward", "move-up", "hand-kick", "foot-kick", "move-run");

  if(event.keyCode === 38){
    keys.moveTop = false;
  }
  if(event.keyCode === 39){
    keys.moveForward = false;
  }
  if(event.keyCode === 40){
    keys.moveBottom = false;
    document.querySelector(".hero").classList.remove("move-down");
  }
  if(event.keyCode === 37){
    keys.moveBack = false;
  }
  if(event.keyCode === 65){
    keys.handkick = false;
  }
  if(event.keyCode === 83){
    keys.footkick = false;
  }
  if(event.keyCode === 81){
    keys.moverun = false;

  }
  if(event.keyCode === 87){
    keys.block = false;
    document.querySelector(".hero").classList.remove("block");
  }
}






// Kicks

function handKickFunc(player){
  player.classList.add("hand-kick");
  playAudio('hand_kick');
  setTimeout(function(){
    player.classList.remove("hand-kick");
    stopAudio('hand_kick');
    if(keys.keyPressedHandkick){
      keys.handkick = true;
    }
    else{
      keys.handkick = false;
    }
  }, 200);
}

function footKickFunc(player){
  
  player.classList.add("foot-kick");
  playAudio('foot_kick');
  setTimeout(function(){
    player.classList.remove("foot-kick");
    stopAudio('foot_kick');
    if(keys.keyPressedFootkick){
      keys.footkick = true;
    }
    else{
      keys.footkick = false;
    }
  }, 400);
}


// Movement

function moveBackFunc(player){
  if(keys.playerPosX >= 0){
    keys.moveBack = true;
    player.style.left = parseInt(player.style.left) - 1 + 'px';
  }
}

function moveForwardFunc(player){
  if(keys.playerPosX <= levelWidth - player.offsetWidth){
    keys.moveForward = true;
    player.style.left = parseInt(player.style.left) + 1 + 'px';
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
    keys.moverun = true;
    playAudio('syborg_run');
    player.style.left = parseInt(player.style.left) + 2 + 'px';
  }
}


function jump(player){
  if (!keys.moveTop) {
    keys.moveTop = true;
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
}

var playerTwoPosX = 301 - 68;
var playerTwoPosY = 158;

var getPosInterval = setInterval(function(){
    getPosition(heroOne);
});

var getPosInterval2 = setInterval(function(){
    getPosition(heroOne);
    if(keys.playerPosX > playerTwoPosX){
       heroOne.style.borderColor = "green";
    }
    if(keys.playerPosX < playerTwoPosX || keys.playerPosX > playerTwoPosX + 68 * 2){
      heroOne.style.borderColor = "#ddd";
    }
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

