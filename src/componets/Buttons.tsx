import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/Buttons.css';
import actionModalWindowVisibility from '../actions/actionModalWindowVisibility';
import { AppDispatch } from '../store';
type typeFunction = () => void;

let Buttons:React.FC<{toggleShowModal:typeFunction}> = ({toggleShowModal}) => {
    
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
