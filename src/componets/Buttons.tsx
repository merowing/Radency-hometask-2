import { useDispatch } from 'react-redux';
import actionModalWindowVisibility from '../actions/actionModalWindowVisibility';
import { AppDispatch } from '../store';
import '../styles/Buttons.css';

let Buttons = () => {
    
    let dispatch = useDispatch<AppDispatch>();
    function createNote() {
        actionModalWindowVisibility(dispatch, true);
    }

    return(
        <div className="buttons">
            <button>Show archived notes</button>
            <button onClick={createNote}>Create Note</button>
        </div>
    );
};

export default Buttons;
