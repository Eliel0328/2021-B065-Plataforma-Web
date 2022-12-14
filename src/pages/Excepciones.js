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
                                    Excepciones
                                </Button>,
                                <Button
                                    key='2'
                                    // shape='round'
                                    type= {!listaExceptiones ? 'primary': 'ghost'} 
                                    onClick={() => onPressBlackList()}
                                >
                                    No Permitidas
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
                                    Aqu?? encontraras el listado de p??ginas
                                    permitidas (lista blanca) y no permitidas
                                    (lista negra).<br></br>
                                    En caso de que el usuario entre a una p??gina
                                    de la lista blanca se ignorar?? la evaluaci??n
                                    de contenido y las notificaciones.
                                    <br></br>
                                    En caso de que el usuario entre a una p??gina
                                    de la lista negra se ignorar?? la evaluaci??n
                                    de contenido y registrar?? la visita.
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
