import { Dispatch } from "redux";
import { formDataTypes } from "../scripts/types";
import { ADD_NOTE } from "./actionTypes";

function actionAddNote(dispatch: Dispatch, data: formDataTypes) {
    dispatch({
        type: ADD_NOTE,
        payload: data,
    })
}

export default actionAddNote;
