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


      if(towerSelected === "cannonTower") {
        this.tower.towerCost = 75;
        this.tower.animations.add("levelOne", [0,1,2,3,4], 5, true);
        this.tower.animations.add("levelTwo", [6,7,8,9,10,11], 5, true);
        this.tower.animations.add("levelThree", [13,14,15,16,17,18], 5, true);
        this.tower.fireTime = 500;
        this.tower.radius = 100;
        this.tower.level = 1;
        this.tower.type = "cannonTower";
        cash -= this.tower.towerCost;
        this.tower.ammunition = "cannon";
        this.tower.bulletDamage = 3;
        towers.add(this.tower);
        this.tower.animations.play("levelOne");
      }
      else if(towerSelected === 'frostTower') {
        this.tower.animations.add("levelOne", [0,1], 5, true);
        this.tower.animations.add("levelTwo", [2,3], 5, true);
        this.tower.animations.add("levelThree", [4,5], 5, true);
        this.tower.animations.play('levelOne');
        this.tower.towerCost = 150;
        this.tower.fireTime = 10;
        this.tower.radius = 100;
        this.tower.level = 1;
        this.tower.type = "frostTower";
        cash -= this.tower.towerCost;
        this.tower.ammunition = "frost";
        this.tower.bulletDamage = 0;
        towers.add(this.tower);
      } else if(towerSelected === 'plasmaTower'){
        this.tower.towerCost = 500;
        this.tower.animations.add("levelOne", [0], 10, true);
        this.tower.animations.add("levelTwo", [1], 10, true);
        this.tower.animations.add("levelThree", [2], 10, true);
        this.tower.fireTime = 10;
        this.tower.radius = 200;
        cash -= this.tower.towerCost;
        this.tower.level = 1;
        this.tower.type = "plasmaTower";
        this.tower.ammunition = "plasma";
        this.tower.bulletDamage = .02;
        towers.add(this.tower);
      } else if(towerSelected === 'flameTower'){
        this.tower.towerCost = 300;
        this.tower.animations.add("levelOne", [0,1,2], 10, true);
        this.tower.animations.add("levelTwo", [3,4,5], 10, true);
        this.tower.animations.add("levelThree", [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 10, true);
        this.tower.animations.play("levelOne")
        this.tower.animations
        this.tower.fireTime = 100;
        this.tower.radius = 200;
        cash -= this.tower.towerCost;
        this.tower.level = 1;
        this.tower.type = "flameTower";
        this.tower.ammunition = "flame";
        this.tower.bulletDamage = .005;
        towers.add(this.tower);
      } else if(towerSelected === 'archerTower'){
        this.tower.towerCost = 50;
        this.tower.animations.add("levelOne", [0], 10, true);
        this.tower.animations.add("levelTwo", [1], 10, true);
        this.tower.animations.add("levelThree", [2], 10, true);
        this.tower.fireTime = 500;
        this.tower.radius = 200;
        cash -= this.tower.towerCost;
        this.tower.level = 1;
        this.tower.type = "archerTower";
        this.tower.ammunition = "arrow";
        this.tower.bulletDamage = .75;
        towers.add(this.tower);
      }
      this.tower.killZone = [];
      this.tower.fireLastTime = game.time.now + this.tower.fireTime;
    }
}

Tower.prototype.add = function(pointer) {
  if(canAddTower) {
    if(towerSelected == 'plasmaTower'){
      if(cash >= 500) {

      }
    }
    else if(towerSelected == 'cannonTower'){
      towerCash = (clickedTower.towerCost);
    }
    else if(towerSelected == 'frostTower'){
      towerCash = (clickedTower.towerCost);
    }
    else if(towerSelected == 'flameTower'){
      towerCash = (clickedTower.towerCost);
    }
    else if(towerSelected == 'archerTower'){
      towerCash = (clickedTower.towerCost);
    }
      Tower.prototype.posit(pointer)
      canAddTower = false;
    }
  }
}

Tower.prototype.levelTwo = function(tower) {
  console.log(tower);
   tower.animations.play('levelTwo');
}

