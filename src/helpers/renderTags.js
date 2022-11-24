import { Tag } from 'antd';
import React from 'react';

export const renderTags = (contenido) => {
    return (
        <center>
            {contenido.map((tag) => {
                let color = null;
                if (tag === 'Ofensivo') {
                    color = 'red';
                } else if (tag === 'Vulgar') {
                    color = 'magenta';
                } else if (tag === 'Agresivo') {
                    color = 'volcano';
                } else if (tag === 'No Calificado') {
                    color = 'grey';
                } else {
                    color = 'green';
                }

                return (
                    <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                );
            })}
        </center>
    );
};
