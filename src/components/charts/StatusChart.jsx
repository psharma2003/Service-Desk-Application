import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

const labels = ['Open', 'In Progress', 'Resolved'];
const backgroundColor = ['gold', 'cornflowerblue', 'darkslategray'];
const options = {
	maintainAspectRatio: false,
	responsive: false,
};

const StatusChart = () => {
	const [data, setData] = useState({
		datasets: [{
			data: [0, 0, 0],
			backgroundColor: backgroundColor,
		}],
		labels: labels,
	});

	useEffect(() => {
		let open = 0;
		let progress = 0;
		let resolved = 0;

		axios.get('http://localhost:5000/tickets/')
			.then(res => {
				res.data.forEach(ticket => {
					switch(ticket.status) {
						case 'Open': 
							open++;
							break;
						case 'In Progress':
							progress++;
							break;
						case 'Resolved':
							resolved++;
							break;
						default:
							break;
					}
				});

				setData({
					datasets: [{
						data: [open, progress, resolved],
						backgroundColor: backgroundColor,
					}],
					labels: labels,
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

export default StatusChart;
