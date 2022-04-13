import { Dispatch } from "redux";
import { modalWindowTypes } from "../scripts/types";
import { SET_MODAL_WINDOW_DATA } from "./actionTypes";

let actionModalWindowData = (dispatch: Dispatch, data: modalWindowTypes) => {
    console.log(JSON.stringify(data));
    dispatch({
        type: SET_MODAL_WINDOW_DATA,
        payload: data
    })
};

export default actionModalWindowData;