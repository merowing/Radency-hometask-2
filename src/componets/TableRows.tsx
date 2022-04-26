import React from 'react';
import { useSelector } from 'react-redux';
import TableRow from './TableRow';
import { noteTypes, RootStateType, archiveStatisticTypes } from '../scripts/types';

const TableRows:React.FC<{type?:string}> = ({type}) => {

    const notesData = useSelector((state: RootStateType) => state.notes);
    const showArchives = useSelector((state: RootStateType) => state.showArchives);

    let rows:React.ReactElement[] = [];
    if(type === 'stats') {
        const statisticsData = notesData.reduce((prev: archiveStatisticTypes[], current) => {
            const index = prev.findIndex(({ category }) => category === current.category);
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

        rows = tableRowElements(statisticsData);
    }else {
        rows = tableRowElements(notesData);
        if(!showArchives) {
            rows = tableRowElements(notesData.filter(note => !note.archived));
        }
    }

    function tableRowElements(data: archiveStatisticTypes[] | noteTypes[]) {
        return data.map<React.ReactElement>((note, ind) => <TableRow note={note} type={type} key={`table-row-${ind}`}/>);
    }

    return (
        <React.Fragment>
            {rows}
        </React.Fragment>
    );
};

export default TableRows;
