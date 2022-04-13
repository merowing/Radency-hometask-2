import { Dispatch } from "redux";
import { MODAL_WINDOW_VISIBILITY } from './actionTypes';

let actionModalWindowVisibility = (dispatch: Dispatch, value: boolean) => {
    console.log('visibility');
        dispatch({
            type: MODAL_WINDOW_VISIBILITY,
            payload: value,
        });
    }

export default actionModalWindowVisibility;
