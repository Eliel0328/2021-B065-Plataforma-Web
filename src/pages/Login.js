import React, { useState } from 'react';
import { Button, Col, Divider, Layout, PageHeader, Row } from 'antd';
import { Typography } from 'antd';
import { Registro } from '../components/Login/Registro';
import { IniciarSesion } from '../components/Login/IniciarSesion';
const { Paragraph } = Typography;

const Login = () => {
    const [login, setLogin] = useState(true);

    const onPressIniciar = () => {
        setLogin(true);
    };

    const onPressRegistrarse = () => {
        setLogin(false);
    };

    return (
        <Layout>
            <Row>
                <Col span={12} offset={6}>
                    <PageHeader
                        title='Bienvenido'
                        extra={[
                            <Button
                                key='1'
                                type={login ? 'primary' : 'ghost'}
                                onClick={() => onPressIniciar()}
                            >
                                Iniciar sesion
                            </Button>,
                            <Button
                                key='2'
                                type={!login ? 'primary' : 'ghost'}
                                onClick={() => onPressRegistrarse()}
                            >
                                Registrarse
                            </Button>,
                        ]}
                    >
                        <Paragraph
                            style={{
                                textAlign: 'justify',
                                textJustify: 'inter-word',
                            }}
                        >
                            Para comenzar a hacer uso de esta extensión debe iniciar
                            sesión.<br></br>
                            En caso de no tener una cuenta registrada, puede crear una
                            haciendo clic en Registrarse.
                        </Paragraph>
                    </PageHeader>
                    <Divider plain></Divider>
                    {login ? <IniciarSesion /> : <Registro />}
                </Col>
            </Row>
        </Layout>
    );
};

export default Login;
