import React, {useState, useEffect} from 'react';
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

function App() {
  // let deviceList: Array<Device> = [testDevice];
  const devices = [ ];
  const [deviceList, setDeviceList] = useState(devices);

  function getRecordsList() {
    axios.get('http://localhost:4333/record')
    .then((response: any) => {
      setDeviceList(response.data);
    })
  }

  useEffect(() => {
    getRecordsList();
  })

  const [newDeviceId, setNewDeviceId] = useState(0);

  function handleIdField(e) {
		let newNumber = Number(e.target.value);
		if (newNumber) {
			setNewDeviceId(newNumber);
		} else {
			setNewDeviceId(newDeviceId);
		}
	}

  function addToRecordList() {
    let newerId = document.getElementById('newId') as HTMLInputElement;
          let newerIdValue = Number(newerId.value);
          let newerName = document.getElementById('newName') as HTMLInputElement;
          let newerNameValue = newerName.value;
          let newerIp = document.getElementById('newIp') as HTMLInputElement;
          let newerIpValue = newerIp.value;
          let newerArchitecture = document.getElementById('newArchitecture') as HTMLInputElement;
          let newerArchitectureValue = newerArchitecture.value;

          if (newerIdValue !== 0 &&
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
                    setNewDeviceId(0);
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
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Electron CRUD Test APP</h1>
      </header>
      <div>
        <button onClick={getRecordsList}> REFRESH
        </button>
      </div>
      <h3>Devices</h3>
      {
        deviceList.map((device: Device, i: number) => {
          return (<DeviceComponent device={device}></DeviceComponent>) 
        })
      }
      <div>
        <h3>Add New Device</h3>
        <label htmlFor="newId">ID: </label>
        <input id="newId" type="text" value={newDeviceId} onChange={handleIdField}/>
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
        <button onClick={addToRecordList}>Submit</button>
      </div>
    </div>
  );
}

export default App;
