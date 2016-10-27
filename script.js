//
// Main code
//

// Keyboard controls

var playerUsedCodes = [];
var player2UsedCodes = [];


// Data

var playerOneData = {
  playerSelector: document.getElementById("player1"),
  playerLifeSelector: document.getElementById("player1-level"),
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
  playerHeight: 138,
  keyPressedJump: false,
  footKickEnd: true,
  handKickEnd: true,
  jumpEnd: true,
  life: 100,
  isDamaged: false,
  moveForwardInterval: null,
  moveBackInterval: null,
  moveRunInterval: null,
  defeated: false,
  canRun: true,
  playerKeys: {
    jump: 87,
    forward: 68,
    back: 65,
    bottom: 83,
    handkick: 82,
    footkick: 69,
    run: 81,
    block: 70
  }
};


var playerTwoData = {
  playerSelector: document.getElementById("player2"),
  playerLifeSelector: document.getElementById("player2-level"),
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
  playerHeight: 138,
  keyPressedJump: false,
  footKickEnd: true,
  handKickEnd: true,
  jumpEnd: true,
  life: 100,
  isDamaged: false,
  moveForwardInterval: null,
  moveBackInterval: null,
  moveRunInterval: null,
  defeated: false,
  playerKeys: {
    jump: 38,
    forward: 39,
    back: 37,
    bottom: 40,
    handkick: 103,
    footkick: 104,
    run: 100,
    block: 101
  }
};

var player;
var player2;

var playerWidth = 72;
var playerHeight = 262;

var getPosInterval = null;

var blockedDamage = 1;
var handKickDamage = 2;
var footKickDamage = 3;



var playerPosDiff;
var playerPosDiffJump;

var levelWrapper = document.querySelector(".wrapper");
var levelWidth = levelWrapper.offsetWidth;

var handkick = 'handkick';
var handKickEnd = 'handKickEnd';

var footkick = 'footkick';
var footKickEnd = 'footKickEnd';

// audio

insertAudio('foot_kick');
insertAudio('hand_kick');
insertAudio('syborg_run');
// insertAudio('desert_level_track');
insertAudio('jump_end');
insertAudio('foot_damage');
insertAudio('hand_damage');
insertAudio('kick-blocked');

//playAudio('desert_level_track', "loop");




// get player keys function

function getPlayerKeys(playerOneKeyMap, playerOneKeyMap){
  for(var i in playerOneKeyMap) {
    playerUsedCodes.push(playerOneData.playerKeys[i]);
  }
  for(var j in playerOneKeyMap) {
    player2UsedCodes.push(playerTwoData.playerKeys[j]);
  }
}

getPlayerKeys(playerOneData.playerKeys, playerTwoData.playerKeys);


///////////////////////////

function getPlayerSide(event){
  if(playerUsedCodes.includes(event.keyCode)){
    player = playerOneData;
    player2 = playerTwoData;
  }
  if(player2UsedCodes.includes(event.keyCode)){
    player = playerTwoData;
    player2 = playerOneData;
  }
  else{
    return;
  };
}


