import React from 'react';
import { useSelector } from 'react-redux';
import TableRow from './TableRow';
import { noteTypes, RootStateType, archiveStatisticTypes } from '../scripts/types';

let TableRows:React.FC<{type?:string}> = ({type}) => {

    let notesData = useSelector((state: RootStateType) => state.notes);
    let showArchives = useSelector((state: RootStateType) => state.showArchives);
    
    let archiveData = notesData.reduce((prev: archiveStatisticTypes[], current) => {
        let index = prev.findIndex(({ category }) => category === current.category);
        if(prev.length && index !== -1) {
            prev[index].active += +!current.archived;
            prev[index].archived += +current.archived;
        }else {
            prev.push({
                id: prev.length,
                category: current.category,
                active: +!current.archived,
                archived: +current.archived
            });
        }
        return prev;
    }, []);

    let rows:React.ReactElement[] = [];
    if(type === 'stats') {
        rows = tableRowElements(archiveData);
    }else {
        if(!showArchives) {
            notesData = notesData.filter(note => !note.archived);
        }
        rows = tableRowElements(notesData);
    }

    function tableRowElements(data: archiveStatisticTypes[] | noteTypes[]) {
        if(notesData.length) {
            return data.map<React.ReactElement>((note, ind) => <TableRow note={note} type={type} key={`table-row-${ind}`}/>);
        }else {
            return [];
        }
    }

    return (
        <React.Fragment>
            {rows}
        </React.Fragment>
    );
};

export default TableRows;