export const translateY = (index: number, y = 100) =>
  Math.cos((Math.PI / 180) * (index + 0.5 + Math.floor(index / 6) * 0.5) * 60) *
  (y / 3 + Math.floor(index / 6) * (y / 4));

export const rotateY = (index: number, y = 1.0) =>
  parseFloat((Math.sin((Math.PI / 3.0) * (index + 6)) * y).toFixed(3));
