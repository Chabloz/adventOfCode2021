const input = 'CNBPHFBOPCSPKOFNHVKV CS -> S FB -> F VK -> V HO -> F SO -> K FK -> B VS -> C PS -> H HH -> P KH -> V PV -> V CB -> N BB -> N HB -> B HV -> O NC -> H NF -> B HP -> B HK -> S SF -> O ON -> K VN -> V SB -> H SK -> H VH -> N KN -> C CC -> N BF -> H SN -> N KP -> B FO -> N KO -> V BP -> O OK -> F HC -> B NH -> O SP -> O OO -> S VC -> O PC -> F VB -> O FF -> S BS -> F KS -> F OV -> P NB -> O CF -> F SS -> V KV -> K FP -> F KC -> C PF -> C OS -> C PN -> B OP -> C FN -> F OF -> C NP -> C CK -> N BN -> K BO -> K OH -> S BH -> O SH -> N CH -> K PO -> V CN -> N BV -> F FV -> B VP -> V FS -> O NV -> P PH -> C HN -> P VV -> C NK -> K CO -> N NS -> P VO -> P CP -> V OC -> S PK -> V NN -> F SC -> P BK -> F BC -> P FH -> B OB -> O FC -> N PB -> N VF -> N PP -> S HS -> O HF -> N KK -> C KB -> N SV -> N KF -> K CV -> N NO -> P';

function inputToRules(input) {
  input = input.split(' ');
  const template = input[0];
  const rules = new Map();
  for (let i = 1; i < input.length; i+=3) {
    rules.set(input[i], input[i + 2]);
  }
  return {template, rules}
}

let {template, rules} = inputToRules(input);


// Day 14 part 1 & 2

function getPairsFromTemplate(template) {
  const pairs = [];
  for (let i = 0; i < template.length-1; i++) {
    const pair = template[i] + template[i+1];
    pairs.push(pair);
  }
  return pairs;
}

let lastLetter = template[template.length - 1];
let pairsCounters = new Map([...rules.keys()].map(k => [k, 0]));
let pairs = getPairsFromTemplate(template);
for (const pair of pairs) {
  pairsCounters.set(pair, pairsCounters.get(pair) + 1);
}

for (let i = 0; i < 40; i++) {
  let newPairsCounter = new Map([...rules.keys()].map(k => [k, 0]));
  for (const [pair, amount] of pairsCounters.entries()) {
    if (amount == 0) continue;
    const pair1 = pair[0] + rules.get(pair);
    const pair2 = rules.get(pair) + pair[1];
    newPairsCounter.set(pair1, newPairsCounter.get(pair1) + amount);
    newPairsCounter.set(pair2, newPairsCounter.get(pair2) + amount);
  }
  pairsCounters = newPairsCounter;
}

const counters = new Map();
for (const [pair, amount] of pairsCounters.entries()) {
  counters.set(pair[0], (counters.get(pair[0]) ?? 0) + amount);
}
counters.set(lastLetter, (counters.get(lastLetter) ?? 0) + 1);

console.log(Math.max(...[...counters.values()]) - Math.min(...[...counters.values()]));