function funcKeyDown(event){

  getPlayerSide(event);

  // jump
  if(event.keyCode === player.playerKeys.jump && !player.block && !player.moverun){
    jump(player);
  }


  // Move forward
  if(event.keyCode === player.playerKeys.forward && !player.block && !player.moverun && !player.moveBottom && !player.handkick && !player.footkick){
    moveForwardFunc(player)
  }


  // Move back
  if(event.keyCode === player.playerKeys.back && !player.block && !player.moverun && !player.moveBottom && !player.handkick && !player.footkick){
    moveBackFunc(player);
  }


  // Move bottom
  if(event.keyCode === player.playerKeys.bottom){
    clearInterval(player.moveForwardInterval);
    clearInterval(player.moveBackInterval);
    moveBottomFunc(player);
  }

  // Hand kick
  if(event.keyCode === player.playerKeys.handkick){
    kickFunc(player, handkick, 300, handKickEnd, "hand-kick", 'hand_kick', 'hand_damage', handKickDamage, "hand-damaged", 100, 250);
  }


  // Foot kick
  if(event.keyCode === player.playerKeys.footkick){
    kickFunc(player, footkick, 400, footKickEnd, "foot-kick", 'foot_kick', 'foot_damage', footKickDamage, "foot-damaged", 300, 500);
  }


  // Run
  if(event.keyCode === player.playerKeys.run && !player.block && !player.moveTop && player.jumpEnd && !player.moveForward && !player.moveBack && !player.moveBottom){
    clearInterval(player.moveRunInterval);
    player.moveRunInterval = setInterval(function(){
      moveRunFunc(player);
    });
  }


  // Block
  if(event.keyCode === player.playerKeys.block){
    clearInterval(player.moveForwardInterval);
    clearInterval(player.moveBackInterval);
    clearInterval(player.moveRunInterval);
    blockFunc(player);
  }
}




