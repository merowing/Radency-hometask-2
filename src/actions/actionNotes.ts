import { Dispatch } from "redux";
import { noteTypes } from "../scripts/types";
import { ADD_NOTE, EDIT_NOTE, TOGGLE_ARCHIVE_STATE_NOTE } from "./actionTypes";

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

function actionToggleArchiveState(dispatch: Dispatch, id: number | Array<number>) {
    dispatch({
        type: TOGGLE_ARCHIVE_STATE_NOTE,
        payload: id
    });
}

export { actionAddNote, actionEditNote, actionToggleArchiveState };
