let basicTileset;

let map;

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
        this.map[i][j].draw();
      }
    }
  }
}

let obj = {
  width: 60,
  height: 34,
  grid: [
    12, 8, 19, 18, 14, 6, 10, 3, 26, 12, 13, 7, 5, 23, 25, 7, 14, 19, 16, 5, 12,
    13, 26, 26, 22, 22, 7, 14, 20, 1, 14, 18, 14, 19, 17, 6, 9, 19, 5, 22, 11,
    10, 10, 9, 14, 19, 15, 14, 5, 23, 2, 26, 26, 22, 21, 26, 22, 12, 8, 1, 3,
    12, 0, 0, 0, 8, 17, 6, 10, 10, 10, 9, 5, 24, 26, 7, 4, 0, 0, 13, 11, 3, 11,
    10, 10, 3, 12, 8, 19, 4, 8, 4, 0, 8, 17, 20, 14, 1, 5, 23, 12, 0, 0, 0, 8,
    20, 18, 14, 6, 10, 10, 3, 23, 21, 24, 11, 10, 3, 7, 14, 6, 10, 3, 11, 3, 7,
    19, 14, 17, 16, 1, 16, 6, 10, 10, 9, 6, 10, 3, 11, 9, 6, 9, 15, 14, 6, 3,
    12, 0, 13, 7, 5, 11, 9, 18, 14, 15, 18, 5, 23, 11, 3, 22, 11, 9, 18, 17, 1,
    19, 18, 18, 6, 10, 3, 21, 7, 4, 13, 7, 19, 20, 4, 13, 7, 5, 12, 0, 8, 15, 1,
    16, 1, 4, 8, 20, 20, 17, 4, 13, 12, 0, 8, 18, 16, 17, 14, 5, 11, 10, 10, 9,
    5, 12, 0, 8, 1, 4, 0, 13, 2, 12, 13, 11, 9, 19, 17, 1, 14, 17, 15, 19, 16,
    4, 13, 23, 12, 13, 2, 7, 15, 20, 6, 10, 9, 6, 3, 25, 7, 17, 15, 17, 14, 6,
    9, 15, 4, 0, 13, 2, 11, 10, 9, 18, 18, 18, 4, 13, 7, 17, 14, 14, 6, 10, 3,
    12, 8, 5, 11, 10, 10, 10, 10, 9, 18, 20, 14, 19, 16, 15, 16, 16, 20, 5, 21,
    23, 22, 11, 10, 9, 17, 15, 19, 4, 8, 17, 5, 25, 12, 0, 8, 20, 4, 0, 8, 14,
    6, 3, 2, 24, 7, 4, 0, 0, 8, 20, 6, 3, 12, 0, 0, 8, 14, 18, 6, 3, 7, 6, 9,
    17, 20, 20, 14, 19, 20, 4, 8, 19, 14, 20, 19, 15, 4, 13, 26, 24, 24, 12, 8,
    18, 20, 15, 1, 5, 12, 8, 6, 10, 3, 11, 9, 18, 6, 3, 12, 8, 4, 13, 11, 10, 9,
    5, 25, 11, 9, 1, 1, 6, 10, 10, 10, 9, 17, 17, 18, 6, 9, 16, 4, 8, 14, 4, 0,
    0, 8, 5, 7, 20, 20, 4, 0, 0, 13, 23, 21, 22, 23, 22, 7, 15, 18, 17, 19, 6,
    3, 7, 4, 8, 5, 12, 8, 15, 4, 13, 26, 7, 6, 3, 12, 8, 4, 13, 21, 7, 16, 19,
    1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 6, 9, 14, 5, 11, 10, 9, 5, 12, 8, 19, 6,
    10, 10, 3, 2, 25, 22, 24, 22, 12, 8, 4, 0, 8, 1, 6, 9, 6, 9, 6, 10, 9, 14,
    5, 23, 24, 12, 8, 6, 3, 7, 5, 11, 10, 9, 17, 1, 4, 13, 2, 2, 24, 23, 24, 11,
    3, 22, 25, 12, 8, 20, 18, 5, 12, 0, 8, 5, 11, 9, 4, 8, 17, 19, 6, 3, 22, 21,
    23, 23, 23, 12, 13, 26, 12, 8, 19, 4, 8, 4, 0, 8, 20, 18, 6, 3, 23, 2, 7, 4,
    13, 7, 6, 9, 4, 0, 8, 4, 13, 25, 22, 23, 11, 10, 10, 9, 6, 3, 11, 3, 12, 0,
    8, 6, 3, 11, 9, 6, 9, 4, 13, 12, 8, 4, 0, 13, 25, 22, 23, 22, 26, 22, 26, 3,
    23, 7, 18, 6, 9, 5, 21, 7, 16, 16, 16, 5, 21, 22, 7, 6, 3, 12, 8, 17, 5, 23,
    7, 6, 10, 3, 21, 25, 7, 4, 0, 8, 4, 13, 12, 13, 11, 3, 12, 0, 13, 7, 4, 0,
    8, 6, 10, 10, 9, 5, 11, 3, 24, 24, 22, 22, 22, 2, 11, 6, 10, 9, 15, 16, 4,
    13, 24, 7, 1, 17, 4, 13, 11, 3, 12, 0, 13, 26, 7, 15, 5, 25, 7, 19, 15, 5,
    26, 2, 12, 13, 25, 7, 5, 11, 10, 10, 9, 6, 10, 10, 3, 7, 6, 3, 7, 4, 0, 0,
    8, 6, 9, 5, 24, 2, 25, 2, 11, 10, 9, 20, 17, 18, 20, 1, 6, 3, 2, 7, 18, 15,
    5, 11, 9, 6, 3, 21, 11, 3, 12, 0, 13, 11, 9, 15, 20, 5, 23, 22, 24, 11, 3,
    7, 6, 9, 20, 15, 18, 18, 4, 0, 13, 7, 4, 13, 12, 13, 11, 10, 9, 14, 16, 5,
    25, 24, 26, 23, 7, 19, 1, 0, 8, 19, 4, 8, 15, 5, 11, 9, 20, 14, 6, 9, 17, 1,
    6, 10, 9, 5, 21, 21, 11, 9, 20, 4, 0, 13, 24, 26, 24, 12, 13, 12, 8, 1, 15,
    16, 18, 4, 13, 11, 3, 12, 13, 11, 10, 3, 12, 8, 4, 0, 0, 13, 25, 22, 23, 2,
    12, 0, 0, 23, 7, 19, 6, 9, 4, 13, 7, 14, 16, 17, 18, 4, 0, 8, 15, 14, 18, 5,
    11, 3, 7, 14, 1, 6, 10, 10, 3, 21, 11, 3, 11, 10, 9, 20, 4, 0, 0, 13, 26,
    12, 13, 25, 11, 9, 19, 6, 10, 9, 6, 3, 11, 10, 10, 10, 10, 10, 3, 26, 11, 3,
    7, 20, 19, 20, 6, 3, 12, 8, 20, 16, 15, 6, 3, 12, 0, 0, 0, 13, 7, 5, 7, 16,
    20, 14, 15, 16, 6, 10, 9, 5, 12, 8, 15, 4, 13, 24, 21, 25, 23, 23, 11, 3, 7,
    4, 0, 8, 14, 18, 4, 13, 12, 8, 16, 17, 4, 0, 13, 21, 12, 6, 9, 15, 17, 17,
    15, 6, 3, 7, 14, 15, 17, 15, 5, 23, 21, 21, 26, 25, 7, 5, 12, 8, 18, 15, 14,
    17, 20, 4, 8, 5, 24, 7, 14, 5, 11, 3, 11, 10, 3, 2, 7, 5, 7, 5, 23, 7, 1, 4,
    13, 11, 10, 9, 1, 14, 5, 23, 24, 23, 24, 18, 18, 16, 19, 20, 19, 14, 5, 12,
    8, 4, 8, 20, 6, 10, 3, 25, 25, 22, 7, 5, 2, 7, 4, 0, 0, 8, 4, 13, 7, 5, 23,
    7, 15, 6, 9, 5, 12, 0, 13, 11, 9, 5, 7, 5, 11, 9, 4, 13, 23, 12, 8, 4, 8,
    20, 5, 11, 10, 10, 10, 1, 1, 17, 19, 4, 0, 8, 5, 25, 12, 13, 12, 0, 0, 0,
    13, 21, 26, 23, 12, 13, 25, 12, 13, 11, 3, 12, 13, 2, 7, 6, 10, 9, 4, 8, 4,
    13, 26, 26, 21, 7, 18, 6, 9, 5, 7, 15, 5, 11, 10, 10, 9, 5, 12, 8, 6, 9, 19,
    1, 1, 8, 18, 14, 1, 5, 11, 9, 6, 3, 21, 22, 24, 11, 3, 11, 10, 10, 10, 10,
    10, 3, 24, 22, 22, 7, 5, 26, 11, 3, 12, 8, 15, 18, 5, 12, 13, 26, 23, 25,
    26, 12, 0, 0, 0, 13, 12, 8, 5, 12, 8, 16, 1, 6, 10, 9, 14, 1, 4, 8, 15, 9,
    20, 16, 14, 6, 9, 18, 4, 13, 24, 11, 10, 9, 6, 9, 20, 4, 8, 16, 4, 13, 24,
    11, 3, 7, 5, 2, 7, 6, 10, 9, 1, 18, 5, 24, 2, 24, 2, 11, 3, 23, 25, 22, 25,
    25, 11, 9, 6, 10, 9, 19, 15, 15, 14, 4, 8, 20, 6, 9, 1, 8, 16, 19, 19, 1,
    14, 4, 13, 24, 23, 12, 8, 4, 8, 18, 14, 6, 9, 19, 5, 26, 2, 7, 5, 7, 5, 22,
    12, 8, 18, 14, 14, 18, 5, 21, 11, 3, 11, 9, 5, 26, 23, 11, 3, 23, 7, 16, 17,
    15, 20, 15, 19, 16, 4, 13, 12, 8, 19, 16, 18, 12, 8, 15, 20, 18, 20, 5, 2,
    22, 23, 23, 7, 5, 12, 8, 4, 8, 17, 16, 6, 3, 24, 7, 6, 9, 6, 3, 25, 12, 0,
    0, 8, 1, 5, 2, 7, 6, 9, 4, 13, 11, 10, 9, 5, 25, 12, 0, 8, 18, 4, 8, 4, 0,
    13, 24, 21, 7, 16, 15, 18, 11, 9, 15, 16, 18, 20, 5, 11, 10, 3, 2, 12, 13,
    21, 7, 5, 7, 4, 8, 17, 5, 25, 7, 15, 17, 18, 6, 10, 3, 21, 2, 12, 0, 13, 21,
    12, 8, 18, 5, 11, 9, 15, 17, 5, 23, 24, 24, 7, 20, 5, 7, 6, 10, 3, 26, 23,
    7, 16, 18, 18, 12, 0, 8, 19, 14, 18, 5, 12, 0, 13, 23, 21, 2, 23, 7, 6, 9,
    5, 7, 4, 13, 24, 7, 4, 0, 8, 19, 17, 6, 3, 21, 2, 25, 24, 21, 2, 12, 8, 6,
    9, 15, 17, 4, 13, 23, 2, 22, 12, 0, 13, 12, 8, 18, 6, 3, 23, 12, 8, 4, 8,
    22, 11, 9, 20, 18, 18, 6, 10, 10, 3, 11, 3, 23, 22, 12, 8, 19, 5, 12, 13,
    26, 24, 7, 5, 11, 9, 16, 1, 18, 6, 10, 3, 2, 23, 2, 24, 26, 12, 0, 0, 8, 16,
    5, 11, 10, 3, 2, 23, 22, 22, 23, 12, 0, 0, 13, 11, 3, 12, 13, 12, 3, 7, 14,
    18, 14, 4, 8, 15, 20, 6, 9, 5, 11, 10, 3, 12, 0, 13, 22, 11, 10, 10, 9, 5,
    7, 16, 15, 17, 16, 18, 1, 6, 10, 3, 26, 22, 21, 26, 23, 2, 7, 4, 13, 12, 8,
    5, 26, 23, 21, 26, 21, 23, 23, 2, 25, 12, 13, 22, 26, 24, 6, 9, 17, 15, 17,
    5, 7, 14, 16, 18, 18, 5, 7, 4, 13, 26, 23, 11, 3, 7, 16, 19, 17, 5, 7, 17,
    18, 19, 1, 4, 0, 0, 0, 13, 25, 23, 26, 22, 2, 11, 9, 6, 10, 10, 9, 5, 25,
    23, 11, 3, 11, 10, 10, 10, 3, 23, 2, 2, 11, 3, 0, 0, 8, 14, 4, 13, 12, 0, 0,
    0, 8, 6, 9, 6, 3, 11, 3, 7, 5, 7, 1, 19, 14, 6, 9, 19, 20, 19, 20, 5, 2, 22,
    21, 24, 25, 2, 21, 25, 22, 7, 16, 17, 1, 14, 18, 5, 22, 2, 12, 13, 7, 4, 0,
    0, 13, 25, 24, 26, 7, 5, 10, 10, 9, 1, 6, 3, 26, 25, 25, 26, 12, 0, 8, 1, 5,
    12, 13, 12, 13, 12, 0, 0, 0, 8, 4, 8, 17, 19, 1, 5, 11, 3, 24, 2, 11, 3, 11,
    10, 10, 9, 1, 19, 17, 4, 8, 5, 25, 22, 11, 3, 12, 13, 26, 11, 3, 11, 10, 3,
    12, 13, 18, 4, 8, 20, 20, 5, 24, 11, 10, 3, 11, 3, 12, 0, 13, 2, 21, 2, 23,
    11, 10, 3, 22, 7, 5, 12, 8, 16, 16, 5, 12, 13, 25, 22, 7, 6, 9, 20, 4, 8,
    18, 20, 1, 5, 7, 6, 10, 10, 9, 6, 3, 22, 22, 12, 13, 12, 0, 13, 2, 23, 17,
    5, 7, 20, 17, 5, 23, 7, 16, 5, 7, 5, 23, 11, 10, 10, 3, 24, 11, 9, 4, 13,
    11, 9, 6, 10, 9, 19, 17, 5, 11, 3, 26, 23, 12, 8, 4, 8, 6, 9, 14, 4, 0, 13,
    7, 20, 14, 17, 19, 14, 5, 22, 24, 24, 11, 3, 22, 11, 10, 10, 14, 6, 9, 17,
    4, 13, 11, 9, 4, 13, 7, 6, 10, 9, 4, 8, 6, 3, 12, 8, 5, 11, 9, 15, 19, 18,
    18, 20, 4, 13, 7, 5, 26, 24, 24, 12, 13, 12, 8, 20, 4, 13, 23, 25, 7, 20,
    18, 14, 20, 14, 5, 2, 25, 25, 7, 5, 11, 9, 4, 8, 17, 14, 19, 4, 13, 22, 12,
    0, 13, 24, 12, 8, 16, 4, 13, 7, 4, 13, 22, 12, 13, 12, 0, 0, 8, 19, 14, 20,
    6, 3, 7, 5, 24, 22, 26, 11, 3, 22, 7, 17, 5, 22, 25, 24, 7, 1, 20, 18, 20,
    1, 5, 22, 11, 10, 9, 6, 9, 16, 5, 12,
  ],
  key1: {
    0: "grassTop",
    1: "grass",
    2: "dirt",
    3: "dirtTopRight",
    4: "grassTopLeft",
    5: "grassLeft",
    6: "grassBottomLeft",
    7: "grassRight",
    8: "grassTopRight",
    9: "grassBottomRight",
    10: "grassBottom",
    11: "dirtTopLeft",
    12: "dirtBottomLeft",
    13: "dirtBottomRight",
    14: "var1",
    15: "var2",
    16: "var3",
    17: "var4",
    18: "var5",
    19: "var6",
    20: "var7",
    21: "var8",
    22: "var9",
    23: "var10",
    24: "var11",
    25: "var12",
    26: "var13",
  },
  key2: {
    0: {
      path: "grass/grass00.png",
    },
    1: {
      path: "grass/grass01.png",
    },
    2: {
      path: "grass/grass02.png",
    },
    3: {
      path: "grass/grass03.png",
    },
    4: {
      path: "grass/grass04.png",
    },
    5: {
      path: "grass/grass05.png",
    },
    6: {
      path: "grass/grass06.png",
    },
    7: {
      path: "grass/grass07.png",
    },
    8: {
      path: "grass/grass08.png",
    },
    9: {
      path: "grass/grass09.png",
    },
    10: {
      path: "grass/grass10.png",
    },
    11: {
      path: "grass/grass11.png",
    },
    12: {
      path: "grass/grass12.png",
    },
    13: {
      path: "grass/grass13.png",
    },
    14: {
      path: "var/var00.png",
    },
    15: {
      path: "var/var01.png",
    },
    16: {
      path: "var/var02.png",
    },
    17: {
      path: "var/var03.png",
    },
    18: {
      path: "var/var04.png",
    },
    19: {
      path: "var/var05.png",
    },
    20: {
      path: "var/var06.png",
    },
    21: {
      path: "var/var07.png",
    },
    22: {
      path: "var/var08.png",
    },
    23: {
      path: "var/var09.png",
    },
    24: {
      path: "var/var10.png",
    },
    25: {
      path: "var/var11.png",
    },
    26: {
      path: "var/var12.png",
    },
  },
};

function getTile(id, parent) {
  if (id < 10) {
    return new Tile(obj.key2[id].path, SIZEX, SIZEY, parent);
  }
  return new Tile(obj.key2[id].path, SIZEX, SIZEY, parent);
}

map = new Map(
  new Array(obj.height).fill(0).map(() => new Array(obj.width).fill(0))
);

for (let j = 0; j < obj.height; j++) {
  for (let i = 0; i < obj.width; i++) {
    map.map[j][i] = getTile(obj.grid[j * obj.width + i], map);
  }
}

// TODO: Use WFC to make siomple level?

function init() {
  SIZEX = width / map.map[0].length;
  SIZEY = height / map.map.length;
}

function render() {
  requestAnimationFrame(render);

  map.draw();
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw();

  // basicTileset.draw();
}
requestAnimationFrame(render);