function funcKeyUp(event){
    getPlayerSide(event);
  // jump
  if(event.keyCode === player.playerKeys.jump){
    player.moveTop = false;
    player.keyPressedJump = false;
    player.playerSelector.classList.remove("move-up");
  }

  // Move forward
  if(event.keyCode === player.playerKeys.forward){
    player.moveForward = false;
    player.playerSelector.classList.remove("move-forward");
    clearInterval(player.moveForwardInterval);
  }

  // Move back
  if(event.keyCode === player.playerKeys.back){
    player.moveBack = false;
    player.playerSelector.classList.remove("move-back");
    clearInterval(player.moveBackInterval);
  }


  // Move bottom
  if(event.keyCode === player.playerKeys.bottom){
    player.moveBottom = false;
    player.playerSelector.classList.remove("move-down");
  }


  // Run
  if(event.keyCode === player.playerKeys.run){
    player.moverun = false;
    player.playerSelector.classList.remove("move-run");
    clearInterval(player.moveRunInterval);
  }

  // Block
  if(event.keyCode === player.playerKeys.block){
    player.block = false;
    player.playerSelector.classList.remove("block");
    if(player.moveForward){
         player.moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
    if(player.moveBack){
       player.moveBackInterval = setInterval(function(){
        moveBackFunc(player)
      });
    }
  }
}




// Kicks

function kickFunc(player, kickType, kickTime, kickEnd, kickTypeClass, kickAudio, kickDamageAudio, kickDamage, kickClass, beforeKickInterval, afterKickInterval){
  if(!player.moveTop && player.moveForward || player.jumpEnd && player.moveTop && player.moveForward){
    clearInterval(player.moveForwardInterval);
  }
  if(!player.moveTop && player.moveBack || player.jumpEnd && player.moveTop && player.moveBack){
    clearInterval(player.moveBackInterval);
  }
  console.log(player.handKickEnd);
  if(player.handKickEnd && !player.isDamaged && player.footKickEnd){
    player[kickType] = true;
    player.playerSelector.classList.add(kickTypeClass);
    playAudio(kickAudio);
    player[kickEnd] = false;
    setTimeout(function(){
      if(player.moveForward){
         clearInterval(player.moveForwardInterval);
         player.moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
      if(player.moveBack){
         clearInterval(player.moveBackInterval);
         player.moveBackInterval = setInterval(function(){
          moveBackFunc(player)
        });
      }
      player[kickEnd] = true;
      player[kickType] = false;
      player.playerSelector.classList.remove(kickTypeClass);
      stopAudio(kickAudio);
    }, kickTime);
    if(playerPosDiff > -85 && playerPosDiff < 85 && playerPosDiffJump < 150){
      makeDamage(kickDamageAudio, kickDamage, kickClass, beforeKickInterval, afterKickInterval);
    }
  }
}

function makeDamage(kickDamageAudio, kickDamage, kickClass, beforeKickInterval, afterKickInterval){
  // if jump kick remove before kick interval
  if(!player.jumpEnd){
    afterKickInterval = afterKickInterval - beforeKickInterval;
    beforeKickInterval = beforeKickInterval - beforeKickInterval;
  }
  // kick intervals
  setTimeout(function(){
    player2.playerSelector.classList.add(kickClass);
    player2.isDamaged = true;
    if(player2.block){
      playAudio('kick-blocked');
      player2.life = player2.life - blockedDamage;
    }
    else{
      playAudio(kickDamageAudio);
      player2.life = player2.life - kickDamage;
      startBlood(player2);
    }
    lifeCheck();
  }, beforeKickInterval);
  
  setTimeout(function(){
    player2.playerSelector.classList.remove(kickClass);
    player2.isDamaged = false;
    stopAudio(kickDamageAudio);
    stopAudio('kick-blocked');
  }, afterKickInterval);
}



function lifeCheck(){
  player2.playerLifeSelector.style.width = player2.life + "%";
  if(player2.life < 5){
    player2.life = 0;
    player2.defeated = true;
    if(!player.defeated){
      player2.playerKeys = {};
      setTimeout(function() {
        player2.playerSelector.classList.add("defeated");
      }, 500);
    }
  }
}


// Movement

function moveForwardFunc(player){
  if(player.playerPosX <= levelWidth - player.playerSelector.offsetWidth){
    if(player.playerPosY < playerHeight || player.playerPosX < player2.playerPosX - playerWidth || player.playerPosX > player2.playerPosX - playerWidth || player.playerPosX === player2.playerPosX - playerWidth){
      if(!(player.playerPosY < playerHeight && player2.playerPosY < playerHeight && Math.abs(playerPosDiff) < 85)){
        player.moveForward = true;
        clearInterval(player.moveForwardInterval);
        player.playerSelector.classList.add("move-forward");
        player.moveForwardInterval = setInterval(function(){
          player.playerSelector.style.left = parseInt(player.playerSelector.style.left) + 1 + 'px';
        });
      }
    }
  }
}


function moveBackFunc(player){
  if(player.playerPosX >= 0){
    if(player.playerPosY < playerHeight || player.playerPosX < player2.playerPosX + playerWidth || player.playerPosX > player2.playerPosX + playerWidth || player.playerPosX === player2.playerPosX + playerWidth){
      if(!(player.playerPosY < playerHeight && player2.playerPosY < playerHeight && Math.abs(playerPosDiff) < 85)){
        player.moveBack = true;
        clearInterval(player.moveBackInterval);
        player.playerSelector.classList.add("move-back");
        player.moveBackInterval = setInterval(function(){
          player.playerSelector.style.left = parseInt(player.playerSelector.style.left) - 1 + 'px';
        });
        
      }
    }
  }
}



function moveBottomFunc(player){
  player.moveBottom = true;
  player.playerSelector.classList.add("move-down");
}

// jump

function jump(player){
  if (!player.moveTop && player.jumpEnd) {
    player.keyPressedJump = true;
    player.moveTop = true;
    player.jumpEnd = false;
    toTop(function(){
      toBottom(function(){
        jumpEnd(player);
      });
    });
  }
  function toTop(callbackFn){
    player.playerSelector.classList.add("move-top");
    setTimeout(function() {
      player.playerSelector.style.bottom = parseInt(player.playerSelector.style.bottom) + 6 + 'px';
      if (parseInt(player.playerSelector.style.bottom) > 180){
        callbackFn();
      } 
      else {
        toTop(callbackFn);
      }
    }, 10);
  }
  function toBottom(callbackFn){
    setTimeout(function() {
      player.playerSelector.style.bottom = parseInt(player.playerSelector.style.bottom) - 6 + 'px';
      if (parseInt(player.playerSelector.style.bottom) > 0){
        toBottom(callbackFn);
      } 
      else {
        callbackFn();
      }
    }, 10);
  }
  function jumpEnd(player){
    playAudio('jump_end');
    player.moveTop = false;
    player.jumpEnd = true;
    player.playerSelector.classList.remove("move-top", "hand-kick", "foot-kick");
    if(player.keyPressedJump){
        player.moveTop = true;
      }
    else{
      player.moveTop = false;
    }
  }
}


function blockFunc(player){
  if(!player.moveTop){
    player.block = true;
    player.playerSelector.classList.add("block");
  }
}

function moveRunFunc(player){
  if(player.playerPosX <= levelWidth - player.playerWidth && player2.playerPosX > -player.playerWidth/2 && !(playerPosDiff > -85 && playerPosDiff < 85)){
    player.moverun = true;
    player.playerSelector.classList.add("move-run");
    playAudio('syborg_run');
    if(player.playerPosX > player2.playerPosX){
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) - 2 + 'px';
    }
    else{
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) + 2 + 'px';
    }
  }
}



