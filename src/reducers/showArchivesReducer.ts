import { TOGGLE_SHOW_ARCHIVES } from "../actions/actionTypes";

const showArchivesReducer = (state:boolean = false, action:any) => {
    if(action.type === TOGGLE_SHOW_ARCHIVES)
        state = action.payload;
    return state;
}

export default showArchivesReducer;