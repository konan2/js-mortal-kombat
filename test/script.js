//
// Main code
//

// Data

var player = {
  playerSelector: document.getElementById("player1"),
  moveTop: false,
  moveForward: false,
  moveBottom: false,
  moveBack: false,
  direction: '',
};

var player2 = {
  playerSelector: document.getElementById("player2"),
  moveTop: false,
  moveForward: false,
  moveBottom: false,
  moveBack: false,
  direction: '',
};



///////////////////////////

function game(){
  document.addEventListener("keydown", funcKeyDown);
  document.addEventListener("keyup", funcKeyUp);
  move();
}



function funcKeyDown(event){
  console.log(event.keyCode);
  switch (event.keyCode) {
    case 40:
      player.moveTop = true;
      break;
    case 37:
      player.moveForward = true;
      break; 
    case 38:
      player.moveBottom = true;
      break;
    case 39:
      player.moveBack = true;
      break;
    case 87:
      player2.moveTop = true;
      break;
    case 68:
      player2.moveForward = true;
      break; 
    case 83:
      player2.moveBottom = true;
      break;
    case 65:
      player2.moveBack = true;
      break;
  }
}

function funcKeyUp(event){
   switch (event.keyCode) {
      case 40:
        player.moveTop = false;
        break;
      case 37:
        player.moveForward = false;
        break; 
      case 38:
        player.moveBottom = false;
        break;
      case 39:
        player.moveBack = false;
        break;
      case 87:
        player2.moveTop = false;
        break;
      case 68:
        player2.moveForward = false;
        break; 
      case 83:
        player2.moveBottom = false;
        break;
      case 65:
        player2.moveBack = false;
        break;
    }
}



function move(){
  if(player.moveForward){
    player.playerSelector.style.left = parseInt(player.playerSelector.style.left ) - 1 + 'px';
  }
  if(player.moveBack){
    player.playerSelector.style.left = parseInt(player.playerSelector.style.left ) + 1 + 'px';
  }
  if(player2.moveForward){
    player2.playerSelector.style.left = parseInt(player2.playerSelector.style.left ) - 1 + 'px';
  }
  if(player2.moveBack){
    player2.playerSelector.style.left = parseInt(player2.playerSelector.style.left ) + 1 + 'px';
  }
}




// Main interval

getPosInterval = setInterval(function(){
  game();
});


