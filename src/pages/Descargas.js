import React from 'react';
import { Col, Divider, Layout, PageHeader, Row, Typography } from 'antd';
const { Paragraph } = Typography;

export const Descargas = () => {
    return (
        <Layout>
            <Row>
                <Col span={12} offset={6}>
                    <PageHeader title='Descagar extensión'>
                        <Paragraph
                            style={{
                                textAlign: 'justify',
                                textJustify: 'inter-word',
                            }}
                        >
                            En el siguiente link podrás descargar la extensión para agregarla a tu navegador, 
                            serás redirigido a la Chrome Web Store donde podras obtenerla de manera segura ;)
                        </Paragraph>
                    </PageHeader>
                    <Divider plain></Divider>
                    {/* Realmente debe ser un enlace la extension */}
                    <a href="https://chrome.google.com/webstore/detail/avira-browser-safety/flliilndjeohchalpbbcdekjklbdgfkk?hl=es&gclid=CjwKCAjwpqCZBhAbEiwAa7pXeU2p_yiV_MP4_Jn3WK1KlGrEK-eG9ofHzu7WzmAiuwhn0YTuV6_xyBoCy58QAvD_BwE" target="_blank">
                        Descárgala aquí
                    </a>
                </Col>
            </Row>
        </Layout>
    );
};
