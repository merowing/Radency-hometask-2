import { SET_MODAL_WINDOW_VISIBILITY, SET_MODAL_WINDOW_ID } from '../actions/actionTypes';
import { defaultModalWindow } from '../scripts/defaultState';

const modalWindowReducer = (state: any = defaultModalWindow, action:any) => {
    switch(action.type) {
        case SET_MODAL_WINDOW_VISIBILITY:
            return {...state, visibility: action.payload};
        case SET_MODAL_WINDOW_ID:
            return {...state, id: action.payload};
        default:
            return state;
    }
};

export default modalWindowReducer;
