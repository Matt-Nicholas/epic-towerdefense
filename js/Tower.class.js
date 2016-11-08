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
      this.tower.killZone = [];

      if(towerSelected === 'bitchin') {
        this.tower.fireTime = 500;
        this.tower.radius = 100;
        this.tower.level = 1;
        this.tower.type = "bitchin";
        towers.add(this.tower);
        cash -= 50;
      } else {
        this.tower = game.add.sprite(worldX, worldY, tile);
        this.tower.fireTime = 1000;
        this.tower.radius = 200;
        cash -= 25;
        this.tower.level = 1;
        this.tower.type = "meh";
        towers.add(this.tower);
      }
      this.tower.fireLastTime = game.time.now + this.tower.fireTime;
    }
}

Tower.prototype.add = function(pointer) {
  if(canAddTower) {
    Tower.prototype.posit(pointer)
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
      console.log(tower.killZone)
    }
    if (game.time.now > tower.fireLastTime) {
        var bullet = bullets.getFirstExists(false);
        if (bullet && typeof tower.killZone[(tower.killZone.length - 1)] != "undefined") {
            bullet.reset(tower.x, tower.y);
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
