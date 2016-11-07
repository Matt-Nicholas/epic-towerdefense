var Tower = function(worldX, worldY, tileX, tileY, tile) {
    var index = String(eval(tileX + "" + tileY));


    if ($.inArray(index, tileForbiden) == -1) {
      this.tower = game.add.sprite(worldX, worldY, tile);
      this.tower.worldX = worldX;
      this.tower.worldY = worldY;
      this.tower.tileX = tileX;
      this.tower.tileY = tileY;
      this.tower.tile = tile;
      this.tower.fireLastTime = game.time.now + this.tower.fireTime;
      tileForbiden.push(index);

      if(towerSelected === 'bitchin') {
        this.tower.fireTime = 500;
        this.tower.radius = 100;
        towers.add(this.tower);
      } else {
        this.tower = game.add.sprite(worldX, worldY, tile);
        this.tower.fireTime = 2000;
        this.tower.radius = 200;
        towers.add(this.tower);
      }
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
