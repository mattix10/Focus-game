export const drawNumber = function (value) {
  const min = 1;
  const max = value;
  return Math.floor(Math.random() * (max - min) + min);
};
