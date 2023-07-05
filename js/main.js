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
        this.map[i][j].x = j * SIZE;
        this.map[i][j].y = i * SIZE;
        this.map[i][j].draw();
      }
    }
  }
}

let grassLib = {
  full: "13",
  island: "00",
  islandRight: "01",
  islandLeft: "07",
  islandTop: "15",
  top: "05",
  topLeft: "20",
  topRight: "06",
  right: "27",
  left: "38",
  bottom: "45",
  bottomLeft: "28",
  bottomRight: "43",
};
let dirtLib = {
  full: "11",
}

function getTile(id, parent) {
  return new Tile("sprites/grass/grass" + id + ".png", SIZE, SIZE, parent);
}

let grass = new Tile(
  "sprites/grass/grass" + grassLib.island + ".png",
  SIZE,
  SIZE,
  map
);
map = new Map([
  [getTile(grassLib.full, map), getTile(grassLib.island, map)],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
]);

// TODO: Use WFC to make siomple level?

const tiles = [];
const tileImages = [];

let grid = [];

const DIM = 16;

function setup() {
  tileImages[0] = loadImage("sprites/grass/grass" + grassLib.full + ".png");
  tileImages[1] = loadImage("sprites/grass/grass" + grassLib.top + ".png");
  tileImages[2] = loadImage("sprites/grass/grass" + grassLib.bottom + ".png");
  tileImages[3] = loadImage("sprites/grass/grass" + grassLib.left + ".png");
  tileImages[4] = loadImage("sprites/grass/grass" + grassLib.right + ".png");
  tileImages[5] = loadImage("sprites/grass/grass" + grassLib.topLeft + ".png");
  tileImages[6] = loadImage("sprites/grass/grass" + grassLib.topRight + ".png");
  tileImages[7] = loadImage(
    "sprites/grass/grass" + grassLib.bottomLeft + ".png"
  );
  tileImages[8] = loadImage(
    "sprites/grass/grass" + grassLib.bottomRight + ".png"
  );
  tileImages[9] = loadImage("sprites/dirt/dirt00.png");

  tiles[0] = new WFCTile(tileImages[0], ["AAA", "AAA", "AAA", "AAA"]);
  tiles[1] = new WFCTile(tileImages[1], ["AAA", "ABA", "BBB", "ABA"]);
  tiles[2] = new WFCTile(tileImages[9], ["BBB", "BBB", "BBB", "BBB"]);

  //rotate tiles
  let len = tiles.length;
  for (let i = 0; i < len; i++) {
    const tile = tiles[i];
    for (let j = 0; j < 3; j++) {
      tiles.push(tile.rotate(j));
    }
  }

  // Generate the adjacency rules based on edges
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }
  startOver();
}

function startOver() {
  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

function init() {}

function render() {
  requestAnimationFrame(render);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw();

  map.draw();
  // basicTileset.draw();
}
requestAnimationFrame(render);
function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
}
function draw() {
  background(0);

  // Draw the grid
  const w = width / DIM;
  const h = height / DIM;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index].img, i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(100);
        rect(i * w, j * h, w, h);
      }
    }
  }

  // Make a copy of grid
  let gridCopy = grid.slice();
  // Remove any collapsed cells
  gridCopy = gridCopy.filter((a) => !a.collapsed);

  // The algorithm has completed if everything is collapsed
  if (grid.length == 0) {
    return;
  }

  // Pick a cell with least entropy

  // Sort by entropy
  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });

  // Keep only the lowest entropy cells
  let len = gridCopy[0].options.length;
  let stopIndex = 0;
  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }
  if (stopIndex > 0) gridCopy.splice(stopIndex);

  // Collapse a cell
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  if (pick === undefined) {
    startOver();
    return;
  }
  cell.options = [pick];

  // Calculate entropy
  const nextGrid = [];
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = i + j * DIM;
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);
        // Look up
        if (j > 0) {
          let up = grid[i + (j - 1) * DIM];
          let validOptions = [];
          for (let option of up.options) {
            let valid = tiles[option].down;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look right
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM];
          let validOptions = [];
          for (let option of right.options) {
            let valid = tiles[option].left;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look down
        if (j < DIM - 1) {
          let down = grid[i + (j + 1) * DIM];
          let validOptions = [];
          for (let option of down.options) {
            let valid = tiles[option].up;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look left
        if (i > 0) {
          let left = grid[i - 1 + j * DIM];
          let validOptions = [];
          for (let option of left.options) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        // I could immediately collapse if only one option left?
        nextGrid[index] = new Cell(options);
      }
    }
  }

  grid = nextGrid;
}
