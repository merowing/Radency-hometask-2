import React, { useState } from 'react';
import '../styles/Buttons.css';

type typeFunction = () => void;

let Buttons:React.FC<{toggleShowModal:typeFunction}> = ({toggleShowModal}) => {
    return(
        <div className="buttons">
            <button>Show archived notes</button>
            <button onClick={toggleShowModal}>Create Note</button>
        </div>
    );
};

export default Buttons;
