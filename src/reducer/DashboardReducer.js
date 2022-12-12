import {
    GET_TIEMPO_CONEXION,
    SET_INCIDECIAS_BY_WEEK,
    SET_NO_PERMITIDAS,
    SET__TIPO_INCIDECIAS_BY_DAY,
} from '../const/actionTypes';

export default (state, action) => {
    switch (action.type) {
        case SET_INCIDECIAS_BY_WEEK:
            return {
                ...state,
                incidencias: action.payload,
            };
        case SET__TIPO_INCIDECIAS_BY_DAY:
            return {
                ...state,
                tipoDeIncidencias: action.payload,
            };
        case SET_NO_PERMITIDAS:
            return {
                ...state,
                noPermitidas: action.payload,
            };
        case GET_TIEMPO_CONEXION:
            return {
                ...state,
                tiempoDeConexion: action.payload,
            };
        default:
            return state;
    }
};
