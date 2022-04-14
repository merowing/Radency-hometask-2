import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionModalWindowData, actionModalWindowVisibility } from '../actions/actionModalWindow';
import { getCategoryColor, getCategoryName } from '../scripts/categories';
import { AppDispatchType, eventType, noteTypes, RootStateType } from '../scripts/types';
import getDate from '../scripts/getDate';
import { actionRemoveNote, actionToggleArchiveState } from '../actions/actionNotes';

type archiveTypes = {
    id: number,
    category: string,
    active: number,
    archived: number,

    created?: string,
    description?: string,
    name?: string,
}

let TableRow:React.FC<{note: noteTypes | archiveTypes, type?: string}> = ({note, type}) => {
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

    let [windowWidth, setWidnowWidth] = useState(document.body.clientWidth);

    window.addEventListener('resize', () => {
        setWidnowWidth(document.body.clientWidth);
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
    useEffect(() => {
        if(divRef.current && type !== 'stats') {
            let indx = [1,4];
            let noteItems = divRef.current.children;

            indx.map<void>((id, index) => {
                let itemText: string = itemTextArr[index];
                if(itemText) {
                    let element = (noteItems[id].firstChild as HTMLElement);
                    
                    element.textContent = itemText;
                    let contentLength = itemText.length;

                    element.style.whiteSpace = 'nowrap';
                    let divWidth = element.clientWidth;
                    element.removeAttribute('style');
                    
                    if(divWidth > element.clientWidth) {
                        let letterWidth = Math.ceil(divWidth / contentLength);
                        let lettersInOneLine = Math.ceil(element.clientWidth / letterWidth) - 3;
                        element.textContent = itemText.substr(0, lettersInOneLine) + '...';
                    }
                }
            });
            console.log(1);
        }
    }, [windowWidth, itemTextArr]);

    let key: keyof typeof note;
    let opt: any;

    for(key in note) {
        opt = note[key];
        
        if(key === 'category') {
            opt = getCategoryName(opt);
        }
        if(key === 'created') {
            opt = getDate(opt);
        }

        if(key !== 'id' && (type === 'stats' || key !== 'archived')) {
            tagDiv.push(<div key={`${key}${type}-${note.id}`}><span>{opt}</span></div>);
        }
    }
    if(type !== 'stats') {
        let datesArr:string[] = [];
        if(note.description) {
            datesArr = note.description.match(/\d{1,2}\/\d{1,2}\/\d{4}/g) || [];
        }
        let dateString: string = datesArr.join(', ');
        
        tagDiv.push(<div key={`date-${note.id}`}>{dateString}</div>);
        tagDiv.push(
            <div key={`$buttons-${note.id}`}>
                <ul id={`${note.id}`}>
                    <li key={`edit-${note.id}`} title='edit' onClick={openModalWindow}></li>
                    <li key={`archive-${note.id}`} title='archive' onClick={noteArchive}></li>
                    <li key={`remove-${note.id}`} title='remove' onClick={noteRemove}></li>
                </ul>
            </div>
        )
    }

    let dispatch = useDispatch<AppDispatchType>();
    let noteData = useSelector((state: RootStateType) => state.notes);

    function openModalWindow(e: eventType) {
        let index = getIndex(e);
        let data = {id: -1, name:'', category:'0', description:''};
        if(index) {
            let itemIndex = noteData.findIndex(item => item.id === index);
            data = {
                id: +index,
                name: noteData[itemIndex].name,
                category: noteData[itemIndex].category.toString(),
                description: noteData[itemIndex].description,
            };
        }
        
        actionModalWindowData(dispatch, {data});
        actionModalWindowVisibility(dispatch, true);
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
