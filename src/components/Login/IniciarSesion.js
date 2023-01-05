import React, { useContext, useState } from 'react';

import { Button, Col, Form, Input, Row, Space } from 'antd';
import { Typography } from 'antd';
import { LoginContext } from '../../context/LoginContext';
import { ResetContraseña } from './ResetContraseña';

const { Title } = Typography;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export const IniciarSesion = () => {
    const { loginUser } = useContext(LoginContext);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setTimeout(() => {
            setLoading(false);
            let aux = {
                email: values.correo,
                password: values.password,
            };
            loginUser(aux);
        }, 2000);
    };

    const onFinishFailed = (errorInfo) => {
        setLoading(false);
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Row>
                <Col span={12} offset={5}>
                    <Space
                        direction='horizontal'
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        <Title>Iniciar Sesión</Title>
                    </Space>

                    <Form
                        {...layout}
                        name='iniciar_sesion'
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <Form.Item
                            label='Correo'
                            name='correo'
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Ingrese su correo electronico',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='Contraseña'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingrese su contraseña',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={loading}
                                onClick={() => setLoading(true)}
                            >
                                Iniciar Sesión
                            </Button>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <ResetContraseña />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
