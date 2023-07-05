class Tileset {
  constructor(width, height, tileArray) {
    this.width = width;
    this.height = height;
    if (tileArray) this.tiles = new Array(width * height).fill(null);
    else
      this.tiles = new Array(Math.ceil(width * height)).fill(
        new Tile(null, 0, 0)
      );
  }
  addTile(tile) {
    this.tiles.push(tile);
  }
  removeTile(tile) {
    this.tiles.splice(this.tiles.indexOf(tile), 1);
  }
  draw() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].draw();
    }
  }
}
