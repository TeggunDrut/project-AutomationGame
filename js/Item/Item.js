class Item {
  constructor(options) {
    for (const key in options) {
      this[key] = options[key];
    }
    this.defaults = {
      path: "sprites/Template-16x16.png",
      x: 0,
      y: 0,
      vx: 1,
      vy: 1,
      friction: 0.9,
      parent: null,
    };
    for (const key in this.defaults) {
      if (this[key] === undefined) {
        this[key] = this.defaults[key];
      }
    }
    this.img = new Image();
    this.img.src = this.path;

    this.relativeX = this.x - this.parent.x;
    this.relativeY = this.y - this.parent.y;
  }
  draw() {
    ctx.drawImage(
      this.img,
      this.relativeX + this.parent.x * SIZEX,
      this.relativeY + this.parent.y * SIZEY,
      SIZEX,
      SIZEY
    );
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.relativeX = this.x - this.parent.x;
    this.relativeY = this.y - this.parent.y;
  }
}
