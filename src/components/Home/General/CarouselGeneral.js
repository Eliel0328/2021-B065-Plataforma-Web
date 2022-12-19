import React from 'react';
import { Carousel, Col, Image, List, Row, Tag, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import diagrama_informativo from '../../../file/diagrama_informativo.png';
import advertencia from '../../../file/advertencia.png';
import vigilantt from '../../../file/Vigilantt.png';
import '../../../css/basicStyle.css';

const data = [
    {
        key: '1',
        name: 'Extensión web',
        info: 'Es la responsable de la recolección de la información de la navegación.',
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

const CarouselGeneral = () => {
    const { Title, Paragraph, Text, Link } = Typography;

    return (
        <>
            <Carousel arrows {...settings}>
                <div>
                    <Row className='center' style={contentStyle}>
                        <Col span={12}>
                            <Typography>
                                <Title level={2}>¿Cómo funciona Vigilantt?</Title>
                                <Paragraph className='txt-ct'>
                                    Vigilantt se compone de diversos módulos para
                                    supervisar el contenido visitado durante la navegación
                                    web. Los módulos son los siguientes:
                                </Paragraph>
                                <List
                                    className='txt-ct'
                                    dataSource={data}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text strong>
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
                        <Col span={16} style={{ padding: '10px' }}>
                            <Typography>
                                <Title level={2}>¿Qué es el contenido clasificado?</Title>
                                <Paragraph className='txt-ct'>
                                    El contenido clasificado se trata del resultado
                                    devuelto por el clasificador. Este mismo tiene
                                    etiquetas que le dan un valor necesario para brindar
                                    un mejor contexto sobre el mismo contenido. Las
                                    etiquetas pueden ser alguna(s) las siguientes:
                                </Paragraph>

                                <Tag color='magenta'>Vulgar</Tag>
                                <Tag color='volcano'>Agresivo</Tag>
                                <Tag
                                    color='red'
                                    style={{
                                        marginBottom: '15px',
                                    }}
                                >
                                    Ofensivo
                                </Tag>

                                <Paragraph className='txt-ct'>
                                    Para un mejor y más claro manejo de la información el
                                    contenido clasificado es divido en segmentos del
                                    contenido, esto para mostrar casos específicos.
                                </Paragraph>
                                <Paragraph className='txt-ct'>
                                    Los segmentos podrán pertenecer a uno o más grupos a
                                    la vez. A cada segmento se le otorgara una etiqueta
                                    con el nombre del grupo al que pertenece. Si alguno de
                                    los segmentos no pertenece a alguno de los grupos
                                    anteriormente mencionados, este será considerado como
                                    contenido apto y por lo tanto no será almacenado.
                                </Paragraph>
                            </Typography>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className='center' style={contentStyle}>
                        <Col span={10}>
                            <Typography>
                                <Title level={2}>¿Cómo se clasifican los datos?</Title>
                                <Paragraph className='txt-ct'>
                                    El etiquetado de la información es un proceso
                                    necesario y de vital importancia para el correcto
                                    funcionamiento del sistema y la identificación de
                                    incidencias. El contenido clasificado puede verse en
                                    la sección de registro. Por lo tanto, para la
                                    clasificación de los datos se usó el siguiente
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
                                <Title level={2}>¿Qué es una incidencia?</Title>
                                <Paragraph className='txt-ct'>
                                    Una incidencia se considera que alguno de los
                                    segmentos de contenido pertenezca a algún grupo de los
                                    antes mencionados. Por cada etiqueta que el segmento
                                    tenga, se contará como una incidencia.
                                </Paragraph>
                                <Image preview={false} width={50} src={advertencia} />
                            </Typography>
                        </Col>
                    </Row>
                </div>
            </Carousel>
        </>
    );
};

export default CarouselGeneral;
