import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

const backgroundColor = ['aquamarine', 'burlywood', 'firebrick', 'gray'];
const labels = ['Bug/Error', 'Feature Request', 'Security', 'Other'];
const options = {
	maintainAspectRatio: false,
	responsive: false,
};

const TypeChart = () => {
	const [data, setData] = useState({
		labels: labels,
		datasets: [{
			data: [0, 0, 0, 0],
			backgroundColor: backgroundColor,
		}],
	});

	useEffect(() => {
		let bug = 0;
		let feature = 0;
		let security = 0;
		let other = 0;

		axios.get('http://localhost:5000/tickets/')
			.then(res => {
				res.data.forEach(ticket => {
					if (ticket.status !== 'Resolved') {
						switch (ticket.type) {
							case 'Bug/Error':
								bug++;
								break;
							case 'Feature Request':
								feature++;
								break;
							case 'Security':
								security++;
								break;
							case 'Other':
								other++;
								break;
							default:
								break;
						}
					}
				});

				setData({
					labels: labels,
					datasets: [{
						data: [bug, feature, security, other],
						backgroundColor: backgroundColor,
					}],
				});
			})
			.catch(error => console.log(error));
	}, []);

	return (
		<div>
			<Doughnut 
				data={data}
				options={options}
				height={300}
				width={500} 
			/>
		</div>
	);
};

export default TypeChart;
