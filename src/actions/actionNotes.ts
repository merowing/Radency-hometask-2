import { Dispatch } from "redux";
import { noteTypes } from "../scripts/types";
import { ADD_NOTE, EDIT_NOTE, REMOVE_NOTE, TOGGLE_ARCHIVE_STATE_NOTE, REMOVE_ALL_NOTES } from "./actionTypes";

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

function actionToggleArchiveState(dispatch: Dispatch, id: number | boolean) {
    dispatch({
        type: TOGGLE_ARCHIVE_STATE_NOTE,
        payload: id
    });
}

function actionRemoveNote(dispatch: Dispatch, id: number) {
    dispatch({
        type: REMOVE_NOTE,
        payload: id
    })
}

function actionRemoveAllNotes(dispatch: Dispatch) {
    dispatch({
        type: REMOVE_ALL_NOTES,
        payload: null
    })
}

export { actionAddNote, actionEditNote, actionToggleArchiveState, actionRemoveNote, actionRemoveAllNotes };
