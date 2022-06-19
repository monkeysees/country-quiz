export function generateRandomNumber(range: number) {
  return Math.floor(Math.random() * range);
}

export function getRandomElements<T>(array: T[], count: number) {
  if (count < 0 || !Number.isInteger(count)) {
    throw new Error("Count should be non-negative integer.");
  }

  const arrayCopy = array.slice();
  const selectedElements = [];

  while (selectedElements.length < count) {
    const randomElIdx = generateRandomNumber(arrayCopy.length);
    selectedElements.push(arrayCopy[randomElIdx]);
    arrayCopy.splice(randomElIdx, 1);
  }

  return selectedElements;
}
