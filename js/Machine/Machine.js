class Machine {
  constructor(options) {
    for (const key in options) {
      this[key] = options[key];
    }

    this.path === undefined
      ? (this.path = "sprites/Template-16x16.png")
      : (this.path = path);
    this.img = new Image();
    this.img.src = this.path;
  }
  draw() {
    ctx.drawImage(this.img, this.x * SIZEX, this.y * SIZEY, SIZEX, SIZEY);
  }
  update() {
    
  }
}
