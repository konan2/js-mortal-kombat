
var bodyBlock = document.querySelector(".wrapper");
var heroOne = document.getElementById("hero1");
var heroTwo = document.getElementById("hero2");

var resetBtn = document.getElementById("reset");
var bloodStatus = document.querySelector(".blood-status");
var health = 100;

var HeroOneHealth = health;
var HeroTwoHealth = health;

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




function moveLeft(){
  heroOne.style.left = parseInt(heroOne.style.left) - 1 + 'px';
}

function moveRight(){
  heroOne.style.left = parseInt(heroOne.style.left) + 1 + 'px';
}

function moveTop(){
  console.log("top pressed");
  jump();
  
}
function jump(){
  var finishFn = function(){
    heroOne.classList.remove("move-top"); 
  }
  toTop(function(){
    toBottom(finishFn);
  });
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


var intervalId =  null;
var nowPressedKey = null;


function checkKey(event) {
    var event = window.event ? window.event : e;
    //console.log(event.keyCode);
    if(nowPressedKey !== event.keyCode) {
      onKeyUp();
    }

    switch (event.keyCode) {
      case 37:
        if(!intervalId){
         intervalId = setInterval(moveLeft);
         heroOne.classList.add("move-back"); 
        }

        break;
      case 39:
        if(!intervalId){
         intervalId = setInterval(moveRight);
         heroOne.classList.add("move-forward"); 
        }
        
        break;
        case 38:
       
         moveTop();
         heroOne.classList.add("move-top");
        
        
        break;
        case 40:
        if(!intervalId){
         heroOne.classList.add("move-down"); 
        }
        
        break;
      };
  };


document.addEventListener("keydown", checkKey);
function onKeyUp(){
  document.querySelector(".hero").classList.remove("move-back", "move-forward", "move-down", "move-up");
  clearInterval(intervalId);
  nowPressedKey = null;
  intervalId = null;
}
document.addEventListener("keyup", onKeyUp);
