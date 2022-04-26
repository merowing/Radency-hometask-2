import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';

function Icons({ callback, type }:any) {
    const [editIcon, setEditIcon] = useState(false);
    const [archiveIcon, setArchiveIcon] = useState(false);
    const [removeIcon, setRemoveIcon] = useState(false);

    switch(type) {
        case 'edit': {
            return <li title='edit' onClick={(e) => {callback(e)}} onMouseOver={() => setEditIcon(true)} onMouseLeave={() => setEditIcon(false)}>
                    {(!editIcon) ? <Icon.Pencil/> : <Icon.PencilFill/>}
                    </li>;
        }
        case 'archive': {
            return <li title='archive' onClick={(e) => {callback(e)}} onMouseOver={() => setArchiveIcon(true)} onMouseLeave={() => setArchiveIcon(false)}>
                    {(!archiveIcon) ? <Icon.Archive/> : <Icon.ArchiveFill/>}
                    </li>;
        }
        case 'remove': {
            return <li title='remove' onClick={(e) => {callback(e)}} onMouseOver={() => setRemoveIcon(true)} onMouseLeave={() => setRemoveIcon(false)}>
                    {(!removeIcon) ? <Icon.Eraser/> : <Icon.EraserFill/>}
                    </li>;
        }
        default:
            return <></>;
    }
}

export default Icons;
