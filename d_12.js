const input = 'yw-MN wn-XB DG-dc MN-wn yw-DG start-dc start-ah MN-start fi-yw XB-fi wn-ah MN-ah MN-dc end-yw fi-end th-fi end-XB dc-XB yw-XN wn-yw dc-ah MN-fi wn-DG';

function inputToPaths(input) {
  const paths = input.split(' ');
  const destinationsFrom = new Map();

  const makePathFromTo = (from, dest) => {
    let destinations = destinationsFrom.get(from);
    if (!destinations) {
      destinations = [];
      destinationsFrom.set(from, destinations);
    }
    destinations.push(dest);
  }

  for (const path of paths) {
    const [node1, node2] = path.split('-');
    // no path from end or to start (because end and start are small caves and can be visited only once)
    if (node1 != 'end' && node2 != 'start') makePathFromTo(node1, node2);
    if (node2 != 'end' && node1 != 'start') makePathFromTo(node2, node1);
  }
  destinationsFrom.set('end', []);
  return destinationsFrom;
}

//day 12 part 1

function getNbSolutionsFormStartToEnd(destinationsFrom, isPart2 = false) {
  const currentPath = ['start'];
  let destinations =  destinationsFrom.get('start');
  const pathsTested = new Set();
  let nbSolutions = 0;
  while (true) {
    destinations = destinations.filter(dest => {
      // We can go to any Big nodes
      if (isBig(dest)) return true;
      // or any minor nodes if no double in current path (only in part2)
      if (isPart2 && !hasTwiceTheSameSmallCave(currentPath)) return true;
      // or any minor nodes not allready in the current path
      if (!currentPath.includes(dest)) return true;
    });
    // We cannot go to a allready testet path
    destinations = destinations.filter(dest => !pathsTested.has([...currentPath, dest].join('-')));
    // If no more destination, we backtrack ()
    if (destinations.length == 0) {
      // If we are at the start and no destinations, we got them all
      if (currentPath.length == 1) return nbSolutions;
      // If we are the end, we got a solution
      if (currentPath[currentPath.length - 1] == 'end') nbSolutions++;
      // Remember all tested paths
      pathsTested.add(currentPath.join('-')); // with a lazy hash, sry !
      // The backtrack
      currentPath.pop();
      destinations = destinationsFrom.get(currentPath[currentPath.length - 1]);
      continue;
    }
    // Otherwise we try the first possible destination in the list
    const destination = destinations[0];
    // We add it to the current path
    currentPath.push(destination);
    // Now the destinations are the ones from the current node
    destinations = destinationsFrom.get(destination);
  }
}

function isBig(dest) {
  return [...dest].every(letter => letter == letter.toUpperCase());
}

const destinationsFrom = inputToPaths(input);
console.log(getNbSolutionsFormStartToEnd(destinationsFrom));


// day 12 part 2
function hasTwiceTheSameSmallCave(path) {
  const nodes = new Set();
  for (const node of path) {
    if (isBig(node)) continue;
    if (nodes.has(node)) return true;
    nodes.add(node);
  }
  return false
}

console.log(getNbSolutionsFormStartToEnd(destinationsFrom, true));
