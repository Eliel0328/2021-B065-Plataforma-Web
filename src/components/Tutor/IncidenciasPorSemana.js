import React, { useContext, useEffect, useState } from 'react';
import { Col, Layout, Row, Button, Typography, Card } from 'antd';
import { Component } from 'react';
import Chart from 'react-apexcharts';

import { DatePicker, Space } from 'antd';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import alertTopEnd from '../../helpers/alertTopEnd';
import { DashboardContext } from '../../context/DashboardContext';
import '../../css/basicStyle.css';
import { FileSearchOutlined, FrownOutlined } from '@ant-design/icons';
import GraficaIncidencias from './GraficaIncidencias';
const { Title } = Typography;

const { Header, Content, Footer } = Layout;

export const IncidenciasPorSemana = () => {
    const { incidencias, getIncidencias } = useContext(DashboardContext);

    const [inicial, setIncial] = useState(null);
    const [final, setFinal] = useState(null);
    const [data, setData] = useState(null);


    const enterLoading = () => {
        if (inicial === null || final === null) {
            alertTopEnd(
                'warning',
                'Fechas no seleccionadas',
                'Seleccione las fechas que desea buscar'
            );
        } else {
            getIncidencias(inicial, final);
            setTimeout(() => {
                setData(incidencias);
            }, 1000);
        }
    };

    const addDays = (actual, days) => {
        let aux = new Date(actual);
        aux.setDate(aux.getDate() + days);
        return aux;
    };

    const onChange = (date, dateString) => {
        if (dateString === '') {
            setIncial(null);
            setFinal(null);
        } else {
            let curr = new Date(date._d);
            let first = curr.getDate() - curr.getDay();
            let firstday = new Date(curr.setDate(first));
            let lastday = addDays(firstday, 6);

            setIncial(firstday);
            setFinal(lastday);
        }
    };

    return (
        <>
            <div className='site-card-border-less-wrapper'>
                <Card
                    bordered={false}
                    style={{
                        width: 800,
                        minHeight: 500,
                    }}
                >
                    <center>
                        <Title level={4}>Incidencias</Title>
                        <p>
                            Seleccion una semana para ver las incidencias registradas
                            durante esa semana
                        </p>

                        <DatePicker
                            onChange={onChange}
                            picker='week'
                            placeholder='Selecciona la semana'
                        />
                        <Button
                            type='primary'
                            onClick={() => enterLoading()}
                        >
                            Buscar
                        </Button>

                        {data === null ? (
                            <div className='middle-center'>
                                <center>
                                    <Title level={5}>Buscar Incidencias por semana</Title>
                                    <FileSearchOutlined
                                        style={{
                                            fontSize: '100px',
                                            color: '#08c',
                                            marginTop: 25,
                                        }}
                                    />
                                </center>
                            </div>
                        ) : (
                            new GraficaIncidencias(data).render()
                        )}
                    </center>
                </Card>
            </div>
        </>
    );
};
