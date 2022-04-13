import { stringify } from 'querystring';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionModalWindowData from '../actions/actionModalWindowData';
import actionModalWindowVisibility from '../actions/actionModalWindowVisibility';
import { categories, getCategoryColor, getCategoryName, randomCategory } from '../scripts/categories';
import { AppDispatchType, eventType, RootStateType } from '../scripts/types';
import getDate from '../scripts/getDate';

type noteTypes = {
    id: number,
    category: string,
    description: string,
    name: string,
    created: number,
    archived: number,
}
type archiveTypes = {
    id: number,
    category: string,
    active: number,
    archived: number,
    created?: string,
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

    let key: keyof typeof note;
    let opt:any;

    for(key in note) {
        opt = note[key];
        
        if(key === 'category') {
            opt = getCategoryName(opt);
        }
        if(key === 'created') {
            opt = getDate(opt);
        }

        if(key !== 'id' && (type === 'stats' || key !== 'archived')) {
            tagDiv.push(<div key={`${key}${type}-${note.id}`}>{opt}</div>);
        }
    }
    if(type !== 'stats') {

        tagDiv.push(<div key={`date-${note.id}`}></div>);
        tagDiv.push(
            <div key={`$buttons-${note.id}`}>
                <ul id={`${note.id}`}>
                    <li key={`edit-${note.id}`} title='edit' onClick={openModalWindow}></li>
                    <li key={`archive-${note.id}`} title='archive'></li>
                    <li key={`remove-${note.id}`} title='remove'></li>
                </ul>
            </div>
        )
    }

    let dispatch = useDispatch<AppDispatchType>();
    let noteData = useSelector((state: RootStateType) => state.notes);
    //let modalWindow2 = useSelector((state: RootStateType ) => state.modalWindow);

    function openModalWindow(e: eventType) {
        let note = e.target as HTMLLIElement;
        let index: number | string | undefined = note.parentElement?.id;
        let data = {id: -1, name:'', category:'0', description:''};
        if(index) {
            data = {
                id: +index,
                name: noteData[+index].name,
                category: noteData[+index].category.toString(),
                description: noteData[+index].description,
            };
        }
        //alert(index);
        actionModalWindowData(dispatch, {data});
        //actionModalWindowData(dispatch, index);
        actionModalWindowVisibility(dispatch, true);
    }

    let archived = (note.archived && type !== 'stats') ? 'archived' : '';

    return (
        <div className={`table-row ${archived}`} key={`${note.id}-row`}>
            { tagDiv }
        </div>
    )
}

export default TableRow;
