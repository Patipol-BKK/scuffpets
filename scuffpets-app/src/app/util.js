// Counts the number of times subString occurs in bigString.
export function countOccurrences(bigString, subString) {
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

// Gets x distinct entries from arr, and returns them in a list.
export function getRandomDistinct(x, arrayInput) {
  if (x > arrayInput.length) {
    console.log("U DONE FUCKED UP IN src\\app\\util.js:getOutcomes: tried to get %d outcomes but only %d possibilities!", x, arr.length);
    return;
  }
  // Create copy
  var arr = Array.from(arrayInput);

  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr.slice(0, x);
}