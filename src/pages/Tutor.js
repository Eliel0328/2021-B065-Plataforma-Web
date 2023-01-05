import React, { useContext, useEffect, useState } from 'react';
import {
    Col,
    Divider,
    Layout,
    Row,
    Button,
    Form,
    Switch,
    Spin,
    Typography,
    Input,
    Slider,
} from 'antd';
import { LoginContext } from '../context/LoginContext';
import alertTopEnd from '../helpers/alertTopEnd';
import '../css/basicStyle.css';
import { LoadingOutlined } from '@ant-design/icons';
import setGreet from '../helpers/setGreet';
import { IncidenciasPorSemana } from '../components/Tutor/IncidenciasPorSemana';
import { DashboardContextProvider } from '../context/DashboardContext';
import { NoPermitidasPorSemana } from '../components/Tutor/NoPermitidasPorSemana';
import { TipoIncidencias } from '../components/Tutor/TipoIncidencias';
import { TiempoDeConexion } from '../components/Tutor/TiempoDeConexion';
import { CambiarContraseña } from '../components/Tutor/CambiarContraseña';
const { Content } = Layout;
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
        // eslint-disable-next-line
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
                <Row>
                    <Col>
                        <Title className='middle-center-2' level={2}>
                            {setGreet() + ' ' + tutor.nombre}
                        </Title>
                        <Divider plain></Divider>
                        <Layout className='layout middle-center-2'>
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
                                            <Form.Item className='center'>
                                                <CambiarContraseña />
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
                                            <Title level={5} className='center'>
                                                Incidencias:
                                            </Title>
                                            <Form.Item
                                                name='slider'
                                                initialValue={tutor.numIncidencias}
                                            >
                                                <Slider
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
                                            <Title level={5} className='center'>
                                                Encender/Apagar Extensión:
                                            </Title>
                                            <Form.Item name='switch' className='center'>
                                                <Switch
                                                    defaultChecked={tutor.extensionActiva}
                                                    onChange={toggleSwitchCheck}
                                                />
                                            </Form.Item>
                                            <Form.Item className='center'>
                                                <Button type='primary' htmlType='submit'>
                                                    Guardar
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </Content>
                        </Layout>
                        <Divider plain></Divider>
                        <DashboardContextProvider>
                            <Layout>
                                <Content>
                                    <Row>
                                        <Col
                                            className='middle-center-2'
                                            style={{
                                                padding: 10,
                                            }}
                                        >
                                            <IncidenciasPorSemana />
                                        </Col>
                                        <Col
                                            className='middle-center-2'
                                            style={{
                                                padding: 10,
                                            }}
                                        >
                                            <TipoIncidencias />
                                        </Col>
                                        <Col
                                            className='middle-center-2'
                                            style={{
                                                padding: 10,
                                            }}
                                        >
                                            <NoPermitidasPorSemana />
                                        </Col>
                                        <Col
                                            className='middle-center-2'
                                            style={{
                                                padding: 10,
                                            }}
                                        >
                                            <TiempoDeConexion />
                                        </Col>
                                    </Row>
                                </Content>
                            </Layout>
                        </DashboardContextProvider>
                    </Col>
                </Row>
            </Layout>
        </>
    );
};
