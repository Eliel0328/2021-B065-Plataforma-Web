import React, { useState } from 'react';
import { Button, Card, Divider, Image, message, Steps, Typography } from 'antd';
import step_1 from '../../../file/step_1.png';

export default function ManualInicioSesion() {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const data = [
        {
            id: '100',
            title: 'Paso 1',
            description: 'Formulario',
            content: <RellenarFormulario />,
        },
    ];

    return (
        <div className='scroll_div' style={{ paddingBottom: 20 }}>
            <div className='mg-10'>
                El proceso para iniciar sesion en la plataforma consta de un unico paso.
            </div>
            <Steps direction='horizontal' current={current} progressDot>
                {data.map((item, index) => (
                    <Step key={index} title={item.title} description={item.description} />
                ))}
            </Steps>
            <div className='steps-content'>
                <Card
                    style={{
                        width: 800,
                        margin: 20,
                    }}
                >
                    {data[current].content}
                </Card>
            </div>
            <div className='steps-action'>
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Anterior
                    </Button>
                )}
                {current < data.length - 1 && (
                    <Button type='primary' onClick={() => next()}>
                        Siguiente
                    </Button>
                )}
                {current === data.length - 1 && (
                    <Button
                        type='primary'
                        onClick={() =>
                            message.success('Manual de Registro de Cuenta Revisado!')
                        }
                    >
                        Terminado
                    </Button>
                )}
            </div>
        </div>
    );
}

const RellenarFormulario = () => {
    return (
        <>
            <p>Formulario para Iniciar sesion.</p>
            <Typography className='txt-ct'>
                Para iniciar sesión es necesario usar el correo y contraseña vinculado a
                la cuenta
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image
                    style={{ maxHeight: 500 }}
                    preview={false}
                    src={step_1}
                    alt='step 1'
                />
            </div>
        </>
    );
};
