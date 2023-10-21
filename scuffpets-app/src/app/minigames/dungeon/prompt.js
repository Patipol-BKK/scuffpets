import { UNIVERSES, ADJECTIVES, LOCATIONS, PERSONS, OBJECTS, PLACES, GOALS } from "./dungeon-defs";
import { getRandomDistinct } from "@/app/util";

const BASE_PROMPT = "Start a new encounter in the {Universe} universe in a {Adjective} atmosphere within a {Location} area at a location called {Place}. Here, the player {Goal} Write the encounter in a {Voice} style."

function generatePrompt() {
  let ret = BASE_PROMPT.replace("{Goal}", GOALS[Math.floor(Math.random() * GOALS.length)])

  ret = ret.replaceRandomly(ret, "{Universe}", UNIVERSES);
  ret = ret.replaceRandomly(ret, "{Adjective}", ADJECTIVES);
  ret = ret.replaceRandomly(ret, "{Location}", LOCATIONS);
  ret = ret.replaceRandomly(ret, "{Place}", PLACES);
  ret = ret.replaceRandomly(ret, "{Person}", PERSONS);
  ret = ret.replaceRandomly(ret, "{Object}", OBJECTS);

  return ret;
}

function countOccurrences(bigString, subString) {
  let count = 0;
  let index = 0;
  while (true) {
    index = bigString.indexOf(subString, index);
    if (index === -1) {
      break;
    }
    count++;
    index += subString.length;
  }
  return count;
}

function replaceRandomly(bigString, subString, valueList) {
  let ret = bigString;
  let num = countOccurrences(bigString, subString);
  if (num <= 0) return ret;

  let values = getRandomDistinct(num, valueList);

  for (let i = 0; i < num; i++) {
    ret = ret.replace(subString, values[i]);
  }

  return ret;
}

console.log("countOccurences test: {1} {1} {2} 341 1 1, {1} : " + countOccurrences(" {1} {1} {2} 341 1 1", "{1}"));
console.log("replaceRandomly: {a} no1 {a} no2 {a} no3, {a}, PERSONS, 3" + replaceRandomly("{a} no1 {a} no2 {a} no3", "{a}", PERSONS, 3));
