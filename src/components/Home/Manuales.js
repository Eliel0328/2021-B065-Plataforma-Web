import React from 'react';
import {
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
import diagrama_informativo from '../../file/diagrama_informativo.png';
import advertencia from '../../file/advertencia.png';
import vigilantt from '../../file/Vigilantt.png';
import logo from '../../file/logo_1.png';
import '../../css/basicStyle.css';

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

const Manuales = () => {
    const { Title, Paragraph, Text, Link } = Typography;

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
                                Manuales
                            </Title>
                        </Typography>
                    </div>
                </Card>
            </Layout>
        </>
    );
};

export default Manuales;
