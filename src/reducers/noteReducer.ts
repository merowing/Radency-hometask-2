import database from '../scripts/database';
import { ADD_NOTE, EDIT_NOTE, TOGGLE_ARCHIVE_STATE_NOTE, REMOVE_NOTE, REMOVE_ALL_NOTES } from '../actions/actionTypes';
import { noteTypes } from '../scripts/types';

const noteReducer = (state:noteTypes[] = database, action:any) => {
    let index: number = 0;
    let newState: noteTypes[] = [...state];

    switch(action.type) {
        case ADD_NOTE:
            return [...newState, action.payload];
        case EDIT_NOTE:
            index = newState.findIndex(note => note.id === action.payload.id);
            const { name, category, description } = action.payload;
            
            newState[index] = {...newState[index], name: name, category: category, description: description};
            return [...newState];
        case REMOVE_NOTE:
            index = newState.findIndex(note => note.id === action.payload);
            
            newState.splice(index, 1);
            return [...newState];
        case TOGGLE_ARCHIVE_STATE_NOTE:
            index = action.payload;
            
            if(typeof index === 'number') {
                index = newState.findIndex(note => note.id === index);
                const archived = +!newState[index].archived;
                
                newState[index] = {...newState[index], archived: archived};
                return [...newState];
            }else {
                return newState.map(note => {
                    return {...note, archived: +!index};
                });
            }
        case REMOVE_ALL_NOTES:
            return [];
        default:
            return newState;
    }
};

export default noteReducer;
