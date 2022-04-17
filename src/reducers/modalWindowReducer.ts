import { MODAL_WINDOW_VISIBILITY, SET_MODAL_WINDOW_DATA } from '../actions/actionTypes';
import { modalWindowTypes } from '../scripts/types';
import { defaultModalWindow } from '../scripts/defaultState';

const modalWindowReducer = (state:modalWindowTypes = defaultModalWindow, action:any) => {
    switch(action.type) {
        case MODAL_WINDOW_VISIBILITY:
            return {...state, visibility: action.payload};
        case SET_MODAL_WINDOW_DATA:
            return {...action.payload};
        default:
            return state;
    }
};

export default modalWindowReducer;
