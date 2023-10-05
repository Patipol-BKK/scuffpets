// Gacha rate defs as integer percents. 1* rate = 100-2*-3*.
const TWO_STAR_PERCENT = 25;
const THREE_STAR_PERCENT = 5;

// Performs a standard 10 roll gacha. 9 rolls are selected from the whole pool, while 1 is a guaranteed 3*.
function get10Roll(pool) {
  var ret = [];

  var num1 = 0;
  var num2 = 0;
  var num3 = 1; // guaranteed 10th roll
  for (let i = 0; i < 9; i++) {
    var roll = Math.random() * 100;
    if (roll < THREE_STAR_PERCENT) num3++;
    else if (roll < (TWO_STAR_PERCENT + THREE_STAR_PERCENT)) num2++;
    else num1++;
  }

  ret.push(...getOutcomes(num1, getGachaPool(1, pool)));
  ret.push(...getOutcomes(num2, getGachaPool(2, pool)));
  ret.push(...getOutcomes(num3, getGachaPool(3, pool)));

  return ret;
}

// Gets x distinct entries from arr, and returns them in a list. Mutates input.
function getOutcomes(x, arr) {
  if (x > arr.length) {
    console.log("U DONE FUCKED UP IN src\\app\\gacha\\wastemoney\\roll.js:getOutcomes: tried to get %d outcomes but only %d possibilities!", x, arr.length);
    return;
  }
  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr.slice(0, x);
}
// Get an array of the available gachas for a given star level.
// TODO: replace with actual lookups.
function getGachaPool(numStars, pool) {
  const oneStars = [
    "Neuro-sama (Ethical)",
    "Ninomae Ina'nis",
    "Akai Haato",
    "Amogus",
    "Teemo",
    "Epona",
    "Optimus Prime (Car)",
    "Lincoln Memorial",
    "Piranha Plant",
    "Pinto Beans",
    "Mud Golem",
    "Bad Apple!!",
    "Amish Made Wooden Horse",
    "Yugi Muto"
  ];


  const twoStars = [
    "La+ Darkness",
    "Takanashi Kiara",
    "Rainbow Dash",
    "Popteen Superstar",
    "The Iron Giant",
    "OceanGate Titan",
    "Ceres Fauna",
    "Cloud Mallow",
    "Dwayne Johnson",
    "Band of Horses",
    "Bloop",
    "Ebifrion",
    "Malphite",
    "Orange Mushroom",
    "Geico",
    "Grandpa"
  ];


  const threeStars = [
    "Shirakami Fubuki",
    "Shishiro Botan",
    "Tendou Aris",
    "Joe Birden",
    "Koseki Bijou",
    "Bastion",
    "Twilight Sparkle",
    "Gundam",
    "The Titanic",
    "Dante from the Devil May Cry Series",
    "Joey from Brooklyn",
    "James Garfield"
  ];

  switch (numStars) {
    case 1:
      return pool.oneStars;
    case 2:
      return pool.twoStars;
    case 3:
      return pool.threeStars;
    default:
      console.log("U DONE FUCKED UP IN src\\app\\gacha\\wastemoney\\roll.js:getGachaPool: numStars was %d", numStars);
  }
}
const testRoll = [
  {
    name: 'apple soup',
    numStars: 1,
    type1: 'apple',
    type2: 'soup'
  },
  {
    name: 'Teemo',
    numStars: 2,
    type1: 'Prophet',
    type2: 'Prophet'
  },
  {
    name: 'Mud Golem',
    numStars: 3,
    type1: '123456',
    type2: '751'
  },
  {
    name: 'Bad Apple!!',
    numStars: 4,
    type1: 'abbbb',
    type2: '751'
  },
  {
    name: 'Amish Made Wooden Horse',
    numStars: 5,
    type1: 'abbbb',
    type2: '751'
  },
  {
    name: 'Bad Apple!!',
    numStars: 1,
    type1: 'abbbb',
    type2: '751'
  },
  {
    name: 'Bad Apple!!',
    numStars: 1,
    type1: 'abbbb',
    type2: '751'
  },
  {
    name: 'Bad Apple!!',
    numStars: 1,
    type1: 'abbbb',
    type2: '751'
  },
  {
    name: 'Bad Apple!!',
    numStars: 1,
    type1: 'abbbb',
    type2: '751'
  },
  {
    name: 'Bad Apple!!',
    numStars: 1,
    type1: 'abbbb',
    type2: '751'
  },
]

