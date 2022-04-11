import { Dispatch } from "redux";
import { MODAL_WINDOW_VISIBILITY } from './actionTypes';

let actionModalWindowVisibility = (dispatch: Dispatch, value: boolean) => {
        dispatch({
            type: MODAL_WINDOW_VISIBILITY,
            payload: value,
        });
    }

export default actionModalWindowVisibility;
