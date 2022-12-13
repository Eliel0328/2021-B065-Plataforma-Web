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

const data = [
    {
        key: '100',
        title: 'Manual de Instalación de Extensión',
        component: <ManualExtension />,
    },
    {
        key: '101',
        title: 'Manual de uso de Extensión Web',
        component: <ManualUsoExtension />,
    },
    { key: '102', title: 'Manual de Registro de Cuenta', component: '' },
    { key: '103', title: 'Manual de Inicio de sesion', component: '' },
    {
        key: '104',
        title: 'Manual de Calificado de Contenido Clasificado',
        component: <ManualCalificadoContenido />,
    },
    {
        key: '105',
        title: 'Manual de Registro de Excepciones y No Permitidas',
        component: <ManualExcepciones />,
    },
    { key: '106', title: 'Manual de Configuraciones del Tutor', component: '' },
];

const Manuales = () => {
    const { Title, Paragraph, Text, Link } = Typography;

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
                        <Typography>
                            <Title className='center'>Manuales</Title>
                        </Typography>

                        {data.map((e) => {
                            return (
                                <div style={{ marginTop: 50 }} key={e.key}>
                                    <Divider />
                                    <Typography>
                                        <Title level={2}>{e.title}</Title>
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
