import React, { useContext, useState } from 'react';
import { Button, Typography, Card } from 'antd';

import { DatePicker } from 'antd';
import alertTopEnd from '../../helpers/alertTopEnd';
import { DashboardContext } from '../../context/DashboardContext';
import { CloseCircleOutlined, SecurityScanOutlined } from '@ant-design/icons';
import GraficaNoPermitidas from './GraficaNoPermitidas';
import addDays from '../../helpers/addDays';
import disabledDate from '../../helpers/disabledDate';
import '../../css/basicStyle.css';
const { Title } = Typography;

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
                            Selecciona la fecha para ver las visitas a sitios no
                            permitidos por día. Los sitios aquí mostrados son los que se
                            registraron en la sección de Excepciones.
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
                            <div className=''>
                                <center>
                                    <Title level={5}>Buscar Visitas a Sitios No Permitidos</Title>
                                    <CloseCircleOutlined
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
