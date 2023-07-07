class OreCollector extends Machine {
  constructor(options) {
    super(options);

    this.defaults = {
      interval: 5,
      max: 10,
      ore: "iron",
      speed: 4
    };
    for (const key in this.defaults) {
      if (this[key] === undefined) {
        this[key] = this.defaults[key];
      }
    }

    this.tick = 0;
    this.items = [];
  }
  makeItem(count = 1) {
    for (let i = 0; i < count; i++) {
      let item = new Item({
        x: this.x,
        y: this.y,
        vx: Math.random() * this.speed - this.speed / 2,
        vy: Math.random() * this.speed - this.speed / 2,
        parent: this,
      });
      this.items.push(item);
    }
  }
  update() {
    // console.log(this.items);

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update();
      this.items[i].draw();
      
    }

    if (this.tick >= this.interval) {
      this.tick = 0;
      if (this.items.length < this.max) {
        this.makeItem(2);
      }
    }
    this.tick++;
  }
}
