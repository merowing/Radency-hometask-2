import database from '../scripts/database';
import { ADD_NOTE, EDIT_NOTE } from '../actions/actionTypes';
import { noteTypes } from '../scripts/types';

const noteReducer = (state:Array<noteTypes> = database, action:any) => {
    switch(action.type) {
        case ADD_NOTE:
            state = [...state, action.payload];
            return state;
        case EDIT_NOTE:
            let ind = action.payload.id;
            let { name, category, description } = action.payload;
            //alert(JSON.stringify(action.payload));
            //console.log(name, category, description);
            //console.log(ind);
            state[ind] = {...state[ind], name: name, category: category, description: description};
            state = [...state];
            //console.log(state);
            return state;
        default:
            return state;
            //return state;

        //console.log(state);
        //return state;
    }
};

export default noteReducer;
