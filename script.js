
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
  movetop: false,
  moveForward: false,
  movebottom: false,
  moveBack: false,
  handkick: false,
  footkick: false,
  moverun: false,
  block: false,
  playerPosX: 0,
  playerPosY: 0,
  playerWidth: 150,
  playerheight: 138
};

var intervalId =  null;
var jumpNow = false;


// audio

insertAudio('foot_kick');
insertAudio('hand_kick');
insertAudio('syborg_run');
insertAudio('stage_music_loop');
insertAudio('jump_end');

//playAudio('stage_music_loop', "loop");

///

function funkKeyDown(event){
  console.log(event.keyCode);
  if(event.keyCode === 38){
    keys.movetop = true;
  }
  if(event.keyCode === 39){
    keys.moveForward = true;
  }
  if(event.keyCode === 40){
    keys.movebottom = true;
  }
  if(event.keyCode === 37){
    keys.moveBack = true;
  }
  if(event.keyCode === 65){
    keys.handkick = true;
  }
  if(event.keyCode === 83){
    keys.footkick = true;
  }
  if(event.keyCode === 81){
    keys.moverun = true;
  }
  if(event.keyCode === 87){
    keys.block = true;
  }
  useKeys(heroOne);
}

function funkKeyUp(event){
  if(event.keyCode === 38){
    keys.movetop = false;
    onKeyUp();
  }
  if(event.keyCode === 39){
    keys.moveForward = false;
    onKeyUp();
  }
  if(event.keyCode === 40){
    keys.movebottom = false;
    onKeyUp();
  }
  if(event.keyCode === 37){
    keys.moveBack = false;
    onKeyUp();
  }
  if(event.keyCode === 65){
    keys.handkick = false;
    onKeyUp();
  }
  if(event.keyCode === 83){
    keys.footkick = false;
    onKeyUp();
  }
  if(event.keyCode === 81){
    keys.moverun = false;
    onKeyUp();
  }
  if(event.keyCode === 87){
    keys.block = false;
    onKeyUp();
  }
  useKeys(heroOne);
}

function useKeys(player){
  if(keys.moveBack){
    if(!intervalId){
     intervalId = setInterval(function(){
      moveBackFunc(player);
    });
     player.classList.add("move-back");
    }
  }
  if(keys.moveForward){
    if(!intervalId){
     intervalId = setInterval(function(){
      moveForwardFunc(player);
    });
     player.classList.add("move-forward");
    }
  }
  if(keys.movebottom){
    if(!intervalId){
      moveBottomFunc(player);
    }
  }
  if(keys.block){
    if(!intervalId){
      blockFunc(player);
    }
  }
  if(keys.movebottom && keys.block){
    player.classList.add("block");
  }
  if(keys.movetop){
    jump(player);
  }
  if(keys.handkick){
    playAudio('hand_kick');
    handKickFunk(player)
    clearInterval(intervalId);
  }
  if(keys.moveForward && keys.movetop && keys.handkick){
    playAudio('hand_kick');
    handKickFunk(player)
    intervalId = setInterval(function(){
      moveForwardFunc(player);
    });
  }
  if(keys.moveBack && keys.movetop && keys.handkick){
    stopAudio('hand_kick');
    intervalId = setInterval(function(){
      moveBackFunc(player);
    });
  }
  if(keys.footkick){
    playAudio('foot_kick');
    footKickFunk(player);
    clearInterval(intervalId);
  }
  if(keys.moveForward && keys.movetop && keys.footkick){
    playAudio('foot_kick');
    footKickFunk(player);
    intervalId = setInterval(function(){
      moveForwardFunc(player);
    });
  }
  if(keys.moveBack && keys.movetop && keys.footkick){
    stopAudio('foot_kick');
    intervalId = setInterval(function(){
      moveBackFunc(player);
    });
  }
  // run
  if(keys.moverun){
    if(!intervalId){
     playAudio('syborg_run');
     intervalId = setInterval(function(){
      moveRunFunc(player);
     });
     player.classList.add("move-run");
    }
  }
}




function moveBackFunc(player){
  getPosition(player);
  if(keys.playerPosX >= 0){
    player.style.left = parseInt(player.style.left) - 1 + 'px';
  }
}

function moveForwardFunc(player){
  getPosition(player);
  if(keys.playerPosX <= levelWidth - player.offsetWidth){
    player.style.left = parseInt(player.style.left) + 1 + 'px';
  }
}

function moveBottomFunc(player){
  player.classList.add("move-down");
}

function blockFunc(player){
  player.classList.add("block");
}

function moveRunFunc(player){
  getPosition(player);
  if(keys.playerPosX <= levelWidth - player.offsetWidth){
    player.style.left = parseInt(player.style.left) + 2 + 'px';
  }
}


function jump(player){
  getPosition(player);
  if (!jumpNow) {
    toTop(function(){
      toBottom(function(){
        jumpEnd(player);
      });
    });
    jumpNow = true;
    if(keys.movetop){
      setTimeout(function() {
        jumpNow = false;
      }, 500);
    }
  }

  function toTop(callbackFn){
    player.classList.add("move-top");
    setTimeout(function() {
      player.style.bottom = parseInt(player.style.bottom) + 5 + 'px';
      if (parseInt(player.style.bottom) > 115){
        callbackFn();
      } else {
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
  }

}

// kicks

function handKickFunk(player){
  player.classList.add("hand-kick");
}

function footKickFunk(player){
  player.classList.add("foot-kick");
}

//////////////////////////////////////////////////

/// sounds

function insertAudio(trackname){
  var audioSection = document.getElementById("audio-section");
  var audioRun = "<audio id=" + trackname + " src='audio/" + trackname + ".mp3' type='audio/mp3'></audio>";
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


function onKeyUp(){
  clearInterval(intervalId);
  intervalId = null;
  document.querySelector(".hero").classList.remove("move-back", "move-forward", "move-down", "move-up", "hand-kick", "foot-kick", "move-run", "block");
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

/////////////////////////////////////////////////

// collisions

function collision(){
  console.log(keys.playerPosX, keys.playerPosY);

}

collision();


document.addEventListener("keydown", funkKeyDown);
document.addEventListener("keyup", funkKeyUp);

