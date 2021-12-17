const intput = 'target area: x=85..145, y=-163..-108';

function inputToTargetArea(input) {
  const numbers = input.match(/-*\d+/g);
  const x1 = Math.min(numbers[0], numbers[1]);
  const x2 = Math.max(numbers[0], numbers[1]);
  const y1 = Math.max(numbers[2], numbers[3]);
  const y2 = Math.min(numbers[2], numbers[3]);
  return {x1, y1, x2, y2};
}

// day 17 part 1, I calculate the velocity X but i'm to lazy for Y so I've bruted force it
const targetArea = inputToTargetArea(intput);
const areaHeight = Math.abs(targetArea.y2 - targetArea.y1);
let minVelocityX = Math.ceil(-1 + Math.sqrt(1 + 8 * targetArea.x1 ) / 2);
let maxVelocityY = -Infinity;
for (let velocityY = 1000; velocityY > -areaHeight; velocityY--) {
  let posX = 0;
  let posY = 0;
  let maxHeight = -Infinity;
  let currentVelocityY = velocityY;
  let currentVelocityX = minVelocityX;
  let found = false;
  for (let step=0; step<10000; step++) {
    posX += currentVelocityX;
    posY += currentVelocityY;
    if (posY>maxHeight) maxHeight = posY;
    // if we hit the target we have a winner
    if (posX>=targetArea.x1 && posX<=targetArea.x2 && posY<=targetArea.y1 && posY>=targetArea.y2) {
      found = true;
      maxVelocityY = velocityY
      console.log(maxHeight);
      break;
    } else if (posY<targetArea.y2) { //we miss it
      break;
    }
    currentVelocityX = Math.max(0, currentVelocityX - 1);
    currentVelocityY -= 1;
  }
  if (found) break;
}


// day 17 part 2, i'm still lazy, so I've brute forced the two values ....
let maxVelocityX = targetArea.x2;
let minVelocityY= targetArea.y2;
let countWinner = 0;
for (let velocityX = minVelocityX; velocityX <= maxVelocityX ; velocityX++) {
  for (let velocityY = minVelocityY; velocityY <= maxVelocityY; velocityY++) {
    let currentVelocityY = velocityY;
    let currentVelocityX = velocityX;
    let posX = 0;
    let posY = 0;
    for (let step=0; step<10000; step++) {
      posX += currentVelocityX;
      posY += currentVelocityY;
      // if we hit the target we have a winner
      if (posX>=targetArea.x1 && posX<=targetArea.x2 && posY<=targetArea.y1 && posY>=targetArea.y2) {
        countWinner++;
        break;
      } else if (posY<targetArea.y2 || posX > targetArea.x2) { //we miss it
        break;
      }
      currentVelocityX = Math.max(0, currentVelocityX - 1);
      currentVelocityY -= 1;
    }
  }
}
console.log(countWinner);
