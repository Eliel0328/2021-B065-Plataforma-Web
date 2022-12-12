import React, { createContext, useReducer } from 'react';
import DashboardReducer from '../reducer/DashboardReducer';
import axios from 'axios';

import {
    GET_TIEMPO_CONEXION,
    SET_INCIDECIAS_BY_WEEK,
    SET_NO_PERMITIDAS,
    SET_TIPO_INCIDECIAS_BY_DAY,
} from '../const/actionTypes';
import getUserFromLocalStorage from '../helpers/getUserFromLocalStorage';
import { constColores } from '../const/constColores';

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
        noPermitidas: null,
        tiempoDeConexion: null,
    };

    const [state, dispatch] = useReducer(DashboardReducer, initialState);

    const setDateFormat = (fecha) => {
        let aux = new Date(fecha);
        return `${aux.getFullYear()}-${aux.getMonth() + 1}-${aux.getDate()}`;
    };

    const setDataOnWeeks = (data) => {
        if (data.length < 7) {
            let diff = 7 - data.length;
            for (let i = 0; i < diff; ++i) {
                data.push(0);
            }
        }
        let aux = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sábado',
        ];

        return { dias: aux, data };
    };

    const setDataOnTipoDeIncidencias = (data) => {
        if (data.length === 0) {
            data = [0, 0, 0];
        }
        let aux = ['Vulgar', 'Agresivo', 'Ofensivo'];

        return { etiquetas: aux, data };
    };

    const setNoPermitidasOnDay = (obj) => {
        if (obj !== null) {
            let aux = Object.keys(obj);

            const colores = [];
            const data = [];
            for (let i = 0; i < aux.length; ++i) {
                colores.push(constColores[i]);
                data.push(obj[aux[i]]);
            }

            return { categoria: aux, data, colores };
        } else {
            return { categoria: [], data: [], colores: [] };
        }
    };

    const setTiempoDeConexionOnWeek = (obj) => {
        if (obj !== null) {
            let aux = Object.keys(obj).sort();

            const data = [];
            for (let i = 0; i < aux.length; ++i) {
                data.push(toHours(obj[aux[i]]));
            }

            return { categoria: aux, data };
        } else {
            return { categoria: [], data: [] };
        }
    };

    const toHours = (totalSeconds) => {
        return (totalSeconds / 60 / 60).toFixed(2);
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
                type: SET_TIPO_INCIDECIAS_BY_DAY,
                payload: setDataOnTipoDeIncidencias(resultado.data),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getSitiosNoPermitidos = async (fecha_inicial, fecha_final) => {
        try {
            let idTutor = getUserFromLocalStorage().id;
            let inicial = setDateFormat(fecha_inicial);
            let final = setDateFormat(fecha_final);

            const resultado = await client.get(
                `/getNoPermitidas/${idTutor}/${inicial}/${final}`
            );

            dispatch({
                type: SET_NO_PERMITIDAS,
                payload: setNoPermitidasOnDay(resultado.data[0]),
            });
        } catch (error) {
            console.error(error);
            dispatch({
                type: SET_NO_PERMITIDAS,
                payload: setNoPermitidasOnDay(null),
            });
        }
    };

    const getTiempoDeConexion = async (fecha_inicial, fecha_final) => {
        try {
            let idTutor = getUserFromLocalStorage().id;
            let inicial = setDateFormat(fecha_inicial);
            let final = setDateFormat(fecha_final);

            const resultado = await client.get(
                `/getTiempoDeConexion/${idTutor}/${inicial}/${final}`
            );

            let aux = setTiempoDeConexionOnWeek(resultado.data);

            dispatch({
                type: GET_TIEMPO_CONEXION,
                payload: aux,
            });
        } catch (error) {
            console.error(error);
            dispatch({
                type: GET_TIEMPO_CONEXION,
                payload: null,
            });
        }
    };

    return (
        <DashboardContext.Provider
            value={{
                token: state.token,
                user: state.user,
                incidencias: state.incidencias,
                tipoDeIncidencias: state.tipoDeIncidencias,
                noPermitidas: state.noPermitidas,
                tiempoDeConexion: state.tiempoDeConexion,
                getIncidencias,
                getTipoDeIncidenciasPorDia,
                getSitiosNoPermitidos,
                getTiempoDeConexion,
            }}
        >
            {props.children}
        </DashboardContext.Provider>
    );
};
