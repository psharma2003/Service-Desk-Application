import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const labels = ['Low', 'Medium', 'High'];
const barPercentage = '0.5';
const backgroundColor = ['lightgreen', 'moccasin', 'crimson'];
const options = {
	legend: { display: false },
	maintainAspectRatio: false,
	responsive: false,
	scales: {
		yAxes: [{
			ticks: {
				beginAtZero: true,
			},
		}],
	},
};

const PriorityChart = () => {
	const [data, setData] = useState({
		labels: labels,
		datasets: [{
			data: [0, 0, 0],
			barPercentage: barPercentage,
			backgroundColor: backgroundColor,
		}],
	});

	useEffect(() => {
		let low = 0;
		let medium = 0;
		let high = 0;

		axios.get('http://localhost:5000/tickets/')
			.then(res => {
				res.data.forEach(ticket => {
					if (ticket.status !== 'Resolved') {
						switch (ticket.priority) {
							case 'Low':
								low++;
								break;
							case 'Medium':
								medium++;
								break;
							case 'High':
								high++;
								break;
							default:
								break;
						}
					}
				});

				setData({
					labels: labels,
					datasets: [{
						data: [low, medium, high],
						barPercentage: barPercentage,
						backgroundColor: backgroundColor,
					}],
				});
			})
			.catch(error => console.log(error));
	}, []);

	return (
		<div>
			<Bar 
				data={data}
				options={options}
				height={350}
				width={500} 
			/>
		</div>
	);
};

export default PriorityChart;
