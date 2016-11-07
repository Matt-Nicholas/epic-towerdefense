var Tower = function(worldX, worldY, tileX, tileY, tile) {
    var index = (tileX + "-" + tileY);

    console.log(tileX + " t " + tileY);
    console.log(worldX + " w " + worldY);
    console.log(index);

    if ($.inArray(index, tileForbiden) == -1) {
      this.tower = game.add.sprite(worldX, worldY, tile);
      this.tower.worldX = worldX;
      this.tower.worldY = worldY;
      this.tower.tileX = tileX;
      this.tower.tileY = tileY;
      this.tower.tile = tile;
      tileForbiden.push(index);

      if(towerSelected === 'bitchin') {
        this.tower.fireTime = 500;
        this.tower.radius = 100;
        towers.add(this.tower);
        cash -= 50;
      } else {
        this.tower = game.add.sprite(worldX, worldY, tile);
        this.tower.fireTime = 1000;
        this.tower.radius = 200;
        cash -= 25;
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
    bullets.createMultiple(1, 'bullet', 0, false);
    if (game.time.now > tower.fireLastTime) {
        var bullet = bullets.getFirstExists(false);
        if (bullet && typeof enemys.children[0] != "undefined") {
            bullet.reset(tower.x, tower.y);
            bullet.body.collideWorldBounds = true;
            bullet.rotation = parseFloat(game.physics.arcade.angleToXY(bullet, enemys.children[0].x, enemys.children[0].y)) * 180 / Math.PI;
            game.physics.arcade.moveToObject(bullet, enemys.children[0], 500);
        }
        tower.fireLastTime = game.time.now + tower.fireTime;
    }
  }
}
