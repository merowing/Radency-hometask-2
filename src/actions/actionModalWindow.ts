import { Dispatch } from "redux";
import { modalWindowTypes } from "../scripts/types";
import { SET_MODAL_WINDOW_DATA, MODAL_WINDOW_VISIBILITY } from "./actionTypes";

let actionModalWindowData = (dispatch: Dispatch, data: modalWindowTypes) => {
    dispatch({
        type: SET_MODAL_WINDOW_DATA,
        payload: data
    })
};

let actionModalWindowVisibility = (dispatch: Dispatch, value: boolean) => {
    dispatch({
        type: MODAL_WINDOW_VISIBILITY,
        payload: value,
    });
}


export { actionModalWindowData, actionModalWindowVisibility };