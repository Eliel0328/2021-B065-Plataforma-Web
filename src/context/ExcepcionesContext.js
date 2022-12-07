import React, { createContext, useReducer } from 'react';
import ExcepcionesReducer from '../reducer/ExcepcionesReducer';

import axios from 'axios';

import {
    OBTENER_PERMITIDAS,
    AGREGAR_PERMITIDAS,
    ELIMINAR_PERMITIDA,
    OBTENER_NO_PERMITIDAS,
    AGREGAR_NO_PERMITIDAS,
    ELIMINAR_NO_PERMITIDA,
} from '../const/actionTypes';
import alertTopEnd from '../helpers/alertTopEnd';
import getUserFromLocalStorage from '../helpers/getUserFromLocalStorage';

const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const ExcepcionesContext = createContext();

export const ExcepcionesContextProvider = (props) => {
    const initialState = {
        listaBlanca: [],
        listaNegra: [],
        permitidaActual: null,
        noPermitidaActual: null,
        key: 0,
    };

    const [state, dispatch] = useReducer(ExcepcionesReducer, initialState);

    const obtenerPermitidas = async () => {
        try {
            const user = getUserFromLocalStorage();
            const resultado = await client.get('/getPaginasPermitidas/' + user.id);
            // TODO: Agregar funcion para obtener las paginas
            dispatch({ type: OBTENER_PERMITIDAS, payload: resultado.data });
        } catch (error) {
            alertTopEnd(
                'error',
                'Lista de Páginas No obtenida',
                'Revise su conexión.<br>En caso de que el problema con el administrador'
            );
            console.error(error);
        }
    };

    const agregarPermitidas = async (pagina) => {
        try {
            const user = getUserFromLocalStorage();
            console.log(pagina);

            pagina.permitido = true;
            pagina.tutorId = user.id;

            const resultado = await client.post('/registroPagina/' + user.id, pagina);
            console.log(resultado.data);

            if (resultado.data.msg === 'NUEVO_CREADO') {
                dispatch({ type: AGREGAR_PERMITIDAS, payload: resultado.data.data });
                alertTopEnd(
                    'success',
                    'Correcto',
                    'Se agregado correctamente la página a la lista.'
                );
            } else {
                alertTopEnd(
                    'warning',
                    'Página No Agregada',
                    resultado.data.msg === 'PERMITIDO_EXISTE'
                        ? 'La página que desea agregar pertenece a un dominio ya agregado a lista de páginas permitidas'
                        : 'La página que desea agregar pertenece a un dominio ya agregado a lista de páginas no permitidas'
                );
            }
        } catch (error) {
            alertTopEnd(
                'error',
                'Página No Agregada',
                'Revise su conexión.<br>En caso de que el problema con el administrador'
            );
            console.log(error);
        }
    };

    const eliminarPermitida = async (key) => {
        try {
            const resultado = await client.delete('/borrarPagina/' + key);
            dispatch({ type: ELIMINAR_PERMITIDA, payload: key });
            alertTopEnd(
                'success',
                'Página Eliminada',
                'La página fue eliminada correctamente.'
            );
        } catch (error) {
            alertTopEnd(
                'error',
                'Página No eliminada',
                'Revise su conexión.<br>En caso de que el problema con el administrador'
            );
            console.log(error);
        }
    };

    const obtenerNoPermitidas = async () => {
        try {
            const user = getUserFromLocalStorage();
            const resultado = await client.get('/getPaginasNoPermitidas/' + user.id);
            dispatch({ type: OBTENER_NO_PERMITIDAS, payload: resultado.data });
        } catch (error) {
            alertTopEnd(
                'error',
                'Lista de Páginas No obtenida',
                'Revise su conexión.<br>En caso de que el problema con el administrador'
            );
            console.error(error);
        }
    };

    const agregarNoPermitidas = async (pagina) => {
        try {
            const user = getUserFromLocalStorage();

            pagina.permitido = false;
            pagina.tutorId = user.id;

            const resultado = await client.post('/registroPagina/' + user.id, pagina);
            console.log(resultado);
            
            if (resultado.data.msg === 'NUEVO_CREADO') {
                dispatch({ type: AGREGAR_NO_PERMITIDAS, payload: resultado.data.data });
                alertTopEnd(
                    'success',
                    'Correcto',
                    'Se agregado correctamente la página a la lista.'
                );
            } else {
                alertTopEnd(
                    'warning',
                    'Página No Agregada',
                    resultado.data.msg === 'PERMITIDO_EXISTE'
                        ? 'La página que desea agregar pertenece a un dominio ya agregado a lista de páginas permitidas'
                        : 'La página que desea agregar pertenece a un dominio ya agregado a lista de páginas no permitidas'
                );
            }
        } catch (error) {
            alertTopEnd(
                'error',
                'Página No agregada',
                'Revise su conexión.<br>En caso de que el problema con el administrador'
            );
            console.log(error);
        }
    };

    const eliminarNoPermitida = async (key) => {
        try {
            const resultado = await client.delete('/borrarPagina/' + key);
            dispatch({ type: ELIMINAR_NO_PERMITIDA, payload: key });
            alertTopEnd(
                'success',
                'Página Eliminada',
                'La página fue eliminada correctamente.'
            );
        } catch (error) {
            alertTopEnd(
                'error',
                'Página No eliminada',
                'Revise su conexión.<br>En caso de que el problema con el administrador'
            );
            console.log(error);
        }
    };

    return (
        <ExcepcionesContext.Provider
            value={{
                listaBlanca: state.listaBlanca,
                listaNegra: state.listaNegra,
                permitidaActual: state.permitidaActual,

                key: state.key,

                obtenerPermitidas,
                agregarPermitidas,
                eliminarPermitida,
                obtenerNoPermitidas,
                agregarNoPermitidas,
                eliminarNoPermitida,
            }}
        >
            {props.children}
        </ExcepcionesContext.Provider>
    );
};
