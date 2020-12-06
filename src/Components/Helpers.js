export const getRandomInt = (max) =>
  Math.floor(Math.random() * Math.floor(max));

export const getRandomArbitrary = (min, max) =>
  Math.random() * (max - min) + min;

export const getColor = () =>
  'hsl(' +
  360 * Math.random() +
  ',' +
  (25 + 70 * Math.random()) +
  '%,' +
  (85 + 10 * Math.random()) +
  '%)';

export const round = (num) =>
  Math.round((num + Number.EPSILON) * 10000) / 10000;
