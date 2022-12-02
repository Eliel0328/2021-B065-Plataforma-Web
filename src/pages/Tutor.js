import React, { useContext, useEffect, useState } from 'react';
import {
    Col,
    Descriptions,
    Divider,
    Layout,
    PageHeader,
    Row,
    Button,
    Form,
    InputNumber,
    Switch,
    Spin,
    Typography,
    Breadcrumb,
    Input,
    Menu,
    Slider,
    Modal,
} from 'antd';
import { LoginContext } from '../context/LoginContext';
import alertTopEnd from '../helpers/alertTopEnd';
import '../css/basicStyle.css';

import { LoadingOutlined } from '@ant-design/icons';
import setGreet from '../helpers/setGreet';
import { GraficaIncidenciasByWeek } from '../components/Tutor/GraficaIncidenciasByWeek';
import { DashboardContextProvider } from '../context/DashboardContext';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 80,
        }}
        spin
    />
);

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export const Tutor = () => {
    const { tutor, getTutor, setNumeroIncidencias, setEstadoExtension } =
        useContext(LoginContext);
    const [switchCheck, setSwitchCheck] = useState(false);

    useEffect(() => {
        getTutor();
    }, []);

    const onFinish = (values) => {
        let changeIn = false;
        let changeEx = false;
        if (values.slider !== tutor.numIncidencias) {
            setNumeroIncidencias(values.slider);
            changeIn = true;
        }
        if (values.switch !== undefined && values.switch !== tutor.extensionActiva) {
            setEstadoExtension(values.switch);
            changeEx = true;
        }

        if (changeIn && changeEx) {
            setTimeout(() => {
                alertTopEnd(
                    'success',
                    'Configuración Actualizada',
                    'El estado de la extensión ha cambiado <br>Se actualizo el número de incidencias para el tutor'
                );
            }, 100);
        }
    };

    const toggleSwitchCheck = () => {
        setSwitchCheck(!switchCheck);
    };

    if (!tutor) {
        return (
            <div className='middle-center'>
                <Spin indicator={antIcon} />
            </div>
        );
    }

    return (
        <>
            <Layout>
                <Title level={2}>{setGreet() + ' ' + tutor.nombre}</Title>
            </Layout>
            <Layout className='layout'>
                <Content
                    style={{
                        padding: '10px 100px',
                    }}
                >
                    <Row>
                        <Col
                            style={{
                                padding: 10,
                            }}
                        >
                            <Title level={4}>Datos del Tutor:</Title>
                            <Form {...layout} name='nest-messages'>
                                <Form.Item
                                    name={['user', 'name']}
                                    label='Nombre'
                                    initialValue={`${tutor.nombre} ${tutor.apellidos}`}
                                >
                                    <Input disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    name={['user', 'email']}
                                    label='Email'
                                    initialValue={tutor.correo}
                                >
                                    <Input disabled={true} />
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col
                            style={{
                                padding: 10,
                                minWidth: 300,
                            }}
                        >
                            <Title level={4}>Configuraciones:</Title>
                            <Form name='nest-messages' onFinish={onFinish}>
                                <Form.Item
                                    name='slider'
                                    label='Slider'
                                    initialValue={tutor.numIncidencias}
                                    style={{
                                        marginTop: 50,
                                    }}
                                >
                                    <Slider
                                        tooltipVisible={true}
                                        marks={{
                                            10: '10',
                                            20: '20',
                                            30: '30',
                                            40: '40',
                                            50: '50',
                                            60: '60',
                                            70: '70',
                                            80: '80',
                                            90: '90',
                                            100: '100',
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item name='switch' label='Switch'>
                                    <Switch
                                        defaultChecked={tutor.extensionActiva}
                                        onChange={toggleSwitchCheck}
                                    />
                                </Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Guardar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            <DashboardContextProvider>
                <GraficaIncidenciasByWeek></GraficaIncidenciasByWeek>
            </DashboardContextProvider>
        </>
    );
};
