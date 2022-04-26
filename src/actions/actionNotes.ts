import { Dispatch } from "redux";
import { noteTypes, noteEditTypes } from "../scripts/types";
import {
    ADD_NOTE,
    EDIT_NOTE,
    REMOVE_NOTE,
    TOGGLE_ARCHIVE_STATE_NOTE,
    TOGGLE_ARCHIVE_STATE_ALL_NOTES,
    REMOVE_ALL_NOTES
} from "./actionTypes";

function actionAddNote(dispatch: Dispatch, data: noteTypes) {
    dispatch({
        type: ADD_NOTE,
        payload: data,
    })
}

function actionEditNote(dispatch: Dispatch, data: noteEditTypes) {
    dispatch({
        type: EDIT_NOTE,
        payload: data
    })
}

function actionToggleArchiveState(dispatch: Dispatch, id: number) {
    dispatch({
        type: TOGGLE_ARCHIVE_STATE_NOTE,
        payload: id
    });
}

function actionToggleArchiveStateAll(dispatch: Dispatch) {
    dispatch({
        type: TOGGLE_ARCHIVE_STATE_ALL_NOTES,
        payload: null
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

export { actionAddNote, actionEditNote, actionToggleArchiveState, actionToggleArchiveStateAll, actionRemoveNote, actionRemoveAllNotes };
