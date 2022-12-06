import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class GraficaIncidencias extends Component {
    constructor(props) {
        super(props);

        this.updateCharts = this.updateCharts.bind(this);

        this.state = {
            options: {
                chart: {
                    id: 'incidecias-por-semana',
                    height: 350,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    },
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val;
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ['#304758'],
                    },
                },
                xaxis: {
                    // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
                    categories: this.props.dias,
                    position: 'bottom',
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            },
                        },
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
            },
            series: [
                {
                    name: 'Incidencias',
                    data: this.props.data,
                },
            ],
        };
    }
    updateCharts() {
        const max = 90;
        const min = 30;
        const newMixedSeries = [];
        const newBarSeries = [];

        this.state.seriesMixedChart.forEach((s) => {
            const data = s.data.map(() => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            });
            newMixedSeries.push({ data: data, type: s.type });
        });

        this.state.seriesBar.forEach((s) => {
            const data = s.data.map(() => {
                return Math.floor(Math.random() * (180 - min + 1)) + min;
            });
            newBarSeries.push({ data, name: s.name });
        });

        this.setState({
            seriesMixedChart: newMixedSeries,
            seriesBar: newBarSeries,
            seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50],
        });
    }

    render() {
        return (
            <div className='App'>
                <div className='row'>
                    <div className='mixed-chart'>
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type='bar'
                            width='500'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default GraficaIncidencias;
