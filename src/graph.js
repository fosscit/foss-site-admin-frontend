import React from 'react';
import './graph.css';
import {
	LineChart,
	ResponsiveContainer,
	Legend, Tooltip,
	Line,
	XAxis,
	YAxis,
	CartesianGrid
} from 'recharts';

// Sample chart data
const pdata = [
	{
		month: 'Jan',
		count: 11,
	},
	{
		month: 'Feb',
		count: 5,
	},
	{
		month: 'Mar',
		count: 7,
	},
	{
		month: 'April',
		count: 18,
	},
	{
		month: 'May',
		count: 4,
	},
	{
		month: 'Jun',
		count: 13,
	},
	{
		month: 'July',
		count: 16,
	},
	{
		month: 'Aug',
		count: 21,
	},
	{
		month: 'Sept',
		count: 25,
	},
	{
		month: 'Nov',
		count: 19,
	},
	{
		month: 'Dec',
		count: 33,
	},
];

function App() {
	return (
		<>
			<h1 className="text-heading">
				Line Chart Using Rechart
			</h1>
			<ResponsiveContainer width="100%" aspect={3}>
				<LineChart data={pdata} margin={{ right: 300 }}>
					<CartesianGrid />
					<XAxis dataKey="month"
						interval={'preserveStartEnd'} />
					<YAxis></YAxis>
					<Legend />
					<Tooltip />
					<Line dataKey="count"
						stroke="red" activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}

export default App;
