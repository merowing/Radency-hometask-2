import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionToggleArchiveState } from '../actions/actionNotes';
import { AppDispatchType, RootStateType } from '../scripts/types';

let TableHead:React.FC<{type?:string}> = ({type}) => {
    
    let headNames:string[] = ['', 'Name', 'Created', 'Category', 'Content', 'Dates', ''];
    if(type === 'stats') {
        headNames = ['', 'Name', 'Active', 'Archived'];
    }

    let name = (!type) ? 'head' : 'statistics-head';
    let items = headNames.map((el, i) => {
        if(i === headNames.length - 1 && el === '') {
            return (
                <div key={`head-${i}`}>
                    <ul className='head-buttons'>
                        <li key='editAll'></li>
                        <li key='archiveAll' onClick={allNotesToArchive}></li>
                        <li key='deleteAll'></li>
                    </ul>
                </div>
            );
        }
        return <div key={`${name}-${i}`}>{el}</div>;
    });

    let dispatch = useDispatch<AppDispatchType>();
    let notes = useSelector((state: RootStateType) => state.notes);

    function allNotesToArchive() {
        let ids = notes.map(note => note.id);
        actionToggleArchiveState(dispatch, ids);
    }

    return (
        <div className='table-row th'>{items}</div>
    )
}

export default TableHead;