import React, { useState } from 'react';
import { Button } from 'antd';
import DescripcionGeneral from '../components/Home/DescripcionGeneral';
import DescripcionTecnica from '../components/Home/DescripcionTecnica';
import Manuales from '../components/Home/Manuales';
import '../css/basicStyle.css';

const Home = () => {
    const [pestaña1, setPestaña1] = useState(false);
    const [pestaña2, setPestaña2] = useState(false);
    const [pestaña3, setPestaña3] = useState(true);

    const onPressBtn1 = () => {
        setPestaña1(true);
        setPestaña2(false);
        setPestaña3(false);
    };

    const onPressBtn2 = () => {
        setPestaña1(false);
        setPestaña2(true);
        setPestaña3(false);
    };

    const onPressBtn3 = () => {
        setPestaña1(false);
        setPestaña2(false);
        setPestaña3(true);
    };

    return (
        <>
            <div className='center'>
                <Button
                    className='mg-10'
                    type={pestaña1 ? 'primary' : 'ghost'}
                    onClick={() => onPressBtn1()}
                >
                    Descripción General
                </Button>
                <Button
                    className='mg-10'
                    type={pestaña2 ? 'primary' : 'ghost'}
                    onClick={() => onPressBtn2()}
                >
                    Descripción Técnica
                </Button>
                <Button
                    className='mg-10'
                    type={pestaña3 ? 'primary' : 'ghost'}
                    onClick={() => onPressBtn3()}
                >
                    Manuales
                </Button>
            </div>

            {pestaña1 ? <DescripcionGeneral /> : ''}
            {pestaña2 ? <DescripcionTecnica /> : ''}
            {pestaña3 ? <Manuales /> : ''}
        </>
    );
};

export default Home;
