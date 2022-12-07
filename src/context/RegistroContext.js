import React, { createContext, useReducer } from 'react';
import RegistroReducer from '../reducer/RegistroReducer';

import axios from 'axios';

import {
    MODIFICAR_SEGMENTO,
    OBTENER_CONTENIDO,
    OBTENER_REGISTRO,
    SET_KEY,
} from '../const/actionTypes';
import alertTopEnd from '../helpers/alertTopEnd';
import getUserFromLocalStorage from '../helpers/getUserFromLocalStorage';

export const RegistroContext = createContext();

const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const RegistroContextProvider = (props) => {
    const setTags = (x1, x2, x3) => {
        let aux = [];
        if (x1 !== 0) {
            aux.push('Vulgar');
        }
        if (x2 !== 0) {
            aux.push('Agresivo');
        }
        if (x3 !== 0) {
            aux.push('Ofensivo');
        }

        if (x1 === 0 && x2 === 0 && x3 === 0) {
            aux.push('No Ofensivo');
        }
        return aux;
    };

    const initialState = {
        registro: [],
        contenido: [],
        key: 0,
    };

    const [state, dispatch] = useReducer(RegistroReducer, initialState);

    const obtenerRegistro = async () => {
        try {
            const user = getUserFromLocalStorage();

            const resultado = await client.get('/consultarDatosClasificacion/' + user.id);
            dispatch({ type: OBTENER_REGISTRO, payload: resultado.data });
        } catch (error) {
            alertTopEnd('error', 'Error', 'No se pudo obtener los registros.');
            console.error(error);
        }
    };

    const modificarRegistro = async (cliente) => {
        try {
            console.log(state.registro[cliente]);
            alertTopEnd('success', 'Correcto', 'Registro modificado correctamente.');
        } catch (error) {
            alertTopEnd('error', 'Error', 'No se pudo modificar el registro');
            console.log(error);
        }
    };

    const obtenerSegmentoDeContenido = async (key) => {
        try {
            // Obtener los segmento de contenido
            const resultado = await client.get('/consultarSegmentosDeContenido/' + key);
            dispatch({ type: OBTENER_CONTENIDO, payload: resultado.data });
        } catch (error) {
            alertTopEnd('error', 'Error', 'No se pudo obtener los registros.');
            console.error(error);
        }
    };

    const setKey = async (key) => {
        try {
            dispatch({ type: SET_KEY, payload: key });
        } catch (error) {
            alertTopEnd('error', 'Error', 'No se pudo obtener los registros.');
            console.error(error);
        }
    };

    const modificarSegmeto = async (segmento) => {
        try {
            console.log(segmento);
            const resultado = await client.patch(
                '/actualizarSegmentoContenido/' + segmento.idSegmento,
                segmento
            );

            dispatch({ type: MODIFICAR_SEGMENTO, payload: segmento });
            alertTopEnd('success', 'Correcto', 'Registro modificado correctamente.');
        } catch (error) {
            alertTopEnd('error', 'Error', 'No se pudo modificar el registro');
            console.log(error);
        }
    };

    return (
        <RegistroContext.Provider
            value={{
                registro: state.registro,
                segmento: state.contenido,
                key: state.key,
                setTags,
                obtenerRegistro,
                modificarRegistro,
                obtenerSegmentoDeContenido,
                setKey,
                modificarSegmeto,
            }}
        >
            {props.children}
        </RegistroContext.Provider>
    );
};
