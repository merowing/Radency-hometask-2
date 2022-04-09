import React from 'react';

let TableHead:React.FC<{type?:string}> = ({type}) => {
    
    let headNames:string[] = ['', 'Name', 'Created', 'Category', 'Content', 'Dates', ''];
    if(type === 'stats') {
        headNames = ['', 'Name', 'Active', 'Archived'];
    }

    let name = (!type) ? 'head' : 'statistics-head';
    let items = headNames.map((el, i) => {
        if(i === headNames.length - 1 && el === '') {
            return (
                <div key={`head-${i}`}>
                    <ul className='head-buttons'>
                        <li key='editAll'></li>
                        <li key='archiveAll'></li>
                        <li key='deleteAll'></li>
                    </ul>
                </div>
            );
        }
        return <div key={`${name}-${i}`}>{el}</div>;
    });

    return (
        <div className='table-row th'>{items}</div>
    )
}

export default TableHead;