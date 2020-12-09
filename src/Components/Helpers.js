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

export const createResultItem = (name) => {
  let li = document.createElement('li');
  li.textContent = name;
  li.style = `background-color: ${getColor()}`;
  return li;
};

export const createBestItem = (name) => {
  let div = document.createElement('div');
  div.textContent = name;
  div.className = 'best-score';
  return div;
};

export const onCalculate = (state) => {

  document.querySelector('#results').appendChild(
    createResultItem(
      `Gen ${state.currentGeneration}, Best fitness: ${state.top.fitness}, \n
          x1=${round(state.top.getDna(0)[0])}, x2=${round(
        state.top.getDna(1)[0]
      )}`
    )
  );
  if (state.currentGeneration === state.maxGenerations) {
    const el = document.querySelector('#metadata');
    el.appendChild(createBestItem(`Gen ${state.currentGeneration}`));
    el.appendChild(createBestItem(`Best fitness: ${state.top.fitness}`));
    el.appendChild(
      createBestItem(`
    x1=${round(state.top.getDna(0)[0])}, x2=${round(state.top.getDna(1)[0])}`)
    );
  }

  console.log(
    'Best fitness: ' + state.top.fitness,
    state.top.getDna(0).join(''),
    state.top.getDna(1).join('')
  );
};

export const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (v, k) => start + k);
