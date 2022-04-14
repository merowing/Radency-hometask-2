import database from '../scripts/database';
import { ADD_NOTE, EDIT_NOTE, TOGGLE_ARCHIVE_STATE_NOTE, REMOVE_NOTE, REMOVE_ALL_NOTES } from '../actions/actionTypes';
import { noteTypes } from '../scripts/types';

const noteReducer = (state:Array<noteTypes> = database, action:any) => {
    let index: number = 0;

    switch(action.type) {
        case ADD_NOTE:
            state = [...state, action.payload];
            return state;
        case EDIT_NOTE:
            index = state.findIndex(note => note.id === action.payload.id);
            let { name, category, description } = action.payload;
            state[index] = {...state[index], name: name, category: category, description: description};
            state = [...state];
            return state;
        case REMOVE_NOTE:
            index = state.findIndex(note => note.id === action.payload);
            state.splice(index, 1);
            state = [...state];
            return state;
        case TOGGLE_ARCHIVE_STATE_NOTE:
            index = action.payload;
            if(typeof index === 'number') {
                index = state.findIndex(note => note.id === index);
                let archived = +!state[index].archived;
                state[index] = {...state[index], archived: archived};
                state = [...state];
            }else {
                state = state.map(note => {
                    return {...note, archived: +!index};
                });
            }
            return state;
        case REMOVE_ALL_NOTES:
            state = [];
            return state;
        default:
            return state;
    }
};

export default noteReducer;
