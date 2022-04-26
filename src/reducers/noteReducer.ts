import database from '../scripts/database';
import {
    ADD_NOTE,
    EDIT_NOTE,
    TOGGLE_ARCHIVE_STATE_NOTE,
    TOGGLE_ARCHIVE_STATE_ALL_NOTES,
    REMOVE_NOTE,
    REMOVE_ALL_NOTES
} from '../actions/actionTypes';
import { noteTypes } from '../scripts/types';

const noteReducer = (state:noteTypes[] = database, action:any) => {
    let index: number = 0;

    switch(action.type) {
        case ADD_NOTE:
            return [...state, action.payload];
        case EDIT_NOTE:
            index = state.findIndex(note => note.id === action.payload.id);

            const { name, category, description } = action.payload;
            return [
                    ...state.slice(0,index),
                    {...state.slice(index, index + 1)[0], name, category, description},
                    ...state.slice(index + 1)
                ];
        case REMOVE_NOTE:
            index = state.findIndex(note => note.id === action.payload);
            
            return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
        case TOGGLE_ARCHIVE_STATE_NOTE:
            index = state.findIndex(note => note.id === action.payload);
            const archived = +!state[index].archived;
            
            return [
                    ...state.slice(0,index),
                    {...state.slice(index, index+1)[0], archived},
                    ...state.slice(index+1)
                ];
        case TOGGLE_ARCHIVE_STATE_ALL_NOTES:
            index = +!state.every(note => note.archived === 1);

            return state.map(note => {
                return {...note, archived: index};
            });
        case REMOVE_ALL_NOTES:
            return [];
        default:
            return state;
    }
};

export default noteReducer;
