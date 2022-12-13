import React, { useState } from 'react';
import { Button, Card, Divider, Image, message, Steps, Typography } from 'antd';
import step_1 from '../../../file/registro/step_1.png';
import step_2 from '../../../file/registro/step_2.png';
const { Text } = Typography;

export default function ManualCalificadoContenido() {
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
            description: 'Ingresar a Registro',
            content: <IngresarRegistro />,
        },
        {
            id: '101',
            title: 'Paso 2',
            description: 'Clasificar y guardar',
            content: <ClasificarGuardar />,
        },
    ];

    return (
        <div className='scroll_div' style={{ paddingBottom: 20 }}>
            <div className='mg-10'>
                Que el tutor pueda calificar el contenido que devuelve el clasificador
                tiene como objetivo hacer crecer el dataset para ir mejorando la calidad
                del clasificador. Por lo que este proceso es opcional y el proceso es el
                siguiente.
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
                            message.success(
                                'Manual de Calificado de Contenido Clasificado Revisado!'
                            )
                        }
                    >
                        Terminado
                    </Button>
                )}
            </div>
        </div>
    );
}

const IngresarRegistro = () => {
    return (
        <>
            <p>Ingresando a la sección de Registro se encontrara la siguiente lista.</p>
            <Divider />
            <Typography className='txt-ct'>
                Dentro de la lista de podrá seleccionar las incidencias de una visita en
                concreto seleccionando la opcion
            </Typography>
            <Text keyboard>Ver Contenido</Text>
            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_1} alt='step 1' />
            </div>
        </>
    );
};

const ClasificarGuardar = () => {
    return (
        <>
            <p>Modal para ver el contenido Clasificado.</p>
            <Divider />
            <Typography className='txt-ct'>
                En este modal podrá ver todas las incidencias registradas a la visita.
                Además de las etiquetas asignadas a cada segmento de contenido. A la
                derecha de cada tarjeta de segmento de contenido se encontraran algunas
                etiquetas y un cuadro de texto para que el tutor pueda dar su
                clasificación y una breve justificación en caso de que lo desee.
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image
                    style={{ maxHeight: 500 }}
                    preview={false}
                    src={step_2}
                    alt='step 1'
                />
            </div>
        </>
    );
};
