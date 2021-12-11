const MAT_EDGE = 10; // the Matrix have 10 rows and 10 cols

const input = '6744638455 3135745418 4754123271 4224257161 8167186546 2268577674 7177768175 2662255275 4655343376 7852526168';

function inputToMatrix(input) {
  input = input.replace(/\s+/g, '');
  const matrix = [];
  let i = 0;
  for (let row = 0; row < MAT_EDGE; row++) {
    matrix[row] = [];
    for (let col = 0; col < MAT_EDGE; col++) {
      matrix[row][col] = {
        value: +input[i++],
        flashed: false
      }
    }
  }
  return matrix;
}

function matAdd(matrix) {
  for (let row = 0; row < MAT_EDGE; row++) {
    for (let col = 0; col < MAT_EDGE; col++) {
      matrix[row][col].value++
    }
  }
}

function flashes(matrix) {
  let countFlashes = 0;
  for (let row = 0; row < MAT_EDGE; row++) {
    for (let col = 0; col < MAT_EDGE; col++) {
      if (cellCanFlashes(matrix[row][col])) {
        makeAFlashes(matrix, row, col);
        countFlashes++;
      };
    }
  }
  return countFlashes;
}

function makeAFlashes(matrix, row, col) {
  matrix[row][col].flashed = true;
  // Moore neighborhoods
  const rowStart = Math.max(0, row - 1);
  const rowEnd = Math.min(MAT_EDGE-1, row + 1);
  const colStart = Math.max(0, col - 1);
  const colEnd = Math.min(MAT_EDGE-1, col + 1);
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let col = colStart; col <= colEnd; col++) {
      matrix[row][col].value++;
    }
  }
}

function cellCanFlashes(cell) {
  return (!cell.flashed) && cell.value > 9;
}

function resetFlashed(matrix) {
  for (let row = 0; row < MAT_EDGE; row++) {
    for (let col = 0; col < MAT_EDGE; col++) {
      if (matrix[row][col].flashed) {
        matrix[row][col] = {flashed: false, value: 0};
      }
    }
  }
}

// day 11 part 1
let mat = inputToMatrix(input);

let countAllFlashes = 0;
for (let step = 0; step < 100; step++) {
  matAdd(mat);
  let countFlashes;
  do {
    countFlashes = flashes(mat);
    countAllFlashes += countFlashes;
  } while (countFlashes != 0);
  resetFlashed(mat);
}
console.log(countAllFlashes);

// day 11 part 2 (Pretty much the same thing !)
mat = inputToMatrix(input);

let stepSynch = 0;
let step = 0;
while (!stepSynch) {
  step++;
  matAdd(mat);
  let countAllFlashes = 0;
  let countFlashes;
  do {
    countFlashes = flashes(mat);
    countAllFlashes += countFlashes;
  } while (countFlashes != 0);
  resetFlashed(mat);
  if (countAllFlashes == MAT_EDGE * MAT_EDGE) stepSynch = step;
}
console.log(stepSynch);
