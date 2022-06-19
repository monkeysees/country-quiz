const htmlEl = document.documentElement;

const largeScreenReferenceSizePx = 1440;
const smallScreenReferenceSizePx = 375;
const tinyScreenReferenceSizePx = 300;

/* Accommodate font size on window resize */
function getFontChangeRate(currentSize: number, baseSize: number) {
  if (currentSize <= tinyScreenReferenceSizePx) {
    return currentSize <= baseSize ? 0.5 : 1;
  }

  if (currentSize <= smallScreenReferenceSizePx) {
    return currentSize <= baseSize ? 0.4 : 1;
  }

  return currentSize <= baseSize ? 0.33 : 1;
}

function onResize() {
  const currentSize = window.innerWidth;
  const fontChangeRate = getFontChangeRate(
    currentSize,
    largeScreenReferenceSizePx
  );
  const fontBaseSizeMultiplier = Math.pow(
    currentSize / largeScreenReferenceSizePx,
    fontChangeRate
  );
  const newFontBaseSize = fontBaseSizeMultiplier * 62.5;
  htmlEl.style.fontSize = `${newFontBaseSize.toFixed(4)}%`;
}

window.addEventListener("resize", onResize);
onResize();

export {};
