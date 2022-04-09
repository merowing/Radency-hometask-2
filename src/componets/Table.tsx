import React from 'react';
import { arrayBuffer } from 'stream/consumers';
import '../styles/Table.css';
import TableHead from './TableHead';
import TableRows from './TableRows';

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
