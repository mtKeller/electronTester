import React, {useState, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Device from './models/device.model';
import DeviceComponent from './components/device.component';
const axios = require('axios');

const testDevice: Device = {
  id: 123,
  ip: '123.123.123.123',
  name: 'TESTER',
  architecture: 'Lidux'
}

const App: React.FC = () => {
  // let deviceList: Array<Device> = [testDevice];
  const devices = [ testDevice ];
  const [deviceList, setDeviceList] = useState(devices);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Electron CRUD Test APP</h1>
      </header>
      <div>
        <button onClick={ () =>
          axios.get('http://localhost:4333/record')
            .then((response: any) => {
              setDeviceList(response.data);
            })}> REFRESH
        </button>
      </div>
      <div>
        <span>
          ID
        </span>
        <span>
          NAME
        </span>
        <span>
          IP ADDRESS
        </span>
        <span>
          ARCHITECTURE
        </span>
      </div>
      {deviceList.map((device: Device, i: number) => {
        return (<DeviceComponent device={device}></DeviceComponent>) 
      })}
      <div>
        <h3>New Device</h3>
        <label htmlFor="newId">ID: </label>
        <input id="newId" type="text"/>
        <br/>
        <label htmlFor="newName">Name: </label>
        <input id="newName" type="text"/>
        <br/>
        <label htmlFor="newIp">IP: </label>
        <input id="newIp" type="text"/>
        <br/>
        <label htmlFor="newArchitecture">Architecture: </label>
        <input id="newArchitecture" type="text"/>
        <br/>
        <button onClick={() => {
          let newerId = document.getElementById('newId') as HTMLInputElement;
          let newerIdValue = newerId.value;
          let newerName = document.getElementById('newName') as HTMLInputElement;
          let newerNameValue = newerName.value;
          let newerIp = document.getElementById('newIp') as HTMLInputElement;
          let newerIpValue = newerIp.value;
          let newerArchitecture = document.getElementById('newArchitecture') as HTMLInputElement;
          let newerArchitectureValue = newerArchitecture.value;

          if (newerIdValue !== '' &&
              newerNameValue !== '' &&
              newerIpValue !== '' &&
              newerArchitectureValue !== '') {
                axios.post('http://localhost:4333/record', {
                  id: newerIdValue,
                  name: newerNameValue,
                  ip: newerIpValue,
                  architecture: newerArchitectureValue
                })
                .then((response: any) => {
                  if(response.data) {
                    newerId.value = '';
                    newerName.value = '';
                    newerIp.value = '';
                    newerArchitecture.value = '';
                  }
                  console.log('TESTER');
                  axios.get('http://localhost:4333/record')
                    .then((response: any) => {
                      console.log('TEST');
                      setDeviceList(response.data);
                    })
                })
          }
        }}>Submit</button>
      </div>
    </div>
  );
}

export default App;
