import React, { useState } from 'react';
import { Button, Card, Col, Image, Layout, message, Row, Steps, Typography } from 'antd';
import ManualExtension from './Manuales/ManualExtension';

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

                        <div>
                            <Typography>
                                <Title level={2}>Instalación de Extensión</Title>
                            </Typography>
                            <ManualExtension></ManualExtension>
                        </div>
                    </div>
                </Card>
            </Layout>
        </>
    );
};

export default Manuales;
