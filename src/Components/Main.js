import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Main.css';
import mcCormickGA from './mcCormickGA';

const Main = () => {
  const [fun, setFun] = useState('mcCormick');
  const [cormickX1, setCormickX1] = useState([-1.5, 4]);
  const [cormickX2, setCormickX2] = useState([-3, 4]);
  const [settings, setSettings] = useState({
    mutationRate: 0.3,
    popSize: 100,
    numParents: 2,
    maxGenerations: 100,
    elitism: true,
  });
  const options = ['mcCormick', 'two', 'three'];

  const runAlgorithm = () => {
    if (fun === options[0])
      mcCormickGA(-1.9133, mcCormick, cormickX1, cormickX2, settings);
  };
  const mcCormick = (x1, x2) =>
    Math.sin(x1 + x2) + (x1 - x2) * (x1 - x2) + 1.0 + 2.5 * x2 - 1.5 * x1;

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
      <div className='settings'>
        <label>
          Mutation rate
          <input
            type='number'
            value={settings.mutationRate}
            onChange={(e) =>
              setSettings({ ...settings, mutationRate: e.target.value })
            }
          />
        </label>
        <label>
          Population size
          <input
            type='number'
            value={settings.popSize}
            onChange={(e) =>
              setSettings({ ...settings, popSize: e.target.value })
            }
          />
        </label>
        <label>
          Number of parents
          <input
            type='number'
            value={settings.numParents}
            onChange={(e) =>
              setSettings({ ...settings, numParents: e.target.value })
            }
          />
        </label>
        <label>
          Max generations
          <input
            type='number'
            value={settings.maxGenerations}
            onChange={(e) =>
              setSettings({ ...settings, maxGenerations: e.target.value })
            }
          />
        </label>
      </div>
      <div className='row'>
        <button onClick={() => runAlgorithm()}>Run algorithm</button>
      </div>
      <ul className='results' id='results'></ul>
    </div>
  );
};

export default Main;
