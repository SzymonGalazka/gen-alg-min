import { round, getColor } from './Helpers';
const genie = require('@adrianperea/genie.js');
const { Simulation, Individual, Chromosome } = genie;

const createResultItem = (name) => {
  let li = document.createElement('li');
  li.textContent = name;
  li.style = `background-color: ${getColor()}`;
  return li;
};

const eggGA = (target, testedFun, x1boundary, x2boundary, settings) => {
  document.querySelector('#results').innerHTML = '';
  class GlobalMinFinder extends Simulation {
    calculateFitness(individual, data) {
      const fitness = data.testedFun(
        individual.getDna(0)[0],
        individual.getDna(1)[0]
      );
      return 1 / fitness;
    }

    shouldFinish(top) {
      return top.fitness === 1;
    }
  }
  const generate = (min, max) => {
    const x = Math.random() * (max - min) + min;
    return x;
  };

  const x1 = new Chromosome(1, () =>
    generate(parseFloat(x1boundary[0]), parseFloat(x1boundary[1]))
  );
  const x2 = new Chromosome(1, () =>
    generate(parseFloat(x2boundary[0]), parseFloat(x2boundary[1]))
  );
  const individual = new Individual([x1, x2]);
  const config = {
    prototype: individual,
    data: { target, testedFun },
    mutationRate: parseFloat(settings.mutationRate),
    popSize: parseFloat(settings.popSize),
    numParents: parseFloat(settings.numParents),
    maxGenerations: parseFloat(settings.maxGenerations),
    elitism: settings.elitism,
    optimizer: genie.ga.Optimizer.maximizer,
    selection: genie.ga.Selection.rouletteWheel,
    crossover: genie.ga.Crossover.singlePoint,
    onCalculateFitness(state) {
      console.log(state);
      document.querySelector('#results').appendChild(
        createResultItem(
          `Gen ${state.currentGeneration}, Best fitness: ${
            state.top.fitness
          }, \n
              [${round(state.top.getDna(0)[0])},${round(
            state.top.getDna(1)[0]
          )}]`
        )
      );
      console.log(
        'Best fitness: ' + state.top.fitness,
        state.top.getDna(0).join(''),
        state.top.getDna(1).join('')
      );
    },
  };

  const sim = new GlobalMinFinder(config);
  sim.start();
};

export default eggGA;
