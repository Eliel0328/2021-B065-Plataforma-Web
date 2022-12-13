import React, { useState } from 'react';
import { Button, Card, Divider, message, Steps } from 'antd';

export default function ManualExtension() {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const description = 'This is a description.';
    const content = 'This is a content.';
    const data = [
        { id: '100', title: 'Paso 1', description, content },
        { id: '101', title: 'Paso 2', description, content },
        { id: '102', title: 'Paso 3', description, content },
        { id: '103', title: 'Paso 4', description, content },
        { id: '104', title: 'Paso 5', description, content },
        { id: '105', title: 'Paso 6', description, content },
    ];

    return (
        <div>
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
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                    {data[current].content}
                </Card>
            </div>
            <div className='steps-action'>
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
            </div>
        </div>
    );
}
