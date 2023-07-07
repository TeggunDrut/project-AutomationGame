class Map {
  constructor(map) {
    this.map = map;
    this.width = this.map[0].length;
    this.height = this.map.length;
  }
  draw() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        this.map[i][j].x = j * SIZEX;
        this.map[i][j].y = i * SIZEY;
        this.map[i][j].width = SIZEX;
        this.map[i][j].height = SIZEY;
        this.map[i][j].draw();
      }
    }
  }
}
