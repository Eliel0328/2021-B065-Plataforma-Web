import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class GraficaNoPermitidas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'no-permitidas',
                    height: 380,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                            position: 'bottom',
                        },
                    },
                },
                colors: this.props.colores,
                dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    style: {
                        colors: ['#fff'],
                    },
                    formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
                    },
                    offsetX: 0,
                    dropShadow: {
                        enabled: true,
                    },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff'],
                },
                xaxis: {
                    categories: this.props.categoria,
                },
                yaxis: {
                    labels: {
                        show: false,
                    },
                },
                tooltip: {
                    theme: 'dark',
                    x: {
                        show: false,
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return '';
                            },
                        },
                    },
                },
            },
            series: [
                {
                    // data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
                    // name: 'Incidencias',
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

export default GraficaNoPermitidas;
