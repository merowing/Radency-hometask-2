import { Dispatch } from "redux";
import { noteTypes } from "../scripts/types";
import { ADD_NOTE, EDIT_NOTE } from "./actionTypes";

function actionAddNote(dispatch: Dispatch, data: noteTypes) {
    dispatch({
        type: ADD_NOTE,
        payload: data,
    })
}

function actionEditNote(dispatch: Dispatch, data: noteTypes) {
    dispatch({
        type: EDIT_NOTE,
        payload: data
    })
}

export { actionAddNote, actionEditNote };
