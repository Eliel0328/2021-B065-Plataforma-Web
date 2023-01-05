import React, { useState } from 'react';
import { Button, Card, Divider, Image, message, Steps } from 'antd';
import step_7 from '../../../file/manual_extension/step_7.png';
import step_8 from '../../../file/manual_extension/step_8.png';
import step_9 from '../../../file/manual_extension/step_9.png';

export default function ManualUsoExtension() {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0);

    const next = () => {
        document.getElementById('manual').parentElement.parentElement.scrollIntoView();
        setCurrent(current + 1);
    };
    const prev = () => {
        document.getElementById('manual').parentElement.parentElement.scrollIntoView();
        setCurrent(current - 1);
    };

    const data = [
        {
            id: '100',
            title: 'Paso 1',
            description: 'Iniciar Sesion',
            content: <IniciarSesion />,
        },
        {
            id: '101',
            title: 'Paso 2',
            description: 'Funcionamiento Correcto',
            content: <FuncionamientoCorrecto />,
        },
        {
            id: '102',
            title: 'Paso 3',
            description: 'Funcionamiento Incorrecto',
            content: <FuncionamientoIncorrecto />,
        },
    ];

    return (
        <div className='scroll_div' style={{ paddingBottom: 20 }} id='manual'>
            <div className='mg-10'>
                A continuación, se muestra cómo usar la extensión. Es importante recordar
                que es necesario tener una cuenta de tutor. Esta cuenta puede obtenerse en
                la plataforma. Además, la extensión está limitada a solo vincularse a una
                cuenta, por lo que este manual de uso se limita a mostrar como vincular la
                extensión con una cuenta y los mensajes posibles que la extensión pude
                regresar al usuario.
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
                            message.success('Manual de uso de Extensión Web Revisado!')
                        }
                    >
                        Terminado
                    </Button>
                )}
            </div>
        </div>
    );
}

const IniciarSesion = () => {
    return (
        <>
            <p>Vincular extensión con cuenta de tutor</p>
            <Divider />
            <p>
                En parte superior derecha del navegador podrá ver un botón que permite
                mostrar el listado de las extensiones. Se debe seleccionar la extensión y
                posteriormente iniciar sesión con los datos solicitados. Este es el único
                proceso que se debe realizar para el funcionamiento de la extensión.
            </p>

            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_7} alt='step 7' />
            </div>
        </>
    );
};

const FuncionamientoCorrecto = () => {
    return (
        <>
            <p>Extensión Activa</p>
            <Divider />
            <p>
                Con la sesión iniciada el mensaje que vera será el siguiente (Lo que
                indica que la extensión esta activa).
            </p>

            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_8} alt='step 7' />
            </div>
        </>
    );
};

const FuncionamientoIncorrecto = () => {
    return (
        <>
            <p>Error de Conexión</p>
            <Divider />
            <p>
                El siguiente mensaje se muestra en caso de que exista un error de
                conexión.
            </p>

            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_9} alt='step 7' />
            </div>
        </>
    );
};
