import React, { createContext, useReducer } from 'react';
import DashboardReducer from '../reducer/DashboardReducer';
import axios from 'axios';

import {
    SET_INCIDECIAS_BY_WEEK,
    SET_NO_PERMITIDAS,
    SET__TIPO_INCIDECIAS_BY_DAY,
} from '../const/actionTypes';
import alertTopEnd from '../helpers/alertTopEnd';
import getTokenFromLocalStorage from '../helpers/getTokenFromLocalStorage';
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
    };

    const [state, dispatch] = useReducer(DashboardReducer, initialState);

    const randColor = () => {
        return (
            '#' +
            Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, '0')
                .toUpperCase()
        );
    };
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
        if (data.length < 3 && data.length > 0) {
            let diff = 3 - data.length;
            for (let i = 0; i < diff; ++i) {
                data.push(0);
            }
        } else {
            data = [0, 0, 0];
        }
        let aux = ['Vulgar', 'Agresivo', 'Ofensivo'];

        return { etiquetas: aux, data };
    };

    const setNoPermitidasOnDay = (obj) => {
        console.log(obj);
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

    return (
        <DashboardContext.Provider
            value={{
                token: state.token,
                user: state.user,
                incidencias: state.incidencias,
                tipoDeIncidencias: state.tipoDeIncidencias,
                noPermitidas: state.noPermitidas,
                getIncidencias,
                getTipoDeIncidenciasPorDia,
                getSitiosNoPermitidos,
            }}
        >
            {props.children}
        </DashboardContext.Provider>
    );
};
