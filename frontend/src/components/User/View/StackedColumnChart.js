import React from 'react';
import Chart from 'react-apexcharts';
class StackedColumnChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					name: 'Correctly Answered',
					data: props.correctAnswered
				},
				{
					name: 'Wrongly Answered',
					data: props.wrongAnswered
				}
				// {
				// 	name: 'PRODUCT C',
				// 	data: [ 11, 17, 15, 15, 21, 14, 15, 13 ]
				// }
			],
			options: {
				chart: {
					type: 'bar',
					height: 350,
					stacked: true,
					stackType: '100%'
				},
				responsive: [
					{
						breakpoint: 480,
						options: {
							legend: {
								position: 'bottom',
								offsetX: -10,
								offsetY: 0
							}
						}
					}
				],
				xaxis: {
					categories: props.tagName
				},
				fill: {
					opacity: 1
				},
				legend: {
					position: 'right',
					offsetX: 0,
					offsetY: 50
				}
			}
		};
	}

	render() {
		return (
			<div id="chart">
				<h3>{this.props.subjectName}</h3>
				<Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
			</div>
		);
	}
}

export default StackedColumnChart;
