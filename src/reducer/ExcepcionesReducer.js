import {
    OBTENER_PERMITIDAS,
    OBTENER_NO_PERMITIDAS,
    AGREGAR_PERMITIDAS,
    ELIMINAR_PERMITIDA,
    AGREGAR_NO_PERMITIDAS,
    ELIMINAR_NO_PERMITIDA,
    PERMITIDA_ACTUAL,
} from '../const/actionTypes';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_PERMITIDAS:
            return {
                ...state,
                listaBlanca: action.payload,
            };
        case AGREGAR_PERMITIDAS:
            return {
                ...state,
                listaBlanca: [...state.listaBlanca, action.payload],
            };
        case ELIMINAR_PERMITIDA:
            return {
                ...state,
                listaBlanca: state.listaBlanca.filter(
                    (permitida) => permitida._id !== action.payload
                ),
            };
        // Posiblemente lo elimine en un futuro
        case PERMITIDA_ACTUAL:
            return {
                ...state,
                permitidaActual: state.listaBlanca[action.payload],
            };
        case OBTENER_NO_PERMITIDAS:
            return {
                ...state,
                listaNegra: action.payload,
            };
        case AGREGAR_NO_PERMITIDAS:
            return {
                ...state,
                listaNegra: [...state.listaNegra, action.payload],
            };
        case ELIMINAR_NO_PERMITIDA:
            return {
                ...state,
                listaNegra: state.listaNegra.filter(
                    (permitida) => permitida._id !== action.payload
                ),
            };
        default:
            return state;
    }
};
