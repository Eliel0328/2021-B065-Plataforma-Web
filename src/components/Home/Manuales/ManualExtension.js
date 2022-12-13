import React, { useState } from 'react';
import { Button, Card, Divider, Image, message, Steps, Typography } from 'antd';
import chrome from '../../../file/navegadores/chrome.png';
import brave from '../../../file/navegadores/brave.png';
import edge from '../../../file/navegadores/edge.png';
import opera from '../../../file/navegadores/opera.png';
import step_1 from '../../../file/manual_extension/step_1.png';
import step_3 from '../../../file/manual_extension/step_3.png';
import step_4 from '../../../file/manual_extension/step_4.png';
import step_5 from '../../../file/manual_extension/step_5.png';
import step_6 from '../../../file/manual_extension/step_6.png';
const { Text } = Typography;

export default function ManualExtension() {
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
            description: 'Prerequisitos',
            content: <Prerequisitos />,
        },
        {
            id: '101',
            title: 'Paso 2',
            description: 'Descargar Extensión',
            content: <Descarga />,
        },
        {
            id: '102',
            title: 'Paso 3',
            description: 'Descomprimir Extensión',
            content: <Descomprimir />,
        },
        {
            id: '103',
            title: 'Paso 4',
            description: 'Ingresar al navegador',
            content: <IngresarNavegador />,
        },
        {
            id: '104',
            title: 'Paso 5',
            description: 'Activar el modo desarrollador',
            content: <ModoDesarrollador />,
        },
        {
            id: '105',
            title: 'Paso 6',
            description: 'Cargar Extensión',
            content: <CargarExtension />,
        },
        {
            id: '106',
            title: 'Paso 7',
            description: 'Activar Extensión',
            content: <ActivarExtension />,
        },
    ];

    return (
        <div className='scroll_div' style={{ paddingBottom: 20 }}>
            <div className='mg-10'>
                El proceso para instalar la Extensión Web es el siguiente:
            </div>
            <Steps direction='horizontal' current={current} progressDot>
                {data.map((item, index) => (
                    <Step key={index} title={item.title} description={item.description} />
                ))}
            </Steps>
            <div className='steps-content center'>
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
                        onClick={() => message.success('Processing complete!')}
                    >
                        Terminado
                    </Button>
                )}
            </div>
        </div>
    );
}

const Prerequisitos = () => {
    return (
        <>
            <p>
                Los requisitos para que la Extensión funcione correctamente son los
                siguientes:
            </p>
            <Divider />
            <p>• Navegador compatible con google Chrome.</p>

            <Image preview={false} width={70} src={brave} />
            <Image preview={false} width={90} src={chrome} />
            <Image preview={false} width={80} src={edge} />
            <Image preview={false} width={80} src={opera} />
            <Divider />
            <p>• Cuenta de tutor, esta debe ser creada desde la plataforma.</p>
        </>
    );
};

const Descarga = () => {
    return (
        <>
            <p>El repositorio se encuentra alojado en GitHub.</p>
            <Divider />
            <Typography>
                Descargar la extensión desde el repositorio de la{' '}
                <a
                    href='https://github.com/Eliel0328/2021-B065-Extension'
                    target='_blank'
                >
                    Extension Web
                </a>{' '}
                usando la opción de
                <Text keyboard>Download ZIP</Text>
                en la sección de Code de arriba de la página.
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_1} alt='step 1' />
            </div>
        </>
    );
};

const Descomprimir = () => {
    return (
        <>
            <p>Descomprimir el archivo descargado.</p>
            <Divider />
            <Typography>
                Es recomendado usar
                <a href='https://www.winrar.es/descargas/winrar' target='_blank'>
                    {' '}
                    WinRAR
                </a>{' '}
                aunque cualquier programa para descomprimir archivos es válido.
            </Typography>
        </>
    );
};

const IngresarNavegador = () => {
    return (
        <>
            <p>Acceda a la configuración del navegador.</p>
            <Divider />
            <Typography>
                Ingrese al navegador(compatible con Chrome) donde desea instalar la
                extensión web. En una nueva pestaña, sobre la barra de busqueda ingrese la
                siguiente dirección. <Text keyboard>chrome://extensions/</Text>
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_3} alt='step 1' />
            </div>
        </>
    );
};

const ModoDesarrollador = () => {
    return (
        <>
            <p>Active las opciones de desarrollador.</p>
            <Divider />
            <Typography>
                Una vez ingresando a la dirección se debe activar el modo desarrollador en
                la esquina superior derecha.
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_4} alt='step 1' />
            </div>
        </>
    );
};

const CargarExtension = () => {
    return (
        <>
            <p>Cargar extensión sin empaquetar.</p>
            <Divider />
            <Typography>
                Se debe seleccionar la opción de cargar extensión sin empaquetar.
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_5} alt='step 1' />
            </div>
        </>
    );
};

const ActivarExtension = () => {
    return (
        <>
            <p>Activar extensión.</p>
            <Divider />
            <Typography>
                Se nos mostrara la opción de subir la extensión para lo cual debemos
                seleccionar la carpeta del archivo descomprimido. Al finalizar esta acción
                podra ver la extension con el resto de extensiones disponibles en el
                navegador.
            </Typography>
            <div style={{ marginTop: 30 }} align='center'>
                <Image preview={false} src={step_6} alt='step 1' />
            </div>
        </>
    );
};
