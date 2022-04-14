import { Dispatch } from 'redux';
import { TOGGLE_SHOW_ARCHIVES } from './actionTypes';

function actionShowArchives(dispatch: Dispatch, val: boolean) {
    dispatch({
        type: TOGGLE_SHOW_ARCHIVES,
        payload: !val,
    })
}

export default actionShowArchives;