import { useDispatch, useSelector } from 'react-redux';
import { actionModalWindowVisibility } from '../actions/actionModalWindow';
import actionShowArchives from '../actions/actionShowArchives';
import { RootStateType } from '../scripts/types';
import { AppDispatch } from '../store';
import '../styles/Buttons.css';

let Buttons = () => {
    let showArchivesVisibility = useSelector((state: RootStateType) => state.showArchives);
    let notes = useSelector((state: RootStateType) => state.notes);
    let dispatch = useDispatch<AppDispatch>();

    function createNote() {
        actionModalWindowVisibility(dispatch, true);
    }
    function showArchives() {
        actionShowArchives(dispatch, showArchivesVisibility);
    }

    let showArchivesText = (showArchivesVisibility) ? 'Hide archived notes' : 'Show archived notes';
    
    let notesArchiveState = !notes.length || notes.every(note => note.archived === 0);
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
