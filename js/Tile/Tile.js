class Tile {
constructor(path, width, height, parent) {
    this.path =
      path === null
        ? "sprites/Template-16x16.png"
        : path;
    this.parent = parent;
    
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    
    const sprite = new Sprite(this.path, this.width, this.height);
    this.sprite = sprite;
  }
  draw() {
    ctx.drawImage(this.sprite.img, this.x, this.y, this.width, this.height);
  }
}