Tower.prototype.levelThree = function(tower) {
   increment.visible = false;
   tower.animations.play('levelThree');
}

Tower.prototype.upgradeTower = function(clickedTower) {
  console.log(clickedTower)
  // if(towerSelected == 'plasmaTower'){
  //   towerCash = (clickedTower.towerCost);
  // }
  // else if(towerSelected == 'cannonTower'){
  //   towerCash = (clickedTower.towerCost);
  // }
  // else if(towerSelected == 'frostTower'){
  //   towerCash = (clickedTower.towerCost);
  // }
  // else if(towerSelected == 'flameTower'){
  //   towerCash = (clickedTower.towerCost);
  // }
  // else if(towerSelected == 'archerTower'){
  //   towerCash = (clickedTower.towerCost);
  // }
    if(cash > ((clickedTower.towerCost)*(Math.pow(3,clickedTower.level)))){
      cash -= ((clickedTower.towerCost)*(Math.pow(3,clickedTower.level)));
      clickedTower.level += 1;
      clickedTower.fireTime = clickedTower.fireTime * 0.75;
      clickedTower.bulletDamage = clickedTower.bulletDamage * 1.25;
      speedStat = Math.floor( (1 / clickedTower.fireTime) * 10000);
      attackStat = Math.round( (clickedTower.bulletDamage * speedStat) );

      levelStat = clickedTower.level;
      if(clickedTower.level === 2) {
        Tower.prototype.levelTwo(clickedTower);
      } else {
        Tower.prototype.levelThree(clickedTower);
      }
    }
    // else if(cash > (towerCash*2) && clickedTower.level == 2){
    //   cash -= (towerCash*2);
    //   clickedTower.level += 1;
    //   clickedTower.bulletDamage = clickedTower.bulletDamage * 1.25;
    //   clickedTower.fireTime = clickedTower.fireTime * 0.75;
    //
    //   speedStat = Math.floor((1 / clickedTower.fireTime) * 10000);
    //   attackStat = Math.round( (clickedTower.bulletDamage * speedStat) );
    //   levelStat = clickedTower.level;
    //   Tower.prototype.levelThree(clickedTower);
    // }
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
      if(tower.type === "cannonTower") {
       bullet = cannons.getFirstExists(false);
       bullet.lifespan = tower.radius * 2;
       cannonShotSound.play();
     } else if(tower.type === "plasmaTower"){
        bullet = plasmas.getFirstExists(false);
        bullet.lifespan = tower.radius * 2;
      } else if(tower.type === "frostTower") {
        bullet = frosts.getFirstExists(false);
        bullet.lifespan = tower.radius * 2;
        iceWind.play();
      } else if(tower.type === "flameTower") {
        bullet = flames.getFirstExists(false);
        bullet.lifespan = tower.radius * 6;
      } else if(tower.type === "archerTower") {
        bullet = arrows.getFirstExists(false);
        bullet.lifespan = tower.radius * 2;
        archerShotSound.play();
      }
      if (bullet && typeof tower.killZone[(tower.killZone.length - 1)] != "undefined") {
        if (bullet.key === 'flame') {
          bullet.reset(tower.x+16, tower.y+5, tower.bulletDamage);
          bullet.rotation = parseFloat(game.physics.arcade.angleToXY(bullet, tower.killZone[(tower.killZone.length - 1)].x, tower.killZone[(tower.killZone.length - 1)].y)) * 180 / Math.PI;
          game.physics.arcade.moveToObject(bullet, tower.killZone[(tower.killZone.length - 1)], 150);
        } else{
          bullet.reset(tower.x+16, tower.y+5, tower.bulletDamage);
          bullet.rotation = parseFloat(game.physics.arcade.angleToXY(bullet, tower.killZone[(tower.killZone.length - 1)].x, tower.killZone[(tower.killZone.length - 1)].y)) * 180 / Math.PI;
          game.physics.arcade.moveToObject(bullet, tower.killZone[(tower.killZone.length - 1)], 500);
        }
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
