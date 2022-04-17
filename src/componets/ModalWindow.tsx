import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/ModalWindow.css';

import { categories, randomCategory } from '../scripts/categories';
import { eventType, formDataTypes, AppDispatchType, RootStateType } from '../scripts/types';
import generateId from '../scripts/generateId';

import { actionModalWindowData } from '../actions/actionModalWindow';
import { actionAddNote, actionEditNote } from '../actions/actionNotes';
import { defaultModalWindow } from '../scripts/defaultState';

const options = categories.map<React.ReactElement>((el, i) => <option key={'option-' + i} value={i}>{el.name}</option>);

function NameEmptyMessage() {
    return <div style={{color: 'red'}}>* Name can not be empty!</div>
}

const ModalWindow = () => {

    const { data:modalWindowData, visibility: modalWindowVisibility } = useSelector((state: RootStateType ) => state.modalWindow);

    const dispatch = useDispatch<AppDispatchType>();
    const classStr:string = modalWindowVisibility ? '' : 'hidden';

    const [nameEmptyMessage, setNameEmpty] = useState(false);
    const [formData, setFormData] = useState(modalWindowData);
    
    useEffect(() => {
        setFormData(modalWindowData);
    }, [modalWindowData]);

    function change(e: eventType) {
        const element = e.target as HTMLFormElement;
        const data = {...formData, [element.name]: element.value}
        
        setFormData(data);
        setNameEmpty(false);
    }

    function close(e: eventType) {
        e.preventDefault();
        const defaultData = defaultModalWindow;

        setFormData(defaultData.data);
        actionModalWindowData(dispatch, {...defaultData});
        setNameEmpty(false);
    }

    function submit(e: eventType) {
        e.preventDefault();

        const { name, category, description }: formDataTypes = formData;

        if(!name) {
            setNameEmpty(true);
        }else {
            const newFormData = {
                id: formData.id,
                name,
                created: 0,
                category,
                description,
                archived: 0,
            };
            
            if(!+category) {
                newFormData.category = randomCategory(+modalWindowData.category, [1, 3]).toString();
            }
            
            if(formData.id === null) {
                newFormData.id = generateId();
                newFormData.created = +new Date();

                actionAddNote(dispatch, newFormData);
                setFormData(defaultModalWindow.data);
            }else {
                actionEditNote(dispatch, newFormData);
            }
            actionModalWindowData(dispatch, defaultModalWindow);
        }
    }

    return (
        <React.Fragment>
            <div className={`modal-window ${classStr}`}>
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
                        <button>{(formData.id === null) ? 'Add' : 'Edit'}</button>
                        {(nameEmptyMessage) ? <NameEmptyMessage /> : null}
                        <button onClick={close}>Close</button>
                    </div>
                </form>
            </div>
            <div className={`modal-bg ${classStr}`}></div>
        </React.Fragment>
    );
};

export default ModalWindow;
