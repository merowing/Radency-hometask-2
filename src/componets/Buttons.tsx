import { useDispatch, useSelector } from 'react-redux';
import actionModalWindowVisibility from '../actions/actionModalWindowVisibility';
import actionShowArchives from '../actions/actionShowArchives';
import { RootStateType } from '../scripts/types';
import { AppDispatch } from '../store';
import '../styles/Buttons.css';

let Buttons = () => {
    let showArchivesVisibility = useSelector((state: RootStateType) => state.showArchives);       
    let dispatch = useDispatch<AppDispatch>();

    function createNote() {
        actionModalWindowVisibility(dispatch, true);
    }
    function showArchives() {
        actionShowArchives(dispatch, showArchivesVisibility);
    }

    let showArchivesText = (showArchivesVisibility) ? 'Hide archived notes' : 'Show archived notes';

    return(
        <div className="buttons">
            <button onClick={showArchives}>{showArchivesText}</button>
            <button onClick={createNote}>Create Note</button>
        </div>
    );
};

export default Buttons;
