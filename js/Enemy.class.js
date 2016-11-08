var Enemy = function(x, y, anim, wave) {
  this.enemy = game.add.sprite(path[0].x * tileSquare, path[0].y * tileSquare, anim);
  this.enemy.animations.add('walk-right',[6,7,8], 10, true);
  this.enemy.animations.add('walk-left',[3,4,5], 10, true);
  this.enemy.animations.add('walk-down',[0,1,2], 10, true);
  this.enemy.animations.add('walk-up',[9,10,11], 10, true);
  this.enemy.anchor.setTo(0.5, 0.5)
  if(anim === "rat"){this.enemy.speed = 1.1;this.enemy.health = 8 * (1 + (wave)/10);}
  if(anim === "blackCat"){this.enemy.speed = 1;this.enemy.health = 10 * (1 + (wave)/10);}
  if(anim === "brownDog"){this.enemy.speed = 0.8;this.enemy.health = 12 * (1 + (wave)/10);}

  this.enemy.speedX = 0;
  this.enemy.speedY = 0;
  this.enemy.curTile = 0;
  enemys.add(this.enemy);
  enemys.setAll('checkWorldBounds', true);
  enemys.setAll('outOfBoundsKill', true);
  Enemy.prototype.nextTile(this.enemy);
  Enemy.prototype.moveElmt(this.enemy);
  console.log(anim + " " + this.enemy.health);

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

      // on check le sens gauche/droite
      if (enemy.next_positX > enemy.x) {
          enemy.speedX = enemy.speed;
          enemy.animations.play('walk-right');
       } else if (enemy.next_positX < enemy.x) {
          enemy.speedX = -enemy.speed;
          enemy.animations.play('walk-left');
       } else {
          enemy.speedX = 0;
      }
      // on check le sens haut/bas
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
Enemy.prototype.takeHit = function(enemy) {
  enemy.health -= 1;
  if(enemy.health <= 0) {
    cash += 20;
    enemy.destroy();
    var explosion = explosions.getFirstExists(false);
    explosion.reset(enemy.x, enemy.y);
    explosion.play('kaboom', 40, false, true);
  }
}
