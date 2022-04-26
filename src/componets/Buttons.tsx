import { useDispatch, useSelector } from 'react-redux';
import { actionModalWindowId, actionModalWindowVisibility } from '../actions/actionModalWindow';
import actionShowArchives from '../actions/actionShowArchives';
import { RootStateType } from '../scripts/types';
import { AppDispatch } from '../store';
import '../styles/Buttons.css';

const Buttons = () => {
    const showArchivesVisibility = useSelector((state: RootStateType) => state.showArchives);
    const notes = useSelector((state: RootStateType) => state.notes);
    const dispatch = useDispatch<AppDispatch>();

    function createNote() {
        actionModalWindowId(dispatch, -1);
        actionModalWindowVisibility(dispatch, true);
    }
    function showArchives() {
        actionShowArchives(dispatch, showArchivesVisibility);
    }

    const showArchivesText = (showArchivesVisibility) ? 'Hide archived notes' : 'Show archived notes';
    
    const notesArchiveState = notes.length === 0 || notes.every((note) => note.archived === 0);
    let showArchivedNotesButton = <button onClick={showArchives}>{showArchivesText}</button>;
    
    if(notesArchiveState) {
        showArchivedNotesButton = <></>;
    }
    
    return(
        <div className="buttons">
            {showArchivedNotesButton}
            <button onClick={createNote}>Create Note</button>
        </div>
    );
};

export default Buttons;
