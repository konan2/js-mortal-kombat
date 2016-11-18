//
// Main code
//

// Keyboard controls

var playerUsedCodes = [];
var player2UsedCodes = [];

// Data

var gameData = {
  roundTime: 45,
  playersAreChoosen: false,
  musicEnabled: true,
  soundsEnabled: true
}

var playerData = {
  moveTop: false,
  moveForward: false,
  moveDown: false,
  moveBackward: false,
  handkick: false,
  footkick: false,
  moverun: false,
  block: false,
  playerPosX: 0,
  playerPosY: 0,
  playerWidth: 150,
  playerHeight: 262,
  keyPressedJump: false,
  footKickEnd: true,
  handKickEnd: true,
  attack: false,
  jumpEnd: true,
  jumpHeight: 180,
  life: 100,
  isDamaged: false,
  defeated: false,
  canRun: true,
  speed: 1,
  handKickDamage: 1,
  footKickDamage: 1,
  blockedDamage: 1,
  pushing: false
}

var playerOneData = {
  __proto__: playerData,
  playerSelector: document.getElementById("player1"),
  playerLifeSelector: document.getElementById("player1-level"),
  playerKeys: {
    jump: 87,
    forward: 68,
    back: 65,
    bottom: 83,
    handkick: 82,
    footkick: 84,
    run: 81,
    block: 70
  }
};

var playerTwoData = {
  __proto__: playerData,
  playerSelector: document.getElementById("player2"),
  playerLifeSelector: document.getElementById("player2-level"),
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

// Starting player sides
var player = playerOneData;
var player2 = playerTwoData;

// Global data

var mainInterval = null;

// Player position diff
var playerPosDiff;
var playerPosDiffJump;

// Level
var levelWrapper = document.querySelector(".play-zone");
var levelWidth = levelWrapper.offsetWidth;

// Players near each other and can make damage
var kickzone = false;

// audio
insertAudio('footkick');
insertAudio('handkick');
insertAudio('syborg_run');
insertAudio('jump_end');
insertAudio('foot_damage');
insertAudio('hand_damage');
insertAudio('kick-blocked');



// get player keys function

function getPlayerKeys(playerOneKeyMap, playerOneKeyMap){
  for(var i in playerOneKeyMap) {
    playerUsedCodes.push(playerOneData.playerKeys[i]);
  }
  for(var j in playerOneKeyMap) {
    player2UsedCodes.push(playerTwoData.playerKeys[j]);
  }
}

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
}


function funcKeyDown(event){
  getPlayerSide(event);
  //console.log(event.keyCode);
  // jump
  if(event.keyCode === player.playerKeys.jump){
    jump(player);
  }
  // Move forward
  if(event.keyCode === player.playerKeys.forward){
    player.moveForward = true;
    player.playerSelector.classList.add("move-forward");
  }
  // Move back
  if(event.keyCode === player.playerKeys.back){
    player.moveBackward = true;
    player.playerSelector.classList.add("move-back");
  }
  // Move bottom
  if(event.keyCode === player.playerKeys.bottom){
    player.moveDown = true;
    player.playerSelector.classList.add("move-down");
  }
  // Hand kick
  if(event.keyCode === player.playerKeys.handkick){
    if(player == playerOneData){
      kickFunc(playerOneData, playerTwoData,'handkick', 300, 'handKickEnd', 'hand_damage', playerOneData.handKickDamage, 'hand-damaged', 100, 250);
    }
    if(player == playerTwoData){
      kickFunc(playerTwoData, playerOneData, 'handkick', 300, 'handKickEnd', 'hand_damage', playerTwoData.handKickDamage, 'hand-damaged', 100, 250);
    }
  }
  // Foot kick
  if(event.keyCode === player.playerKeys.footkick){
    if(player == playerOneData){
      kickFunc(playerOneData, playerTwoData, 'footkick', 400, 'footKickEnd', 'foot_damage', playerOneData.footKickDamage, 'foot-damaged', 200, 400);
    }
    if(player == playerTwoData){
      kickFunc(playerTwoData, playerOneData, 'footkick', 400, 'footKickEnd', 'foot_damage', playerTwoData.footKickDamage, 'foot-damaged', 200, 400);
    }
  }


  // Run
  if(event.keyCode === player.playerKeys.run){
    player.moverun = true;
    player.playerSelector.classList.add("move-run");
    playAudio('syborg_run');
  }


  // Block
  if(event.keyCode === player.playerKeys.block){
    if(!player.moveTop){
      player.block = true;
      player.playerSelector.classList.add("block");
    }
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
  }

  // Move back
  if(event.keyCode === player.playerKeys.back){
    player.moveBackward = false;
    player.playerSelector.classList.remove("move-back");
  }


  // Move bottom
  if(event.keyCode === player.playerKeys.bottom){
    player.moveDown = false;
    player.playerSelector.classList.remove("move-down");
  }


  // Run
  if(event.keyCode === player.playerKeys.run){
    player.moverun = false;
    player.playerSelector.classList.remove("move-run");
  }

  // Block
  if(event.keyCode === player.playerKeys.block){
    player.block = false;
    player.playerSelector.classList.remove("block");
  }
}