export { get10Roll, testRoll }

/* ----- TESTS ----- */
/* 

t1 = get10Roll()
console.log(t1)
console.log("len=10 : " + (t1.length === 10))
console.log("contains at least 1 3* : " + getGachaPool(3).includes(t1[9]))

function getStar(gacha) {
  s1 = getGachaPool(1)
  s2 = getGachaPool(2)
  s3 = getGachaPool(3)

  if (s1.includes(gacha)) return 1;
  if (s2.includes(gacha)) return 2;
  if (s3.includes(gacha)) return 3;
}

function assertSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (getStar[arr[i]] > getStar[arr[i + 1]]) return false;
  }
  return true;
}

console.log("assertSorted: " + assertSorted(get10Roll()));

function getStarDistribution(arr) {
  ret = [0, 0, 0]

  for (let i = 0; i < arr.length; i++) {
    s = getStar(arr[i])
    ret[s - 1]++;
  }
  return ret;
}

console.log("distribution of t1 : " + getStarDistribution(t1));
console.log("distribution 1 : " + getStarDistribution(get10Roll()));
console.log("distribution 2 : " + getStarDistribution(get10Roll()));
console.log("distribution 3 : " + getStarDistribution(get10Roll()));
console.log("distribution 4 : " + getStarDistribution(get10Roll()));
console.log("distribution 5 : " + getStarDistribution(get10Roll()));

function sumOccurences(numTrials) {
  c1 = 0;
  c2 = 0;
  c3 = 0;
  while (numTrials > 0) {
    numTrials--;
    o = getStarDistribution(get10Roll());
    c1 += o[0]
    c2 += o[1]
    c3 += o[2]
  }
  return [c1, c2, c3];
}

sum1 = sumOccurences(10000)
total1 = sum1[0] + sum1[1] + sum1[2]
sum1p = [sum1[0] / total1, sum1[1] / total1, sum1[2] / total1]
console.log("sumOccurences of 10000 trials, with gtd 3* : " + sum1 + " with percentages : " + sum1p);

function sumOccurencesWithoutGtd(numTrials) {
  c1 = 0;
  c2 = 0;
  c3 = 0;
  while (numTrials > 0) {
    numTrials--;
    o = getStarDistribution(get10Roll().slice(0, 9));
    c1 += o[0]
    c2 += o[1]
    c3 += o[2]
  }
  return [c1, c2, c3];
}

sum1 = sumOccurencesWithoutGtd(10000)
total1 = sum1[0] + sum1[1] + sum1[2]
sum1p = [sum1[0] / total1, sum1[1] / total1, sum1[2] / total1]
console.log("sumOccurences of 10000 trials, withOUT gtd 3* : " + sum1 + " with percentages : " + sum1p);

function sumGachaOccurences(numTrials) {
  ret = {}
  while (numTrials > 0) {
    numTrials--;
    r = get10Roll();
    r.forEach(element => {
      if (element in ret) ret[element]++;
      else ret[element] = 1;
    });
  }
  return ret;
}

console.log("sumGachaOccurences for 10000 trials with gtd 3* : " + JSON.stringify(sumGachaOccurences(10000), null, 2));

function sumGachaOccurencesWithoutGtd(numTrials) {
  ret = {}
  while (numTrials > 0) {
    numTrials--;
    r = get10Roll().slice(0, 9);
    r.forEach(element => {
      if (element in ret) ret[element]++;
      else ret[element] = 1;
    });
  }
  return ret;
}

console.log("sumGachaOccurencesWithoutGtd for 10000 trials withOUT gtd 3* : " + JSON.stringify(sumGachaOccurencesWithoutGtd(10000), null, 2));

*/