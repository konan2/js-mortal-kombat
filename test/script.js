//
// Main code
//

// Data

var levelWraper = document.querySelector(".level-wrap");
var viewport = document.querySelector(".viewport");

var player = {
  selector: document.getElementById("player1"),
  moveTop: false,
  moveForward: false,
  moveBottom: false,
  moveBackward: false,
  positionX: 100,
  positionY: 40,
  speed: 1,
  accelerate: false
};

var levelWrap = {
  viewSelector: viewport,
  viewHeight: viewport.offsetHeight,
  viewWidth: viewport.offsetWidth,
  selector: levelWraper,
  positionXMax: levelWraper.offsetWidth,
  positionYMax: levelWraper.offsetHeight,
  positionX: 0,
  positionY: 0
}

var viewDiff = (levelWrap.positionYMax - levelWrap.viewHeight)*-1;



//////////////////////////





function funcKeyDown(event){
  console.log(player.accelerate);
  switch (event.keyCode) {
    case 40:
      player.moveBottom = true;
      player.selector.classList.add("move-bottom");
      break;
    case 37:
      player.moveBackward = true;
      player.selector.classList.add("move-backward");
      break; 
    case 38:
      player.moveTop = true;
      player.selector.classList.add("move-top");
      break;
    case 39:
       player.moveForward = true;
       player.selector.classList.add("move-forward");
      break;
  }
}
function funcKeyUp(event){
  console.log(player.accelerate);
   switch (event.keyCode) {
      case 40:
        player.moveBottom = false;
        player.selector.classList.remove("move-bottom");
        break;
      case 37:
         //player.moveBackward = false;
         //player.selector.classList.remove("move-backward");
        break; 
      case 38:
        player.moveTop = false;
        player.selector.classList.remove("move-top");
        break;
      case 39:
        //player.moveForward = false;
        player.accelerate = false;
        break;
    }
}



function move(){
  console.log(levelWrap.positionY);
  //console.log("player pos y: " + player.positionY + " levelWrap.viewHeight/2: " + levelWrap.viewHeight/2);
  if(player.moveForward){
    levelWrap.positionX = levelWrap.positionX - player.speed;
    setInterval(function(){
      player.accelerate = true;
    },2000)
    setTimeout(function(){
      if(player.speed <= 10 && player.accelerate){player.speed = player.speed + 0.01;}
    }, 2000)
  }
  if(player.moveBackward){
    levelWrap.positionX = levelWrap.positionX + 1;
  }
  if(player.moveTop && player.positionY <= levelWrap.viewHeight - 70){
    if(player.positionY >= levelWrap.viewHeight/2 && levelWrap.positionY >= viewDiff){
      levelWrap.positionY = levelWrap.positionY - 1;
    }
    else{
      player.positionY = player.positionY + 1;
    }
  }
  if(player.moveBottom){
    if(levelWrap.positionY <= 0 && player.positionY <= levelWrap.viewHeight/2){
      levelWrap.positionY = levelWrap.positionY + 1;
    }
    else{
      player.positionY = player.positionY - 1;
    }

  }
}

function getPosition(obj, infoblock) {
  obj.playerPosX = 0;
  obj.playerPosY = 0;
  obj.playerPosX += (obj.selector.offsetLeft - obj.selector.scrollLeft + obj.selector.clientLeft);
  obj.playerPosY += (obj.selector.offsetTop - obj.selector.scrollTop + obj.selector.clientTop);
  var coords = "Level X:" + obj.playerPosX + " Level Y:" + obj.playerPosY;
  document.getElementById(infoblock).innerHTML =  coords;
}

function setPosition(){
  levelWrap.selector.style.left = levelWrap.positionX + 'px';
  levelWrap.selector.style.bottom = levelWrap.positionY + 'px';
  player.selector.style.left = player.positionX + 'px';
  player.selector.style.bottom = player.positionY + 'px';
}


function game(){
  getPosition(levelWrap, "position-info");
  document.addEventListener("keydown", funcKeyDown);
  document.addEventListener("keyup", funcKeyUp);
  move();
  setPosition();
}

// Main interval

getPosInterval = setInterval(function(){
  game();
});


