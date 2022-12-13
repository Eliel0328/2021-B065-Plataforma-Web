import React, { createContext, useReducer } from 'react';
import LoginReducer from '../reducer/LoginReducer';

import axios from 'axios';

import {
    SET_CURRENT,
    SET_ESTADO_EXTENSION,
    SET_INCIDECIAS_TUTOR,
    SET_TOKEN,
    SET_TUTOR,
    SET_USER,
    UPDATE_CONFIG,
} from '../const/actionTypes';
import alertTopEnd from '../helpers/alertTopEnd';
import getTokenFromLocalStorage from '../helpers/getTokenFromLocalStorage';
import getUserFromLocalStorage from '../helpers/getUserFromLocalStorage';

export const LoginContext = createContext();

const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const LoginContextProvider = (props) => {
    const initialState = {
        token: null,
        user: null,
        tutor: null,
        current: 'home',
    };

    const [state, dispatch] = useReducer(LoginReducer, initialState);

    const alertError = (title, msg) => {
        alertTopEnd('error', title, msg);
    };

    const alertSuccess = (title, msg) => {
        alertTopEnd('success', title, msg);
    };

    const setToken = (userToken) => {
        if (getToken() === null) {
            sessionStorage.setItem('token', JSON.stringify(userToken));
        } else {
            dispatch({ type: SET_TOKEN, payload: userToken });
        }
    };

    const getToken = () => {
        return getTokenFromLocalStorage();
    };

    const removeToken = () => {
        sessionStorage.removeItem('token');
    };

    const setUserData = (userData) => {
        if (getUserData() === null) {
            sessionStorage.setItem('user', JSON.stringify(userData));
        } else {
            dispatch({ type: SET_USER, payload: userData });
        }
    };

    const getUserData = () => {
        return getUserFromLocalStorage();
    };

    const removeUserData = () => {
        sessionStorage.removeItem('user');
    };

    const loginUser = async (loginData) => {
        try {
            const resultado = await client.post('/login', loginData);

            if (resultado.status === 200) {
                alertSuccess('Acceso Autorizado', 'Los datos ingresados son correctos');

                setToken(resultado.data.token);
                setUserData(resultado.data.user);
                dispatch({ type: SET_TOKEN, payload: resultado.data.token });
                dispatch({ type: SET_USER, payload: resultado.data.user });
            }
        } catch (error) {
            console.error(error);
            if (error.response.status === 400) {
                if (error.response.data.msg === 'DATOS_VACIOS') {
                    alertError(
                        'Datos incompletos',
                        'Ingrese los datos ingresados.<br>En caso de que el problema con el administrador'
                    );
                } else if (
                    error.response.data.msg === 'TUTOR_NO_REGISTRADO ' ||
                    error.response.data.msg === 'DATOS_ERRONEOS'
                ) {
                    alertError(
                        'Datos incorrectos',
                        'Revise los datos ingresados.<br>En caso de que el problema con el administrador'
                    );
                }
            } else {
                alertError(
                    'Error de Conexión',
                    'Revise su conexión.<br>En caso de que el problema con el administrador'
                );
            }
        }
    };

    const logoutUser = async () => {
        try {
            // const resultado = await client.post('/login', loginData);
            removeToken();
            removeUserData();
            dispatch({ type: SET_TOKEN, payload: null });
            dispatch({ type: SET_USER, payload: null });
        } catch (error) {
            console.error(error);
        }
    };

    const recuperarContraseña = async (email) => {
        try {
            // Verificar existencia de correo y enviar alerta corresponiente
            alertSuccess(
                'Correo enviado',
                'Revise su correo, es posible que el enlace correspondiente se encuentre en la sección de Spam.'
            );
        } catch (error) {
            alertError(
                'Datos incorrectos',
                'Revise los datos ingresados.<br>En caso de que el problema con el administrador'
            );
            console.error(error);
        }
    };

    const modificarConfiguracionUser = async (conf) => {
        try {
            // Modificar configuracion de usuario
            dispatch({ type: UPDATE_CONFIG, payload: conf });
            alertSuccess(
                'Configuracion guardada',
                'La actualizacion a su configuracion se realizo correctamente.'
            );
        } catch (error) {
            alertError(
                'Configuración NO guardada',
                'Revise su conexión.<br>En caso de que el problema con el administrador'
            );
            console.error(error);
        }
    };

    const verificarCorreo = async (correo) => {
        try {
            const resultado = await client.get('/verificarCorreo/' + correo);
            let registrado = resultado.data;
            return registrado;
        } catch (error) {
            console.error(error);
        }
    };

    const registrarTutor = async (formulario) => {
        try {
            // Agregr configuracion adicional
            formulario.extensionActiva = true;
            formulario.numIncidencias = 20;

            const resultado = await client.post('/registrarTutor', formulario);

            if (resultado.status === 201) {
                alertSuccess(
                    'Tutor creado',
                    'La cuenta para el tutor ha sido creada con exito'
                );

                let aux = resultado.data;

                setToken(aux.data.token);
                setUserData(aux.data.user);
                dispatch({ type: SET_TOKEN, payload: aux.data.token });
                dispatch({ type: SET_USER, payload: aux.data.user });
            }

            return 201;
        } catch (error) {
            console.error(error);
            if (error.response.status === 400) {
                if (error.response.data.msg === 'DATOS_INCOMPLETOS') {
                    alertError(
                        'Datos incompletos',
                        'Ingrese los datos ingresados.<br>En caso de que el problema con el administrador'
                    );
                } else if (error.response.data.msg === 'CORREO_REGISTRADO') {
                    alertError(
                        'Correo registrado',
                        'El correo ingresado ya esta registrado, verifique su información'
                    );
                }
            }

            return 400;
        }
    };

    const getTutor = async () => {
        try {
            const aux = getUserFromLocalStorage();
            const resultado = await client.get('/getTutor/' + aux.id);

            if (resultado.status === 200) {
                dispatch({ type: SET_TUTOR, payload: resultado.data });
            }
        } catch (error) {
            console.error(error);
            if (error.response.status === 404) {
                if (error.response.data.msg === 'TUTOR_NO_ENCONTRADO') {
                    alertError(
                        'Tutor no encontrado',
                        'Revise su conexión.<br>En caso de que el problema con el administrador'
                    );
                } else {
                    alertError(
                        'Error',
                        'Revise su conexión.<br>En caso de que el problema con el administrador'
                    );
                }
            }
        }
    };

    const setNumeroIncidencias = async (numIncidencias) => {
        try {
            const aux = getUserFromLocalStorage();
            const resultado = await client.patch('/actualizarIncidencias/' + aux.id, {
                numIncidencias,
            });

            if (resultado.status === 200) {
                dispatch({ type: SET_INCIDECIAS_TUTOR, payload: numIncidencias });
                alertSuccess(
                    'Configuración Actualizada',
                    'Se actualizo el número de incidencias para el tutor'
                );
            }
        } catch (error) {
            console.error(error);
            alertError(
                'No es posible actualizar el número de incidencias',
                'Revise su conexión.<br>En caso de que el problema con el administrador'
            );
        }
    };

    const setEstadoExtension = async (extensionActiva) => {
        try {
            const aux = getUserFromLocalStorage();
            const resultado = await client.patch('/activarExtension/' + aux.id, {
                extensionActiva,
            });

            if (resultado.status === 200) {
                dispatch({ type: SET_ESTADO_EXTENSION, payload: extensionActiva });
                alertSuccess(
                    'Configuración Actualizada',
                    'El estado de la extensión ha cambiado'
                );
            }
        } catch (error) {
            console.error(error);
            alertError(
                'No es posible actualizar el estado de la extensión',
                'Revise su conexión.<br>En caso de que el problema con el administrador'
            );
        }
    };

    const setCurrent = (data) => {
        dispatch({ type: SET_CURRENT, payload: data });
    };
    return (
        <LoginContext.Provider
            value={{
                token: state.token,
                user: state.user,
                tutor: state.tutor,
                current: state.current,
                loginUser,
                logoutUser,
                setToken,
                getToken,
                removeToken,
                recuperarContraseña,
                setUserData,
                getUserData,
                removeUserData,
                modificarConfiguracionUser,
                verificarCorreo,
                registrarTutor,
                getTutor,
                setNumeroIncidencias,
                setEstadoExtension,
                setCurrent,
            }}
        >
            {props.children}
        </LoginContext.Provider>
    );
};
