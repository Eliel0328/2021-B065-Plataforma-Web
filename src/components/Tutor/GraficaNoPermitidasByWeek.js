import React, { useContext, useState } from 'react';
import { Col, Layout, Row, Button, Typography, Card } from 'antd';
import dayjs from 'dayjs';

import { DatePicker, Space } from 'antd';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import alertTopEnd from '../../helpers/alertTopEnd';
import { DashboardContext } from '../../context/DashboardContext';
import '../../css/basicStyle.css';
import { BarChartOutlined } from '@ant-design/icons';
const { Title } = Typography;

const { Header, Content, Footer } = Layout;

export const GraficaNoPermitidasByWeek = () => {
    const { tipoDeIncidencias, getSitiosNoPermitidos } = useContext(DashboardContext);

    const [inicial, setIncial] = useState(null);
    const [final, setFinal] = useState(null);

    const [loadings, setLoadings] = useState(false);

    const enterLoading = () => {
        if (inicial === null || final === null) {
            alertTopEnd(
                'warning',
                'Fechas no seleccionadas',
                'Seleccione las fechas que desea buscar'
            );
        } else {
            setLoadings(true);
            getSitiosNoPermitidos(inicial, final);
            setTimeout(() => {
                setLoadings(false);
            }, 1000);
        }
    };

    const addDays = (actual, days) => {
        let aux = new Date(actual);
        aux.setDate(aux.getDate() + days);
        return aux;
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);

        if (dateString === '') {
            setIncial(null);
            setFinal(null);
        } else {
            let curr = new Date(date._d);
            let first = curr.getDate() - curr.getDay();
            let firstday = new Date(curr.setDate(first));
            let lastday = addDays(firstday, 6);

            console.log(firstday);
            console.log(lastday);

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
                        width: 400,
                        minHeight: 500,
                    }}
                >
                    <center>
                        <Title level={4}>Sitios no Permitidos</Title>
                        <p>
                            Seleccion la fecha para ver el tipo de incidencias registradas
                            durante ese dia. Para revisar en profunidad estas incidencias
                            debe ingresar al registro y revisar el registro usando los
                            filtros para la fecha.
                        </p>

                        <DatePicker
                            onChange={onChange}
                            picker='week'
                            placeholder='Selecciona la fecha'
                        />
                        <Button
                            type='primary'
                            loading={loadings}
                            onClick={() => enterLoading()}
                        >
                            Buscar
                        </Button>

                        {tipoDeIncidencias === null ? (
                            <div className=''>
                                <center>
                                    <Title level={5}>Buscar Tipo de Incidencias</Title>
                                    <BarChartOutlined
                                        style={{
                                            fontSize: '100px',
                                            color: '#08c',
                                            marginTop: 25,
                                        }}
                                    />
                                </center>
                            </div>
                        ) : (
                            <VictoryChart
                                // domainPadding will add space to each side of VictoryBar to
                                // prevent it from overlapping the axis
                                domainPadding={20}
                            >
                                <VictoryAxis
                                // tickValues specifies both the number of ticks and where
                                // they are placed on the axis
                                />
                                <VictoryAxis
                                    dependentAxis
                                    // tickFormat specifies how ticks should be displayed
                                    tickFormat={(x) => `${x}`}
                                />
                                <VictoryBar data={tipoDeIncidencias} x='dia' y='data' />
                            </VictoryChart>
                        )}
                    </center>
                </Card>
            </div>
        </>
    );
};
