
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







// var intervalId =  null;
// var nowPressedKey = null;


// var moveTopTest = 0;
// var moveRightTest = 0;
// var moveLeftTest = 0;
// var moveBottomTest = 0;


//function checkKey(event) {
 
    // if(event.keyCode !== null) {
    //   onKeyUp();
    // }
   // console.log("moveTop: " + moveTopTest, "moveRight: " + moveRightTest, "moveBottom: " + moveBottomTest, "moveLeft: " + moveLeftTest);
    //if(nowPressedKey !== event.keyCode){
      //console.log(event.keyCode);
    //}
    // if(moveTopTest === 1 && moveRightTest === 1){
    // intervalId = null;
    // intervalId = setInterval(moveRight);
    // console.log("111");
//}

  //   switch (event.keyCode) {
  //     case 37:
  //       if(!intervalId){
  //        intervalId = setInterval(moveLeft);
  //        heroOne.classList.add("move-back"); 
  //       }
  //       moveLeftTest = 1;
  //       break;
  //     case 39:
  //       if(!intervalId){
  //        intervalId = setInterval(moveRight);
  //        heroOne.classList.add("move-forward"); 
  //       }
  //       moveRightTest = 1;
  //       break;
  //     case 38:
  //       jump();
  //       heroOne.classList.add("move-top");
  //       moveTopTest = 1;
  //       break;
  //     case 40:
  //       if(!intervalId){
  //        heroOne.classList.add("move-down"); 
  //       }
  //       moveBottomTest = 1;
  //       break;
  //     };

  // };

// function checkKeyTop(event){
//   if(event.keyCode === 38){
//     console.log("top")
//   }
// }

// function checkKeyRight(event){
//   if(event.keyCode === 39){
//     console.log("right")
//   }
// }

// function checkKeyBottom(event){
//   if(event.keyCode === 40){
//     console.log("bottom")
//   }
// }

// function checkKeyLeft(event){
//   if(event.keyCode === 37){
//     console.log("Left")
//   }
// }

// function checkKeyTopLeft(event){
//   if(event.keyCode === 38 && event.keyCode === 37){
//     console.log("Top Left")
//   }
// }

// function test(){
//   var map = []; // Or you could call it "key"
//   onkeydown = onkeyup = function(e){
//     e = e || event; // to deal with IE
//     map[e.keyCode] = e.type == 'keydown';
//     /*insert conditional here*/
//     console.log(map);
//     if(map[39]){
//       //heroOne.classList.add("move-forward"); 
//       moveRight();
//     }
//     else{
//       //heroOne.classList.remove("move-forward");
//     }

//     if(map[38] === true && map[39] === true){ // CTRL+SHIFT+A
//       console.log('Top right');
//     }
//   }
// }


var keys = {
  movetop: false,
  moveright: false,
  movebottom: false,
  moveleft: false
};

var intervalId =  null;
var jumpNow = false;
var heroOnePosX;
var heroOnePosY;

function funkKeyDown(event){
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
  useKeys();
}




function useKeys(){
  
  //console.log(heroOnePosX, heroOnePosY);
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
  //heroOne.style.left = parseInt(heroOne.style.left) + 1 + 'px';
  heroOne.classList.add("move-down");
}

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
    if (parseInt(heroOne.style.bottom) > 100){
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
    } else {
      callbackFn();
    }
  }, 10);
}


function onKeyUp(){
  clearInterval(intervalId);
  intervalId = null;
  document.querySelector(".hero").classList.remove("move-back", "move-forward", "move-down", "move-up");
}


function getPosition(el) {
  heroOnePosX = 0;
  heroOnePosY = 0;
  heroOnePosX += (el.offsetLeft - el.scrollLeft + el.clientLeft);
  heroOnePosY += (el.offsetTop - el.scrollTop + el.clientTop);

  var coords = "x:" + heroOnePosX + " y:" + heroOnePosY;
  el.innerHTML =  coords;
  //return heroOnePosX, heroOnePosY;
}

// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);
 
function updatePosition() {
  // add your code to update the position when your browser
  // is resized or scrolled
}



document.addEventListener("keydown", funkKeyDown);
document.addEventListener("keyup", funkKeyUp);












































// document.addEventListener("keydown", checkKeyTop);
// document.addEventListener("keydown", checkKeyRight);
// document.addEventListener("keydown", checkKeyBottom);
// document.addEventListener("keydown", checkKeyLeft);

// document.addEventListener("keydown", checkKeyTopLeft);


// function onKeyUp(){
// console.log("moveTop: " + moveTopTest, "moveRight: " + moveRightTest, "moveBottom: " + moveBottomTest, "moveLeft: " + moveLeftTest);

// clearInterval(intervalId);
// intervalId = null;

//   document.querySelector(".hero").classList.remove("move-back", "move-forward", "move-down", "move-up");

// }

//document.addEventListener("keyup", onKeyUp);


