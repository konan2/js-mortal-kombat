
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
  moveright: false,
  movebottom: false,
  moveleft: false,
  handkick: false,
  footkick: false,
  moverun: false
};

var intervalId =  null;
var jumpNow = false;
var heroOnePosX;
var heroOnePosY;

// audio

insertAudio('foot_kick');
insertAudio('hand_kick');
insertAudio('syborg_run');
insertAudio('stage_music_loop');

//playAudio('stage_music_loop', "loop");

///

function funkKeyDown(event){
  console.log(event.keyCode);
  if(event.keyCode === 38){
    keys.movetop = true;
  }
  if(event.keyCode === 39){
    keys.moveright = true;
  }
  if(event.keyCode === 40){
    keys.movebottom = true;
  }
  if(event.keyCode === 37){
    keys.moveleft = true;
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
  useKeys();
}

function funkKeyUp(event){
  if(event.keyCode === 38){
    keys.movetop = false;
    onKeyUp();
  }
  if(event.keyCode === 39){
    keys.moveright = false;
    onKeyUp();
  }
  if(event.keyCode === 40){
    keys.movebottom = false;
    onKeyUp();
  }
  if(event.keyCode === 37){
    keys.moveleft = false;
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
  useKeys();
}





function useKeys(){

  if(keys.moveleft){
    if(!intervalId){
     intervalId = setInterval(moveLeft);
     heroOne.classList.add("move-back");
    }
  }
  if(keys.moveright){
    if(!intervalId){
     intervalId = setInterval(moveRight);
     heroOne.classList.add("move-forward");
    }
  }
  if(keys.movebottom){
    if(!intervalId){
     intervalId = setInterval(moveBottom);
    }
  }
  if(keys.movetop){
    jump();
  }
  if(keys.handkick){
    playAudio('hand_kick');
    handkick();
    clearInterval(intervalId);
  }
  if(keys.footkick){
    playAudio('foot_kick');
    footkick();
    clearInterval(intervalId);
  }
    // stop move while kicking

  if(keys.moveleft && keys.footkick){
    clearInterval(intervalId);
    footkick();
  }
  if(keys.moveright && keys.footkick){
    clearInterval(intervalId);
    footkick();
  }
  if(keys.moveleft && keys.handkick){
    clearInterval(intervalId);
    handkick();
  }
  if(keys.moveright && keys.handkick){
    clearInterval(intervalId);
    handkick();
  }
  // run
  if(keys.moverun){
    if(!intervalId){
     playAudio('syborg_run');
     intervalId = setInterval(moveRun);
     heroOne.classList.add("move-run");
    }
  }
}


function moveLeft(){
  getPosition(heroOne);
  if(heroOnePosX >= 0){
    heroOne.style.left = parseInt(heroOne.style.left) - 1 + 'px';
  }
}

function moveRight(){
  getPosition(heroOne);
  if(heroOnePosX <= levelWidth - heroOne.offsetWidth){
    heroOne.style.left = parseInt(heroOne.style.left) + 1 + 'px';
  }
}

function moveBottom(){
  heroOne.classList.add("move-down");
}

function moveRun(){
  getPosition(heroOne);
  if(heroOnePosX <= levelWidth - heroOne.offsetWidth){
    heroOne.style.left = parseInt(heroOne.style.left) + 2 + 'px';
  }
}

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


//// end sounds

function jump(){
  getPosition(heroOne);
    if (!jumpNow) {
      toTop(function(){
        toBottom(jumpEnd);
      });
      jumpNow = true;
      if(keys.movetop){
      setTimeout(function() {
        jumpNow = false;
      }, 500);
    }
  }
}

var jumpEnd = function(){
  heroOne.classList.remove("move-top");
}


function toTop(callbackFn){
  heroOne.classList.add("move-top");
  setTimeout(function() {
    heroOne.style.bottom = parseInt(heroOne.style.bottom) + 5 + 'px';
    if (parseInt(heroOne.style.bottom) > 115){
      callbackFn();
    } else {
      toTop(callbackFn);
    }
  }, 10);
}

function toBottom(callbackFn){
  setTimeout(function() {
    heroOne.style.bottom = parseInt(heroOne.style.bottom) - 5 + 'px';
    if (parseInt(heroOne.style.bottom) > 0){
      toBottom(callbackFn);
    } 
    else {
      callbackFn();
    }
  }, 10);
}

// kicks

function handkick(){
  heroOne.classList.add("hand-kick");
}

function footkick(){
  heroOne.classList.add("foot-kick");
}





//////////////////////////////////////////////////


function onKeyUp(){
  clearInterval(intervalId);
  intervalId = null;
  document.querySelector(".hero").classList.remove("move-back", "move-forward", "move-down", "move-up", "hand-kick", "foot-kick", "move-run");
}


function getPosition(el) {
  heroOnePosX = 0;
  heroOnePosY = 0;
  heroOnePosX += (el.offsetLeft - el.scrollLeft + el.clientLeft);
  heroOnePosY += (el.offsetTop - el.scrollTop + el.clientTop);

  var coords = "x:" + heroOnePosX + " y:" + heroOnePosY;
  el.innerHTML =  coords;
}



document.addEventListener("keydown", funkKeyDown);
document.addEventListener("keyup", funkKeyUp);








































// var bodyBlock = document.querySelector(".wrapper");
// var heroOne = document.getElementById("hero1");
// var heroTwo = document.getElementById("hero2");

// var resetBtn = document.getElementById("reset");
// var bloodStatus = document.querySelector(".blood-status");
// var health = 100;

// var HeroOneHealth = health;
// var HeroTwoHealth = health;

// var levelWrapper = document.querySelector(".wrapper");
// var levelWidth = levelWrapper.offsetWidth;


// var wastedText = document.createElement('span');
// wastedText.classList.add("wasted-text")
// wastedText.innerHTML = 'Wasted';



// document.querySelector("#hero1-kicks").addEventListener("click", heroOneDamage);
// document.querySelector("#hero2-kicks").addEventListener("click", heroTwoDamage);

// resetBtn.addEventListener("click", resetFunc);


// function heroOneDamage(){
//   if(HeroOneHealth>0){
//     heroOne.classList.toggle("kick");
//     HeroOneHealth = HeroOneHealth - 20;
//     document.querySelector("#hero1-level .blood-status").style.width =  HeroOneHealth + "%";
//   }
//   if(HeroOneHealth===0){
//     heroOne.classList.add("wasted");
//     bodyBlock.appendChild(wastedText);
//     while(HeroOneHealth);
//     HeroOneHealth = false;
//   }
// }

// function heroTwoDamage(){
//   if(HeroTwoHealth>0){
//     heroTwo.classList.toggle("kick");
//     HeroTwoHealth = HeroTwoHealth - 20;
//     document.querySelector("#hero2-level .blood-status").style.width =  HeroTwoHealth + "%";
//   }
//   if(HeroTwoHealth===0){
//     heroTwo.classList.add("wasted");
//     bodyBlock.appendChild(wastedText);
//     while(HeroTwoHealth);
//     HeroTwoHealth = false;
//   }
// }

// function resetFunc(){
//   document.querySelector("#hero1-level .blood-status").style.width =  health + "%";
//   document.querySelector("#hero2-level .blood-status").style.width =  health + "%";
//   HeroOneHealth, HeroTwoHealth = health;
//   document.querySelector(".wasted").classList.remove("wasted");
//   document.querySelector(".wasted-text").remove();
// }

// // Movement



// var keys = {
//   movetop: false,
//   moveright: false,
//   movebottom: false,
//   moveleft: false,
//   handkick: false,
//   footkick: false,
//   moverun: false
// };

// var intervalId =  null;
// var jumpNow = false;
// var nowKickPressed = false;
// var heroOnePosX;
// var heroOnePosY;

// // audio

// insertAudio('foot_kick');
// insertAudio('hand_kick');
// insertAudio('syborg_run');
// insertAudio('stage_music_loop');

// //playAudio('stage_music_loop', "loop");

// ///

// function funkKeyDown(event){
//   console.log(event.keyCode);
//   if(event.keyCode === 38){
//     keys.movetop = true;
//   }
//   if(event.keyCode === 39){
//     keys.moveright = true;
//   }
//   if(event.keyCode === 40){
//     keys.movebottom = true;
//   }
//   if(event.keyCode === 37){
//     keys.moveleft = true;
//   }
//   if(event.keyCode === 65){
//     keys.handkick = true;
//   }
//   if(event.keyCode === 83){
//     keys.footkick = true;
//   }
//   if(event.keyCode === 81){
//     keys.moverun = true;
//   }
//   useKeys();
// }

// function funkKeyUp(event){
//   if(event.keyCode === 38){
//     keys.movetop = false;
//     onKeyUp();
//   }
//   if(event.keyCode === 39){
//     keys.moveright = false;
//     onKeyUp();
//   }
//   if(event.keyCode === 40){
//     keys.movebottom = false;
//     onKeyUp();
//   }
//   if(event.keyCode === 37){
//     keys.moveleft = false;
//     onKeyUp();
//   }
//   if(event.keyCode === 65){
//     keys.handkick = false;
//     onKeyUp();
//     nowKickPressed = false;
//   }
//   if(event.keyCode === 83){
//     keys.footkick = false;
//     onKeyUp();
//     nowKickPressed = false;
//   }
//   if(event.keyCode === 81){
//     keys.moverun = false;
//     onKeyUp();
//   }
//   useKeys();
// }





// function useKeys(){

//   if(keys.moveleft){
//     if(!intervalId){
//      intervalId = setInterval(moveLeft);
//      heroOne.classList.add("move-back");
//     }
//   }
//   if(keys.moveright){
//     if(!intervalId){
//      intervalId = setInterval(moveRight);
//      heroOne.classList.add("move-forward");
//     }
//   }
//   if(keys.movebottom){
//     if(!intervalId){
//      intervalId = setInterval(moveBottom);
//     }
//   }
//   if(keys.movetop){
//     jump();
//   }
//   if(keys.handkick){
//     handkick();
//     clearInterval(intervalId);
//   }
//   if(keys.footkick){
//     footkick();
//     clearInterval(intervalId);
//   }
//     // stop move while kicking

//   if(keys.moveleft && keys.footkick){
//     clearInterval(intervalId);
//     footkick();
//   }
//   if(keys.moveright && keys.footkick){
//     clearInterval(intervalId);
//     footkick();
//   }
//   if(keys.moveleft && keys.handkick){
//     clearInterval(intervalId);
//     handkick();
//   }
//   if(keys.moveright && keys.handkick){
//     clearInterval(intervalId);
//     handkick();
//   }
//   // run
//   if(keys.moverun){
//     if(!intervalId){
//      playAudio('syborg_run');
//      intervalId = setInterval(moveRun);
//      heroOne.classList.add("move-run");
//     }
//   }
// }


// function moveLeft(){
//   getPosition(heroOne);
//   if(heroOnePosX >= 0){
//     heroOne.style.left = parseInt(heroOne.style.left) - 1 + 'px';
//   }
// }

// function moveRight(){
//   getPosition(heroOne);
//   if(heroOnePosX <= levelWidth - heroOne.offsetWidth){
//     heroOne.style.left = parseInt(heroOne.style.left) + 1 + 'px';
//   }
// }

// function moveBottom(){
//   heroOne.classList.add("move-down");
// }

// function moveRun(){
//   getPosition(heroOne);
//   if(heroOnePosX <= levelWidth - heroOne.offsetWidth){
//     heroOne.style.left = parseInt(heroOne.style.left) + 2 + 'px';
//   }
// }

// /// sounds

// function insertAudio(trackname){
//   var audioSection = document.getElementById("audio-section");
//   var audioRun = "<audio id=" + trackname + " src='audio/" + trackname + ".mp3' type='audio/mp3'></audio>";
//   audioSection.innerHTML = audioSection.innerHTML + audioRun;
// }

// function playAudio(trackname, loop){
//   document.getElementById(trackname).play();
//   if(loop){
//     document.getElementById(trackname).setAttribute("loop", "");
//   }
// }

// function stopAudio(trackname){
//   document.getElementById(trackname).pause();
//   document.getElementById(trackname).currentTime = 0;
// }


// //// end sounds

// function jump(){
//   getPosition(heroOne);
//     if (!jumpNow) {
//       toTop(function(){
//         toBottom(jumpEnd);
//       });
//       jumpNow = true;
//       if(keys.movetop){
//       setTimeout(function() {
//         jumpNow = false;
//       }, 500);
//     }
//   }
// }

// var jumpEnd = function(){
//   heroOne.classList.remove("move-top");
// }


// function toTop(callbackFn){
//   heroOne.classList.add("move-top");
//   setTimeout(function() {
//     heroOne.style.bottom = parseInt(heroOne.style.bottom) + 5 + 'px';
//     if (parseInt(heroOne.style.bottom) > 115){
//       callbackFn();
//     } else {
//       toTop(callbackFn);
//     }
//   }, 10);
// }

// function toBottom(callbackFn){
//   setTimeout(function() {
//     heroOne.style.bottom = parseInt(heroOne.style.bottom) - 5 + 'px';
//     if (parseInt(heroOne.style.bottom) > 0){
//       toBottom(callbackFn);
//     } 
//     else {
//       callbackFn();
//     }
//   }, 10);
// }

// // kicks

// function handkick(callbackFn){
//   if(!nowKickPressed){
//     playAudio('hand_kick');
//     heroOne.classList.add("hand-kick");
//     setTimeout(function() {
//       stopAudio('hand_kick');
//       heroOne.classList.remove("hand-kick");
//       nowKickPressed = true;
//       //handkick(callbackFn);
//     },250);
//   }
// }

// function footkick(callbackFn){
//   if(!nowKickPressed){
//     playAudio('foot_kick');
//     heroOne.classList.add("foot-kick");
//     setTimeout(function() {
//       stopAudio('foot_kick');
//       heroOne.classList.remove("foot-kick");
//       nowKickPressed = true;
//       //footkick(callbackFn);
//     },350);
//   }
// }




// //////////////////////////////////////////////////


// function onKeyUp(){
//   clearInterval(intervalId);
//   intervalId = null;
//   document.querySelector(".hero").classList.remove("move-back", "move-forward", "move-down", "move-up", "hand-kick", "foot-kick", "move-run");
// }


// function getPosition(el) {
//   heroOnePosX = 0;
//   heroOnePosY = 0;
//   heroOnePosX += (el.offsetLeft - el.scrollLeft + el.clientLeft);
//   heroOnePosY += (el.offsetTop - el.scrollTop + el.clientTop);

//   var coords = "x:" + heroOnePosX + " y:" + heroOnePosY;
//   el.innerHTML =  coords;
//   //return heroOnePosX, heroOnePosY;
// }

// // deal with the page getting resized or scrolled
// // window.addEventListener("scroll", updatePosition, false);
// // window.addEventListener("resize", updatePosition, false);
 
// // function updatePosition() {
// //   // add your code to update the position when your browser
// //   // is resized or scrolled
// // }



// document.addEventListener("keydown", funkKeyDown);
// document.addEventListener("keyup", funkKeyUp);



