import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class GraficaTipoIncidencias extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'tipos-de-incidencias',
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
                    categories: this.props.etiquetas,
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
                    // data: [30, 40, 45, 50, 49, 60, 70, 91]
                    data: this.props.data,
                },
            ],
        };
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

export default GraficaTipoIncidencias;
