import { TOGGLE_SHOW_ARCHIVES } from "../actions/actionTypes";
import { showArchivesButtonDefault } from "../scripts/defaultState";

const showArchivesButtonReducer = (state:boolean = showArchivesButtonDefault, action:any) => {
    if(action.type === TOGGLE_SHOW_ARCHIVES)
        return action.payload;
    return state;
}

export default showArchivesButtonReducer;
