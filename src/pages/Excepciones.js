import React, { useState } from 'react';
import { Button, Col, Divider, Layout, PageHeader, Row } from 'antd';
import { Typography } from 'antd';
import { BlackList } from '../components/Excepciones/ListaNegra';
import { WhiteList } from '../components/Excepciones/ListaBlanca';
import { ExcepcionesContextProvider } from '../context/ExcepcionesContext';
const { Paragraph } = Typography;

const Excepciones = () => {
    const [listaExceptiones, setListaExceptiones] = useState(true);

    const onPressWhiteList = () => {
        setListaExceptiones(true);
    };

    const onPressBlackList = () => {
        setListaExceptiones(false);
    };
    return (
        <Layout>
            <ExcepcionesContextProvider>
                <Row>
                    <Col span={20} offset={2}>
                        <PageHeader
                            title='Paginas permitidas y no permitidas'
                            extra={[
                                <Button
                                    key='1'
                                    // shape='round'
                                    type= {listaExceptiones ? 'primary': 'ghost'} 
                                    onClick={() => onPressWhiteList()}
                                >
                                    Lista Blanca
                                </Button>,
                                <Button
                                    key='2'
                                    // shape='round'
                                    type= {!listaExceptiones ? 'primary': 'ghost'} 
                                    onClick={() => onPressBlackList()}
                                >
                                    Lista Negra
                                </Button>,
                            ]}
                        >
                            <Paragraph
                                style={{
                                    textAlign: 'justify',
                                    textJustify: 'inter-word',
                                }}
                            >
                                <p>
                                    Aquí encontraras el listado de páginas
                                    permitidas (lista blanca) y no permitidas
                                    (lista negra).<br></br>
                                    En caso de que el usuario entre a una página
                                    de la lista blanca se ignorará la evaluación
                                    de contenido y las notificaciones.
                                    <br></br>
                                    En caso de que el usuario entre a una página
                                    de la lista negra se ignorará la evaluación
                                    de contenido y se notificará directamente.
                                </p>
                            </Paragraph>
                        </PageHeader>
                        <Divider plain></Divider>
                        {listaExceptiones ? <WhiteList /> : <BlackList />}
                    </Col>
                </Row>
            </ExcepcionesContextProvider>
        </Layout>
    );
};

export default Excepciones;
