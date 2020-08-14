import React from 'react';

import Chart from 'react-apexcharts';
class AnalysisPaper extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					name: 'Your Marks',
					data: props.user
				},
				{
					name: 'Avg Marks',
					data: props.avg
				},
				{
					name: 'Highest Marks',
					data: props.high
				}
			],
			options: {
				chart: {
					type: 'bar',
					height: 350,
					toolbar : {
						show : false
					}
				},
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '55%',
						endingShape: 'flat'
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					show: true,
					width: 2,
					colors: [ 'transparent' ]
				},
				xaxis: {
					categories: [ 'Physics', 'Chemistry', 'Maths', 'Overall' ]
				},
				yaxis: {
					title: {
						text: 'Marks'
					}
				},
				fill: {
					opacity: 1
				},
				tooltip: {
					y: {
						formatter: function(val) {
							return val;
						}
					}
				}
			}
		};
	}

	render() {
		return (
			<div id="chart">
				<Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
			</div>
		);
	}
}

export default AnalysisPaper;
