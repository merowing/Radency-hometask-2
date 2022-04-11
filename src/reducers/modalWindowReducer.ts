import { MODAL_WINDOW_VISIBILITY } from '../actions/actionTypes';

const modalWindowReducer = (state:boolean = false, action:any) => {
    if(action.type === MODAL_WINDOW_VISIBILITY) {
        state = action.payload;
    }
    return state;
};

export default modalWindowReducer;
