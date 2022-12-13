import React, { useContext, useEffect, useState } from 'react';
import {
    ExceptionOutlined,
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Image } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Registro from './Registro';
import Login from './Login';
import Home from './Home';
import Excepciones from './Excepciones';
import { LoginContext } from '../context/LoginContext';
import Swal from 'sweetalert2';
import { Tutor } from './Tutor';
import { Recuperar } from './Recuperar';
import '../css/basicStyle.css';
import logo from '../file/logo_1.png';

const { Header, Content, Footer } = Layout;

const itemsWithoutToken = [
    {
        label: <Link to='/login'>Ingresar</Link>,
        key: 'inicio',
        icon: <LoginOutlined />,
    },
];

const itemsWithToken = [
    {
        label: <Link to='/home'>Inicio</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to='/registro'>Registro</Link>,
        key: 'registro',
        icon: <UnorderedListOutlined />,
    },
    {
        label: <Link to='/excepciones'>Excepciones</Link>,
        key: 'excepciones',
        icon: <ExceptionOutlined />,
    },
    {
        label: <Link to='/perfil'>Tutor</Link>,
        key: 'tutor',
        icon: <UserOutlined />,
    },
    // {
    //     label: <Link to='/recuperar'>Recuperar Contraseña</Link>,
    //     key: 'recuperar',
    //     icon: <RetweetOutlined />,
    // },
    {
        label: 'Cerrar Sesión',
        key: 'cerrarSesion',
        icon: <LogoutOutlined />,
    },
];

const RouterPage = () => {
    // const [current, setCurrent] = useState('home');
    const { token, setToken, getToken, logoutUser, setUserData, getUserData, current, setCurrent } =
        useContext(LoginContext);

    useEffect(() => {
        let aux = getToken();
        let aux2 = getUserData();
        if (aux && aux2) {
            setToken(aux);
            setUserData(aux2);
        } else {
            console.log('No token');
        }
    }, []);

    const onClick = (e) => {
        setCurrent(e.key);
        if (e.key === 'cerrarSesion') {
            Swal.fire({
                title: 'Desea cerrar sesion?',
                text: 'Esto no cerrara sesion en la extension',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cerrar Sesion',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    setCurrent('home');
                    logoutUser();
                }
            });
        }
    };

    return (
        <>
            <Router>
                <Layout>
                    <Header
                        style={{
                            position: 'fixed',
                            zIndex: 1000,
                            width: '100%',
                        }}
                    >
                        <div className='logo' />

                        {token ? (
                            <Menu
                                onClick={onClick}
                                selectedKeys={[current]}
                                items={itemsWithToken}
                                theme='dark'
                                mode='horizontal'
                                multiple='true'
                            ></Menu>
                        ) : (
                            <Menu
                                onClick={onClick}
                                selectedKeys={'inicio'}
                                items={itemsWithoutToken}
                                theme='dark'
                                mode='horizontal'
                            ></Menu>
                        )}
                    </Header>
                    <Content
                        className='site-layout-background'
                        style={{
                            margin: '80px 20px 0px 20px',
                            padding: 15,
                            minHeight: 800,
                            background: "#F0F2F5"
                        }}
                    >
                        <Routes>
                            <Route
                                path='/login'
                                element={!token ? <Login /> : <Navigate to='/home' />}
                            ></Route>
                            <Route
                                path='/home'
                                element={token ? <Home /> : <Navigate to='/login' />}
                            ></Route>
                            <Route
                                path='/registro'
                                element={token ? <Registro /> : <Navigate to='/login' />}
                            ></Route>
                            <Route
                                path='/excepciones'
                                element={
                                    token ? <Excepciones /> : <Navigate to='/login' />
                                }
                            ></Route>
                            <Route
                                path='/perfil'
                                element={token ? <Tutor /> : <Navigate to='/login' />}
                            ></Route>
                            <Route
                                path='/recuperar'
                                element={token ? <Recuperar /> : <Navigate to='/login' />}
                            ></Route>
                            <Route
                                path='*'
                                element={
                                    !token ? (
                                        <Navigate to='/login' />
                                    ) : (
                                        <Navigate to='/home' />
                                    )
                                }
                            />
                        </Routes>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <img
                            width={40}
                            src={logo}
                        />
                        Vigilantt ©2022
                    </Footer>
                </Layout>
            </Router>
        </>
    );
};

export default RouterPage;
