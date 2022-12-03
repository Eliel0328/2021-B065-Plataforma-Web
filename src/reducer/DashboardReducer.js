import {
    SET_INCIDECIAS_BY_WEEK,
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
        default:
            return state;
    }
};
