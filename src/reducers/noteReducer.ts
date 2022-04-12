import database from '../scripts/database';
import { ADD_NOTE } from '../actions/actionTypes';

type noteTypes = {
    id: number,
    name: string,
    created: number,
    category: number,
    description: string,
    archived: number,
}

const noteReducer = (state:Array<noteTypes> = database, action:any) => {
    switch(action.type) {
        case ADD_NOTE:
            state = {...state, ...action.payload};
            return state;
        default:
            return state;
    }
};

export default noteReducer;
