import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { RootStateType } from '../scripts/types';
import { TOGGLE_SHOW_ARCHIVES } from './actionTypes';

function actionShowArchives(dispatch: Dispatch, val:boolean) {
    console.log('archives');
    dispatch({
        type: TOGGLE_SHOW_ARCHIVES,
        payload: !val,
    })
}

export default actionShowArchives;