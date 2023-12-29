import { UNIVERSES, ADJECTIVES, LOCATIONS, PERSONS, OBJECTS, PLACES, GOALS } from "./dungeon-defs";
import { countOccurrences, getRandomDistinct } from "@/app/util";

const BASE_PROMPT = "Start a new encounter in the {Universe} universe in a {Adjective} atmosphere within a {Location} area at a location called {Place}. Here, the player {Goal} Write the encounter in a normal style."

export function generatePrompt() {
  let ret = BASE_PROMPT.replace("{Goal}", GOALS[Math.floor(Math.random() * GOALS.length)])

  ret = replaceRandomly(ret, "{Universe}", UNIVERSES);
  ret = replaceRandomly(ret, "{Adjective}", ADJECTIVES);
  ret = replaceRandomly(ret, "{Location}", LOCATIONS);
  ret = replaceRandomly(ret, "{Place}", PLACES);
  ret = replaceRandomly(ret, "{Person}", PERSONS);
  ret = replaceRandomly(ret, "{Object}", OBJECTS);

  return ret;
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