///// Get the positions

function getPosition(player) {
  player.playerPosX = 0;
  player.playerPosY = 0;
  player.playerPosX += (player.playerSelector.offsetLeft - player.playerSelector.scrollLeft + player.playerSelector.clientLeft);
  player.playerPosY += (player.playerSelector.offsetTop - player.playerSelector.scrollTop + player.playerSelector.clientTop);
  var coords = "Player X:" + player.playerPosX + " Player Y:" + player.playerPosY;
  document.getElementById("position-info").innerHTML =  coords;

  playerPosDiffJump = Math.abs(playerOneData.playerPosY - playerTwoData.playerPosY);
  var diffCoords = "Diff x: " + playerPosDiff + " Diff y: " + playerPosDiffJump;
  document.getElementById("position-diff-info").innerHTML =  diffCoords;
}

function getPosition2(player) {
  player.playerPosX = 0;
  player.playerPosY = 0;
  player.playerPosX += (player.playerSelector.offsetLeft - player.playerSelector.scrollLeft + player.playerSelector.clientLeft);
  player.playerPosY += (player.playerSelector.offsetTop - player.playerSelector.scrollTop + player.playerSelector.clientTop);
  var coords = "Player X:" + player.playerPosX + " Player Y:" + player.playerPosY;
  document.getElementById("position-info2").innerHTML =  coords;
}



