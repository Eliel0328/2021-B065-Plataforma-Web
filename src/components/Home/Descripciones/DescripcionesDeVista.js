import React, { useContext } from 'react';
import {
    Button,
    Card,
    Carousel,
    Col,
    Divider,
    Image,
    Layout,
    List,
    Row,
    Tag,
    Typography,
} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../../../css/basicStyle.css';
import chrome from '../../../file/navegadores/chrome.png';
import brave from '../../../file/navegadores/brave.png';
import edge from '../../../file/navegadores/edge.png';
import opera from '../../../file/navegadores/opera.png';
import cap_registro from '../../../file/vistas/registro.png';
import { Link, Navigate } from 'react-router-dom';
import { LoginContext } from '../../../context/LoginContext';

const data = [
    {
        key: '1',
        name: '• Google Chrome',
    },
    {
        key: '2',
        name: '• Microsoft Edge',
    },
    {
        key: '3',
        name: '• Brave',
    },
    {
        key: '4',
        name: '• Opera',
    },
    {
        key: '5',
        name: '• Etc',
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

const DescripcionesDeVista = () => {
    const { setCurrent } = useContext(LoginContext);
    const { Title, Paragraph, Text } = Typography;

    const irRegistro = () => {
        setCurrent('registro');
    };

    return (
        <>
            <Carousel arrows {...settings}>
                <div>
                    <Row className='center' style={contentStyle}>
                        <Col span={10}>
                            <Typography>
                                <Title level={2}>
                                    Navegadores en los que funcionan la extensión
                                </Title>
                                <Paragraph className='txt-ct'>
                                    La extensión web esta diseñada para funcionar en los
                                    navegadores compatibles con Chrome. La extensión de
                                    Vigilatt fue probada con los siguientes navegadores
                                </Paragraph>
                                <List
                                    className='txt-ct'
                                    dataSource={data}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text strong>
                                                {item.name}
                                            </Typography.Text>
                                        </List.Item>
                                    )}
                                />{' '}
                                <Paragraph className='txt-ct'>
                                    Si el usuario decide instalar nuestra extensión en
                                    algún navegador distinto a los aquí mencionados será
                                    responsabilidad de este.
                                </Paragraph>
                            </Typography>
                        </Col>
                        <Col span={4} offset={2}>
                            <div>
                                <div>
                                    <Image preview={false} width={70} src={brave} />
                                </div>
                                <div>
                                    <Image preview={false} width={90} src={chrome} />
                                </div>
                                <div>
                                    <Image preview={false} width={80} src={edge} />
                                </div>
                                <div>
                                    <Image preview={false} width={80} src={opera} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className='center' style={contentStyle}>
                        <Col span={10} style={{ padding: '5%' }}>
                            <Image alt='Captura de Registro' src={cap_registro} />
                            <Link to='/registro'>
                                <Button onClick={irRegistro}>Ir a Registro</Button>
                            </Link>
                            ,
                        </Col>
                        <Col span={10} style={{ padding: '10px' }}>
                            <Typography>
                                <Title level={2}>Registro</Title>
                                <Paragraph className='txt-ct'>
                                    La sección de registro tiene el objetivo de mostrar el
                                    contenido clasificado. Para lograr esto muestra los
                                    datos del sitio visitado, el número de incidencias y
                                    las mismas incidencias a traves de un modal.
                                </Paragraph>
                            </Typography>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className='center' style={contentStyle}>
                        <Col span={10}>
                            <Typography>
                                <Title level={2}>Excepciones</Title>
                                <Paragraph className='txt-ct'></Paragraph>
                            </Typography>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className='center' style={contentStyle}>
                        <Col span={12}>
                            <Typography>
                                <Title level={2}>Tutor</Title>
                                <Paragraph className='txt-ct'></Paragraph>
                            </Typography>
                        </Col>
                    </Row>
                </div>
            </Carousel>
        </>
    );
};

export default DescripcionesDeVista;
