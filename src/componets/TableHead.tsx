import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionRemoveAllNotes, actionToggleArchiveState } from '../actions/actionNotes';
import { AppDispatchType } from '../scripts/types';
import * as Icon from 'react-bootstrap-icons'; 

const TableHead:React.FC<{type?:string}> = ({type}) => {
    
    const dispatch = useDispatch<AppDispatchType>();
    
    const [archiveAllState, setArchiveAllState] = useState(true);

    function allNotesToArchive() {
        actionToggleArchiveState(dispatch, archiveAllState);
        setArchiveAllState(!archiveAllState);
    }

    function removeAllNotes() {
        actionRemoveAllNotes(dispatch);
        setArchiveAllState(false);
    }

    let headNames:string[] = ['', 'Name', 'Created', 'Category', 'Content', 'Dates', ''];
    if(type === 'stats') {
        headNames = ['', 'Name', 'Active', 'Archived'];
    }

    const [archiveIconAll, setArchiveIconAll] = useState(false);
    const [removeIconAll, setRemoveIconAll] = useState(false);

    const name = (!type) ? 'head' : 'statistics-head';
    const items = headNames.map((el, i) => {
        if(i === headNames.length - 1 && el === '') {
            return (
                <div key={`head-${i}`}>
                    <ul className='head-buttons'>
                        <li key='editAll'></li>
                        <li key='archiveAll' onClick={allNotesToArchive} onMouseOver={() => setArchiveIconAll(true)} onMouseOut={() => setArchiveIconAll(false)}>
                            {(!archiveIconAll) ? <Icon.Archive/> : <Icon.ArchiveFill/>}
                        </li>
                        <li key='deleteAll' onClick={removeAllNotes} onMouseOver={() => setRemoveIconAll(true)} onMouseOut={() => setRemoveIconAll(false)}>
                            {(!removeIconAll) ? <Icon.Eraser/> : <Icon.EraserFill/>}
                        </li>
                    </ul>
                </div>
            );
        }
        return <div key={`${name}-${i}`}>{el}</div>;
    });

    return (
        <div className='table-row th'>{items}</div>
    )
}

export default TableHead;
