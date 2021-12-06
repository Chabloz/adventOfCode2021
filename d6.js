let fishes = [3,1,4,2,1,1,1,1,1,1,1,4,1,4,1,2,1,1,2,1,3,4,5,1,1,4,1,3,3,1,1,1,1,3,3,1,3,3,1,5,5,1,1,3,1,1,2,1,1,1,3,1,4,3,2,1,4,3,3,1,1,1,1,5,1,4,1,1,1,4,1,4,4,1,5,1,1,4,5,1,1,2,1,1,1,4,1,2,1,1,1,1,1,1,5,1,3,1,1,4,4,1,1,5,1,2,1,1,1,1,5,1,3,1,1,1,2,2,1,4,1,3,1,4,1,2,1,1,1,1,1,3,2,5,4,4,1,3,2,1,4,1,3,1,1,1,2,1,1,5,1,2,1,1,1,2,1,4,3,1,1,1,4,1,1,1,1,1,2,2,1,1,5,1,1,3,1,2,5,5,1,4,1,1,1,1,1,2,1,1,1,1,4,5,1,1,1,1,1,1,1,1,1,3,4,4,1,1,4,1,3,4,1,5,4,2,5,1,2,1,1,1,1,1,1,4,3,2,1,1,3,2,5,2,5,5,1,3,1,2,1,1,1,1,1,1,1,1,1,3,1,1,1,3,1,4,1,4,2,1,3,4,1,1,1,2,3,1,1,1,4,1,2,5,1,2,1,5,1,1,2,1,2,1,1,1,1,4,3,4,1,5,5,4,1,1,5,2,1,3];

function getNbFishesAfterXDays(days, fishes) {
  let giveBirthInXdays = new Array(9).fill(0);
  for (const fishe of fishes) {
    giveBirthInXdays[fishe]++;
  }
  for (let day=0; day < days; day++) {
    let babies = giveBirthInXdays[0];
    for (let i = 0; i < 8; i++) {
      giveBirthInXdays[i] = giveBirthInXdays[i+1];
    }
    giveBirthInXdays[6] += babies;
    giveBirthInXdays[8] = babies;
  }
  return giveBirthInXdays.reduce((acc, val) => acc + val);
}

// day 6 part 1
console.log(getNbFishesAfterXDays(80, fishes));

// day 6 part 2
console.log(getNbFishesAfterXDays(256, fishes));
