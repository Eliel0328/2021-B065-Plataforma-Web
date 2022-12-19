import React, { useState } from 'react';
import { Button, Card, Divider, Image, message, Steps, Typography } from 'antd';
import step_1 from '../../../file/tutor/step_1.png';
import step_2 from '../../../file/tutor/step_2.png';
import step_3 from '../../../file/tutor/step_3.png';
import step_4 from '../../../file/tutor/step_4.png';
import step_5 from '../../../file/tutor/step_5.png';
const { Text } = Typography;

export default function ManualTutor() {
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
            description: 'Inciendecias y Extensión',
            content: <IncidenciasExtension />,
        },
        {
            id: '101',
            title: 'Paso 2',
            description: 'Incidencias semanales',
            content: <IncidenciasSemanales />,
        },
        {
            id: '102',
            title: 'Paso 3',
            description: 'Tipos de incidencias',
            content: <TipoDeIncidencias />,
        },
        {
            id: '103',
            title: 'Paso 4',
            description: 'Sitios No Permitidos',
            content: <SitioNoPermitidos />,
        },
        {
            id: '104',
            title: 'Paso 5',
            description: 'Tiempo de conexion',
            content: <TiempoDeConexion />,
        },
    ];

    return (
        <div className='scroll_div' style={{ paddingBottom: 20 }} id='manual'>
            <div className='mg-10'>
                Esta sección explica la configuracion del sistema y también da un
                introducción a las graficas disponibles para el tutor.
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
                                'Manual de Configuraciones del Tutor Revisado!'
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

const IncidenciasExtension = () => {
    return (
        <>
            <p>Control de incidencias y Extensión</p>
            <Divider />
            <Typography className='txt-ct'>
                Para poder registrar las incidencias se busca el tutor establezca un
                mínimo de incidencias para su registro.
            </Typography>
            <Typography className='txt-ct'>
                También se tiene la opción de encender o apagar la Extensión según se
                necesite.
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

const IncidenciasSemanales = () => {
    return (
        <>
            <p>El número de incidencias por cada semana</p>
            <Divider />
            <Typography className='txt-ct'>
                En la siguiente grafica se podrán seleccionar una semana para poder
                revisar la cantidad de incidencias de cada semana.
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

const TipoDeIncidencias = () => {
    return (
        <>
            <p>Tipo de Incidencias por día</p>
            <Divider />
            <Typography className='txt-ct'>
                Selecciona la fecha para ver el tipo de incidencias registradas durante
                ese día. Para revisar en profundidad estas incidencias debe ingresar al
                registro y revisar el registro usando los filtros para la fecha.
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

const SitioNoPermitidos = () => {
    return (
        <>
            <p>Sitios no Permitidos por día</p>
            <Divider />
            <Typography className='txt-ct'>
                Selecciona la fecha para ver las visitas a los sitios no permitidos dentro
                de una fecha específica. Para ver el listado completo de sitios No
                Permitidos revisar la sección de excepciones.
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

const TiempoDeConexion = () => {
    return (
        <>
            <p>Tiempo de Conexion por Semana</p>
            <Divider />
            <Typography className='txt-ct'>
                En la siguiente grafica se podrán seleccionar una semana para poder
                revisar el tiempo de conexión por semana. Esto tiene el propósito de
                comprobar que la extensión este conectada y funcionando correctamente.
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
