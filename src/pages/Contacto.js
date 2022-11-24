import React from 'react';
import { Col, Divider, Layout, PageHeader, Row, Typography } from 'antd';
const { Paragraph } = Typography;

export const Contacto = () => {
    return (
        <Layout>
            <Row>
                <Col span={12} offset={6}>
                    <PageHeader title='Contacto'>
                        <Paragraph
                            style={{
                                textAlign: 'justify',
                                textJustify: 'inter-word',
                            }}
                        >
                            <p>
                                En caso de que quieras reportar un fallo o enviar algún comentario o queja, puedes comunicarte 
                                con nosotros enviando un correo a la siguiente dirección:
                            </p>

                            vigilantt2022@gmail.com
                        </Paragraph>
                    </PageHeader>
                    <Divider plain></Divider>
                </Col>
            </Row>
        </Layout>
    );
};
