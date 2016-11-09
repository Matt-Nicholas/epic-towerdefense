var type;
var level;

var Tower = function(worldX, worldY, tileX, tileY, tile) {
    var index = (tileX + "-" + tileY);

    if ($.inArray(index, tileForbiden) == -1) {
      this.tower = game.add.sprite(worldX, worldY, tile);
      this.tower.worldX = worldX;
      this.tower.worldY = worldY;
      this.tower.tileX = tileX;
      this.tower.tileY = tileY;
      this.tower.tile = tile;
      tileForbiden.push(index);


      if(towerSelected === "canonTower") {
        this.tower.fireTime = 500;
        this.tower.radius = 100;
        this.tower.level = 1;
        this.tower.type = "canon";
        cash -= 50;
        this.tower.ammunition = "canon";
        this.tower.bulletDamage = 1;
        towers.add(this.tower);
      }
      else if(towerSelected === 'frostTower') {
        this.tower.fireTime = 10;
        this.tower.radius = 100;
        this.tower.level = 1;
        this.tower.type = "frostTower";
        cash -= 150;
        this.tower.ammunition = "frost";
        this.tower.bulletDamage = 0;
        towers.add(this.tower);
      } else if(towerSelected === 'plasmaTower'){
        this.tower = game.add.sprite(worldX, worldY, tile);
        this.tower.fireTime = 10;
        this.tower.radius = 200;
        cash -= 25;
        this.tower.level = 1;
        this.tower.type = "plasmaTower";
        this.tower.ammunition = "plasma";
        this.tower.bulletDamage = .02;
        towers.add(this.tower);

      }
      this.tower.killZone = [];
      this.tower.fireLastTime = game.time.now + this.tower.fireTime;
    }
}

Tower.prototype.add = function(pointer) {
  if(canAddTower) {
    Tower.prototype.posit(pointer)
  }

}

Tower.prototype.levelTwo = function(tower) {
  console.log(tower);
   tower.animations.add('levelTwo',[1], false);
   tower.animations.play('levelTwo');
}

Tower.prototype.levelThree = function(tower) {
   tower.animations.add('levelThree',[2], false);
   tower.animations.play('levelThree');
}

Tower.prototype.upgradeTower = function(clickedTower) {
  if(towerSelected == 'plasmaTower'){
    towerCash = 100;
  }
  else if(towerSelected == 'canonTower'){
    towerCash = 150;
  }
  else if(towerSelected == 'frostTower'){
    towerCash = 200;
  }
    if(cash > towerCash && clickedTower.level == 1){
      cash -= towerCash;
      clickedTower.level += 1;
      clickedTower.fireTime = clickedTower.fireTime * 0.75;
      clickedTower.bulletDamage += 0.5;
      speedStat = Math.floor( (1 / clickedTower.fireTime) * 10000);
      attackStat = clickedTower.bulletDamage;
      levelStat = clickedTower.level;
      Tower.prototype.levelTwo(clickedTower);
    }
    else if(cash > (towerCash*2) && clickedTower.level == 2){
      cash -= (towerCash*2);
      clickedTower.level += 1;
      clickedTower.bulletDamage += 0.5;
      clickedTower.fireTime = clickedTower.fireTime * 0.75;

      attackStat = clickedTower.bulletDamage;
      speedStat = Math.floor((1 / clickedTower.fireTime) * 10000);
      levelStat = clickedTower.level;
      Tower.prototype.levelThree(clickedTower);
    }
  }


Tower.prototype.posit = function(pointer) {
    var tileworldX = pointer.worldX - (pointer.worldX % tileSquare);
    var tileworldY = pointer.worldY - (pointer.worldY % tileSquare);
    var tileX = Math.floor(pointer.worldX / tileSquare);
    var tileY = Math.floor(pointer.worldY / tileSquare);
    new Tower(tileworldX, tileworldY, tileX, tileY, towerSelected)
}

Tower.prototype.fire = function(tower, enemy) {
  if((game.math.distance(tower.x, tower.y, enemy.x, enemy.y)) < tower.radius) {
    if(!(tower.killZone.includes(enemy))) {
      tower.killZone.unshift(enemy);
    }
    if (game.time.now > tower.fireLastTime) {
      var bullet;
      if(tower.type === "canonTower") {
       bullet = canons.getFirstExists(false);
       bullet.lifespan = tower.radius * 2;
     } else if(tower.type === "plasmaTower"){
        bullet = plasmas.getFirstExists(false);
        bullet.lifespan = tower.radius * 2;
      } else if(tower.type === "frostTower") {
        bullet = frosts.getFirstExists(false);
        bullet.lifespan = tower.radius * 2;
      } else if(tower.type === "fireTower") {
        bullet = fires.getFirstExists(false);
        bullet.lifespan = tower.radius * 2;
      } else if(tower.type === "archerTower") {
        bullet = arrows.getFirstExists(false);
        bullet.lifespan = tower.radius * 2;
      }
      if (bullet && typeof tower.killZone[(tower.killZone.length - 1)] != "undefined") {
          bullet.reset(tower.x+17, tower.y+5, tower.bulletDamage);
          bullet.rotation = parseFloat(game.physics.arcade.angleToXY(bullet, tower.killZone[(tower.killZone.length - 1)].x, tower.killZone[(tower.killZone.length - 1)].y)) * 180 / Math.PI;
          game.physics.arcade.moveToObject(bullet, tower.killZone[(tower.killZone.length - 1)], 500);
      }
      tower.fireLastTime = game.time.now + tower.fireTime;
    }
  } else if (((game.math.distance(tower.x, tower.y, enemy.x, enemy.y)) > tower.radius) && tower.killZone.includes(enemy)) {
    tower.killZone.pop();
  }
}

Tower.prototype.popEnemy = function(enemy) {
  towers.forEach(function(tower) {
    tower.killZone.splice((tower.killZone.indexOf(enemy)), 1)
  })
}
