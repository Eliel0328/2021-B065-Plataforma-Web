import React from 'react';
import { Col, Divider, Layout, PageHeader, Row, Typography } from 'antd';
import YoutubeEmbed from '../components/Home/YoutubeEmbed';
import { Descargas } from './Descargas';
import { Contacto } from './Contacto';
const { Paragraph } = Typography;

const Home = () => {
    return (
        <>
            <Layout>
                <Row>
                    <Col span={12} offset={6}>
                        <PageHeader title='Monitorea el contenido que pueda ser perjudicial para tus hijos'>
                            <Paragraph
                                style={{
                                    textAlign: 'justify',
                                    textJustify: 'inter-word',
                                }}
                            >
                                <h4>
                                    "9 de cada 10 personas de 12 a 17 años utilizan alguna
                                    herramienta para acceder a internet en México"
                                </h4>
                                <br></br>

                                <p>
                                    En la actualidad cada vez son más personas las que
                                    tienen que adentrarse a los medios digitales, y esto
                                    no se ve restringido por la edad, llegando usar estas
                                    herramientas a una muy temprana edad antes de llegar a
                                    tener una educación digital de cómo usar estas
                                    herramientas.
                                </p>
                                <p>
                                    Utilizando técnicas de Inteligencia Artificial
                                    evaluamos el contenido de las páginas para concluir si
                                    esta tiene contenido ofensivo o no, y posteriormente
                                    notificarte en caso de ser de que así.
                                </p>
                                <p>
                                    Podrás realizar algunas configuraciones en la
                                    evaluación del contenido para saber cuándo enviarte
                                    notificaciones además de poder excluir paginas
                                    directamente o evitar evaluar algunas páginas.
                                </p>
                            </Paragraph>
                        </PageHeader>
                        <Divider plain></Divider>
                        {/* Realmente debe ser un enlace la extension */}
                        <YoutubeEmbed
                            embedId='RErdSr0iAcs'
                            style={{
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        />
                    </Col>
                </Row>
            </Layout>
            <Descargas />
            <Contacto />
        </>
    );
};

export default Home;
