// Wave Function Collapse (tiled model)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/171-wave-function-collapse
// https://youtu.be/0zac-cDzJwA

// Code from Challenge: https://editor.p5js.org/codingtrain/sketches/pLW3_PNDM
// Corrected and Expanded: https://github.com/CodingTrain/Wave-Function-Collapse

// Array for tiles and tile images
const tiles = [];
const tileImages = [];

// Current state of the grid
let grid = [];

// Width and height of each cell
const DIM = 25;

// Load images
function preload() {
  const path = "grass";
  let len = 11;
  for (let i = 0; i < len; i++) {
    if(i < 10) tileImages[i] = loadImage(`${path}/grass0${i}.png`);
    else tileImages[i] = loadImage(`${path}/grass${i}.png`);
  }
}
let lib;
function setup() {
  createCanvas(400, 400);
  
  lib = {
    grass: tileImages[1],
    grassTop: tileImages[0],
    grassTopLeft: tileImages[4],
    grassLeft: tileImages[5],
    grassBottomLeft: tileImages[6],
    dirt: tileImages[2],
    dirtTopRight: tileImages[3],
    island: tileImages[8],
    peninsulaTopLeft: tileImages[9],
    peninsula: tileImages[10],
  };

  // Key
  // AAA = grass
  // ZZZ = dirt
  // BBB = grassTop
  // CCC = grassRight
  // DDD = grassBottom
  // EEE = grassLeft


  // Create and label the tiles
  //                                                 TOP     RIGHT   BOTTOM  LEFT
  tiles[0]  = new Tile(lib.grass,                     ["AAA",  "AAA",  "AAA",  "AAA"]); 
  tiles[1]  = new Tile(lib.grassTop,                  ["AAA",  "BBB",  "ZZZ",  "BBB"]);
  tiles[2]  = new Tile(lib.grassTopLeft,              ["AAA",  "BBB",  "EEE",  "AAA"]);
  tiles[3]  = new Tile(lib.grassLeft,                 ["EEE",  "ZZZ",  "EEE",  "AAA"]);
  tiles[4]  = new Tile(lib.grassBottomLeft,           ["EEE",  "DDD",  "AAA",  "AAA"]);
  tiles[5]  = tiles[2].rotate(1); (tiles[5].edges =   ["AAA",  "AAA",  "CCC",  "BBB"]); // grassTopRight
  tiles[6]  = tiles[3].rotate(2); (tiles[6].edges =   ["CCC",  "AAA",  "CCC",  "ZZZ"]); // grassRight
  tiles[7]  = tiles[4].rotate(3); (tiles[7].edges =   ["CCC",  "AAA",  "AAA",  "DDD"]); // grassBottomRight
  tiles[8]  = tiles[1].rotate(2); (tiles[8].edges =   ["ZZZ",  "DDD",  "AAA",  "DDD"]); // grassBottom
  tiles[9]  = new Tile(lib.dirt,                      ["ZZZ",  "ZZZ",  "ZZZ",  "ZZZ"]); // dirt
  tiles[10] = new Tile(lib.dirtTopRight,              ["ZZZ",  "ZZZ",  "EEE",  "DDD"]); // dirtTopRight
  tiles[11] = tiles[10].rotate(3); (tiles[11].edges = ["ZZZ",  "DDD",  "CCC",  "ZZZ"]); // dirtTopLeft
  tiles[12] = tiles[10].rotate(2); (tiles[12].edges = ["CCC",  "BBB",  "ZZZ",  "ZZZ"]); // dirtBottomLeft
  tiles[13] = tiles[10].rotate(1); (tiles[13].edges = ["EEE",  "ZZZ",  "ZZZ",  "BBB"]); // dirtBottomRight
  tiles[14] = new Tile(lib.island,                    ["ZZZ",  "ZZZ",  "ZZZ",  "ZZZ"]); // island
  tiles[15] = new Tile(lib.peninsulaTopLeft,          ["ZZZ",  "BBB",  "CCC",  "KKK"]); // peninsulaTopLeft
  tiles[16] = new Tile(lib.peninsula,                 ["ZZZ",  "KKK",  "ZZZ",  "ZZZ"]); // peninsulaTopRight
  // Generate the adjacency rules based on edges
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  // Start over
  startOver();
}

function startOver() {
  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

// Check if any element in arr is in valid, e.g.
// VALID: [0, 2]
// ARR: [0, 1, 2, 3, 4]
// result in removing 1, 3, 4
// Could use filter()!
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
