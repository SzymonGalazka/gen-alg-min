import {
  round,
  createBestItem,
  createResultItem,
  onCalculate,
} from './Helpers';
const genie = require('@adrianperea/genie.js');
const { Simulation, Individual, Chromosome } = genie;

const bochachevskyGA = (
  target,
  testedFun,
  x1boundary,
  x2boundary,
  settings
) => {
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
      if (top.fitness >= 0.9999 && top.fitness <= 1.0001) {
        return true;
      }
      return false;
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
    optimizer: genie.ga.Optimizer.maximizer,
    numParents: parseFloat(settings.numParents),
    maxGenerations: parseFloat(settings.maxGenerations),
    elitism: settings.elitism,
    selection: genie.ga.Selection.rouletteWheel,
    crossover: genie.ga.Crossover.multipoint,
    onCalculateFitness(state) {
      onCalculate(state);
    },
  };

  const sim = new GlobalMinFinder(config);
  sim.start();
};

export default bochachevskyGA;
