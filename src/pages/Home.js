import React from 'react';
import {
    Breadcrumb,
    Card,
    Carousel,
    Col,
    Divider,
    Image,
    Layout,
    PageHeader,
    Row,
    Tag,
    Typography,
} from 'antd';
import { Menu, theme } from 'antd';

import YoutubeEmbed from '../components/Home/YoutubeEmbed';

import { Descargas } from './Descargas';
import { Contacto } from './Contacto';
import '../css/basicStyle.css';
import logo from '../file/logo_1.png';
import diagrama_informativo from '../file/diagrama_informativo.png';
import writer from '../file/writer.png';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const { Paragraph } = Typography;

const contentStyle = {
    margin: 0,
    height: '450px',
    textAlign: 'center',
    background: '#F0F2F5',
};

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                color: 'black',
                fontSize: '15px',
                lineHeight: '1.5715',
            }}
            onClick={onClick}
        >
            <RightOutlined />
        </div>
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                color: 'black',
                fontSize: '15px',
                lineHeight: '1.5715',
            }}
            onClick={onClick}
        >
            <LeftOutlined />
        </div>
    );
};

const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
};

const Home = () => {
    const { Title, Paragraph, Text, Link } = Typography;
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return (
        <>
            <Layout className='center'>
                <Card
                    style={{
                        width: '70%',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 380,
                        }}
                    >
                        <Typography>
                            <Title className='center'>
                                <img width={100} src={logo} />
                                Vigilantt
                            </Title>
                            <Paragraph
                                style={{
                                    padding: '0 10%',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                ¿Quieres asegurarte de que tus hijos estén protegidos
                                contra el lenguaje ofensivo, agresivo y/o vulgar que
                                comúnmente se utiliza en la red?
                                <br></br>
                                <Text strong>¡Vigilantt puede ayudarte!</Text>
                            </Paragraph>
                            <Divider />
                            <Title level={2}>¿Qué es Vigilantt?</Title>

                            <Paragraph style={{ textAlign: 'justify', fontSize: '16px' }}>
                                Vigilantt es un conjunto de servicios en el que, con
                                simplemente crear una cuenta, instalar nuestra extensión y
                                configurar tu cuenta, estos analizarán las páginas web en
                                las que tu hijo o tutorado este navegando, clasificará
                                dicho contenido entre agresivo, ofensivo y/o vulgar y se
                                te presentará el contenido clasificado de esa manera en
                                nuestra plataforma web.
                            </Paragraph>
                            <Divider />
                            <Row justify='center'>
                                <Col span={25}>
                                    <Carousel arrows {...settings}>
                                        <div>
                                            <Row className='center' style={contentStyle}>
                                                <Col span={12}>
                                                    <Typography>
                                                        <Title level={2}>
                                                            ¿Cómo se clasifican los datos?
                                                        </Title>
                                                        <Paragraph>
                                                            Para la clasificacion de los
                                                            datos se uso el siguiente
                                                            diagrama.
                                                        </Paragraph>
                                                    </Typography>
                                                </Col>
                                                <Col span={12}>
                                                    <Image src={diagrama_informativo} />
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <Row className='center' style={contentStyle}>
                                                <Col span={12}>
                                                    <Image
                                                        preview={false}
                                                        src={writer}
                                                        style={{padding:'10%'}}
                                                    ></Image>
                                                </Col>
                                                <Col span={12} style={{padding: '10px'}}>
                                                    <Typography>
                                                        <Title level={2}>
                                                            ¿Qué es el contenido
                                                            clasificado?
                                                        </Title>
                                                        <Paragraph>
                                                            El contenido clasificado hace
                                                            referencia a que cierto
                                                            segmento de contenido
                                                            pertenece a alguno(s) de los
                                                            siguientes grupos:
                                                        </Paragraph>

                                                        <Tag color='magenta'>Vulgar</Tag>
                                                        <Tag color='volcano'>
                                                            Agresivo
                                                        </Tag>
                                                        <Tag
                                                            color='red'
                                                            style={{
                                                                marginBottom: '15px',
                                                            }}
                                                        >
                                                            Ofensivo
                                                        </Tag>

                                                        <Paragraph>
                                                            Los segmentos podrán
                                                            pertenecer a uno o más grupos
                                                            a la vez. A cada segmento se
                                                            le otorgara una etiqueta con
                                                            el nombre del grupo al que
                                                            pertenece. Si alguno de los
                                                            segmentos no pertenece a
                                                            alguno de los grupos
                                                            anteriormente mencionados,
                                                            este será considerado como
                                                            contenido apto.
                                                        </Paragraph>
                                                    </Typography>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <h3 style={contentStyle}>3</h3>
                                        </div>
                                        <div>
                                            <h3 style={contentStyle}>4</h3>
                                        </div>
                                    </Carousel>
                                </Col>
                            </Row>
                            <Divider />
                        </Typography>
                    </div>
                </Card>
            </Layout>
        </>
    );
};

export default Home;
