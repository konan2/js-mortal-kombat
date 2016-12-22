//
// Main code
//

// var playerData = {
//   moveTop: false,
//   moveForward: false,
//   moveDown: false,
//   moveBackward: false,
//   handkick: false,
//   footkick: false,
//   moverun: false,
//   block: false,
//   playerPosX: 0,
//   playerPosY: 0,
//   playerWidth: 150,
//   playerHeight: 262,
//   keyPressedJump: false,
//   footKickEnd: true,
//   handKickEnd: true,
//   attack: false,
//   jumpEnd: true,
//   jumpHeight: 180,
//   life: 100,
//   isDamaged: false,
//   defeated: false,
//   canRun: true,
//   speed: 1,
//   handKickDamage: 1,
//   footKickDamage: 1,
//   blockedDamage: 1,
//   pushing: false,
//   kick: kickFunc
// }



// var playerOneData = {
//   parent: playerData,
//   playerModel: "test"
// }


// function kickFunc(param){
//   console.log(this.moveTop + " " + param);
// }


// playerData.kick(1);


// // 1. Конструктор Animal
// function Animal(name) {
//   this.name = name;
//   this.speed = 0;
// }

// // 1.1. Методы -- в прототип

// Animal.prototype.stop = function() {
//   this.speed = 0;
//   alert( this.name + ' стоит' );
// }

// Animal.prototype.run = function(speed) {
//   this.speed += speed;
//   alert( this.name + ' бежит, скорость ' + this.speed );
// };

// // 2. Конструктор Rabbit
// function Rabbit(name) {
//   this.name = name;
//   this.speed = 0;
// }

// //В Rabbit может понадобиться задать какие-то методы, которые у родителя уже есть. 
// //Например, кролики бегают не так, как остальные животные, поэтому переопределим метод run():
// //Вызов rabbit.run() теперь будет брать run из своего прототипа:


// Rabbit.prototype.run = function(speed) {
//   this.speed++;
//   this.jump();
// };

// // 2.1. Наследование
// Rabbit.prototype = Object.create(Animal.prototype);
// Rabbit.prototype.constructor = Rabbit;

// // 2.2. Методы Rabbit
// Rabbit.prototype.jump = function() {
//   this.speed++;
//   alert( this.name + ' прыгает, скорость ' + this.speed );
// }


