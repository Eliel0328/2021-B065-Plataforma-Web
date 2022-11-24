import React, { useContext, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Col,
    Divider,
    Layout,
    PageHeader,
    Row,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import alertTopEnd from '../helpers/alertTopEnd';   
import { LoginContext } from '../context/LoginContext';

export const Recuperar = () => {
    const { recuperarContraseña } = useContext(LoginContext);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setTimeout(() => {
            setLoading(false);
            recuperarContraseña(values.correo);
        }, 2000);
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        setLoading(false);
        console.log('Failed:', errorInfo);

        alertTopEnd(
            'error',
            'Correo NO valido',
            'Ingrese una direccion de correo valida'
        );
    };

    return (
        <Layout>
            <Row>
                <Col span={12} offset={6}>
                    <PageHeader title='Recuperar Contraseña'></PageHeader>
                    <Divider plain></Divider>
                    <p>Ingrese su Contraseña:</p>
                    <Content>
                        <Form
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            layout='horizontal'
                            size='large'
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
                                <Input placeholder='Ingrese su correo' />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={loading}
                                    onClick={() => setLoading(true)}
                                >
                                    Enviar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Content>
                </Col>
            </Row>
        </Layout>
    );
};
