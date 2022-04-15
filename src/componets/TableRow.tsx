import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionModalWindowData } from '../actions/actionModalWindow';
import { getCategoryColor, getCategoryName } from '../scripts/categories';
import { AppDispatchType, eventType, formDataTypes, noteTypes, RootStateType, archiveStatisticTypes } from '../scripts/types';
import { actionRemoveNote, actionToggleArchiveState } from '../actions/actionNotes';
import { defaultModalWindow } from '../scripts/defaultState';
import { datesFromDescription, maxLettersString, getDate } from '../scripts/tableRow';
import * as Icon from 'react-bootstrap-icons';

let TableRow:React.FC<{note: noteTypes | archiveStatisticTypes, type?: string}> = ({note, type}) => {
    let tagDiv:React.ReactElement[] = [];
    
    type = (!type) ? '' : type;
    
    let firstLetterOfCategory:string = getCategoryName(note.category)[0];
    let bgColor:string = getCategoryColor(note.category);

    tagDiv.push(
        <div key={`image-${type}-${note.id}`}>
            <div style={{backgroundColor: bgColor}} className="image-category">
                <span>{firstLetterOfCategory}</span>
            </div>
        </div>
    );

    let divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(divRef.current && type !== 'stats') {
            let noteItems = divRef.current.children;
            let columnIndexes = [1,4];
            
            for(let i = 0; i < columnIndexes.length; i++) {
                let itemText: any = noteItems[columnIndexes[i]].firstChild?.textContent;
                if(itemText) {
                    let element = (noteItems[columnIndexes[i]].firstChild as HTMLElement);
                    
                    element.textContent = itemText;
                    element.textContent = maxLettersString(element, itemText);
                }
            }
        }
        
    }, [note, type]);
    
    let key: keyof typeof note;
    let opt: string;

    for(key in note) {
        opt = note[key];
        
        if(key === 'category') {
            opt = getCategoryName(opt);
        }
        if(key === 'created') {
            opt = getDate(+opt);
        }

        if(key !== 'id' && (type === 'stats' || key !== 'archived')) {
            tagDiv.push(<div key={`${key}${type}-${note.id}`}><span>{opt}</span></div>);
        }
    }

    let [editIcon, setEditIcon] = useState(false);
    let [archiveIcon, setArchiveIcon] = useState(false);
    let [removeIcon, setRemoveIcon] = useState(false);

    let archived = (note.archived && type !== 'stats') ? 'archived' : '';

    if(type !== 'stats') {
        let dateString = datesFromDescription((!note.description) ? '' : note.description);

        tagDiv.push(<div key={`date-${note.id}`}>{dateString}</div>);
        tagDiv.push(
            <div key={`$buttons-${note.id}`}>
                <ul id={`${note.id}`}>
                    <li key={`edit-${note.id}`} title='edit' onClick={noteEdit} onMouseOver={() => setEditIcon(true)} onMouseLeave={() => setEditIcon(false)}>
                        {(!editIcon) ? <Icon.Pencil/> : <Icon.PencilFill/>}
                    </li>
                    <li key={`archive-${note.id}`} title='archive' onClick={noteArchive} onMouseOver={() => setArchiveIcon(true)} onMouseLeave={() => setArchiveIcon(false)}>
                        {(!archiveIcon && archived === '') ? <Icon.Archive/> : <Icon.ArchiveFill/>}
                    </li>
                    <li key={`remove-${note.id}`} title='remove' onClick={noteRemove} onMouseOver={() => setRemoveIcon(true)} onMouseLeave={() => setRemoveIcon(false)}>
                        {(!removeIcon) ? <Icon.Eraser/> : <Icon.EraserFill/>}
                    </li>
                </ul>
            </div>
        )
    }

    document.body.addEventListener('mouseover', function(e) {
        let elem = (e.target as HTMLElement).tagName;
        if(elem === 'DIV') {
            if(editIcon) setEditIcon(false);
            if(archiveIcon) setArchiveIcon(false);
            if(removeIcon) setRemoveIcon(false);
        }
    });

    let dispatch = useDispatch<AppDispatchType>();
    let noteData = useSelector((state: RootStateType) => state.notes);

    function noteEdit(e: eventType) {
        let index = getIndex(e);
        let data: formDataTypes = defaultModalWindow.data;
        
        if(index >= 0) {
            let itemIndex = noteData.findIndex(item => item.id === index);
            data = {
                id: +index,
                name: noteData[itemIndex].name,
                category: noteData[itemIndex].category.toString(),
                description: noteData[itemIndex].description,
            };
        }
        
        actionModalWindowData(dispatch, {data, visibility: true});
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
        <div className={`table-row ${archived}`} key={`${note.id}-row`} ref={divRef}>
            { tagDiv }
        </div>
    )
}

export default TableRow;
