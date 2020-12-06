import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Main.css';
const genie = require('@adrianperea/genie.js');
const { Simulation, Individual, Chromosome } = genie;

const Main = () => {
  const [fun, setFun] = useState('mcCormick');
  const options = ['mcCormick', 'two', 'three'];

  const runAlgorithm = (funName) => {
    if (funName === options[0]) computeWithGA(-1.9133, mcCormick);
  };

  const mcCormick = (x1, x2) =>
    Math.sin(x1 + x2) + (x1 - x2) * (x1 - x2) + 1.0 + 2.5 * x2 - 1.5 * x1;

  const createResultItem = (name) => {
    let li = document.createElement('li');
    li.textContent = name;
    return li;
  };

  const computeWithGA = (target, testedFun) => {
    document.querySelector('#results').innerHTML = '';
    class GlobalMinFinder extends Simulation {
      calculateFitness(individual, data) {
        const fitness = data.testedFun(
          individual.getDna(0)[0],
          individual.getDna(1)[0]
        );
        return fitness / data.target;
      }

      shouldFinish(top) {
        return top.fitness === 1;
      }
    }

    // Randomly create a character from the ASCII Table
    const generate = (min, max) => {
      const x = Math.random() * (max - min) + min;
      return x;
    };

    // Create our chromosome
    // We can leave out mutate to use the default implementation.
    // The default implementation will call generate() on each gene
    // if the random variable is less than the provided mutation rate
    const x1 = new Chromosome(1, () => generate(-1.5, 4));
    const x2 = new Chromosome(1, () => generate(-3, 4));
    // Compose our individual
    const individual = new Individual([x1, x2]);

    const config = {
      prototype: individual,
      data: { target, testedFun },
      mutationRate: 0.5,
      popSize: 100,
      numParents: 10,
      maxGenerations: 100,
      selection: genie.ga.Selection.stochasticUniversalSampling,
      crossover: genie.ga.Crossover.uniform,
      onCalculateFitness(state) {
        console.log(state);
        document.querySelector('#results').appendChild(
          createResultItem(
            `Gen ${state.currentGeneration}, Fitness: ${state.top.fitness}, \n
              [${state.top.getDna(0)},${state.top.getDna(1)}]`
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

  return (
    <div className='main'>
      <div className='row'>
        <div>Select function</div>
        <Dropdown
          options={options}
          onChange={(option) => setFun(option.value)}
          value={fun}
          placeholder='Select function'
        />
      </div>
      <div className='row'>
        <button onClick={() => runAlgorithm(fun)}>Run algorithm</button>
      </div>
      <ul className='results' id='results'></ul>
    </div>
  );
};

export default Main;
