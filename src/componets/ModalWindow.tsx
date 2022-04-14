import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/ModalWindow.css';

import { categories, randomCategory } from '../scripts/categories';
import { eventType, formDataTypes, AppDispatchType, RootStateType } from '../scripts/types';
import generateId from '../scripts/generateId';

import { actionModalWindowData, actionModalWindowVisibility } from '../actions/actionModalWindow';
import { actionAddNote, actionEditNote } from '../actions/actionNotes';

let defaultFormData: formDataTypes = {
    id: null,
    name: '',
    category: '0',
    description: '',
}

let options = categories.map<React.ReactElement>((el, i) => <option key={'option-' + i} value={i}>{el.name}</option>);

function NameEmptyMessage() {
    return <div style={{color: 'red'}}>* Name can not be empty!</div>
}

let ModalWindow = () => {

    let { data:modalWindowData, visibility: modalWindowVisibility } = useSelector((state: RootStateType ) => state.modalWindow);

    let dispatch = useDispatch<AppDispatchType>();
    let classStr:string = modalWindowVisibility ? '' : 'hidden';

    let [nameEmptyMessage, setNameEmpty] = useState(false);
    let [formData, setFormData] = useState(modalWindowData);
    
    useEffect(() => {
        setFormData(modalWindowData);
    }, [modalWindowData]);

    function change(e: eventType) {
        let element = e.target as HTMLFormElement;
        let data = {...formData, [element.name]: element.value}
        
        setFormData(data);
        setNameEmpty(false);
    }

    function close(e: eventType) {
        e.preventDefault();
        setFormData(defaultFormData);

        let data = {
            data: {...defaultFormData},
            visibility: false,
        };
        actionModalWindowData(dispatch, data);
        //actionModalWindowVisibility(dispatch, false);
        setNameEmpty(false);
    }

    function submit(e: eventType) {
        e.preventDefault();

        let { name, category, description }: formDataTypes = formData;

        if(!name) {
            setNameEmpty(true);
        }else {
            let newFormData = {
                id: formData.id,
                name,
                created: 0,
                category,
                description,
                archived: 0,
            };

            if(!+category) {
                newFormData.category = randomCategory(1, 3).toString();
            }
            
            if(!formData.id) {
                newFormData.id = generateId();
                newFormData.created = +new Date();

                actionAddNote(dispatch, newFormData);
            }else {
                actionEditNote(dispatch, newFormData);
                actionModalWindowVisibility(dispatch, false);
            }
            setFormData(defaultFormData);
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
                        <button>{(!formData.id) ? 'Add' : 'Edit'}</button>
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
