import React, { useContext, useState } from 'react';
import { Button, Input, Col, Divider, Layout, Row, Switch, Typography } from 'antd';
import { RegistroContext } from '../../context/RegistroContext';
import { renderTags } from '../../helpers/renderTags';
import { FrownOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { TextArea } = Input;

export const SegmentoDeContenido = ({ contenido }) => {
    const { setTags, modificarSegmeto } = useContext(RegistroContext);

    const [value, setValue] = useState(
        contenido.justificacionTutor !== '' ? contenido.justificacionTutor : ''
    );

    const [vulgarCheck, setVulgarCheck] = useState(
        contenido.calificacionTutor.vulgar ? true : false
    );
    const [agresivoCheck, setAgresivoCheck] = useState(
        contenido.calificacionTutor.agresivo ? true : false
    );
    const [ofensivoCheck, setOfensivoCheck] = useState(
        contenido.calificacionTutor.ofensivo ? true : false
    );

    const [confirmLoading, setConfirmLoading] = useState(false);

    // Cambiar valores de los checkbox
    const toggleVulgarCheck = (checked) => {
        setVulgarCheck(checked);
    };

    const toggleAgresivoCheck = (checked) => {
        setAgresivoCheck(checked);
    };

    const toggleOfensivoCheck = (checked) => {
        setOfensivoCheck(checked);
    };

    //  Reorganizar etiquetas y datos del registro
    const handleOk = (idSegmento) => {
        setConfirmLoading(true);

        let x1 = vulgarCheck ? 1 : 0;
        let x2 = agresivoCheck ? 1 : 0;
        let x3 = ofensivoCheck ? 1 : 0;

        let aux = {
            idSegmento: idSegmento,
            tagsTutor: setTags(x1, x2, x3),
            justificacionTutor: value,
            calificacionTutor: {
                vulgar: x1,
                agresivo: x2,
                ofensivo: x3,
            },
        };

        contenido = {
            ...contenido,
            tagsTutor: setTags(x1, x2, x3),
            justificacionTutor: value,
            calificacionTutor: {
                vulgar: x1,
                agresivo: x2,
                ofensivo: x3,
            },
        };

        setTimeout(() => {
            setConfirmLoading(false);
            modificarSegmeto(aux);
        }, 2000);
    };

    // En caso de que no se encuentren registros
    if (!contenido)
        return (
            <center>
                <Title>No existen registro para mostrar.</Title>
                <FrownOutlined style={{ fontSize: '100px', color: '#08c' }} />
            </center>
        );

    return (
        <>
            <Layout>
                <Row className='center'>
                    <Col>
                        <center>
                            <h3>Contenido:</h3>
                            <Title italic level={4}>
                                {contenido !== null ? contenido.contenido : ''}
                            </Title>
                        </center>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={12}>
                        <center>
                            <b>Tags, resultado del clasificador: </b>
                        </center>
                        <br></br>
                        {contenido !== null
                            ? renderTags(contenido.tagsClasificacion)
                            : ''}
                        <br></br>

                        <center>
                            <b>Tags, resultado del tutor: </b>
                        </center>
                        <br></br>
                        {contenido !== null ? renderTags(contenido.tagsTutor) : ''}
                        <br></br>
                    </Col>

                    <Col span={12}>
                        <center>
                            <b>Tags, clasificacion del tutor: </b>
                        </center>
                        El contenido de esta pagina en su mayoria usted la considera:
                        <center>
                            <div className='switch'>
                                <div className='mg-10' style={{ margin: '5px 5px' }}>
                                    Vulgar:
                                    <Switch
                                        checked={vulgarCheck}
                                        onChange={toggleVulgarCheck}
                                    />{' '}
                                    Agresivo:
                                    <Switch
                                        checked={agresivoCheck}
                                        onChange={toggleAgresivoCheck}
                                    />{' '}
                                    Ofensivo:
                                    <Switch
                                        checked={ofensivoCheck}
                                        onChange={toggleOfensivoCheck}
                                    />
                                </div>

                                <TextArea
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder='Ingrese justificacion'
                                    autoSize={{
                                        minRows: 3,
                                        maxRows: 5,
                                    }}
                                />
                                <div className='checkSeparation'>
                                    <Button
                                        style={{
                                            marginBottom: '15px',
                                            marginTop: '15px',
                                        }}
                                        type='primary'
                                        loading={confirmLoading}
                                        onClick={() => {
                                            handleOk(contenido._id);
                                        }}
                                    >
                                        Guardar cambios
                                    </Button>
                                </div>
                            </div>
                        </center>
                    </Col>
                </Row>
            </Layout>
            <Divider></Divider>
        </>
    );
};
