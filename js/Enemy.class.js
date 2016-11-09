

var Enemy = function(x, y, anim, wave) {
  this.enemy = game.add.sprite(path[0].x * tileSquare, path[0].y * tileSquare, anim);
  if(anim === "chain") {
    this.enemy.animations.add('walk-right',[3,18,33], 8, true);
    this.enemy.animations.add('walk-left',[2,17,32,2,17,32,2,17,32,56,57,58,59], 8, true);
    this.enemy.animations.add('walk-up',[1,16,31], 8, true);
    this.enemy.animations.add('walk-down',[0,15,30,0,15,30,0,15,30,26], 8, true);
    this.enemy.anchor.setTo(0.5, 0.5)
    this.enemy.speed = 1.1;
    this.enemy.health = ((base + 12)*(wave/10));
    this.enemy.speedX = 0;
    this.enemy.speedY = 0;
    this.enemy.curTile = 0;
    this.enemy.firsthit = 0;
    this.enemy.slowTimer = false;
  } else {
    this.enemy.animations.add('walk-right',[6,7,8], 10, true);
    this.enemy.animations.add('walk-left',[3,4,5], 10, true);
    this.enemy.animations.add('walk-down',[0,1,2], 10, true);
    this.enemy.animations.add('walk-up',[9,10,11], 10, true);
    this.enemy.anchor.setTo(0.5, 0.5)
    if(anim === "rat"){this.enemy.speed = 1.1;this.enemy.health = (base + 3) * (1 + (wave)/10);}
    if(anim === "blackCat"){this.enemy.speed = 1;this.enemy.health = (base + 7) * (1 + (wave)/10);}
    if(anim === "brownDog"){this.enemy.speed = 0.8;this.enemy.health = (base + 9) * (1 + (wave)/10);}
    this.enemy.speedX = 0;
    this.enemy.speedY = 0;
    this.enemy.curTile = 0;
    this.enemy.firsthit = 0;
    this.enemy.slowTimer = false;
  }
  console.log(this.enemy.health)
  enemys.add(this.enemy);
  enemys.setAll('checkWorldBounds', true);
  enemys.setAll('outOfBoundsKill', true);
  Enemy.prototype.nextTile(this.enemy);
  Enemy.prototype.moveElmt(this.enemy);
}
Enemy.prototype.moveElmt = function(enemy) {
  enemy.x += enemy.speedX;
  enemy.y += enemy.speedY;
  if (enemy.speedX > 0 && enemy.x >= enemy.next_positX) {
      enemy.x = enemy.next_positX;
      Enemy.prototype.nextTile(enemy);
  }
  else if (enemy.speedX < 0 && enemy.x <= enemy.next_positX) {
      enemy.x = enemy.next_positX;
      Enemy.prototype.nextTile(enemy);
  }
  else if (enemy.speedY > 0 && enemy.y >= enemy.next_positY) {
      enemy.y = enemy.next_positY;
      Enemy.prototype.nextTile(enemy);
  }
  else if (enemy.speedY < 0 && enemy.y <= enemy.next_positY) {
      enemy.y = enemy.next_positY;
      Enemy.prototype.nextTile(enemy);
  }
}
Enemy.prototype.nextTile = function(enemy) {
  enemy.curTile++;
  try{
    enemy.next_positX = parseInt(path[enemy.curTile].x * tileSquare);
    enemy.next_positY = parseInt(path[enemy.curTile].y * tileSquare);

    if (enemy.next_positX > enemy.x) {
        enemy.speedX = enemy.speed;
        enemy.animations.play('walk-right');
     } else if (enemy.next_positX < enemy.x) {
        enemy.speedX = -enemy.speed;
        enemy.animations.play('walk-left');
     } else {
        enemy.speedX = 0;
    }
    if (enemy.next_positY > enemy.y) {
        enemy.speedY = enemy.speed;
        enemy.animations.play('walk-down');
     } else if (enemy.next_positY < enemy.y) {
        enemy.speedY = -enemy.speed;
        enemy.animations.play('walk-up');
     } else {
        enemy.speedY = 0;
    }
  }
  catch(err) {
    takePlayerHit(enemy)
  }

}
Enemy.prototype.takeHit = function(enemy, bullet) {
  enemy.health -= bullet.health;
  if(enemy.firsthit === 0){
    enemy.hpBar = enemy.addChild(game.make.sprite(-15,-30,'healthBar'));
  }

  if((bullet.key === "frost") && (enemy.slowTimer === false)){
    enemy.slowTimer = true;
    enemy.speed = enemy.speed/2;
    setTimeout(function() {
      enemy.speed = enemy.speed*2;
      enemy.slowTimer = false;
    },3000)
  }
  enemy.firsthit = 1;
  enemy.hpBar.width = enemy.health;

  if(enemy.health <= 0) {
    cash += 20;
    score += 5;
    catDie.play();

    enemy.destroy();
    Tower.prototype.popEnemy(enemy);
    var explosion = explosions.getFirstExists(false);
    explosion.reset(enemy.x, enemy.y);
    explosion.play('kaboom', 40, false, true);
  }
}
