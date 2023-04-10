import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './graph.css';
import {
	BarChart,
	ResponsiveContainer,
	Legend, Tooltip,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid
} from 'recharts';

const createPData = (data) => {
	const months = [
		'Jan', 'Feb', 'Mar', 'April', 'May', 'Jun',
		'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
	];
	
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();
	
	const startDate = new Date(currentYear - 1, currentMonth, 1);
	const endDate = new Date(currentYear, currentMonth, 0);
	
	const countsByMonth = {};
	
	data.forEach(obj => {
	const date = new Date(obj.date);
	if (date >= startDate && date <= endDate) {
		const monthName = months[date.getMonth()];
		if (!countsByMonth[monthName]) {
		countsByMonth[monthName] = 0;
		}
		countsByMonth[monthName]++;
	}
	});
	
	const pdata = months.map(monthName => ({
	month: monthName,
	count: countsByMonth[monthName] || 0
	}));

	return pdata;
};

function Graph() {
	const [pdata, setPData] = useState([]);
	useEffect(() => {
		axios.get('https://foss-backend.onrender.com/api/visits')
		  .then(response => {
			setPData(createPData(response.data));
		  })
		  .catch(error => {
			console.error(error);
		  });
	  }, []);
	return (
		<>
			<h1 className="text-heading">
				Bar Chart Using Rechart
			</h1>
			<ResponsiveContainer width="100%" aspect={3}>
				<BarChart data={pdata} margin={{ right: 300 }}>
					<CartesianGrid />
					<XAxis dataKey="month"
						interval={'preserveStartEnd'} />
					<YAxis type="number" domain={[0, 'dataMax']} />
					<Legend />
					<Tooltip />
					<Bar dataKey="count"
						fill="red" />
				</BarChart>
			</ResponsiveContainer>
		</>
	);
}

export default Graph;