// Movement

// /&& (kickzone && !(curPlayer.moveTop && oppPlayer.moveTop))

function movePlayer(curPlayer, oppPlayer){
  // Pushing
  curPlayer.pushing = false;
  if(curPlayer.moveForward && kickzone || curPlayer.moveBackward && kickzone || curPlayer.moverun && kickzone){
    curPlayer.pushing = true;
  }
  //
  if((!curPlayer.block && !curPlayer.moveDown && !curPlayer.handkick && !curPlayer.footkick && !curPlayer.isDamaged) || (!curPlayer.jumpEnd && curPlayer.handkick || !curPlayer.jumpEnd && curPlayer.footkick && !curPlayer.isDamaged)){
    if(curPlayer.moveForward){
      movePlayerForward(curPlayer, oppPlayer, curPlayer.speed)
    }
    if(curPlayer.moveBackward){
      movePlayerBackward(curPlayer, oppPlayer, curPlayer.speed)
    }
    // run
    if(curPlayer.moverun && !curPlayer.moveTop){
      if(curPlayer.playerPosX > oppPlayer.playerPosX){
        movePlayerBackward(curPlayer, oppPlayer, curPlayer.speed*2)
      }
      else{
        movePlayerForward(curPlayer, oppPlayer, curPlayer.speed*2)
      }
    }
  }
}


function movePlayerForward(curPlayer, oppPlayer, moveSpeed){
  if(curPlayer.playerPosX < levelWidth - curPlayer.playerWidth && !(curPlayer.playerPosY < 332 && oppPlayer.playerPosY < 332 && kickzone) && !(curPlayer.pushing && oppPlayer.playerPosX >= levelWidth - curPlayer.playerWidth)){
    curPlayer.playerSelector.style.left = parseInt(curPlayer.playerSelector.style.left) + moveSpeed + 'px';
  }
}

function movePlayerBackward(curPlayer, oppPlayer, moveSpeed){
  if(curPlayer.playerPosX >= 0 && !(curPlayer.playerPosY < 332 && oppPlayer.playerPosY < 332 && kickzone) && !(curPlayer.pushing && oppPlayer.playerPosX <= 0)){
    curPlayer.playerSelector.style.left = parseInt(curPlayer.playerSelector.style.left) - moveSpeed + 'px';
  }
}

// Kicks

