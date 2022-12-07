import React from 'react';
import { Col, Divider, Layout, PageHeader, Row, Typography } from 'antd';
import { TablaRegistro } from '../components/Registro/TablaRegistro';
import { RegistroContextProvider } from '../context/RegistroContext';
const { Paragraph } = Typography;

const Registro = () => {
    return (
        <Layout>
            <RegistroContextProvider>
                <Row>
                    <Col span={20} offset={2}>
                        <PageHeader title='Registro de contenido ofensivo encontrado'>
                            <Paragraph
                                style={{
                                    textAlign: 'justify',
                                    textJustify: 'inter-word',
                                }}
                            >
                                <p>
                                    Aquí encontraras un listado de las incidencias que nuestro
                                    sistema detecto como ofensivas, vulgares y/o agresivas.<br></br>
                                    Para más información de cada incidencia, has clic en ver
                                    contenido en cada incidencia.
                                </p>
                            </Paragraph>
                        </PageHeader>
                        <Divider plain></Divider>

                        <TablaRegistro></TablaRegistro>
                    </Col>
                </Row>
            </RegistroContextProvider>
        </Layout>
    );
};

export default Registro;
