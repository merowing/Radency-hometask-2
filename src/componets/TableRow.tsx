import { stringify } from 'querystring';
import React, { ReactElement } from 'react';
import { categories, getCategoryColor, getCategoryName, randomCategory } from '../scripts/categories';

type noteTypes = {
    id: number,
    category: number,
    description: string,
    name: string,
    created: number,
    archived: number,
}
type archiveTypes = {
    id: number,
    category: number,
    active: number,
    archived: number,
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
    let opt:string|number;

    for(key in note) {
        opt = note[key];
        
        if(key === 'category') {
            opt = getCategoryName(opt);
        }
        if(key !== 'id' && (type === 'stats' || key !== 'archived')) {
            tagDiv.push(<div key={`${key}${type}-${note.id}`}>{opt}</div>);
        }
    }
    if(type !== 'stats') {
        tagDiv.push(<div key={`date-${note.id}`}></div>);
    // }

    // if(!note.hasOwnProperty('active')) {
        tagDiv.push(
            <div key={`$buttons-${note.id}`}>
                <ul>
                    <li key={`edit-${note.id}`}></li>
                    <li key={`archive-${note.id}`}></li>
                    <li key={`remove-${note.id}`}></li>
                </ul>
            </div>
        )
    }

    return (
        <div className={`table-row`} key={`${note.id}-row`}>
            { tagDiv }
        </div>
    )
}

export default TableRow;
