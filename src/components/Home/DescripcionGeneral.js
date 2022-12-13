import React from 'react';
import { Card, Col, Divider, Layout, Row, Typography } from 'antd';

import CarouselGeneral from './General/CarouselGeneral';
import logo from '../../file/logo_1.png';
import '../../css/basicStyle.css';

const DescripcionGeneral = () => {
    const { Title, Paragraph, Text } = Typography;

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
                            <Title className='center'>
                                <img width={100} src={logo} />
                                Vigilantt
                            </Title>
                            <Paragraph
                                style={{
                                    padding: '0 10%',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                ¿Quieres asegurarte de que tus hijos estén protegidos
                                contra el lenguaje ofensivo, agresivo y/o vulgar que
                                comúnmente se utiliza en la red?
                                <br></br>
                                <Text strong>¡Vigilantt puede ayudarte!</Text>
                            </Paragraph>
                            <Divider />
                            <Title level={2}>¿Qué es Vigilantt?</Title>

                            <Paragraph style={{ textAlign: 'justify', fontSize: '16px' }}>
                                Vigilantt es un conjunto de servicios en el que, con
                                simplemente crear una cuenta, instalar nuestra extensión y
                                configurar tu cuenta, estos analizarán las páginas web en
                                las que tu hijo o tutorado este navegando, clasificará
                                dicho contenido entre agresivo, ofensivo y/o vulgar y se
                                te presentará el contenido clasificado de esa manera en
                                nuestra plataforma web.
                            </Paragraph>
                            <Divider />
                            <Row justify='center'>
                                <Col span={25}>
                                    <CarouselGeneral />
                                </Col>
                            </Row>
                            <Divider />
                        </Typography>
                    </div>
                </Card>
            </Layout>
        </>
    );
};

export default DescripcionGeneral;
