import React, { useContext, useState } from 'react';
import { Col, Layout, Row, Button, Typography, Card } from 'antd';
import dayjs from 'dayjs';

import { DatePicker, Space } from 'antd';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import alertTopEnd from '../../helpers/alertTopEnd';
import { DashboardContext } from '../../context/DashboardContext';
import '../../css/basicStyle.css';
import { BarChartOutlined } from '@ant-design/icons';
import GraficaNoPermitidas from './GraficaNoPermitidas';
const { Title } = Typography;

const { Header, Content, Footer } = Layout;

export const NoPermitidasPorSemana = () => {
    const { noPermitidas, getSitiosNoPermitidos } = useContext(DashboardContext);

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
            getSitiosNoPermitidos(inicial, final);
            setTimeout(() => {
                setData(noPermitidas);
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
            let firstday = new Date(date._d);
            let lastday = addDays(firstday, 1);
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
                        <Title level={4}>Sitios no Permitidos</Title>
                        <p>
                            Seleccion la fecha para ver el tipo de incidencias registradas
                            durante ese dia. Para revisar en profunidad estas incidencias
                            debe ingresar al registro y revisar el registro usando los
                            filtros para la fecha.
                        </p>

                        <DatePicker
                            onChange={onChange}
                            placeholder='Selecciona la fecha'
                        />
                        <Button type='primary' onClick={() => enterLoading()}>
                            Buscar
                        </Button>

                        {data === null ? (
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
                            new GraficaNoPermitidas(data).render()
                        )}
                    </center>
                </Card>
            </div>
        </>
    );
};
