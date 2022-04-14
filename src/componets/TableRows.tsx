import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import TableRow from './TableRow';
import { noteTypes, RootStateType, archiveTypes } from '../scripts/types';

let TableRows:React.FC<{type?:string}> = ({type}) => {

    let notesData = useSelector((state: RootStateType) => state.notes);
    let showArchives = useSelector((state: RootStateType) => state.showArchives);
    console.log(notesData);
    let archiveData:archiveTypes = [];
    notesData.map<void>(item => {
        let n:number = 0;
        let index = archiveData.findIndex(elem => elem.category === item.category);
        if(archiveData.length && index !== -1) {
            archiveData[index].active += +!item.archived;
            archiveData[index].archived += +item.archived;
        }else {
            archiveData.push({
                id: ++n,
                category: item.category,
                active: +!item.archived,
                archived: +item.archived
            });
        }
    });

    let rows:React.ReactElement[] = [];
    if(type === 'stats') {
        rows = tableRowElements(archiveData);
    }else {
        if(!showArchives) {
            notesData = notesData.filter(note => !note.archived);
        }
        rows = tableRowElements(notesData);
    }

    function tableRowElements(data: archiveTypes | noteTypes[]) {
        if(notesData.length) {
            return data.map<React.ReactElement>((note, ind) => <TableRow note={note} type={type} key={`table-row-${ind}`}/>);
        }else {
            return [];
        }
    }

    //let tableRows = useRef(null);

    return (
        <React.Fragment>
            {rows}
        </React.Fragment>
    );
};

export default TableRows;