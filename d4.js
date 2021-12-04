const NB_GRIDS = 100;
const GRID_SIZE = 5;

const numbers = [26, 55, 7, 40, 56, 34, 58, 90, 60, 83, 37, 36, 9, 27, 42, 19, 46, 18, 49, 52, 75, 17, 70, 41, 12, 78, 15, 64, 50, 54, 2, 77, 76, 10, 43, 79, 22, 32, 47, 0, 72, 30, 21, 82, 6, 95, 13, 59, 16, 89, 1, 85, 57, 62, 81, 38, 29, 80, 8, 67, 20, 53, 69, 25, 23, 61, 86, 71, 68, 98, 35, 31, 4, 33, 91, 74, 14, 28, 65, 24, 97, 88, 3, 39, 11, 93, 66, 44, 45, 96, 92, 51, 63, 84, 73, 99, 94, 87, 5, 48];
const entries = '62  5 77 94 75 59 10 23 44 29 93 91 63 51 74 22 14 15  2 55 78 18 95 58 57 43 12 34 37 11 84 69 52 38 68 40 89 67 98 16 47 59 96 63 95 3 21 58 75 20 87 59 20 32 15 16 50 12 24 86 14 37 72 63 92 25 30 85 55 39 52 11 68 31 91 43 76 57 14 21 11 55 71 61 73 72 51 86 97 13 59  5 53 91 77 99 35 63 95 47 6 33 98 87 81 62 19 11 70 43 67 71 74 13 82 10  0 59  7 86 38 40 21 27 66 74 50 91 76 88 59  4 73 39 47 23 49 38 68 96 6 12 66 32 21 24 44 53 43 55 4  0 44 12 56 70 26 32 16  6 59 19  1 97 40 90 24 57 48 52 21  3  8 93 34 23 17 74 14 70 5 64 83  3 66 79 28 27 85 77 93 22 75 97 45 99 33  2 11 95 85 47 97 19 52 59 28 24 27  1 9  5 55 34 82 77 91 32 33 29 81 48 96 80 18 34 32 43 57 66 35 47 40 14 63 68 85 36 26  1 78 89 97 10  9 56 64 61 31 65 23 82 72 13 92 37 25 99 33 56 98 47 74 78 83 32  0 19 31 65 59 20 30 49 96 13 14 44 26  4 65 54 98 19 82 8 74 72 91 99 32 15 93 95 75 34 52  7 78  2 58  1 50 20 76 57 67 47 66 69 74 82 53 80  6 56  8 21 36 26 62 15 38 30 95 88 21 24 81 17 61 90 48 94  4 95 75 84 59 86 28 30 50 36 15 55 92 19 53 58 3 72 23 55 22 95  6 48  8 46 13  5 35 57 45 33 79 38 88 36 94 64 12 14 63 30 80 53 85 22 5 29 73  0  1 79 68 40 76 13 90 95 26 64 47 32 21 97 50 52 71 65  3 17 24 69 38 28  0 73 74 35 19 64 16 13 90 72 56 20 31 60 41 66 52 48 60 49 92 20 41 69 44 74 87 5 85 77 55 58 7 52 56 25 38 22 24 13 46 30 71 61 46 52 82 64 53 62 81 98 48  7 22 35 57 93 30 66 47 55 25 13 76 34 17 71 73  4 86 88 15 54 75 14 89 0 85 53 80 81 17 21 97 57  5 84 66 27 48 82 23 79 93 76 74 51 75 18 70 37 83 38 13 17 20 11 60 14 30 39 6 72 50 97 65 62 72 36 95 37 26 99 41 59  3 88 91 74 33 19 12 68  6 25 82 49  1 32 55 43 0 70 89 72 26 11 57 47 19 16 7  4 52 12 10 80 96 49 53 55 95 33 66 76 40 34 10 57 94 17 29 76 53  6 27 92 26 18 15 14 71 43 39 62  8 88 32 93  0 25 98 13  3 59 37 65 25 73 38  6 40 94 71 11 93 85  8 21 17 26 0 77 43 12 15 25 51 30 55 41 47 45 77  1 91 38 94 44 76  7 34 35 65 50 11 21 37 70 87 61 14 11 48 58 30 39 10  7 68 63 31 69 88 90 29 84 59 47 35 46 94 26 66  6 78 84 23 89 48 75 16 56 93 26 86 99  9  0  7 14 87 61 50 76 32 6 22 72 53 73 64  3 21 57 14 82 19 63 65 67 72 68 51  7 12 88 34 95  6 71 62 28 85  9 35 82 77 50  9  5 74  1 19 58 66 95 54 41 27 47 64 67  3 69 87 68  0  4 81 92 29 48 34 66 85 83 86 65 30 13 93 78 67 50 72 54 12 59 70 90 40 11 80 89 99 49 44 33 55 20 19 42 51 29 70 57 87 86 82 36 2 92  3 25 95 52 46  4 40 38 13 51 71 91 45 99 38 81 53  4 88 30 94 76 92 93 29 87 42 12 72 52 24 64 62 24 72  9 12  0 37  5  1 61 30 75 10 81 21 93 22 68 38 64 41 15 80 28 91 49 49 19 38 60 64 7  5 65 32 69 93 17 46 73 28 4 37 51 91  6 2 79 66 47 34 2 61 66 63 41 26 44  7 77 80 11 50 48 47 68 76 53 86 55 81 21 29 83 95 54 53 72 37 75 66 0 63 55 23 70 51 85 16 65 49 31 74 42 40 12 95 80 86 56 83 78 62  8 22 45 34 12  3 69 18 9 27  4 92 88 95 36 87  7 46 81 61 29 98 84 50 43  4 69 23 71 90 19 58 24 35 64 45 70  8 78 10 46 66 18 75 98 49 81 61 70 95 36  8 79 19 89 58  7 17 73 37 38 46 66 12 69 61 59 83 54 94 80 74 64 6 60 21 36 82 30 72 86  9 59 39 54 88 29 32 91 81 92 16 48 67 83 71 53 69 95 41 99 27 28 34 38 30 42 89 3 85 60 46 12 45  4 82 26 16 59 24 71 63 73 22 25 53 67 87 83 39 11 14 58 70 88 73  8 33 0 79 95 27 12 90 75 89 66 24 79  7 72 76 97 20 75 73  1 34 58 81 53 98  6 2  5 90 88 77 74 24 14 83 23 80 56 54 78 84 65 40 64 99 90 19 30 60 72 61 82 50 85 13 98 33  8 86 81 39 98 42 45 20  3 1 12 91 41 43 86 36 51 77 47 96 74  2 71 82 83 93 39 17 92 47 62 87 18 57 86 97  1 53 16 17 24 99 20 61 59 12 29 38 52 85  2 32 96 30 9  3 85 30 25 17 28 18 68 76 96 74  2 86 23 4 50 36 71 44 14 81 90 97 92 4 69  5 16 23 0 57 82 19 75 6 71 30 59 34 12 32 26 96 58 13  3  9 64 78 10 84 33  5  3 4 81 24 70 92 52  2 13 41 37 46  8 20 79 80 21 83 76 69 62 57 60 24 90 64 84 21 45 13  0 36 78 26 83  8 85 20 19 53 76 14 32 17 63 59 8 61 36 48 78 85 17 70 47  6 82 30 67 74 11 88 34 15 68 62 59 37 91  1 35 72 89 85 70 24 93 50 73 37 71 13 44 95 69 28 27 20 17  0 22 30  7 84 77 83 78 19 97 71 85 15 76 40 90 66 80 64  3 38 83 10 30 77 84 14 29 22  8 67 60 46 42 64 82 60 98 75 11 55 36 94 80 53 25 14 43 33 40 12 31 91 19 34  3  7 49 61 27 75 73 32  0 30 47 57 28 82 36 19 50 33 14 22 53 52 97 95 99 31 69 63 32 58 95 87 55  3 85 91 15 69 66 45 35  1 2  8 37 67 40 59 31 13 94 73 41 29 37 47 88 68 87 60 44 36 19 97 16 15 32 43 42 70 75 28 72 92 58 96 48 26 16 48 39  8 44 24 85 47 80 42 30 40 77 76 4 73 86 38 52 17 79 66 54 96 49 98 11 57 46 26 32 14 87 56 8 33 53 96 34 72 25 51 41 61 67 99 50 35 47 66 33 58 55 27 57 31 68 95 65 94 26 25 91 69 99 24  0 70 78 30 80 49 47 48 20  3 16 11 39 90 77 35 67 88 58 15 21 43 78 37 44 97 26 28 25 76 41 18 64 57 75 48 62 41 15 56 67 32 52 55  2 99 65 20 63 79 94 78  3 84  6 72 82 88 99 74  3 29 59 91 87 84 11 39 18 89 21 36 98 22 83 14  0 72 57 32 76 26 34 82  9 22 59 13 62 81 19 99 35 87 73 47 49 58 75 88  6 21 28 30 16 52 65 86 63 79 78 41 67 93 58 94 51 43 88 98 34 23  8 12 11 60 97 18 7 69 59 19 89 56 49 15 53 47 33  4 65 22 82 59 11 98 23 78 6 74 20 89 45 96 81 77 95 90 86 85 22 80 64 56 33 25  9 18 52  3 39 63 34 40 91  8 59 60 82 93 35  4  7 0 55 97 38 71 26 86 58 82  2 85  8 51 70  7 59 44 19 28 48 73 52 83 36 87 47 26 99 28 87 54 20  3 38 17 85  8 36  7 77 62 29 68 22 16 97 96 51 27 71 43 78 20 34 55 59 16 61 33 82 48 42 40 29 58 76  6 75 70  9 69 50 87 47 27 39 46 71 10 33 79 99  0 18  3 85  1 90 81 75 31  8 88 62 73 23 58 53 11 93 40 49 92 55 51 33  6 64 98 86 77 24 48 89 13 32  4 44 53 26 30  0 34 65 95 35 30  9 51 34 98 80 56 62 85 93 36 18 65 12 54 32 26 79 49 5 83 41 60 89 39 12 43 45 32 58 81 94 62 90 20 80 31 60 24 42  4 87 44 88 97 21 10 71 17 96 23 55 11 57 48 38 19 70 16 12 32 54 21  1 74 58 22 28 62 53 66 95 78 41 66 57 32 70 54 33 88 91 99 72 83 65 86 19  3 64 73 37 12 35 21 59  1 75 76 65 40 90 99 22 7 59  0  9 89 77 27 57 29 39 16 52 38 82 88 76 83 20 93 11 57 63 59  4 12 84 72 68 66 31 76 50 98 91 85 95 83 35 99 29 78 40 90 21 86 73 66 45 43 83 3 67 82 70 58 65 64 44 72  8 76  4 62 79 99 75 97 36 31 89 16 38 22 24 96 49 92 99 13 95 0 57 29 78 56 55  7 25 81 11 27  3 91 93 33 87 23 90 88 99 66  0  3 85 54 79 19 14  8 34 33 22 50 36  9 70 43 81 45 92 81  8 55 76 58 74 53 16 63 17 30 31 41 72 37 73  4 18 87 34 88 95 21 50 77 90 51 31 62 49 85 89 75 73 72 18  8 44 48 27 71 17 15 95 34 35 78  3 45  7 39 10 11 51  6 77 28 50 89 60 31 18 14 72 85 1 87 21 66 40 16 42 91 96 93 53 41 38 71 37 4 54 70 58 60 29 68 98 46 18 1 66 91 42 48 44 81 62 63 15 78 42 97 11  1 49 33 35  0  2 67 81 94 26 29 98 54  9 93 25 18 41 13 90 64 73  8 40 72 45 29 27 85 35  6 78 53 51 71 16 32 90 41 37 84 59 88 56  0 26 51 19 95 31 47 59 58 82 12 68 64 79 76 69 87 36 17  1 48 16 70 46 62 83 94 10 70 39 85 28 9  3 48 95 56 40 34 44 57 31 79 27 97 50 15 32 96  0 82 43 42 61  6 22 41 26 20  1 44 81 10 39  4 18 32 74 47  7 14 91 55 86 75 99 76 92 71  2 48 21 11  4 90 15 49 32 68 94 46 99 56 26 78  8 64 25 29 61 58 75 19 68 20 16 61 81 45 57 35 73 39 44 56 72 79 96 78 93 62  5 33  2 26 18 77 17 49 83 15 84 38 64 35 57 61 10 95 46 65 39 62 92 66 18 60 14  5 53  6 79 27 84 67 87 53 91  8 28 58 71 60 72 39 75 31 51 33 92 82 15 68 40 88 45 86 90 21 80 29  2 19 63 36 48 83 0 82 40  1 49 4  9 97 54 46 18 95 17 22 42 68 51 57 20 37 33 12 78 34 28 31 93  5 85 95 79 29 21 26 90 60 69 99 39 24 80 82 55  3 20 74 69 72 41 97 56  1 78 45 53 60 93  8 36 19 85 86 15 35 14 38 40 36 64 82 87 31 25 74 75 48 43 72 79 51 62 86 22 83 29 77 93 46 81 13 1 93 61 43 39 20 67  4 58 32 99 31 72 40  6 88 19 42 52 49 35 45 65 50 91';

