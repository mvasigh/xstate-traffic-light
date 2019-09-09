import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';
import './styles.css';

const trafficMachine = Machine({
  id: 'traffic',
  initial: 'red',
  states: {
    red: {
      on: { TIMER: 'green' }
    },
    yellow: {
      on: { TIMER: 'red' }
    },
    green: {
      on: { TIMER: 'yellow' }
    }
  }
});

function TrafficLight({ activeColor }) {
  return (
    <svg width="100" height="300" viewBox="0 0 100 300">
      <rect width="100%" height="100%" fill="#212121" />
      <circle
        r="40"
        cx="50"
        cy="50"
        fill={activeColor === 'red' && activeColor}
      />
      <circle
        r="40"
        cx="50"
        cy="150"
        fill={activeColor === 'yellow' && activeColor}
      />
      <circle
        r="40"
        cx="50"
        cy="250"
        fill={activeColor === 'green' && activeColor}
      />
    </svg>
  );
}

function App() {
  const [current, send] = useMachine(trafficMachine);

  useEffect(() => {
    const timer = setInterval(() => send('TIMER'), 10000);
    return () => clearInterval(timer);
  });

  return (
    <div className="App">
      <h1>XState Traffic Light</h1>
      <p>
        <small>Traffic light changes every 10 seconds</small>
      </p>
      <TrafficLight activeColor={current.value} />
      <p>Current state:</p>
      <pre>{JSON.stringify(current, null, 2)}</pre>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
