//
// Main code
//

// Keyboard controls

var playerUsedCodes = [];
var player2UsedCodes = [];

// Data

var gameData = {
  roundTime: 5,
  currentRoundTime: undefined,
  playersAreChoosen: false,
  musicEnabled: true,
  soundsEnabled: true,
  playerOneChoosen: false,
  playerTwoChoosen: false,
  fightStarted: false,
  fightEnded: false,
  roundNumber: 1
}

var levelsData = ["temple", "church", "plant", "desert"];

//var levelsData = ["temple","church","arena","plant","spaceship","vulkano","bunker","mars","desert","portal"];


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
  pushing: false,
  playerNameAttr: "player-model"
}



var playerOneData = {
  __proto__: playerData,
  playerSelector: document.querySelector(".player_1"),
  playerLifeSelector: document.getElementById("player1-level"),
  playerLifeNameSelector: document.getElementById("player1-blood-level"),
  playerPreview: document.querySelector("#player-preview-1"),
  playerPreviewName: document.querySelector("#players-list-fighter-name-1"),
  isChoosen: false,
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
  playerSelector: document.querySelector(".player_2"),
  playerLifeSelector: document.getElementById("player2-level"),
  playerLifeNameSelector: document.getElementById("player2-blood-level"),
  playerPreview: document.querySelector("#player-preview-2"),
  playerPreviewName: document.querySelector("#players-list-fighter-name-2"),
  isChoosen: false,
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

var playersListParent = document.querySelector("#players-list-items");

var roundNumberText = document.querySelector("#round-number");


var timerHtml = document.querySelector("#round-time");

// Level bg 

var levelBgBlock = document.getElementById("level-wrapper");

// Fight messages

var startFightMessage = "<img src='img/start-fight.gif' />";


// Players near each other and can make damage
var kickzone = false;

// audio

var currentFightMusicTrack;


footkickSound = new Audio('audio/footkick.mp3');
handkickSound = new Audio('audio/handkick.mp3');
syborg_runSound = new Audio('audio/syborg_run.mp3');
jump_endSound = new Audio('audio/jump_end.mp3');
foot_damageSound = new Audio('audio/foot_damage.mp3');
hand_damageSound = new Audio('audio/hand_damage.mp3');
kick_blockedSound = new Audio('audio/kick_blocked.mp3');

startScreenLoopMusic = new Audio('audio/startscreen.mp3');
chooseFighterLoopMusic = new Audio('audio/playerListMusic.mp3');
chooseSound = new Audio('audio/menuitem.mp3');
chooseSoundActive = new Audio('audio/menuitem_active.mp3');
chooseSoundActivePlayer = new Audio('audio/menuitem_active.mp3');
chooseYoutDestiny = new Audio('audio/choose-your-destiny.mp3');
figthMusic = new Audio('audio/fight_music.mp3');

// shao kahn voices

roundOneSound = new Audio('audio/round-one.mp3');
roundTwoSound = new Audio('audio/round-two.mp3');
roundThreeSound = new Audio('audio/round-three.mp3');
fightSound = new Audio('audio/fight.mp3');
finishHimSound = new Audio('audio/finish-him.mp3');

// Level tracks

level_track_1 = new Audio('audio/level_tracks/Kelly_Bailey_Combine_Harvester.mp3');
level_track_2 = new Audio('audio/level_tracks/Kelly_Bailey__You_are_Not_Supposed_to_Be_Here.mp3');
level_track_3 = new Audio('audio/level_tracks/Kelly_Bailey_Abandoned_in_place.mp3');
level_track_4 = new Audio('audio/level_tracks/Kelly_Bailey_Cp_violation.mp3');
level_track_5 = new Audio('audio/level_tracks/Kelly_Bailey_Kaon.mp3');
level_track_6 = new Audio('audio/level_tracks/Kelly_Bailey_Last_legs.mp3');
level_track_7 = new Audio('audio/level_tracks/Kelly_Bailey_Sector_sweep.mp3');
level_track_8 = new Audio('audio/level_tracks/Kelly_Bailey_Vortal_combat.mp3');
level_track_9 = new Audio('audio/level_tracks/Kelly_Bailey_What_kind_of_hospital_is_this.mp3');

var AllLevelTracks = {level_track_1, level_track_2, level_track_3, level_track_4, level_track_5, level_track_6, level_track_7, level_track_8, level_track_9};


/// Players  

var cyrax = {
  name: "cyrax",
  soundName: new Audio('audio/names/cyrax.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/cyrax.gif",
  previewImg: "img/players-list/versus/cyrax.png",
}

var kabal = {
  name: "kabal",
  soundName: new Audio('audio/names/kabal.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/kabal.gif",
  previewImg: "img/players-list/versus/kabal.png",
}

var smoke = {
  name: "smoke",
  soundName: new Audio('audio/names/smoke.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/smoke.gif",
  previewImg: "img/players-list/versus/smoke.png",
}

var sektor = {
  name: "sektor",
  soundName: new Audio('audio/names/sektor.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/sektor.gif",
  previewImg: "img/players-list/versus/sektor.png",
}

var subzero = {
  name: "subzero",
  soundName: new Audio('audio/names/subzero.mp3'),
  soundRun: new Audio('audio/syborg_run.mp3'),
  previewImgIcon: "img/players-list/subzero.gif",
  previewImg: "img/players-list/versus/subzero.png",
}

var AllPlayersObj = {cyrax, kabal, smoke, sektor, subzero};



// Random obj item
function pickRandomProperty(obj) {
    var result;
    var test;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

// Random value

function RandomValue(max){
  return Math.floor(Math.random() * max);
}


// get player keys function

function getPlayerKeys(playerKeyMap){
  for(var i in playerKeyMap) {
    playerUsedCodes.push(playerOneData.playerKeys[i]);
  }
  for(var j in playerKeyMap) {
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
      kickFunc(playerOneData, playerTwoData,'handkick', 300, 'handKickEnd', hand_damageSound, playerOneData.handKickDamage, 'hand-damaged', 100, 250, handkickSound);
    }
    if(player == playerTwoData){
      kickFunc(playerTwoData, playerOneData, 'handkick', 300, 'handKickEnd', hand_damageSound, playerTwoData.handKickDamage, 'hand-damaged', 100, 250, handkickSound);
    }
  }

  // Foot kick
  if(event.keyCode === player.playerKeys.footkick){
    if(player == playerOneData){
      kickFunc(playerOneData, playerTwoData, 'footkick', 400, 'footKickEnd', foot_damageSound, playerOneData.footKickDamage, 'foot-damaged', 200, 400, footkickSound);
    }
    if(player == playerTwoData){
      kickFunc(playerTwoData, playerOneData, 'footkick', 400, 'footKickEnd', foot_damageSound, playerTwoData.footKickDamage, 'foot-damaged', 200, 400, footkickSound);
    }
  }

  // Run
  if(event.keyCode === player.playerKeys.run){
    player.moverun = true;
    player.playerSelector.classList.add("move-run");
    playSound(syborg_runSound);
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

function kickFunc(player, playerOpponent, kickType, kickTime, kickEnd, kickDamageAudio, kickDamage, kickDamageClass, beforeKickInterval, afterKickInterval, kickTypeAudio){
  if(!player.isDamaged && !kickzone && player.handKickEnd && player.footKickEnd || (!player.isDamaged && kickzone && player.handKickEnd && player.footKickEnd && !playerOpponent.handkick && !playerOpponent.footkick)){
    player[kickType] = true;
    player.attack = true;
    player.playerSelector.classList.add(kickType);
    playSound(kickTypeAudio);
    player[kickEnd] = false;
    setTimeout(function(){
      player[kickEnd] = true;
      player[kickType] = false;
      player.attack = false;
      player.playerSelector.classList.remove(kickType);
      stopSound(kickTypeAudio);
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
      playSound(kick_blockedSound);
      player2.life = player2.life - player2.blockedDamage;
    }
    else{
      playSound(kickDamageAudio);
      player2.life = player2.life - kickDamage;
      startBlood();
    }
    lifeCheck(player2);
  }, beforeKickInterval);
  
  setTimeout(function(){
    player2.playerSelector.classList.remove(kickDamageClass);
    player2.isDamaged = false;
    stopSound(kickDamageAudio);
    stopSound(kick_blockedSound);
    
  }, afterKickInterval);
  
}



function lifeCheck(player){
  player.playerLifeSelector.style.width = player.life + "%";
  if(player.life <= 0){
    player.playerLifeSelector.style.width = 0 + "%";
    document.querySelector("#finishBanner").classList.toggle("hidden");
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
    playSound(jump_endSound);
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



function playSound(trackname, loop, volume){
  trackname.play();
  if(loop !== undefined){
    trackname.loop = true;
  }
  if(volume !== undefined){
    trackname.volume = volume;
  }
}


function stopSound(trackname){
  trackname.pause();
  trackname.currentTime = 0;
}

//////////////////////////////////////////////////



// Change level 




function changeLevel(item){
  var currentLevelName = levelsData[item];
  levelBgBlock.className = "";
  levelBgBlock.classList.add(currentLevelName);
  document.getElementById("level-name").innerHTML = currentLevelName;
}

var levelCount = 0;

function nextLevel() {
    levelCount = levelCount + 1; // increase i by one
    if (levelCount == levelsData.length){
      levelCount = 0;
    }
    changeLevel(levelCount);
    stopSound(chooseSoundActive);
    playSound(chooseSoundActive);
}

function prevLevel() {
   levelCount = levelCount - 1;
   if (levelCount < 0) {
        levelCount = levelsData.length - 1;
    }
    changeLevel(levelCount);
    stopSound(chooseSoundActive);
    playSound(chooseSoundActive);
}





//// Sound on mouse hover

var chooseSoundHover = document.querySelectorAll(".menu-item");

for (i = 0; i < chooseSoundHover.length; ++i) {
  chooseSoundHover[i].onmouseover = handler;
}

function handler(event) {
  stopSound(chooseSound);
  playSound(chooseSound);
}






// Choose player function















function choosePlayersSection(){

  if(playersListParent.classList.contains("players-are-choosen")){
    playersListParent.classList.remove("players-are-choosen");
  }

  gameData.playerOneChoosen = false;
  gameData.playerTwoChoosen = false;
  gameData.playersAreChoosen = false;

  playersListParent.innerHTML = "";

for (i in AllPlayersObj){
    var player = AllPlayersObj[i];
    playersListParent.innerHTML += "<span id=" + player.name + " class='players-list__item menu-item'><img class='players-list-player-image' src=" + player.previewImgIcon + " alt='' width='48' height='59'></span>";
  }
  

  changeScreen("#game-container", "#players-list");

  var rand = levelsData[Math.floor(Math.random() * levelsData.length)];

  
  if(!levelBgBlock.hasAttribute("class")){
    levelBgBlock.className = "";
    levelBgBlock.classList.add(rand);
  }
  

  playSound(chooseFighterLoopMusic, 'loop', .3);

  setTimeout(function(){
    playSound(chooseYoutDestiny);
  }, 1000);
  
  choosePlayersFunction(playerOneData, playerOneData.playerPreviewName, playerOneData.playerPreview);
}

function choosePlayersFunction(currentPlayerData, currentPlayerName, currentPlayerPreview){

    var playerListItems = document.querySelectorAll(".players-list__item");
    var playerListNumber = playerListItems.length;

    

    // Find player items
    for (i = 0; i < playerListNumber; ++i) {
      playerListItems[i].onmouseover = changePlayerPreview;
      playerListItems[i].onclick = choosePlayerPreview;
      playerListItems[i].onmouseleave = playerListLeave;
    }
  

    function changePlayerPreview() {
      var ObjName = this.getAttribute("id");
      var playerRes = AllPlayersObj[ObjName];
      if(!gameData.playerOneChoosen){
         this.classList.add("player-one-choose");
      }
      if(gameData.playerOneChoosen && !gameData.playerTwoChoosen){
        this.classList.add("player-two-choose");
      }

      stopSound(chooseSound);
      playSound(chooseSound);

      currentPlayerData.playerName = playerRes.name;
      setPlayerName(currentPlayerData);
      currentPlayerData.playerPreview.innerHTML = "<img src=" + playerRes.previewImg + " />";
    }

    function playerListLeave(){
      if(!gameData.playerOneChoosen){
         this.classList.remove("player-one-choose");
      }
      if(gameData.playerOneChoosen && !gameData.playerTwoChoosen){
        this.classList.remove("player-two-choose");
      }
    }

    function choosePlayerPreview(){
      var ObjName = this.getAttribute("id");
      var playerRes = AllPlayersObj[ObjName];

      chooseSound.currentTime = 0;
      playSound(chooseSoundActive);
      playSound(playerRes.soundName);
      this.classList.add("players-list__item_choosen");

      gameData.playerOneChoosen = true;

      if(gameData.playerOneChoosen && !gameData.playerTwoChoosen){
        choosePlayersFunction(playerTwoData, playerTwoData.playerPreviewName, playerTwoData.playerPreview);
      }
      if(currentPlayerData == playerTwoData){
          gameData.playerTwoChoosen = true;
          gameData.playersAreChoosen = true;

          playersListParent.classList.toggle("players-are-choosen");

          setTimeout(startFight, 2000);
      }

    }
  }


function setPlayerName(playerData){
  playerData.playerLifeNameSelector.innerHTML= playerData.playerName;
  playerData.playerPreviewName.innerHTML = playerData.playerName;
}

function setPlayerSkin(playerData){
  playerData.playerSelector.removeAttribute(playerData.playerNameAttr);
  playerData.playerSelector.setAttribute(playerData.playerNameAttr, playerData.playerName);
}


//

function StartScreen(){
  changeScreen("#start-screen");
  playSound(startScreenLoopMusic, 'loop');

  var sliderImgArray = document.querySelectorAll(".start-screen-add-bg img");
  var sliderImgArraySize = sliderImgArray.length;
  var currentSlide = 0;

  sliderImgArray[RandomValue(sliderImgArraySize)].classList.toggle("visible");

   setInterval(
    function(){
      for(i=0;i<sliderImgArraySize;i++){
        sliderImgArray[i].removeAttribute("class");
      }
      sliderImgArray[currentSlide].classList.toggle("visible");
      currentSlide++;
      if(currentSlide === sliderImgArray.length){
        currentSlide = 0;
    }
  }, 3000);
}





function startFight(){
  changeScreen("#game-container");
  timerHtml.innerHTML = gameData.roundTime;

  setPlayerSkin(playerOneData);
  setPlayerSkin(playerTwoData);

  document.querySelector('#players-list').classList.add("hidden");

  document.querySelector('#header-bar').classList.remove("hidden");

  playerOneData.playerSelector.classList.remove("hidden");
  playerTwoData.playerSelector.classList.remove("hidden");

  stopSound(chooseFighterLoopMusic);

  var currentLevelTrack = pickRandomProperty(AllLevelTracks);

  currentFightMusicTrack = AllLevelTracks[currentLevelTrack];

  playSound(currentFightMusicTrack, 'loop', .3);

  // Start keyboard listener
  getPlayerKeys(playerOneData.playerKeys, playerTwoData.playerKeys);

  playSound(roundOneSound);
  roundMessages("Round " + gameData.roundNumber, 2000);


  setTimeout(function(){
    roundTimer();
    playSound(fightSound);
    roundMessages(startFightMessage, 1000);
    document.addEventListener("keydown", funcKeyDown);
    document.addEventListener("keyup", funcKeyUp);
  }, 2000);

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


// Menu controls

function startGameAction(){
  playSound(chooseSoundActive);
  stopSound(startScreenLoopMusic);
  choosePlayersSection();
}

function optionsAction(){
  playSound(chooseSoundActive);
  changeScreen("#start-options-screen", "#start-screen");
}

function closeOptions(){
  changeScreen("#start-screen");
}


// Run game

StartScreen();
//startFight();

// Listeners

window.addEventListener('resize', function(event){
  levelWidth = levelWrapper.offsetWidth;
  alignPlayers();
  playerPositionFix();
});




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








function changeScreen(screenId, exceptId){
  var allScreens = document.querySelectorAll("section");
  for(i=0;i<allScreens.length;i++){
    allScreens[i].classList.add("hidden");
  }
  document.querySelector(screenId).classList.remove("hidden");
  if(exceptId){
    document.querySelector(exceptId).classList.remove("hidden");
  }
}


var roundTimerInterval = null;



function roundTimer(){
  
  gameData.currentRoundTime = gameData.roundTime;
  gameData.fightStarted = true;
  roundTimerInterval = setInterval(function(){
    if(gameData.currentRoundTime !== 0){
      gameData.currentRoundTime--;
      timerHtml.innerHTML = gameData.currentRoundTime;
    }
    else{
      gameData.fightStarted = false;
      gameData.fightEnded = true;
      clearInterval(roundTimerInterval);
      playerOneData.playerSelector.classList.add("hidden");
      playerTwoData.playerSelector.classList.add("hidden");
      document.querySelector('#header-bar').classList.add("hidden");
      stopSound(currentFightMusicTrack);
      // Stop keyboard listener
      document.removeEventListener("keydown", funcKeyDown);
      document.removeEventListener("keyup", funcKeyUp);
      
      choosePlayersSection();
    }
  }, 1000);
}









function checkRoundResults(){
  if(gameData.currentRoundTime == 0 || playerOneData.life == 0 || playerTwoData.life == 0){
    if(playerOneData.life > playerTwoData.life){

    }
  }
}






function roundMessages(text, deleteInterval){
  var roundMessagesBlock =  document.querySelector("#round-messages");
  var newTitleElem = document.createElement("h2");
  newTitleElem.innerHTML = text;
  document.querySelector("#round-messages").appendChild(newTitleElem).classList.add("title", "fade-in");
  setTimeout(function() {
    roundMessagesBlock.innerHTML = "";
  }, deleteInterval);
}


















// function toogleClass(elem, class){
//   if(elem.classList.has(class)){
//     elem.classList.remove(class);
//   }
//   else{
//     elem.classList.add(class);
//   }
// }
