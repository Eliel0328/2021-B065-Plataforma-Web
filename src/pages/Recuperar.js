import React, { useContext, useEffect, useState } from 'react';

import { Button, Col, Form, Input, Row, Space } from 'antd';
import { Typography } from 'antd';
import { LoginContext } from '../context/LoginContext';
import alertTopEnd from '../helpers/alertTopEnd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export const Recuperar = () => {
    const { resetPassword } = useContext(LoginContext);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [tutorId, setTutorId] = useState(null);
    const [resetString, setResetString] = useState(null);

    useEffect(() => {
        let aux = window.location.pathname.split('/');
        setTutorId(aux[2]);
        setResetString(aux[3]);
    }, []);

    const onFinish = (values) => {
        setTimeout(async () => {
            if (values.contraseña !== values.confirmarContraseña) {
                form.setFields([
                    {
                        name: 'confirmarContraseña',
                        errors: ['Repita la contraseña'],
                    },
                ]);
                setLoading(false);
                return null;
            }

            let aux = await resetPassword({
                tutorId,
                resetString,
                newPassword: values.contraseña,
            });

            console.log(aux);
            if (aux === 200) {
                setTimeout(async () => {
                    alertTopEnd('success', 'Redirigiendo', 'Será redirigido al login');
                    navigate('/login');
                }, 3000);
            }

            setLoading(false);
        }, 2000);
    };

    const onFinishFailed = (errorInfo) => {
        setLoading(false);
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Row>
                <Col
                    span={12}
                    offset={5}
                    style={{
                        padding: 20,
                        paddingRight: 60,
                        paddingLeft: 0,
                    }}
                >
                    <Space
                        direction='horizontal'
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        <Title>Iniciar Sesión</Title>
                    </Space>

                    <Form
                        {...layout}
                        form={form}
                        name='iniciar_sesion'
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <Form.Item
                            label='Contraseña'
                            name='contraseña'
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
                            label='Confirmar Contraseña'
                            name='confirmarContraseña'
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingrese la confirmacion de su contraseña',
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
                                Establecer Contraseña
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
