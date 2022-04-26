import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categories, randomCategory } from '../scripts/categories';
import { eventType, formDataTypes, AppDispatchType, RootStateType } from '../scripts/types';
import { actionModalWindowVisibility } from '../actions/actionModalWindow';
import { actionAddNote, actionEditNote } from '../actions/actionNotes';
import generateId from '../scripts/generateId';
import '../styles/ModalWindow.css';

const options = categories.map<React.ReactElement>((el, i) => <option key={'option-' + i} value={i}>{el.name}</option>);

function NameEmptyMessage() {
    return <div style={{color: 'red'}}>* Name can not be empty!</div>
}

const ModalWindow = () => {
    let defaultData: any = { 
        id: -1,
        name: '',
        category: 0,
        description: ''
    };
    
    const notesData = useSelector((state: RootStateType) => state.notes);
    const { id: modalWindowId, visibility: modalWindowVisibility } = useSelector((state: RootStateType ) => state.modalWindow);

    const dispatch = useDispatch<AppDispatchType>();
    const classShow: string = modalWindowVisibility ? '' : 'hidden';

    const [nameEmptyMessage, setEmptyMessage] = useState(false);
    const [formData, setFormData] = useState(defaultData);
    
    useEffect(() => {
        if(modalWindowId === -1) {
            setFormData(defaultData);
        }else {
            setFormData(notesData[modalWindowId]);
        }
    }, [modalWindowId]);

    function change(e: eventType) {
        const element = e.target as HTMLFormElement;
        const data = {...formData, [element.name]: element.value}
        
        setFormData(data);
        setEmptyMessage(false);
    }

    function close(e: eventType) {
        e.preventDefault();

        actionModalWindowVisibility(dispatch, false);
        setFormData(defaultData);
        setEmptyMessage(false);
    }

    function submit(e: eventType) {
        e.preventDefault();

        let { name, category, description }: formDataTypes = formData;
        
        if(name === '') {
            setEmptyMessage(true);
        }else {

            if(category === 0) {
                category = randomCategory(+category, [1, 3]);
            }

            if(modalWindowId === -1) {
                actionAddNote(dispatch, {
                    id: generateId(),
                    created: +new Date(),
                    archived: 0,
                    name,
                    category,
                    description,
                });
            }else {
                actionEditNote(dispatch, {
                    id: modalWindowId,
                    name,
                    category,
                    description
                });
            }

            setFormData(defaultData);
            actionModalWindowVisibility(dispatch, false);
        }
    }

    return (
        <React.Fragment>
            <div className={`modal-window ${classShow}`}>
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' id='name' name='name' onChange={change} value={formData.name} placeholder='Enter the name' />
                    </div>
                    <div>
                        <label>Choose category:</label>
                        <select name='category' onChange={change} value={formData.category}>
                            {options}
                        </select>
                    </div>
                    <div>
                        <textarea placeholder='Description' name='description' onChange={change} value={formData.description}></textarea>
                    </div>
                    <div>
                        <button>{(formData.id === -1) ? 'Add' : 'Edit'}</button>
                        {(nameEmptyMessage) ? <NameEmptyMessage /> : null}
                        <button onClick={close}>Close</button>
                    </div>
                </form>
            </div>
            <div className={`modal-bg ${classShow}`}></div>
        </React.Fragment>
    );
};

export default ModalWindow;
