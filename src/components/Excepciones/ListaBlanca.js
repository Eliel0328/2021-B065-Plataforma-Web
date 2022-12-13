import React, { useContext, useEffect, useState } from 'react';
import { FrownOutlined } from '@ant-design/icons';
import '../../css/basicStyle.css';
import { Form, Input, Button, Table, Divider, Popconfirm, Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import Modal from 'antd/lib/modal/Modal';
import { ExcepcionesContext } from '../../context/ExcepcionesContext';
const { TextArea } = Input;
const { Title } = Typography;

export const WhiteList = () => {
    const [count, setCount] = useState(2);
    const [form] = Form.useForm();

    // Datos y funciones provenientes del contexto
    const { listaBlanca, obtenerPermitidas, agregarPermitidas, eliminarPermitida } =
        useContext(ExcepcionesContext);

    // Obtener los registros del contenido asignado al usuario
    useEffect(() => {
        obtenerPermitidas();
        setCount(listaBlanca.length);
        // eslint-disable-next-line
    }, []);

    // Variables para el funcionamiento del front
    //      Mostrar modal del contenido
    const [visible, setVisible] = useState(false);
    //      Contenido de un unico registro - Registro actual
    const [contenido, setContenido] = useState(null);
    //      Efecto de carga
    const [confirmLoading, setConfirmLoading] = useState(false);
    //      Modal en modo detalles
    const [isDetalles, setIsDetalles] = useState(false);

    // Cerrar modal y limpiar formulario
    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };

    // Mostrar modal en modo agregar pagina a la lista
    const showModal = (key) => {
        setVisible(true);
        setIsDetalles(false);
    };

    // Mostrar modal en modo detalles de pagina
    const showModalDetalles = (key) => {
        console.log(key);
        let aux = listaBlanca.filter((permitida) => permitida._id === key);

        console.log(aux[0]);
        setVisible(true);
        setIsDetalles(true);

        setContenido(aux[0]);
    };

    // En caso de que la informacion agregada al modal sea correcta
    const onFinish = (values) => {
        setConfirmLoading(true);

        setTimeout(() => {
            // Regresar valores a su valor por defecto
            setVisible(false);
            setConfirmLoading(false);
            form.resetFields();

            // Separar la informacion para ser almacenada y mostrada correctamente
            let domain = new URL(values.url).hostname.replace('www.', '');
            const newData = {
                _id: count,
                justificacion: values.descripcion,
                url: values.url,
                dominio: domain,
                fechaHora: new Date(),
            };

            // Actualizar lista de contenido mostrado
            agregarPermitidas(newData);
            setCount(count + 1);
        }, 2000);
    };

    // En caso de que la informacion agregada al modal sea incorrecta
    const onFinishFailed = (errorInfo) => {
        setConfirmLoading(false);
    };

    // Eliminar una pagina de la lista
    const handleDelete = (key) => {
        eliminarPermitida(key);
    };

    return (
        <>
            <Title level={2}>Excepciones</Title>
            <Button
                onClick={showModal}
                type='primary'
                style={{
                    marginBottom: 16,
                }}
            >
                Agregar pagina
            </Button>

            {/* En caso de que no tener una lista registrada */}
            <center className={listaBlanca.length !== 0 ? 'd-none' : ''}>
                <Title>No existen registro de páginas para mostrar.</Title>
                <FrownOutlined style={{ fontSize: '100px', color: '#08c' }} />
            </center>

            {/* Tabla de la lista de paginas */}
            <Table
                dataSource={listaBlanca}
                bordered={true}
                rowKey='_id'
                className={listaBlanca.length === 0 ? 'd-none' : ''}
                scroll={{
                    x: 800,
                  }}
            >
                <Column title='Dominio' dataIndex='dominio' key='dominio' />
                <Column
                    title='Direccion web'
                    dataIndex='url'
                    key='direccion_web'
                    ellipsis={true}
                />
                <Column
                    title='Detalles'
                    key='_id'
                    dataIndex='_id'
                    render={(_id) => (
                        <center>
                            <Button type='primary' onClick={() => showModalDetalles(_id)}>
                                Ver detalles
                            </Button>
                        </center>
                    )}
                />
                <Column
                    title='Eliminar'
                    dataIndex='_id'
                    render={(_id, record) =>
                        listaBlanca.length >= 1 ? (
                            <Popconfirm
                                title='¿Desea eliminar esta página?'
                                cancelText='Cancelar'
                                onConfirm={() => handleDelete(_id)}
                            >
                                <center>
                                    <Button type='primary'>Borrar pagina</Button>
                                </center>
                            </Popconfirm>
                        ) : null
                    }
                />
            </Table>

            {/* Modal para agregar pagina y mostrar los detalles de la misma */}
            <Modal
                title={
                    !isDetalles
                        ? 'Agregar página a lista blanca'
                        : 'Detalles de la página'
                }
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name='registro_pagina'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                    form={form}
                >
                    <Form.Item
                        label='URL'
                        name='url'
                        hidden={isDetalles}
                        rules={[
                            {
                                required: true,
                                message: 'Ingrese la url',
                                pattern: new RegExp(
                                    /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/
                                ),
                            },
                        ]}
                    >
                        <Input placeholder='Direccion de la pagina' />
                    </Form.Item>
                    <Form.Item label='URL' hidden={!isDetalles}>
                        <Input value={contenido !== null ? contenido.url : ''} />
                    </Form.Item>
                    <Form.Item
                        label='Descripcion'
                        name='descripcion'
                        hidden={isDetalles}
                        rules={[
                            {
                                required: true,
                                message: 'Ingrese la descripcion',
                            },
                        ]}
                    >
                        <TextArea
                            rows={5}
                            placeholder={'Debe proporcionar una descripcion'}
                        />
                    </Form.Item>
                    <Form.Item label='Descripcion' hidden={!isDetalles}>
                        <TextArea
                            rows={5}
                            value={contenido !== null ? contenido.justificacion : ''}
                        />
                    </Form.Item>
                    <Divider />

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button
                            htmlType='button'
                            onClick={handleCancel}
                            style={{ marginRight: '15px' }}
                        >
                            {!isDetalles ? 'Cancelar' : 'Cerrar'}
                        </Button>

                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={confirmLoading}
                            disabled={isDetalles}
                        >
                            Registrar pagina
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
