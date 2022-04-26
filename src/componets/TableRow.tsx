import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionModalWindowId, actionModalWindowVisibility } from '../actions/actionModalWindow';
import { getCategoryColor, getCategoryName } from '../scripts/categories';
import { AppDispatchType, eventType, noteTypes, RootStateType, archiveStatisticTypes } from '../scripts/types';
import { actionRemoveNote, actionToggleArchiveState } from '../actions/actionNotes';
import { datesFromDescription, maxLettersString, getDate } from '../scripts/tableRow';
import Icons from './Icon';

const TableRow:React.FC<{note: noteTypes | archiveStatisticTypes, type?: string}> = ({note, type}) => {

    type = (!type) ? '' : type;
    const archived = (note.archived && type !== 'stats') ? 'archived' : '';
    
    const firstLetterOfCategory:string = getCategoryName(note.category)[0];
    const bgColor:string = getCategoryColor(note.category);

    const dispatch = useDispatch<AppDispatchType>();
    const noteData = useSelector((state: RootStateType) => state.notes);

    let noteShortName = useRef<HTMLSpanElement>(null);
    let noteDescription = useRef<HTMLSpanElement>(null);
    let noteDateString = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
        
        if(noteShortName.current) {
            noteShortName.current.innerText = maxLettersString(noteShortName.current);
        }
        if(noteDescription.current) {
            noteDescription.current.innerText = maxLettersString(noteDescription.current);
        }
        if(noteDateString.current) {
            noteDateString.current.innerText = datesFromDescription(note.description);
        }        
        
    }, [note]);
    
    let row: React.ReactElement;

    if(type === '') {
        row = <React.Fragment>
            <div key={`image-${type}-${note.id}`}>
                <div style={{backgroundColor: bgColor}} className="image-category">
                    <span>{firstLetterOfCategory}</span>
                </div>
            </div>
            <div key={`name-${note.id}`}><span ref={noteShortName}>{note.name}</span></div>
            <div key={`created-${note.id}`}><span>{getDate(+note.created!)}</span></div>
            <div key={`category-${note.id}`}><span>{getCategoryName(note.category)}</span></div>
            <div key={`description-${note.id}`}><span ref={noteDescription}>{note.description}</span></div>
            <div key={`date-${note.id}`}><span ref={noteDateString}>{datesFromDescription(note.description!)}</span></div>
            <div key={`$buttons-${note.id}`}>
                <ul id={`${note.id}`}>
                    <Icons callback={noteEdit} type="edit" />
                    <Icons callback={noteArchive} type="archive" />
                    <Icons callback={noteRemove} type="remove" />
                </ul>
            </div>
        </React.Fragment>;
    }else {
        row = <React.Fragment>
            <div key={`image-${type}-${note.id}`}>
                <div style={{backgroundColor: bgColor}} className="image-category">
                    <span>{firstLetterOfCategory}</span>
                </div>
            </div>
            <div key={`name-${type}-${note.id}`}><span>{getCategoryName(note.category)}</span></div>
            <div key={`active-${type}-${note.id}`}><span>{note.active}</span></div>
            <div key={`archived-${type}-${note.id}`}><span>{note.archived}</span></div>
        </React.Fragment>;
    }

    function noteEdit(e: eventType) {
        const index = getIndex(e);
        const itemIndex = noteData.findIndex(item => item.id === index);
        
        actionModalWindowVisibility(dispatch, true);
        actionModalWindowId(dispatch, itemIndex);
    }

    function noteArchive(e: eventType) {
        actionToggleArchiveState(dispatch, getIndex(e));
    }
    function noteRemove(e: eventType) {
        actionRemoveNote(dispatch, getIndex(e));
    }

    function getIndex(event: eventType) {
        let note = event.target as HTMLElement;

        while(note.tagName !== 'UL') {
            note = (note.parentElement as HTMLElement);
        }
        
        return +note.id;
    }

    return (
        <div className={`table-row ${archived}`} key={`${note.id}-row`}>
            { row }
        </div>
    )
}

export default TableRow;
