import React from 'react';
import {
    Breadcrumb,
    Card,
    Carousel,
    Col,
    Divider,
    Image,
    Layout,
    List,
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
import advertencia from '../file/advertencia.png';
import vigilantt from '../file/Vigilantt.png';
import writer from '../file/writer.png';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const { Paragraph } = Typography;

const data = [
    {
        key: '1',
        name: 'Extensión web',
        info: 'Es la responsable de la recolepcción de la información de la navegación.',
    },
    {
        key: '2',
        name: 'Servidor web',
        info: 'Administra y distribuye toda la información del sistema.',
    },
    {
        key: '3',
        name: 'Plataforma de registro y monitoreo',
        info: 'Su objetivo es mostrar la información clasificada al tutor al mismo tiempo que le permite tener control sobre la configuración del sistema.',
    },
    {
        key: '4',
        name: 'Clasificador',
        info: 'Busca dar una calificación para el contenido recuperado por la extensión.',
    },
    {
        key: '5',
        name: 'Almacenamiento',
        info: 'Almacenamiento del contenido clasificado y la configuración del tutor.',
    },
];

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
                                                            ¿Cómo funciona Vigilantt?
                                                        </Title>
                                                        <Paragraph className='txt-ct'>
                                                            Vigilantt se compone de
                                                            diversos modulos para
                                                            supervisar el contenido
                                                            visitado durante la navegación
                                                            web. Los modulos son los
                                                            siguientes:
                                                        </Paragraph>
                                                        <List
                                                            className='txt-ct'
                                                            dataSource={data}
                                                            renderItem={(item) => (
                                                                <List.Item>
                                                                    <Typography.Text
                                                                        strong
                                                                    >
                                                                        {item.name}
                                                                    </Typography.Text>
                                                                    : {item.info}
                                                                </List.Item>
                                                            )}
                                                        />{' '}
                                                    </Typography>
                                                </Col>
                                                <Col span={8} style={{ padding: '5%' }}>
                                                    <Image src={vigilantt} />
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <Row className='center' style={contentStyle}>
                                                <Col
                                                    span={16}
                                                    style={{ padding: '10px' }}
                                                >
                                                    <Typography>
                                                        <Title level={2}>
                                                            ¿Qué es el contenido
                                                            clasificado?
                                                        </Title>
                                                        <Paragraph className='txt-ct'>
                                                            El contenido clasificado se
                                                            trata del resultado devuelto
                                                            por el clasificador. Este
                                                            mismo tiene etiquetas que le
                                                            dan un valor necesario para
                                                            brindar un mejor contexto
                                                            sobre el mismo contenido. Las
                                                            etiquetas pueden ser alguna(s)
                                                            las siguentes :
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

                                                        <Paragraph className='txt-ct'>
                                                            Para un mejor y más claro
                                                            manejo de la información el
                                                            contenido clasificado es
                                                            divido en segmentos del
                                                            contenido, esto para mostrar
                                                            casos especificos.
                                                        </Paragraph>
                                                        <Paragraph className='txt-ct'>
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
                                                            contenido apto y por lo tanto
                                                            no será almacenado.
                                                        </Paragraph>
                                                    </Typography>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <Row className='center' style={contentStyle}>
                                                <Col span={10}>
                                                    <Typography>
                                                        <Title level={2}>
                                                            ¿Cómo se clasifican los datos?
                                                        </Title>
                                                        <Paragraph className='txt-ct'>
                                                            El etiquetado de la
                                                            información es un proceso
                                                            necesario y de vital
                                                            importacia para el correcto
                                                            funcionamiento del sistema y
                                                            la identificación de
                                                            incidencias. Por lo tanto,
                                                            para la clasificacion de los
                                                            datos se uso el siguiente
                                                            diagrama.
                                                        </Paragraph>
                                                    </Typography>
                                                </Col>
                                                <Col span={10}>
                                                    <Image src={diagrama_informativo} />
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <Row className='center' style={contentStyle}>
                                                <Col span={12}>
                                                    <Typography>
                                                        <Title level={2}>
                                                            ¿Qué es una incidencia?
                                                        </Title>
                                                        <Paragraph className='txt-ct'>
                                                            Una incidencia se considera el
                                                            que, alguno de los segmentos
                                                            de contenido pertenezca a
                                                            algún grupo de los antes
                                                            mencionados. Por cada etiqueta
                                                            que el segmento tenga, se
                                                            contará como una incidencia.
                                                        </Paragraph>
                                                        <Image
                                                            preview={false}
                                                            width={50}
                                                            src={advertencia}
                                                        />
                                                    </Typography>
                                                </Col>
                                            </Row>
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
