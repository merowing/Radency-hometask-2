import React from 'react';
import { useSelector } from 'react-redux';
import TableRow from './TableRow';
import { RootStateType } from '../scripts/types';

interface Data {
    id: number,
    name: string,
    created: number,
    category: number,
    content: string,
    dates: string,
}

interface DataStats {
    id: number,
    name: string,
    active: number,
    archived: number,
}

let data:Data[] = [
    {
        id: 0,
        name:'Note 1',
        created: 0,
        category: 0,
        content: 'Content',
        dates: '',
    },
    {
        id: 1,
        name:'Note 2',
        created: 0,
        category: 0,
        content: 'Content',
        dates: '9/4/2022, 10/4/2022',
    },
];

let dataStats:DataStats[] = [
    {
        id: 0,
        name: 'Category Name',
        active: 0,
        archived: 0,
    },
    {
        id: 1,
        name: 'Category Name 2',
        active: 0,
        archived: 0,
    },
];

let TableRows:React.FC<{type?:string}> = ({type}) => {
    //console.log(type);
    //let rows:Reac(t.ReactElement[] = [];

    let notesData = useSelector((state: RootStateType) => state.notes);
    let rows:React.ReactElement[] = [];

    type archiveTypes = Array<{
        id: number,
        category: number,
        active: number,
        archived: number,
    }>;
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

    //console.log(archiveData);

    if(type === 'stats') {
        //rows = [];
        rows = archiveData.map<React.ReactElement>((note, ind) => <TableRow note={note} type={type} key={`table-row-${type}-${ind}`} />);
    }else {
        notesData = notesData.filter(note => !note.archived);
        rows = notesData.map<React.ReactElement>((note, ind) => <TableRow note={note} type={type} key={`table-row-${ind}`}/>);
    //console.log('rows:' + JSON.stringify(rows[0]));
    }
    return (
        <React.Fragment>
            {rows}
        </React.Fragment>
    );
};

export default TableRows;