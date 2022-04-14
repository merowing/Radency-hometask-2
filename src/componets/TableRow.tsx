import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionModalWindowData } from '../actions/actionModalWindow';
import { getCategoryColor, getCategoryName } from '../scripts/categories';
import { AppDispatchType, eventType, formDataTypes, noteTypes, RootStateType, archiveStatisticTypes } from '../scripts/types';
import { actionRemoveNote, actionToggleArchiveState } from '../actions/actionNotes';
import { defaultModalWindow } from '../scripts/defaultState';
import { datesFromDescription, maxLettersString, getDate } from '../scripts/tableRow';

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

    let [windowWidth, setWindowWidth] = useState(document.body.clientWidth);

    window.addEventListener('resize', () => {
        setWindowWidth(document.body.clientWidth);
    }, false);

    let itemTextArr:string[] = [];
    if(type !== 'stats') {
        let noteArr: any = {...note};
        itemTextArr = Object.keys(noteArr).reduce<string[]>((prev, current) => {
            if(current === 'name' || current === 'description') {
                prev.push(noteArr[current]);
                return prev;
            }
            return prev;
        }, []);
    }

    let divRef = useRef<HTMLDivElement>(null);
    let columnIndexes = [1,4];

    useEffect(() => {
        if(divRef.current && type !== 'stats') {
            let noteItems = divRef.current.children;

            columnIndexes.map<void>((id, index) => {
                let itemText: string = itemTextArr[index];
                if(itemText) {
                    let element = (noteItems[id].firstChild as HTMLElement);
                    
                    element.textContent = itemText;
                    element.textContent = maxLettersString(element, itemText);
                }
            });
        }
    }, [windowWidth, itemTextArr]);

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
    if(type !== 'stats') {
        let dateString = datesFromDescription((!note.description) ? '' : note.description);

        tagDiv.push(
            <React.Fragment>
                <div key={`date-${note.id}`}>{dateString}</div>
                <div key={`$buttons-${note.id}`}>
                    <ul id={`${note.id}`}>
                        <li key={`edit-${note.id}`} title='edit' onClick={noteEdit}></li>
                        <li key={`archive-${note.id}`} title='archive' onClick={noteArchive}></li>
                        <li key={`remove-${note.id}`} title='remove' onClick={noteRemove}></li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }

    let dispatch = useDispatch<AppDispatchType>();
    let noteData = useSelector((state: RootStateType) => state.notes);

    function noteEdit(e: eventType) {
        let index = getIndex(e);
        let data: formDataTypes = defaultModalWindow.data;
        
        if(index) {
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
        let note = event.target as HTMLLIElement;
        return +note.parentElement!.id;
    }

    let archived = (note.archived && type !== 'stats') ? 'archived' : '';
    
    return (
        <div className={`table-row ${archived}`} key={`${note.id}-row`} ref={divRef}>
            { tagDiv }
        </div>
    )
}

export default TableRow;
