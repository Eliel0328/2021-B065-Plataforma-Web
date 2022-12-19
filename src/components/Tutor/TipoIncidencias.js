import React, { useContext, useState } from 'react';
import { Button, Typography, Card } from 'antd';
import { DatePicker } from 'antd';
import alertTopEnd from '../../helpers/alertTopEnd';
import { DashboardContext } from '../../context/DashboardContext';
import { BarChartOutlined } from '@ant-design/icons';
import GraficaTipoIncidencias from './GraficaTipoIncidencias';
import addDays from '../../helpers/addDays';
import disabledDate from '../../helpers/disabledDate';
import '../../css/basicStyle.css';
const { Title } = Typography;

export const TipoIncidencias = () => {
    const { tipoDeIncidencias, getTipoDeIncidenciasPorDia } =
        useContext(DashboardContext);

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
            getTipoDeIncidenciasPorDia(inicial, final);
            setTimeout(() => {
                setData(tipoDeIncidencias);
            }, 1000);
        }
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
                        <Title level={4}>Tipo de Incidencias</Title>
                        <p>
                            Selecciona la fecha para ver el tipo de incidencias
                            registradas durante ese día. Para revisar en profundidad estas
                            incidencias debe ingresar al registro y revisar el registro
                            usando los filtros para la fecha.
                        </p>

                        <DatePicker
                            onChange={onChange}
                            disabledDate={disabledDate}
                            placeholder='Selecciona la fecha'
                        />
                        <Button type='primary' onClick={() => enterLoading()}>
                            Buscar
                        </Button>

                        {data === null ? (
                            <div className='middle-center'>
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
                            new GraficaTipoIncidencias(data).render()
                        )}
                    </center>
                </Card>
            </div>
        </>
    );
};
