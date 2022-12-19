import React, { useState } from 'react';
import {
    Button,
    Card,
    Col,
    Divider,
    Image,
    Layout,
    message,
    Row,
    Steps,
    Typography,
} from 'antd';
import ManualExtension from './Manuales/ManualExtension';
import ManualUsoExtension from './Manuales/ManualUsoExtension';
import ManualCalificadoContenido from './Manuales/ManualCalificadoContenido';
import ManualExcepciones from './Manuales/ManualExcepciones';
import ManualTutor from './Manuales/ManualTutor';
import ManualRegistroCuenta from './Manuales/ManualRegistroCuenta';
import ManualInicioSesion from './Manuales/ManualInicioSesion';

const data = [
    {
        key: 0,
        title: 'Instalación de Extensión',
        component: <ManualExtension />,
    },
    {
        key: 1,
        title: 'Uso de Extensión Web',
        component: <ManualUsoExtension />,
    },
    {
        key: 2,
        title: 'Registro de Cuenta',
        component: <ManualRegistroCuenta />,
    },
    {
        key: 3,
        title: 'Inicio de Sesión',
        component: <ManualInicioSesion />,
    },
    {
        key: 4,
        title: 'Calificado de Contenido Clasificado',
        component: <ManualCalificadoContenido />,
    },
    {
        key: 5,
        title: 'Registro de Excepciones y No Permitidas',
        component: <ManualExcepciones />,
    },
    {
        key: 6,
        title: 'Configuraciones del Tutor',
        component: <ManualTutor />,
    },
];

const Manuales = () => {
    const { Title, Paragraph, Text, Link } = Typography;

    const [manuales, setManuales] = useState([
        true,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

    const setManualesFalse = () => {
        return [false, false, false, false, false, false, false];
    };

    const onPressClick = (noManual) => {
        let aux = setManualesFalse();
        aux[noManual] = true;
        setManuales(aux);
    };

    return (
        <>
            <Layout className='center'>
                <Card
                    style={{
                        width: '70%',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 380,
                        }}
                    >
                        <Typography id='Manual'>
                            <Title className='center'>Manuales</Title>
                        </Typography>
                        <div className='center'>
                            <Title level={5} style={{ textAlign: 'center' }}>
                                Es importante revisar la información disponible en cada
                                uno de los manuales o segmentos de información para un
                                mejor manejo del sistema.
                            </Title>
                        </div>
                        <Divider />

                        <div
                            style={{ display: 'flex', flexWrap: 'wrap' }}
                            className='center'
                        >
                            {data.map((e, index) => {
                                return (
                                    <div>
                                        <Button
                                            className='mg-10'
                                            type={manuales[index] ? 'primary' : 'ghost'}
                                            onClick={() => onPressClick(index)}
                                        >
                                            {e.title}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                        {data.map((e, index) => {
                            return (
                                <div
                                    key={e.key}
                                    className={manuales[index] ? '' : 'd-none'}
                                >
                                    <Divider />
                                    <Typography className='center'>
                                        <Title level={2}>Manual de {e.title}</Title>
                                    </Typography>
                                    {e.component}
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </Layout>
        </>
    );
};

export default Manuales;
