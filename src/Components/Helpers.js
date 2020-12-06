export const getRandomInt = (max) =>
  Math.floor(Math.random() * Math.floor(max));

export const getRandomArbitrary = (min, max) =>
  Math.random() * (max - min) + min;
