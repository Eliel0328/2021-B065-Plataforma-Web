import React, { useState } from 'react';
import { Button, Card, Divider, Image, message, Steps, Typography } from 'antd';
import step_1 from '../../../file/step_2.png';

export default function ManualRegistroCuenta() {
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
                El proceso del registro de una cuenta debe ser realizado desde la
                plataforma y consta un unico paso.
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
                            message.success('Manual de Inicio de sesion Revisado!')
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
            <p>Formulario para registro de Cuenta.</p>
            <Divider />
            <Typography className='txt-ct'>
                Para crear una cuenta se debe tener en cuenta los siguientes datos.
            </Typography>
            <ul>
                <li>Nombre(s)</li>
                <li>Apellido(s)</li>
                <li>Correo personal (no viculado a otra cuenta)</li>
                <li>
                    Contraseña (debe tener al menos 8 caracteres, una minuscula,
                    mayuscula, número y caracter especial)
                </li>
            </ul>
            <Typography className='txt-ct'>
                Estos datos deben ser ingresados en el siguiente formulario. En caso de
                ser correctos se creará una cuenta para acceder a las funciones ya
                mencionadas.
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