function kickFunc(player, playerOpponent, kickType, kickTime, kickEnd, kickDamageAudio, kickDamage, kickDamageClass, beforeKickInterval, afterKickInterval){
  if(!player.isDamaged && !kickzone && player.handKickEnd && player.footKickEnd || (!player.isDamaged && kickzone && player.handKickEnd && player.footKickEnd && !playerOpponent.handkick && !playerOpponent.footkick)){
    player[kickType] = true;
    player.attack = true;
    player.playerSelector.classList.add(kickType);
    playAudio(kickType);
    player[kickEnd] = false;
    setTimeout(function(){
      player[kickEnd] = true;
      player[kickType] = false;
      player.attack = false;
      player.playerSelector.classList.remove(kickType);
      stopAudio(kickType);
    }, kickTime);
    if(kickzone && playerPosDiffJump < 50 || (kickzone && playerOpponent.moveTop && playerOpponent.moveForward || kickzone && playerOpponent.moveTop && playerOpponent.moveBackward)){
      makeDamage(player, playerOpponent, kickDamageAudio, kickDamage, kickDamageClass, beforeKickInterval, afterKickInterval);
    }
  }
}


function makeDamage(player, player2, kickDamageAudio, kickDamage, kickDamageClass, beforeKickInterval, afterKickInterval){
  // if jump kick remove before kick interval
  if(!player.jumpEnd){
    afterKickInterval = afterKickInterval - beforeKickInterval;
    beforeKickInterval = beforeKickInterval - beforeKickInterval;
  }
  // kick intervals
  setTimeout(function(){
    player2.playerSelector.classList.add(kickDamageClass);
    player2.isDamaged = true;
    if(player2.block){
      playAudio('kick-blocked');
      player2.life = player2.life - player2.blockedDamage;
    }
    else{
      playAudio(kickDamageAudio);
      player2.life = player2.life - kickDamage;
      startBlood();
    }
    lifeCheck(player2);
  }, beforeKickInterval);
  
  setTimeout(function(){
    player2.playerSelector.classList.remove(kickDamageClass);
    player2.isDamaged = false;
    stopAudio(kickDamageAudio);
    stopAudio('kick-blocked');
    
  }, afterKickInterval);
  
}



function lifeCheck(player){
  player.playerLifeSelector.style.width = player.life + "%";
  if(player.life <= 0){
    player.playerLifeSelector.style.width = 0 + "%";
    document.querySelector("#finishBanner").classList.toggle("hide");
    player.defeated = true;
    if(player.defeated){
      player.playerKeys = {};
      setTimeout(function() {
        player.playerSelector.classList.add("defeated");
      }, 500);
    }
  }
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
      if (parseInt(player.playerSelector.style.bottom) > player.jumpHeight){
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
    player.playerSelector.classList.remove("move-top", 'handkick', 'footkick');
    if(player.keyPressedJump){
        player.moveTop = true;
      }
    else{
      player.moveTop = false;
    }
  }
}


///// Get the positions

function getPosition(player, infoblock) {
  player.playerPosX = 0;
  player.playerPosY = 0;
  player.playerPosX += (player.playerSelector.offsetLeft - player.playerSelector.scrollLeft + player.playerSelector.clientLeft);
  player.playerPosY += (player.playerSelector.offsetTop - player.playerSelector.scrollTop + player.playerSelector.clientTop);
  var coords = "Player X:" + player.playerPosX + " Player Y:" + player.playerPosY;
  document.getElementById(infoblock).innerHTML =  coords;
}

function getPlayersDiff(){
  playerPosDiffJump = Math.abs(playerOneData.playerPosY - playerTwoData.playerPosY);
  var diffCoords = "Diff x: " + playerPosDiff + " Diff y: " + playerPosDiffJump;
  document.getElementById("position-diff-info").innerHTML =  diffCoords;
}

