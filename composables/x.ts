export const translateX = (index: number, x = 100) =>
  Math.sin((Math.PI / 180) * (index + Math.floor(index / 6) * 0.5) * 60) *
  (x / 3 + Math.floor(index / 6) * (x / 12));

export const rotateX = (index: number, x = 1) =>
  parseFloat((Math.cos((Math.PI / 3.0) * (index + 3)) * x).toFixed(3));