function entriesToGrids(entries) {
  entries = entries.replace(/\s\s+/g, ' ').split(' ');
  let i = 0;
  const grids = [];
  for (let nb = 0; nb < NB_GRIDS; nb++) {
    grids[nb] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      grids[nb][row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        grids[nb][row][col] = {
          value: entries[i++],
          checked: false
        }
      }
    }
  }
  return grids;
}

function checkNumberInGrid(number, grid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col].value == number) {
        grid[row][col].checked = true;
        return;
      }
    }
  }
}

function hasGridSolution(grid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    let countRowChecked = 0;
    let countColChecked = 0;
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col].checked) countRowChecked++;
      if (grid[col][row].checked) countColChecked++;
    }
    if (countRowChecked == GRID_SIZE || countColChecked == GRID_SIZE) {
      return true;
    }
  }
  return false;
}

function getNumberAndGrid(numbers, grids) {
  for (const number of numbers) {
    for (const grid of grids) {
      checkNumberInGrid(number, grid);
      if (hasGridSolution(grid)) {
        return {grid, number};
      }
    }
  }
}

function getSumNotChecked(grid) {
  let sum = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!grid[row][col].checked) {
        sum += +grid[row][col].value
      }
    }
  }
  return sum;
}

const grids = entriesToGrids(entries);

// day 4 part 1
const {grid, number} = getNumberAndGrid(numbers, grids);
console.log(getSumNotChecked(grid) * number);

// day 4 part 2
function getNumberAndLastWinningGrid(numbers, grids) {
  const winningGrids = [];
  for (const number of numbers) {
    const noWinningGrid = [];
    for (const grid of grids) {
      checkNumberInGrid(number, grid);
      if (hasGridSolution(grid)) {
        winningGrids.push([grid, number]);
      } else {
        noWinningGrid.push(grid);
      }
    }
    grids = noWinningGrid;
  }
  return winningGrids.pop();
}

const [lastWinnigGrid, lastNumber] = getNumberAndLastWinningGrid(numbers, grids);
console.log(getSumNotChecked(lastWinnigGrid) * lastNumber);
