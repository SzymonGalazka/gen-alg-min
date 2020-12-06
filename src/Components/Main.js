import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Main.css';
import mcCormickGA from './mcCormickGA';
import eggGA from './eggGA';
import michalewiczGA from './michalewiczGA';

const Main = () => {
  const [fun, setFun] = useState('mcCormick');
  const [cormickX, setCormickX] = useState([-1.5, 4]);
  const [cormickY, setCormickY] = useState([-3, 4]);
  const [eggX, setEggX] = useState([-5, 5]);
  const [eggY, setEggY] = useState([-5, 5]);
  const [michalewiczX, setMichalewiczX] = useState([0, Math.PI]);
  const [michalewiczY, setMichalewiczY] = useState([0, Math.PI]);
  const [settings, setSettings] = useState({
    mutationRate: 0.3,
    popSize: 100,
    numParents: 2,
    maxGenerations: 100,
    elitism: true,
  });
  const options = ['mcCormick', 'eggCrate', 'michalewicz'];

  const runAlgorithm = () => {
    if (fun === options[0])
      mcCormickGA(-1.9133, mcCormick, cormickX, cormickY, settings);
    if (fun === options[1]) eggGA(0.0, eggCrate, eggX, eggY, settings);
    if (fun === options[2])
      michalewiczGA(-1.8013, michalewicz, michalewiczX, michalewiczY, settings);
  };
  const mcCormick = (x, y) =>
    Math.sin(x + y) + (x - y) * (x - y) + 1.0 + 2.5 * y - 1.5 * x;

  const eggCrate = (x, y) =>
    x * x +
    y * y +
    25 * (Math.sin(x) * Math.sin(x) + Math.sin(y) * Math.sin(y));

  const michalewicz = (x, y, m) => {
    let val = 0.0;
    const first = Math.sin((x * x) / Math.PI);
    val += Math.sin(x) * Math.pow(first, 2.0 * m);
    const second = Math.sin((2 * y * y) / Math.PI);
    val += Math.sin(y) * Math.pow(second, 2.0 * m);
    return -val;
  };

  return (
    <div className='main'>
      <div className='row'>
        {console.log(cormickX)}
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
                value={cormickX[0]}
                onChange={(e) => setCormickX([e.target.value, cormickX[1]])}
              />
              <input
                type='number'
                value={cormickX[1]}
                onChange={(e) => setCormickX([cormickX[0], e.target.value])}
              />
            </label>
            <label>
              x2
              <input
                type='number'
                value={cormickY[0]}
                onChange={(e) => setCormickY([e.target.value, cormickY[0]])}
              />
              <input
                type='number'
                value={cormickY[1]}
                onChange={(e) => setCormickY([cormickY[0], e.target.value])}
              />
            </label>
            <h5>
              Ideal fitness = <b>1</b>
            </h5>
          </>
        )}
        {fun === 'eggCrate' && (
          <>
            <label>
              x1
              <input
                type='number'
                value={eggX[0]}
                onChange={(e) => setEggX([e.target.value, eggX[1]])}
              />
              <input
                type='number'
                value={eggX[1]}
                onChange={(e) => setEggX([eggX[0], e.target.value])}
              />
            </label>
            <label>
              x2
              <input
                type='number'
                value={eggY[0]}
                onChange={(e) => setEggY([e.target.value, eggY[0]])}
              />
              <input
                type='number'
                value={eggY[1]}
                onChange={(e) => setEggY([eggY[0], e.target.value])}
              />
            </label>
            <h5>
              Ideal fitness = <b>highest</b>
            </h5>
          </>
        )}
        {fun === 'michalewicz' && (
          <>
            <label>
              x1
              <input
                type='number'
                value={michalewiczX[0]}
                onChange={(e) =>
                  setMichalewiczX([e.target.value, michalewiczX[1]])
                }
              />
              <input
                type='number'
                value={michalewiczX[1]}
                onChange={(e) =>
                  setMichalewiczX([michalewiczX[0], e.target.value])
                }
              />
            </label>
            <label>
              x2
              <input
                type='number'
                value={michalewiczY[0]}
                onChange={(e) =>
                  setMichalewiczY([e.target.value, michalewiczY[0]])
                }
              />
              <input
                type='number'
                value={michalewiczY[1]}
                onChange={(e) =>
                  setMichalewiczY([michalewiczY[0], e.target.value])
                }
              />
            </label>
            <h5>
              Ideal fitness = <b>1</b>
            </h5>
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
        <label>
          Elitism
          <input
            type='checkbox'
            checked={settings.elitism}
            value={settings.elitism}
            name='elitism'
            onChange={(e) =>
              setSettings({ ...settings, elitism: !settings.elitism })
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
