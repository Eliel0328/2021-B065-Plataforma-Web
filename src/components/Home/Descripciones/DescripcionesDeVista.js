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
import cap_excepciones from '../../../file/vistas/excepciones.png';
import cap_tutor from '../../../file/vistas/tutor.png';
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

    const irSeccion = (seccion) => {
        window.scrollTo(0, 0);
        setCurrent(seccion);
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
                                <Button onClick={() => irSeccion('registro')}>
                                    Ir a Registro
                                </Button>
                            </Link>
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
                        <Col span={10} style={{ padding: '10px' }}>
                            <Typography>
                                <Title level={2}>Excepciones</Title>
                                <Paragraph className='txt-ct'>
                                    En la sección de excepciones podrás encontrar las
                                    paginas que no es necesario que clasifiquemos. Estas
                                    se clasificarán en dos:
                                </Paragraph>
                                <Paragraph className='txt-ct'>
                                    <Text strong>• Excepciones</Text>: Estas paginas no se
                                    intentarán clasificar ya que el que pertenezcan a esta
                                    lista, serán consideradas como permitidas por el tutor
                                    para que su tutorado visite y navegue sin aviso
                                    alguno.
                                </Paragraph>
                                <Paragraph className='txt-ct'>
                                    <Text strong>• No Permitidas</Text>: Estas páginas no
                                    se intentarán clasificar, ya que el que pertenezcan a
                                    esta lista, significa que son consideradas
                                    directamente como ofensivas, agresivas y/o vulgares,
                                    por lo que su visita será registrada.
                                </Paragraph>
                            </Typography>
                        </Col>
                        <Col span={10} style={{ padding: '5%' }}>
                            <Image alt='Captura de Excepciones' src={cap_excepciones} />
                            <Link to='/excepciones'>
                                <Button onClick={() => irSeccion('excepciones')}>
                                    Ir a Excepciones
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className='center' style={contentStyle}>
                        <Col span={10} style={{ padding: '5%' }}>
                            <Image alt='Captura de Registro' src={cap_tutor} />
                            <Link to='/perfil'>
                                <Button onClick={() => irSeccion('tutor')}>
                                    Ir a Tutor
                                </Button>
                            </Link>
                        </Col>
                        <Col span={10} style={{ padding: '10px' }}>
                            <Typography>
                                <Title level={2}>Tutor</Title>
                                <Paragraph className='txt-ct'>
                                    La sección para el tutor permite ver y configurar el
                                    sistema según lo decida. Puede modificar el número de
                                    incidencias minimas para el registro de información,
                                </Paragraph>
                                <Paragraph className='txt-ct'>
                                    puede encender o apagar la extensión. Además podrá
                                    acceder a graficas que resumen algunos datos
                                    compilados por el sistema como las incidencias
                                    semanales, el tipo de incidencias por dia, la visita a
                                    sitios No Permitidos y el tiempo de conexión de la
                                    extensión.
                                </Paragraph>
                            </Typography>
                        </Col>
                    </Row>
                </div>
            </Carousel>
        </>
    );
};

export default DescripcionesDeVista;
