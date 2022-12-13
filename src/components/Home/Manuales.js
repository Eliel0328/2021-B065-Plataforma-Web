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
                        <div style={{ marginTop: 50 }}>
                        <Divider />
                            <Typography>
                                <Title level={2}>
                                    Manual de Instalación de Extensión
                                </Title>
                            </Typography>
                            <ManualExtension />
                        </div>
                        <div style={{ marginTop: 50 }}>
                        <Divider />
                            <Typography>
                                <Title level={2}>Manual de uso de Extensión Web</Title>
                            </Typography>
                            <ManualUsoExtension />
                        </div>
                    </div>
                </Card>
            </Layout>
        </>
    );
};

export default Manuales;
