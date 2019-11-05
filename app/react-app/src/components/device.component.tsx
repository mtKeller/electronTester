import React, { useState } from 'react';
import Device from '../models/device.model';

interface deviceProps{
	device: Device;
}

class DeviceComponent extends React.Component<deviceProps, {}>{
	render() {
		const { device } = this.props;
    return (
			<div>
				<span>
					{device.id}
				</span>
				<span>
					{device.name}
				</span>
				<span>
					{device.ip}
				</span>
				<span>
					{device.architecture}
				</span>
			</div>
		)
	};
}

export default DeviceComponent;
