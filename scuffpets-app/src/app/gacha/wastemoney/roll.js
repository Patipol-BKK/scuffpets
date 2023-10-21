import pool from './pool.json'
import { getRandomDistinct } from '@/app/util';

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

  ret.push(...getRandomDistinct(num1, getGachaPool(1, pool)));
  ret.push(...getRandomDistinct(num2, getGachaPool(2, pool)));
  ret.push(...getRandomDistinct(num3, getGachaPool(3, pool)));

  return ret;
}

// Get an array of the available gachas for a given star level.
function getGachaPool(numStars) {
  switch (numStars) {
    case 1:
      return pool.oneStars;
    case 2:
      return pool.twoStars;
    case 3:
      return pool.threeStars;
    case 4:
      return pool.fourStars;
    case 5:
      return pool.fiveStars;
    default:
      console.log("U DONE FUCKED UP IN src\\app\\gacha\\wastemoney\\roll.js:getGachaPool: numStars was %d", numStars);
  }
}

export { get10Roll }

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