function playerPositionFix(){
  var levelWidth = levelWrapper.offsetWidth;
  kickzone = false;
  playerPosDiff = playerOneData.playerPosX - playerTwoData.playerPosX;
  if(playerOneData.playerPosX > playerTwoData.playerPosX - player.playerWidth/2 && 
     playerOneData.playerPosX < playerTwoData.playerPosX + player.playerWidth/2 && 
     playerOneData.playerPosY > player.playerHeight * 0.9 && 
     playerTwoData.playerPosY > player.playerHeight * 0.9){
    if (playerPosDiff > 0){
      playerOneData.playerPosX += 2;
      playerTwoData.playerPosX -= 2;
    } 
    else {
      playerOneData.playerPosX -= 2;
      playerTwoData.playerPosX += 2;
    }
    // move opponent while push
    playerOneData.playerSelector.style.left = playerOneData.playerPosX + 'px';
    playerTwoData.playerSelector.style.left = playerTwoData.playerPosX + 'px';
  }
  if(playerPosDiff < 85 && playerPosDiff > -85){
    kickzone = true;
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

// Center the players

function alignPlayers(){
  var levelWidth = levelWrapper.offsetWidth;
  playerOneStartPos = (levelWidth / 2) - playerOneData.playerWidth - 100;
  playerTwoStartPos = levelWidth / 2 + 100;
  playerOneData.playerSelector.style.left = playerOneStartPos + "px";
  playerOneData.playerSelector.style.bottom = 0 + "px";
  playerTwoData.playerSelector.style.left = playerTwoStartPos + "px";
  playerTwoData.playerSelector.style.bottom = 0 + "px";
}

alignPlayers();

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
  document.getElementById("level-wrapper").classList = [];
  document.getElementById("level-wrapper").className += level;
}


function startScreen(){
  startScreenLoopMusic = new Audio('audio/startscreen.mp3');
  chooseFighterLoopMusic = new Audio('audio/choosefighter.mp3');
  chooseSound = new Audio('audio/menuitem.mp3');
  chooseSoundActive = new Audio('audio/menuitem_active.mp3');
  startScreenLoopMusic.play();
  startScreenLoopMusic.loop = true;
}

startScreen();



var chooseSoundHover = document.querySelectorAll(".menu-item");

for (i = 0; i < chooseSoundHover.length; ++i) {
  chooseSoundHover[i].onmouseover = handler;
}

function handler(event) {
  if (event.type == 'mouseover') {
    chooseSound.currentTime = 0;
    chooseSound.play();
  }
}


function hideStartScreen(){
  chooseFighter();
  startScreenLoopMusic.pause();
  startScreenLoopMusic.currentTime = 0;
}

function chooseFighter(){
  chooseSoundActive.play();
  document.querySelector('#start-screen').classList.add("hidden");
  document.querySelector('#game-container').classList.remove("visibility-hidden");
  document.querySelector('#players-list').classList.remove("hidden");
  chooseFighterLoopMusic.play();
  chooseFighterLoopMusic.loop = true;
}

function playGame(){
  getPlayerKeys(playerOneData.playerKeys, playerTwoData.playerKeys);
}

function startFight(){
  chooseSoundActive.play();
  chooseFighterLoopMusic.pause();
  chooseFighterLoopMusic.currentTime = 0;
  document.querySelector('#players-list').classList.add("hidden");
  document.querySelector('#header-bar').classList.remove("hidden");
  playGame();
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

function startBlood() {
  var initialX = player2.playerPosX + player.playerWidth/2;
  var initialY = player2.playerPosY + player.playerHeight/4;
  var sparkWidth = canvas.offsetWidth;
  var sparkHeight = canvas.offsetHeight;
  sparkShower(initialX, initialY, sparkWidth, sparkHeight);
}


window.addEventListener('resize', function(event){
  levelWidth = levelWrapper.offsetWidth;
  alignPlayers();
  playerPositionFix();
});


document.addEventListener("keydown", funcKeyDown);
document.addEventListener("keyup", funcKeyUp);

// Main interval



function game(){
  getPosition(playerOneData, "position-info");
  getPosition(playerTwoData, "position-info2");
  getPlayersDiff();
  playerPositionFix();
  // Start player1 movements
  movePlayer(playerOneData, playerTwoData);
  // Start player2 movements
  movePlayer(playerTwoData, playerOneData);
}

mainInterval = setInterval(function(){
  game();
});
