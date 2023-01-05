import React, { useContext, useState } from 'react';
import { Button, Typography, Card } from 'antd';
import { DatePicker } from 'antd';
import alertTopEnd from '../../helpers/alertTopEnd';
import { DashboardContext } from '../../context/DashboardContext';
import { FieldTimeOutlined } from '@ant-design/icons';
import GraficaTiempoDeConexion from './GraficaTiempoDeConexion';
import addDays from '../../helpers/addDays';
import disabledDate from '../../helpers/disabledDate';
import '../../css/basicStyle.css';
const { Title } = Typography;

export const TiempoDeConexion = () => {
    const { tiempoDeConexion, getTiempoDeConexion } = useContext(DashboardContext);

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
            getTiempoDeConexion(inicial, final);
            setTimeout(() => {
                setData(tiempoDeConexion);
            }, 1000);
        }
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
                        <Title level={4}>Tiempo de Conexion</Title>
                        <p>
                            Selecciona para revisar el tiempo de conexión semanal de la
                            extensión.
                        </p>

                        <DatePicker
                            onChange={onChange}
                            picker='week'
                            disabledDate={disabledDate}
                            placeholder='Selecciona la fecha'
                        />
                        <Button type='primary' onClick={() => enterLoading()}>
                            Buscar
                        </Button>

                        {data === null ? (
                            <div className='middle-center'>
                                <center>
                                    <Title level={5}>Buscar Tiempo de Conexión</Title>
                                    <FieldTimeOutlined
                                        style={{
                                            fontSize: '100px',
                                            color: '#08c',
                                            marginTop: 25,
                                        }}
                                    />
                                </center>
                            </div>
                        ) : (
                            new GraficaTiempoDeConexion(data).render()
                        )}
                    </center>
                </Card>
            </div>
        </>
    );
};
