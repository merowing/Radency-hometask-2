import React from 'react';
import TableRow from './TableRow';

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
    let rows:React.ReactElement[] = [];
    if(type === 'stats') {
        rows = dataStats.map((el, i) => <TableRow dataRow={el} type={type} key={`table-row-${type}-${i}`} />);
    }else {
        rows = data.map((el, i) => <TableRow dataRow={el} key={`table-row-${i}`} />);
    }
    return (
        <React.Fragment>
            {rows}
        </React.Fragment>
    );
};

export default TableRows;