import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Main.css';
import { getColor, round } from './Helpers';
const genie = require('@adrianperea/genie.js');
const { Simulation, Individual, Chromosome } = genie;

const Main = () => {
  const [fun, setFun] = useState('mcCormick');
  const [cormickX1, setCormickX1] = useState([-1.5, 4]);
  const [cormickX2, setCormickX2] = useState([-3, 4]);
  const options = ['mcCormick', 'two', 'three'];

  const runAlgorithm = () => {
    if (fun === options[0])
      computeWithGA(-1.9133, mcCormick, cormickX1, cormickX2);
  };

  const mcCormick = (x1, x2) =>
    Math.sin(x1 + x2) + (x1 - x2) * (x1 - x2) + 1.0 + 2.5 * x2 - 1.5 * x1;

  const createResultItem = (name) => {
    let li = document.createElement('li');
    li.textContent = name;
    li.style = `background-color: ${getColor()}`;
    return li;
  };

  const computeWithGA = (target, testedFun, x1boundary, x2boundary) => {
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
    const generate = (min, max) => {
      const x = Math.random() * (max - min) + min;
      return x;
    };

    const x1 = new Chromosome(1, () =>
      generate(parseInt(x1boundary[0]), parseInt(x1boundary[1]))
    );
    const x2 = new Chromosome(1, () =>
      generate(parseInt(x2boundary[0]), parseInt(x2boundary[1]))
    );
    const individual = new Individual([x1, x2]);
    const config = {
      prototype: individual,
      data: { target, testedFun },
      mutationRate: 0.3,
      popSize: 100,
      numParents: 2,
      maxGenerations: 100,
      elitism: true,
      selection: genie.ga.Selection.rouletteWheel,
      crossover: genie.ga.Crossover.multipoint,
      onCalculateFitness(state) {
        console.log(state);
        document.querySelector('#results').appendChild(
          createResultItem(
            `Gen ${state.currentGeneration},\n Best Fitness: ${
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

  return (
    <div className='main'>
      <div className='row'>
        {console.log(cormickX1)}
        <h2>Select function</h2>
        <Dropdown
          options={options}
          onChange={(option) => setFun(option.value)}
          value={fun}
          placeholder='Select function'
        />
      </div>
      <div className='row'>
        <h3>Domain</h3>
        {fun === 'mcCormick' && (
          <>
            <label>
              x1
              <input
                type='number'
                value={cormickX1[0]}
                onChange={(e) => setCormickX1([e.target.value, cormickX1[1]])}
              />
              <input
                type='number'
                value={cormickX1[1]}
                onChange={(e) => setCormickX1([cormickX1[0], e.target.value])}
              />
            </label>
            <label>
              x2
              <input
                type='number'
                value={cormickX2[0]}
                onChange={(e) => setCormickX2([e.target.value, cormickX2[0]])}
              />
              <input
                type='number'
                value={cormickX2[1]}
                onChange={(e) => setCormickX2([cormickX2[0], e.target.value])}
              />
            </label>
          </>
        )}
      </div>
      <div className='row'>
        <button onClick={() => runAlgorithm()}>Run algorithm</button>
      </div>
      <ul className='results' id='results'></ul>
    </div>
  );
};

export default Main;
