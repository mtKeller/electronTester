import React, { useState } from 'react';
import Device from '../models/device.model';
const axios = require('axios');

interface deviceProps{
	device: Device;
}

function DeviceComponent (props: deviceProps){
	const { device } = props;
	let [id, setId] = useState(device.id);
	let [name, setName] = useState(device.name);
	let [ip, setIp] = useState(device.ip);
	let [architecture, setArchitecture] = useState(device.architecture);

	function handleIdField(e) {
		let newNumber = Number(e.target.value);
		if (newNumber) {
			setId(newNumber);
		} else {
			setId(id);
		}
	}

	function handleNameField(e) {
		setName(e.target.value);
	}

	function handleIpField(e) {
		setIp(e.target.value);
	}

	function handleArchitectureField(e) {
		setArchitecture(e.target.value);
	}

	function handleUpdate() {
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
						console.log('TESTER', response);
					})
		}
	}

	function handleDeletion() {
		axios.delete('http://localhost:4333/record', { data: device})
					.then((response: any) => {
						console.log('TESTER', response);
					})
	}

	return (
		<div>
			<label htmlFor={device.id + '-field'}>ID: </label>
			<input onChange={handleIdField}
				id={device.id + '-field'} value={id} />
			<br/>
			<label htmlFor={device.name + '-field'}>Name: </label>
			<input onChange={handleNameField}
				id={device.name + '-field'} value={name} />
			<br/>
			<label htmlFor={device.ip + '-field'}>IP: </label>
			<input onChange={handleIpField}
				id={device.ip + '-field'} value={ip} />
			<br/>
			<label htmlFor={device.architecture + '-field'}>Architecture: </label>
			<input onChange={handleArchitectureField}
				id={device.architecture + '-field'} value={architecture} />
			<br/>
			<button onClick={handleUpdate}>Update</button>
			<button onClick={handleDeletion}>Delete</button>
		</div>
	)
};

export default DeviceComponent;
