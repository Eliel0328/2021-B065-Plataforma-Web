import React, { useState } from 'react';
import { Button, Card, Divider, Image, message, Steps, Typography } from 'antd';
import step_1 from '../../../file/excepciones/step_1.png';
import step_2 from '../../../file/excepciones/step_2.png';
import step_3 from '../../../file/excepciones/step_3.png';
import step_4 from '../../../file/excepciones/step_4.png';
import step_5 from '../../../file/excepciones/step_5.png';

export default function ManualExcepciones() {
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
            description: 'Seleccionar el tipo de página a Registrar',
            content: <SeleccionarTipo />,
        },
        {
            id: '101',
            title: 'Paso 2',
            description: 'Agregar Página',
            content: <AgregarPagina />,
        },
        {
            id: '102',
            title: 'Paso 3',
            description: 'Agregar Excepción',
            content: <AgregarExcepcion />,
        },
        {
            id: '103',
            title: 'Paso 4',
            description: 'Agregar No Permitida',
            content: <AgregarNoPermitida />,
        },
        {
            id: '104',
            title: 'Paso 5',
            description: 'Eliminar Página de una lista',
            content: <EliminarPagina />,
        },
    ];

    return (
        <div className='scroll_div' style={{ paddingBottom: 20 }} id='manual'>
            <div className='mg-10'>
                Las excepciones y los sitios No Permitidos complementan las funciones
                disponibles del sistema y evitan mostrar información extra que podria
                saturar al tutor.
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
                                'Manual de Registro de Excepciones y No Permitidas Revisado!'
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

const SeleccionarTipo = () => {
    return (
        <>
            <p>Seleccionar la lista a la que la página va a ser registrada.</p>
            <Divider />
            <Typography className='txt-ct'>
                En parte Superior Derecha de esta sección se encuentran dos botones para
                seleccionar el tipo de lista a la que se agregará la página.
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_1} alt='step 1' />
            </div>
        </>
    );
};

const AgregarPagina = () => {
    return (
        <>
            <p>Dar clic en la opción de agregar página.</p>
            <Divider />
            <Typography className='txt-ct'>
                Con el tipo de lista seleccionado, se debe seleccionar el botón que
                aparece en el inicio de la lista.
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

const AgregarExcepcion = () => {
    return (
        <>
            <p>Agregar página como Excepción.</p>
            <Divider />
            <Typography className='txt-ct'>
                Se desplegará un modal en el que se debe ingresar la dirección de la
                página (de esta se extrae el dominio) con lo que se puede filtrar los
                siguientes contenidos provenientes de esta dirección. Ademas, se debe
                ingresar una breve descripcion del porque este sitio se considera una
                Excepción.
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image
                    style={{ maxHeight: 500 }}
                    preview={false}
                    src={step_3}
                    alt='step 1'
                />
            </div>
        </>
    );
};

const AgregarNoPermitida = () => {
    return (
        <>
            <p>Agregar página como No Permitida.</p>
            <Divider />
            <Typography className='txt-ct'>
                Se desplegará un modal en el que se debe ingresar la dirección de la
                página (de esta se extrae el dominio) con lo que se puede filtrar los
                siguientes contenidos provenientes de esta dirección. Además, se debe
                ingresar una breve descripción del porque este sitio se considera una
                Excepción.
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image
                    style={{ maxHeight: 500 }}
                    preview={false}
                    src={step_4}
                    alt='step 1'
                />
            </div>
        </>
    );
};

const EliminarPagina = () => {
    return (
        <>
            <p>Eliminar página.</p>
            <Divider />
            <Typography className='txt-ct'>
                El procedimiento para eliminar una página de cualquiera de las listas es
                el mismo. Se debe seccionar la opción de Borrar Página.
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image
                    style={{ maxHeight: 500 }}
                    preview={false}
                    src={step_5}
                    alt='step 1'
                />
            </div>
        </>
    );
};
