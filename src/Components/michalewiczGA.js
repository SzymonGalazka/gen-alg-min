import { onCalculate } from './Helpers';
const genie = require('@adrianperea/genie.js');
const { Simulation, Individual, Chromosome } = genie;

const michalewiczGA = (
  target,
  testedFun,
  x1boundary,
  x2boundary,
  settings,
  setBestGen
) => {
  document.querySelector('#results').innerHTML = '';
  class GlobalMinFinder extends Simulation {
    calculateFitness(individual, data) {
      const fitness = data.testedFun(
        individual.getDna(0)[0],
        individual.getDna(1)[0],
        10
      );
      return fitness / data.target;
    }

    shouldFinish(top) {
      return top.fitness >= 0.9999 && top.fitness <= 1.0001;
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
    selection: genie.ga.Selection.rouletteWheel,
    crossover: genie.ga.Crossover.multipoint,
    onCalculateFitness(state) {
      onCalculate(state);
      if (!state.history.some((top) => top.topFitness === state.top.fitness)) {
        setBestGen((arr) => [...arr, state.top]);
      }
    },
  };

  const sim = new GlobalMinFinder(config);
  sim.start();
};

export default michalewiczGA;
