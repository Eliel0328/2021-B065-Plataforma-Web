import '../../css/basicStyle.css';
import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Layout,
    Modal,
    Row,
    Space,
    Switch,
    Table,
    Typography,
} from 'antd';
import { RegistroContext } from '../../context/RegistroContext';
import { renderTags } from '../../helpers/renderTags';
import { FrownOutlined } from '@ant-design/icons';
import { SegmentoDeContenido } from './SegmentoDeContenido';
import addDays from '../../helpers/addDays';
import checkTheSameDate from '../../helpers/checkTheSameDate';
import alertTopEnd from '../../helpers/alertTopEnd';
const { Column, ColumnGroup } = Table;
const { Title, Paragraph } = Typography;

export const TablaRegistro = () => {
    // Datos y funciones provenientes del contexto
    const {
        registro,
        segmento,
        key,
        setTags,
        obtenerRegistro,
        modificarRegistro,
        setKey,
        obtenerSegmentoDeContenido,
        modificarSegmeto,
    } = useContext(RegistroContext);

    // Obtener los registros del contenido asignado al usuario
    useEffect(() => {
        obtenerRegistro();
        // eslint-disable-next-line
    }, []);

    // Variables para el funcionamiento del front
    //      Mostrar modal del contenido
    const [visible, setVisible] = useState(false);
    //      Contenido de un unico registro - Registro actual
    const [contenido, setContenido] = useState(null);
    //      Efecto de carga
    const [confirmLoading, setConfirmLoading] = useState(false);
    //      Checks para las distintas etiquetas en el modal
    const [vulgarCheck, setVulgarCheck] = useState(false);
    const [agresivoCheck, setAgresivoCheck] = useState(false);
    const [ofensivoCheck, setOfensivoCheck] = useState(false);
    //      Key del registro actual
    // const [key, setKey] = useState(-1);
    const [data, setData] = useState(null);
    const [inicial, setIncial] = useState(null);
    const [isFiltrado, setIsFiltrado] = useState(false);
    const [loading, setLoading] = useState(false);

    // Mostrar modal
    const showModal = (key) => {
        let resultDatos = registro.filter((obj) => {
            return obj._id === key;
        });

        setKey(key);
        setVisible(true);
        obtenerSegmentoDeContenido(key);
        setContenido(resultDatos[0]);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const setFormatTime = (date) => {
        let a = new Date(date);
        let aux =
            (a.getHours() + 6) % 24 < 10
                ? `0${(a.getHours() + 6) % 24}`
                : (a.getHours() + 6) % 24;
        let aux2 = a.getMonth() + 1 < 10 ? `0${a.getMonth() + 1}` : a.getMonth() + 1;
        let aux3 = a.getDate() < 10 ? `0${a.getDate()}` : a.getDate();
        let aux4 = a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();
        // return `${a.getFullYear()}-${a.getMonth()}-${a.getDate()}  ${a.getHours()}:${a.getMinutes()}`;
        return `${a.getFullYear()}-${aux2}-${aux3}  ${aux}:${aux4}`;
    };

    const onChange = (date, dateString) => {
        if (dateString === '') {
            setIncial(null);
        } else {
            let firstday = new Date(date._d);
            setIncial(firstday);
        }
    };

    const setRegistrosPorFecha = () => {
        if (inicial === null) {
            alertTopEnd(
                'warning',
                'Fecha no seleccionada',
                'Seleccione la fecha que desea buscar'
            );
        } else {
            setLoading(true);
            let aux = registro.filter((e) => {
                return checkTheSameDate(new Date(e.fechaHora), new Date(inicial));
            });
            setTimeout(() => {
                setLoading(false);
                setIsFiltrado(true);
                setData(aux);
            }, 1000);
        }
    };
    const setAllRegistros = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsFiltrado(false);
            setData(null);
        }, 1000);
    };

    // En caso de que no se encuentren registros
    if (registro.length === 0)
        return (
            <center>
                <Title>No existen registro para mostrar.</Title>
                <FrownOutlined style={{ fontSize: '100px', color: '#08c' }} />
            </center>
        );

    // Tabla de registros
    return (
        <>
            <Card>
                <DatePicker
                    placeholder='Seleccione la fecha'
                    showToday={false}
                    onChange={onChange}
                />
                <Button
                    style={{ margin: 10 }}
                    type='primary'
                    onClick={setRegistrosPorFecha}
                >
                    Buscar
                </Button>
                <Button
                    style={{ margin: 10 }}
                    type='ghost'
                    onClick={setAllRegistros}
                >
                    Mostrar todos los registros
                </Button>
            </Card>
            <Table
                dataSource={isFiltrado ? data : registro}
                bordered={true}
                rowKey={'_id'}
                loading={loading}
            >
                <Column title='Dominio' dataIndex='dominio' key='dominio' />
                <Column title='Direccion web' dataIndex='url' key='direccion_web' />
                <Column title='Incidencias' dataIndex='noIncidencias' key='incidencia' />
                <Column
                    title='Fecha y hora'
                    dataIndex='fechaHora'
                    key='fecha_hora'
                    render={(fechaHora) => setFormatTime(fechaHora)}
                />
                <Column
                    title='Ver contenido'
                    key='_id'
                    dataIndex='_id'
                    render={(_id) => (
                        <Space size='middle'>
                            <Button type='primary' onClick={() => showModal(_id)}>
                                Ver contenido
                            </Button>
                        </Space>
                    )}
                />
            </Table>

            {/* Modal de contenido para calificar clasificacion */}
            <Modal
                title='Contenido clasificado como ofensivo'
                visible={visible}
                onCancel={handleCancel}
                width={800}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Cerrar Lista
                    </Button>,
                ]}
            >
                <i>Dominio: </i>

                <Title level={5}>{contenido !== null ? contenido.dominio : ''}</Title>

                <i>Direccion web: </i>

                <Title level={5}>{contenido !== null ? contenido.url : ''}</Title>

                <i>Incidencias: </i>

                <Title level={5}>
                    {contenido !== null ? contenido.noIncidencias : ''}
                </Title>

                <i>Fecha y hora: </i>

                <Title level={5}>
                    {contenido !== null ? setFormatTime(contenido.fechaHora) : ''}
                </Title>
                <Divider orientation='center'>Segmentos de contenido</Divider>
                {segmento.length !== 0
                    ? segmento.map((e, index) => (
                          <SegmentoDeContenido key={index} contenido={e} />
                      ))
                    : null}
            </Modal>
        </>
    );
};
