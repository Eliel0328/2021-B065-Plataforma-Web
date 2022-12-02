import {
    SET_INCIDECIAS_BY_WEEK,
} from '../const/actionTypes';

export default (state, action) => {
    switch (action.type) {
        case SET_INCIDECIAS_BY_WEEK:
            return {
                ...state,
                incidencias: action.payload,
            };
        default:
            return state;
    }
};
