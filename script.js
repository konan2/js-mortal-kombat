
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

// get pos

// function getPosX(el) {
//     for (var lx=0;
//          el != null;
//          lx += el.offsetLeft, el = el.offsetParent);
//     return lx;
// }

// function getPosY(el) {
//     for (var ly=0;
//          el != null;
//          ly += el.offsetTop, el = el.offsetParent);
//     return ly;
// }
var intervalId =  null;
var nowPressedKey = null;
function moveLeft(){
  heroOne.style.left = parseInt(heroOne.style.left) - 1 + 'px';
}

function moveRight(){
  heroOne.style.left = parseInt(heroOne.style.left) + 1 + 'px';
}


function checkKey(event) {
    var event = window.event ? window.event : e;
    //console.log(event.keyCode);
    if(nowPressedKey !== event.keyCode) {
      onKeyUp();
    }

    switch (event.keyCode) {
      case 37:
        if(!intervalId){
         intervalId = setInterval(moveLeft, 1);
         heroOne.classList.add("move-back"); 
        }
        
        break;
      case 39:
        if(!intervalId){
         intervalId = setInterval(moveRight, 1);
         heroOne.classList.add("move-forward"); 
        }
        
        break;
        case 38:
        if(!intervalId){
         intervalId = setInterval(moveRight, 1);
         heroOne.classList.add("move-forward"); 
        }
        
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
