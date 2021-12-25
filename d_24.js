const input = 'inp w mul x 0 add x z mod x 26 div z 1 add x 11 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 6 mul y x add z y inp w mul x 0 add x z mod x 26 div z 1 add x 11 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 12 mul y x add z y inp w mul x 0 add x z mod x 26 div z 1 add x 15 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 8 mul y x add z y inp w mul x 0 add x z mod x 26 div z 26 add x -11 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 7 mul y x add z y inp w mul x 0 add x z mod x 26 div z 1 add x 15 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 7 mul y x add z y inp w mul x 0 add x z mod x 26 div z 1 add x 15 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 12 mul y x add z y inp w mul x 0 add x z mod x 26 div z 1 add x 14 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 2 mul y x add z y inp w mul x 0 add x z mod x 26 div z 26 add x -7 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 15 mul y x add z y inp w mul x 0 add x z mod x 26 div z 1 add x 12 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 4 mul y x add z y inp w mul x 0 add x z mod x 26 div z 26 add x -6 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 5 mul y x add z y inp w mul x 0 add x z mod x 26 div z 26 add x -10 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 12 mul y x add z y inp w mul x 0 add x z mod x 26 div z 26 add x -15 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 11 mul y x add z y inp w mul x 0 add x z mod x 26 div z 26 add x -9 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 13 mul y x add z y inp w mul x 0 add x z mod x 26 div z 26 add x 0 eql x w eql x 0 mul y 0 add y 25 mul y x add y 1 mul z y mul y 0 add y w add y 7 mul y x add z y';


function inputToInstructions(input) {
  const data = input.split(' ');
  let i = 0;
  const instructions  = [];
  while (i < data.length) {
    let cmd = data[i++];
    instructions.push({
      cmd,
      op1: data[i++],
      op2: (cmd != 'inp') ? data[i++] : null,
    });
  }
  return instructions;
}

const instructions = inputToInstructions(input);

// day 24 part 1
let solved = [];
let unsolved = [];
for (let block = 0; block < 14; block++) {
  const valLine5 = +instructions[block * 18 + 5].op2;
  const valLine15 = +instructions[block * 18 + 15].op2;
  if (valLine5 > 0) {
    unsolved.push({block, valLine15});
    continue;
  }

  const {block: lastBlock, valLine15: lastValLine15} = unsolved.pop();
  solved[lastValLine15 > -valLine5 ? lastBlock : block] = 9 - Math.abs(lastValLine15 + valLine5);
  solved[lastValLine15 > -valLine5 ? block : lastBlock] = 9;
}

console.log(solved.join(''));

// day 24 part 2
solved = [];
unsolved = [];
for (let block = 0; block < 14; block++) {
  const valLine5 = +instructions[block * 18 + 5].op2;
  const valLine15 = +instructions[block * 18 + 15].op2;
  if (valLine5 > 0) {
    unsolved.push({block, valLine15});
    continue;
  }

  const {block: lastBlock, valLine15: lastValLine15} = unsolved.pop();
  solved[lastValLine15 > -valLine5 ? lastBlock : block] = 1;
  solved[lastValLine15 > -valLine5 ? block : lastBlock] = 1 + Math.abs(lastValLine15 + valLine5);
}

console.log(solved.join(''));
