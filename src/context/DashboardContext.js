import React, { createContext, useReducer } from 'react';
import DashboardReducer from '../reducer/DashboardReducer';
import axios from 'axios';

import {
    SET_INCIDECIAS_BY_WEEK,
    SET__TIPO_INCIDECIAS_BY_DAY,
} from '../const/actionTypes';
import alertTopEnd from '../helpers/alertTopEnd';
import getTokenFromLocalStorage from '../helpers/getTokenFromLocalStorage';
import getUserFromLocalStorage from '../helpers/getUserFromLocalStorage';

export const DashboardContext = createContext();
const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const DashboardContextProvider = (props) => {
    const initialState = {
        token: null,
        user: null,
        incidencias: null,
        tipoDeIncidencias: null,
    };

    const [state, dispatch] = useReducer(DashboardReducer, initialState);

    const setDateFormat = (fecha) => {
        let aux = new Date(fecha);
        return `${aux.getFullYear()}-${aux.getMonth() + 1}-${aux.getDate()}`;
    };

    const setDataOnWeeks = (data) => {
        let aux = [];
        aux.push({ dia: 'domingo', data: data[0] });
        aux.push({ dia: 'lunes', data: data[1] });
        aux.push({ dia: 'martes', data: data[2] });
        aux.push({ dia: 'miercoles', data: data[3] });
        aux.push({ dia: 'jueves', data: data[4] });
        aux.push({ dia: 'viernes', data: data[5] });
        aux.push({ dia: 'sabado', data: data[6] });

        return aux;
    };

    const setDataOnTipoDeIncidencias = (data) => {
        let aux = [];
        aux.push({ dia: 'vulgar', data: data[0] });
        aux.push({ dia: 'agresivo', data: data[1] });
        aux.push({ dia: 'ofensivo', data: data[2] });
        return aux;
    };

    const getIncidencias = async (fecha_inicial, fecha_final) => {
        try {
            let idTutor = getUserFromLocalStorage().id;
            let inicial = setDateFormat(fecha_inicial);
            let final = setDateFormat(fecha_final);

            const resultado = await client.get(
                `/getIncidenciasByWeek/${idTutor}/${inicial}/${final}`
            );

            dispatch({
                type: SET_INCIDECIAS_BY_WEEK,
                payload: setDataOnWeeks(resultado.data),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getTipoDeIncidenciasPorDia = async (fecha_inicial, fecha_final) => {
        try {
            let idTutor = getUserFromLocalStorage().id;
            let inicial = setDateFormat(fecha_inicial);
            let final = setDateFormat(fecha_final);

            const resultado = await client.get(
                `/getTiposIncidencias/${idTutor}/${inicial}/${final}`
            );

            dispatch({
                type: SET__TIPO_INCIDECIAS_BY_DAY,
                payload: setDataOnTipoDeIncidencias(resultado.data),
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DashboardContext.Provider
            value={{
                token: state.token,
                user: state.user,
                incidencias: state.incidencias,
                tipoDeIncidencias: state.tipoDeIncidencias,
                getIncidencias,
                getTipoDeIncidenciasPorDia,
            }}
        >
            {props.children}
        </DashboardContext.Provider>
    );
};
