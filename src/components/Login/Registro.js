import React, { useContext, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Layout, Row, Space } from 'antd';
import { Typography } from 'antd';
import { LoginContext } from '../../context/LoginContext';
const { Title } = Typography;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export const Registro = () => {
    const { verificarCorreo, registrarTutor } = useContext(LoginContext);

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

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

            let aux = await registrarTutor(values);
            if (aux === 400) {
                form.setFields([
                    {
                        name: 'correo',
                        errors: ['El correo ingresado ya esta registrado a una cuenta'],
                    },
                ]);
            }

            setLoading(false);
        }, 2000);
        console.log('Success:', values);
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
                        <Title>Registrar Cuenta</Title>
                    </Space>

                    <Form
                        form={form}
                        {...layout}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <Form.Item
                            label='Nombre'
                            name='nombre'
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingrese su nombre',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Apellidos'
                            name='apellidos'
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingrese sus apellidos',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

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
                            name='remember'
                            valuePropName='checked'
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        ></Form.Item>

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
                                Registrar cuenta
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
