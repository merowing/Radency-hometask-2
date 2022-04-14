import { MODAL_WINDOW_VISIBILITY, SET_MODAL_WINDOW_DATA } from '../actions/actionTypes';
import { modalWindowTypes } from '../scripts/types';
import { defaultModalWindow } from '../scripts/defaultState';

const modalWindowReducer = (state:modalWindowTypes = defaultModalWindow, action:any) => {
    switch(action.type) {
        case MODAL_WINDOW_VISIBILITY:
            state = {...state, visibility: action.payload}
            return state;
        case SET_MODAL_WINDOW_DATA:
            state = {...action.payload};
            return state;
        default:
            return state;
    }
};

export default modalWindowReducer;
