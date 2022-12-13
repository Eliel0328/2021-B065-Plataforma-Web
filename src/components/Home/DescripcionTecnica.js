import React from 'react';
import { Card, Layout, Typography } from 'antd';
import DescripcionDeFuncionamiento from './Descripciones/DecripcionDeFuncionamiento';
import DescripcionesDeVista from './Descripciones/DescripcionesDeVista';
import '../../css/basicStyle.css';
const { Title } = Typography;

const DescripcionTecnica = () => {
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
                            <Title className='center'>Descripción Tecnica</Title>
                        </Typography>

                        <div style={{marginTop: 40}}>
                            <Typography>
                                <Title level={2}>
                                    Funcionamiento General del Sistema
                                </Title>
                            </Typography>
                            <DescripcionDeFuncionamiento />
                        </div>
                        <div style={{marginTop: 40}}>
                            <Typography>
                                <Title level={2}>Vistas de la plataforma</Title>
                            </Typography>
                            <DescripcionesDeVista />
                        </div>
                    </div>
                </Card>
            </Layout>
        </>
    );
};

export default DescripcionTecnica;
