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
                    error.response.data.msg === 'TUTOR_NO_REGISTRADO' ||
                    error.response.data.msg === 'DATOS_ERRONEOS'
                ) {
                    alertError(
                        'Datos incorrectos',
                        'Revise los datos ingresados.<br>En caso de que el problema con el administrador'
                    );
                }
            } else {
                alertError(
                    'Error de Conexi??n',
                    'Revise su conexi??n.<br>En caso de que el problema con el administrador'
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

    const recuperarContrase??a = async (email) => {
        try {
            // Verificar existencia de correo y enviar alerta corresponiente
            alertSuccess(
                'Correo enviado',
                'Revise su correo, es posible que el enlace correspondiente se encuentre en la secci??n de Spam.'
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
                'Configuraci??n NO guardada',
                'Revise su conexi??n.<br>En caso de que el problema con el administrador'
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
                        'El correo ingresado ya esta registrado, verifique su informaci??n'
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
                        'Revise su conexi??n.<br>En caso de que el problema con el administrador'
                    );
                } else {
                    alertError(
                        'Error',
                        'Revise su conexi??n.<br>En caso de que el problema con el administrador'
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
                    'Configuraci??n Actualizada',
                    'Se actualizo el n??mero de incidencias para el tutor'
                );
            }
        } catch (error) {
            console.error(error);
            alertError(
                'No es posible actualizar el n??mero de incidencias',
                'Revise su conexi??n.<br>En caso de que el problema con el administrador'
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
                    'Configuraci??n Actualizada',
                    'El estado de la extensi??n ha cambiado'
                );
            }
        } catch (error) {
            console.error(error);
            alertError(
                'No es posible actualizar el estado de la extensi??n',
                'Revise su conexi??n.<br>En caso de que el problema con el administrador'
            );
        }
    };

    const setCurrent = (data) => {
        dispatch({ type: SET_CURRENT, payload: data });
    };

    const updatePassword = async (data) => {
        try {
            console.log(data);
            const aux = getUserFromLocalStorage();
            const resultado = await client.patch('/actualizarPassword/' + aux.id, data);

            console.log(resultado);

            if (resultado.status === 200) {
                alertSuccess(
                    'Contrase??a Actualizada',
                    'La contrase??a fue actualizada correctamente'
                );
            }
            return 200;
        } catch (error) {
            console.error(error);
            if (error.response.status === 404) {
                if (error.response.data.msg === 'TUTOR_NO_ENCONTRADO') {
                    alertError(
                        'Tutor no encontrado',
                        'Revise su conexi??n.<br>En caso de que el problema con el administrador'
                    );
                } else {
                    alertError(
                        'Error',
                        'Revise su conexi??n.<br>En caso de que el problema con el administrador'
                    );
                }
                return 404;
            }
            return 401;
        }
    };

    const requestResetPassword = async (data) => {
        try {
            console.log(data);
            const resultado = await client.post('/requestPasswordReset/', {
                email: data,
                redirectUrl: 'http://vigilantt.tk/resetPassword',
            });

            if (resultado.status === 200) {
                alertSuccess(
                    'Petici??n realizada',
                    'Se envio un correo a la direcci??n ingresada'
                );
            }

            return 200;
        } catch (error) {
            console.error(error);
            if (error.response.data.msg === 'TUTOR_NO_REGISTRADO') {
                alertError(
                    'Correo no registrado',
                    'Revise su conexi??n.<br>En caso de que el problema con el administrador'
                );
            } else {
                alertError(
                    'Error',
                    'Revise su conexi??n.<br>En caso de que el problema con el administrador'
                );
            }
            return 400;
        }
    };

    const resetPassword = async (data) => {
        try {
            console.log(data);
            const resultado = await client.post('/passwordReset/', data);

            console.log(resultado);

            if (resultado.status === 200) {
                alertSuccess(
                    'Contrase??a Actualizada',
                    'La contrase??a fue actualizada correctamente'
                );
            }
            return 200;
        } catch (error) {
            console.error(error);
            alertError(
                'Error',
                'Revise su conexi??n.<br>En caso de que el problema con el administrador'
            );
            return 400;
        }
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
                recuperarContrase??a,
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
                updatePassword,
                requestResetPassword,
                resetPassword,
            }}
        >
            {props.children}
        </LoginContext.Provider>
    );
};
