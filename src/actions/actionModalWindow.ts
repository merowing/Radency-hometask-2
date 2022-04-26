import { Dispatch } from "redux";
import { SET_MODAL_WINDOW_ID, SET_MODAL_WINDOW_VISIBILITY } from "./actionTypes";

let actionModalWindowId = (dispatch: Dispatch, id: number) => {
    dispatch({
        type: SET_MODAL_WINDOW_ID,
        payload: id
    })
};

let actionModalWindowVisibility = (dispatch: Dispatch, value: boolean) => {
    dispatch({
        type: SET_MODAL_WINDOW_VISIBILITY,
        payload: value,
    });
}


export { actionModalWindowId, actionModalWindowVisibility };
