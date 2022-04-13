import { MODAL_WINDOW_VISIBILITY, SET_MODAL_WINDOW_DATA } from '../actions/actionTypes';
import { modalWindowTypes } from '../scripts/types';

let defaultModalWindow = {
    data: {
        id: null,
        name: '',
        category: '0',
        description: '',
    },
    visibility: false
}

const modalWindowReducer = (state:modalWindowTypes = defaultModalWindow, action:any) => {
    switch(action.type) {
        case MODAL_WINDOW_VISIBILITY:
            state = {...state, visibility: action.payload}
            break;
        case SET_MODAL_WINDOW_DATA:
            state = {...action.payload};
            break;
        default:
            state = state;
    }
        
    return state;
};

export default modalWindowReducer;
