const intput = 'Player 1 starting position: 4 Player 2 starting position: 2';

function inputToPlayers(input) {
  const numbers = input.match(/\d+/g);
  return [
    {id: +numbers[0], position: +numbers[1], score: 0},
    {id: +numbers[2], position: +numbers[3], score: 0}
  ]
}

// day 21 part 1
let players = inputToPlayers(intput);

let dieResult = 0;
let nbRolls = 0;
function roll() {
  const res =  dieResult + 1;
  dieResult = (dieResult + 1) % 100;
  nbRolls++;
  return res;
}

let winner = 0;
while (!winner) {
  for (const player of players) {
    const result = roll() + roll() + roll();
    player.position = (player.position - 1 + result) % 10 + 1;
    player.score += player.position;
    if (player.score >= 1000) {
      winner = player.id;
      break;
    }
  }
}

console.log(players[winner%2].score * nbRolls);

// day 21 part 2
players = inputToPlayers(intput);

const possibleDiracDieTotal = new Map([
  [3, 1], // 111
  [4, 3], // 112 121 211
  [5, 6], // 113 131 311 122 212 221
  [6, 7], // 123 132 213 231 312 321 222
  [7, 6], // 133 313 331 322 232 223
  [8, 3], // 332 323 233
  [9, 1], // 333
]);

function gameTurn(playersData, playerInd) {
  let nbWins = 0;
  for (const [result, nbUnivers]  of possibleDiracDieTotal.entries()) {
    const players = [{...playersData[0]}, {...playersData[1]}];
    players[playerInd].position = (players[playerInd].position - 1 + result) % 10 + 1;
    players[playerInd].score += players[playerInd].position;
    if (players[playerInd].score >= 21) {
      if (playerInd == 1) continue; //the player 2 is not winning (we can estimate it the from starting pos)
      nbWins += nbUnivers;
    } else {
      nbWins += nbUnivers * gameTurn(players, (playerInd + 1) % 2);
    }
  }
  return nbWins;
}

console.log(gameTurn(players, 0));
