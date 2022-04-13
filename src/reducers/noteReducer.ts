import database from '../scripts/database';
import { ADD_NOTE, EDIT_NOTE, TOGGLE_ARCHIVE_STATE_NOTE, REMOVE_NOTE } from '../actions/actionTypes';
import { noteTypes } from '../scripts/types';

const noteReducer = (state:Array<noteTypes> = database, action:any) => {
    let index: number = 0;

    switch(action.type) {
        case ADD_NOTE:
            state = [...state, action.payload];
            return state;
        case EDIT_NOTE:
            index = action.payload.id;
            let { name, category, description } = action.payload;
            state[index] = {...state[index], name: name, category: category, description: description};
            state = [...state];
            return state;
        case REMOVE_NOTE:
            index = action.payload;
            let removeIndex = state.findIndex(note => note.id === index);
            state.splice(removeIndex, 1);
            state = [...state];
            return state;
        case TOGGLE_ARCHIVE_STATE_NOTE:
            index = action.payload;
            if(typeof index === 'number') {
                let archived = +!state[index].archived;
                state[index] = {...state[index], archived: archived};
                state = [...state];
            }else {
                let archiveState = state.some(a => a.archived === 1);
                if(archiveState) {
                    state = state.map(note => {
                        return {...note, archived: 0};
                    });
                }else {
                    state = state.map(note => {
                        return {...note, archived: 1};
                    });
                }
            }
            return state;
        default:
            return state;
    }
};

export default noteReducer;