function playerPositionFix(){
  playerPosDiff = playerOneData.playerPosX - playerTwoData.playerPosX;
  if(   playerOneData.playerPosX > playerTwoData.playerPosX - playerWidth 
     && playerOneData.playerPosX < playerTwoData.playerPosX + playerWidth 
     && playerOneData.playerPosY > playerHeight - 10 
     && playerTwoData.playerPosY > playerHeight - 10
     ){
    if (playerPosDiff > 0 ){
      playerOneData.playerPosX += 5;
      playerTwoData.playerPosX -= 5;
    } 
    else {
      playerOneData.playerPosX -= 5;
      playerTwoData.playerPosX += 5;
    }
    // move opponent while push
    playerOneData.playerSelector.style.left = playerOneData.playerPosX + 'px';
    playerTwoData.playerSelector.style.left = playerTwoData.playerPosX + 'px';
  }

  /// Player direction
  if(playerOneData.playerPosX > playerTwoData.playerPosX){
    playerOneData.playerSelector.setAttribute("flipped", "flipped");
    playerTwoData.playerSelector.removeAttribute("flipped", "flipped");
  }
  else{
    playerOneData.playerSelector.removeAttribute("flipped", "flipped");
    playerTwoData.playerSelector.setAttribute("flipped", "flipped");
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

// Change level 

function changeLevel(level){
  document.getElementById("page-wrapper").classList = [];
  document.getElementById("page-wrapper").className += level;
}

/////  Sparks


var particles = [];
var alreadyRendering = false;
var canvas = document.getElementById('canvas');

// originally from Rachel Smith on CodePen http://codepen.io/rachsmith/pen/oXBOwg
/* global particles */
function sparkShower(startx, starty, sparkWidth, sparkHeight) {
  var ctx = canvas.getContext('2d');
  var width = canvas.width = sparkWidth;
  var height = canvas.height = sparkHeight;
  var colors = ['#ff0000', '#e40c0c', '#ce0505'];
  // this is only used for simple gravity
  var gravity = 0.08;
  //var particles = [];
  var floor = sparkHeight;
  var currentlySparking = false;
  var maxSize = 3;
  // This is the acceleration of Gravity in m/s.
  var ag = 9.81;

  function initParticles() {
    currentlySparking = true;
    for (var i = 0; i < 30; i++) {
      setTimeout(function() {
        createParticle(i);
        //createParticle(i * 2);
      }, i);
    }
  }

  function createParticle(i) {
    // initial position in middle of canvas
    var x = startx;
    var y = starty;
    var z = (Math.random() * 2);
    // randomize the vx and vy a little - but we still want them flying 'up' and 'out'
    var maxex = Math.random() * 20;
    var vx = (Math.random() * maxex) - (maxex / 3);
    var vy = (Math.random() * -15);
    // velocity size?
    var vsize = 0;
    // randomize size and opacity a little & pick a color from our color palette
    var size = 1 + Math.random();
    var color = colors[Math.floor(Math.random() * colors.length)];
    var opacity = 0.5 + Math.random() * 0.5;
    var d = new Date();
    var startTime = d.getTime();
    var p = new Particle(x, y, z, vx, vy, size, vsize, color, opacity, startTime, startTime);
    p.finished = false;
    particles.push(p);
  }

  function Particle(x, y, z, vx, vy, size, vsize, color, opacity, startTime, lastTime) {

    function reset() {
      opacity = 0;
      this.finished = true;
    }

    this.update = function() {
      ///////if a particle has faded to nothing we can reset it to the starting position
      // if (opacity - 0.0005 > 0) opacity -= 0.0005;
      // else reset();
      /////////////simple gravity
      vy += gravity;
      var d = new Date();
      var timeNow = d.getTime();
      // Calculate gravity based on time elapsed since last update in lastTime
      // Pixels per "Meter" = 4735 = 4.7
      // Velocity of Y = Acceleration of Gravity in meters per second * number of seconds since last calc * pixels-per-meter
      if (timeNow > lastTime)
        vy += (ag * ((timeNow - lastTime) / 1000) * 4.7);
      lastTime = timeNow;
      x += vx;
      y += vy;
      if (y > (floor + 10)) this.finished = true;
      if (size < maxSize) size += vsize * z;
      if ((opacity < 0.5) && (y < floor)) {
        vsize = 0.55 - opacity;
      } else {
        vsize = 0;
      }
      ///////// add bouncing off the floor
      if (y > floor) {
        vy = vy * -0.4;
        vx = vx * 0.96;
      }
    };

    this.draw = function() {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      //ctx.fillRect(x, y, size, size);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    };
  }

  function render() {
    alreadyRendering = true;
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
      if (typeof particles[i] !== "undefined") {
        if (particles[i].finished === true) {
          particles.splice(i, 1);
        } else {
          particles[i].update();
          particles[i].draw();
        }
      }
    }
    requestAnimationFrame(render);
  }

  // resize
  // window.addEventListener('resize', resize);

  // function resize() {
  //   width = canvas.width = window.innerWidth;
  //   height = canvas.height = window.innerHeight;
  // }

  // init
  initParticles();
  if (!alreadyRendering)
    render();
}

function startBlood(player2) {
  var initialX = player2.playerPosX + player.playerWidth/2;
  var initialY = player2.playerPosY + player.playerHeight/2;
  var sparkWidth = canvas.offsetWidth;
  var sparkHeight = canvas.offsetHeight;
  sparkShower(initialX, initialY, sparkWidth, sparkHeight);
}



// Main interval

getPosInterval = setInterval(function(){
  getPosition(playerOneData);
  getPosition2(playerTwoData);
  playerPositionFix();
});
