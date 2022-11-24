import {
    OBTENER_REGISTRO,
    MODIFICAR_REGISTRO,
    OBTENER_CONTENIDO,
    SET_KEY,
    MODIFICAR_SEGMENTO,
} from '../const/actionTypes';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_REGISTRO:
            return {
                ...state,
                registro: action.payload,
            };
        case MODIFICAR_REGISTRO:
            return {
                ...state,
                registro: [action.payload, ...state.registro],
            };
        case OBTENER_CONTENIDO:
            return {
                ...state,
                contenido: action.payload,
            };
        case MODIFICAR_SEGMENTO:
            const index = state.contenido.findIndex((post) => post._id === action.payload.idSegmento);
            state.contenido[index].calificacionTutor = action.payload.calificacionTutor
            state.contenido[index].tagsTutor = action.payload.tagsTutor
            state.contenido[index].justificacionTutor = action.payload.justificacionTutor
        
            return {
                ...state,
            };
        case SET_KEY:
            return {
                ...state,
                key: action.payload,
            };
        default:
            return state;
    }
};
