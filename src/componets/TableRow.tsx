import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionModalWindowData } from '../actions/actionModalWindow';
import { getCategoryColor, getCategoryName } from '../scripts/categories';
import { AppDispatchType, eventType, formDataTypes, noteTypes, RootStateType, archiveStatisticTypes } from '../scripts/types';
import { actionRemoveNote, actionToggleArchiveState } from '../actions/actionNotes';
import { defaultModalWindow } from '../scripts/defaultState';
import { datesFromDescription, maxLettersString, getDate } from '../scripts/tableRow';
import * as Icon from 'react-bootstrap-icons';

const TableRow:React.FC<{note: noteTypes | archiveStatisticTypes, type?: string}> = ({note, type}) => {
    
    type = (!type) ? '' : type;
    
    const firstLetterOfCategory:string = getCategoryName(note.category)[0];
    const bgColor:string = getCategoryColor(note.category);

    const archived = (note.archived && type !== 'stats') ? 'archived' : '';

    // buttons
    const [editIcon, setEditIcon] = useState(false);
    const [archiveIcon, setArchiveIcon] = useState(false);
    const [removeIcon, setRemoveIcon] = useState(false);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(divRef.current && type !== 'stats') {
            const noteItems = divRef.current.children;
            
            const elemsTextShort = [
                noteItems[1].firstChild!,
                noteItems[4].firstChild!
            ]
            
            const shorTextArr = elemsTextShort.map<string>(element => {
                const itemText: string | null = element!.textContent;
                
                if(itemText) {
                    return maxLettersString((element as HTMLSpanElement), itemText);
                }
                return '';
            });

            elemsTextShort.map<void>((elem, i) => {
                elem.textContent = shorTextArr[i];
                return null;
            });
        }
        
    }, [note, type]);
    
    const tagDiv: React.ReactElement[] = Object.keys(note).map<React.ReactElement>((key: string) => {
        let opt = note[key];

        if(key === 'id') {
            return (
                <div key={`image-${type}-${note.id}`}>
                    <div style={{backgroundColor: bgColor}} className="image-category">
                        <span>{firstLetterOfCategory}</span>
                    </div>
                </div>
            )
        }
        if(key === 'category') {
            opt = getCategoryName(note.category);
        }
        if(key === 'created') {
            opt = getDate(+note.created!);
        }
        if(key === 'description') {
            const dateString = datesFromDescription((!note.description) ? '' : note.description);
            return (
                <React.Fragment key={`fragment-description-${note.id}`}>
                    <div key={`${key}-${type}-${note.id}`}><span>{opt}</span></div>
                    <div key={`date-${note.id}`}>{dateString}</div>
                </React.Fragment>
            );
        }

        if(key !== 'id' && key !== 'description' && (type === 'stats' || key !== 'archived')) {
            return <div key={`${key}-${type}-${note.id}`}><span>{opt}</span></div>;
        }

        return (
            <React.Fragment key={`fragment-buttons-${note.id}`}>
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
            </React.Fragment>
        )
    });

    document.body.addEventListener('mouseover', function(e) {
        const elem = (e.target as HTMLElement).tagName;
        if(elem === 'DIV') {
            if(editIcon) setEditIcon(false);
            if(archiveIcon) setArchiveIcon(false);
            if(removeIcon) setRemoveIcon(false);
        }
    });

    const dispatch = useDispatch<AppDispatchType>();
    const noteData = useSelector((state: RootStateType) => state.notes);

    function noteEdit(e: eventType) {
        const index = getIndex(e);
        let data: formDataTypes = defaultModalWindow.data;
        
        if(index >= 0) {
            const itemIndex = noteData.findIndex(item => item.id === index);
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
