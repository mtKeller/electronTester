import React, {useState, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Device from './models/device.model';
import DeviceComponent from './components/device.component';
import * as axios from 'axios';

const testDevice: Device = {
  id: 123,
  ip: '123.123.123.123',
  name: 'TESTER',
  architecture: 'Lidux'
}

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Electron CRUD Test APP</h1>
      </header>
      <div>
      <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
      <DeviceComponent device={testDevice}></DeviceComponent>
    </div>
  );
}

export default App;
