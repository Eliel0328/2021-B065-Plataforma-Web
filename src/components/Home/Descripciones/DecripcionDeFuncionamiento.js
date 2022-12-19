import React from 'react';
import { Steps, Typography } from 'antd';
import '../../../css/basicStyle.css';
const { Text } = Typography;

export default function DescripcionDeFuncionamiento() {
    const { Step } = Steps;

    const data = [
        {
            id: '100',
            title: 'El uso del navegador con la extensión instalada',
            description:
                'Una vez que el tutor ha instalado nuestra extensión en el navegador objetivo deberá ajustar el número mínimo de incidencias encontradas en una página para documentar el registro de la visita, por defecto está en 20 incidencias, una vez ajustado esto, nuestro sistema empezará a funcionar y a obtener contenido de la navegación del tutorado.',
        },
        {
            id: '101',
            title: 'Obtener el contenido',
            description:
                'Una vez que nuestro navegador tiene nuestra extensión instalada y que se configuró en la plataforma, lo único que deberá hacer es dejar que su hijo o tutorado utilice la computadora y navegue por la red, a partir de aquí, estaremos extrayendo la información de las páginas que visite. Todo este contenido que se vaya generando será constantemente segmentado y enviado al servidor.',
        },
        {
            id: '102',
            title: 'Enviarlo al servidor web',
            description:
                'El servidor estará constantemente recibiendo información de la navegación del tutorado, recolectamos los datos pertenecientes a la página, como su URL y el contenido separado en segmentos para ser clasificado.',
        },
        {
            id: '103',
            title: 'Verificar configuración del tutor ',
            description:
                'Además de poder ver los distintos registros de las incidencias guardadas de una forma gráfica. Panel de control del tutor donde se puede configurar los siguientes aspectos: Cambiar nombre, Cambiar email, Modificar el no. de incidencias, Encender o apagar la extensión.',
        },
        {
            id: '104',
            title: 'Clasificar contenido',
            description:
                'Una vez la extensión web recopilé el texto de la página web visitada se enviará al servidor de la plataforma el cual mandará el texto por partes al clasificador entrenado con técnicas de procesamiento de lenguaje natural para devolver un resultado de clasificación al servidor central.',
        },
        {
            id: '105',
            title: 'Guardar contenido',
            description:
                'Cuando el servidor central reciba los resultados de la clasificación si alguna sección del texto tiene etiquetas de texto vulgar, agresivo u ofensivo se contará como una incidencia, para que los resultados se guarden en el área de registros, se deberá tener las mismas o mayores incidencias de la configuración dada.',
        },
    ];

    return (
        <div>
            <Steps direction='vertical' current={5} progressDot>
                {data.map((item, index) => (
                    <Step
                        key={index}
                        title={
                            <Typography>
                                <Text strong>{item.title}</Text>
                            </Typography>
                        }
                        description={
                            <Typography className='txt-ct'>{item.description}</Typography>
                        }
                    />
                ))}
            </Steps>
        </div>
    );
}
