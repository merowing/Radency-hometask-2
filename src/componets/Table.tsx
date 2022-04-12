import React from 'react';
import TableHead from './TableHead';
import TableRows from './TableRows';
import '../styles/Table.css';

let Table:React.FC<{type?:string}> = ({type}) => {
    let stats = (type === 'stats') ? 'statistics' : '';
    return (
        <div className={`table ${stats}`}>
            <TableHead type={type}/>
            <TableRows type={type}/>
        </div>
    )
}

export default Table;
