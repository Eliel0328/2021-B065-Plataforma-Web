import {
    REGISTRAR_USUARIO,
    SET_CURRENT,
    SET_ESTADO_EXTENSION,
    SET_INCIDECIAS_TUTOR,
    SET_TOKEN,
    SET_TUTOR,
    SET_USER,
    UPDATE_CONFIG,
} from '../const/actionTypes';

export default (state, action) => {
    switch (action.type) {
        case REGISTRAR_USUARIO:
            return {
                ...state,
                user: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_TUTOR:
            return {
                ...state,
                tutor: action.payload,
            };
        case SET_INCIDECIAS_TUTOR:
            state.tutor.numIncidencias = action.payload;
            return {
                ...state,
            };
        case SET_ESTADO_EXTENSION:
            state.tutor.extensionActiva = action.payload;
            return {
                ...state,
            };
        case UPDATE_CONFIG:
            return {
                ...state,
                user: {
                    ...state.user,
                    incidencias: action.payload.incidencias,
                    encender: action.payload.encender,
                },
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
            };
        default:
            return state;
    }
};
