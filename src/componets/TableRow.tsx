import React from 'react';

interface DataRow {
    name: string,
    id: number,
    content: string,
    dates: string,
    category: number,
    created: number,
}
interface DataRowStats {
    id: number,
    name: string,
    active: number,
    archived: number,
}

let TableRow:React.FC<{dataRow:DataRow|DataRowStats, type?:string}> = ({dataRow, type}) => {
    let tagDiv:React.ReactElement[] = [];

    type = (!type) ? '' : '-' + type;
    tagDiv.push(<div key={`image${type}-${dataRow.id}`}></div>);

    let key: keyof typeof dataRow;
    for(key in dataRow) {
        let opt = dataRow[key];
        if(key !== 'id') {
            tagDiv.push(<div key={`${opt}${type}-${dataRow.id}`}>{opt}</div>);
        }
    }

    if(!dataRow.hasOwnProperty('active')) {
        tagDiv.push(
            <div key={`$buttons-${dataRow.id}`}>
                <ul>
                    <li key={`edit-${dataRow.id}`}></li>
                    <li key={`archive-${dataRow.id}`}></li>
                    <li key={`remove-${dataRow.id}`}></li>
                </ul>
            </div>
        )
    }

    return (
        <div className={`table-row`} key={`${dataRow.id}-row`}>
            { tagDiv }
        </div>
    )
}

export default TableRow;
