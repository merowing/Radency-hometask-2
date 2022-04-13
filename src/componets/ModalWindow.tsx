import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/ModalWindow.css';

import { categories, randomCategory } from '../scripts/categories';
import actionModalWindowVisibility from '../actions/actionModalWindowVisibility';
import { eventType, formDataTypes, modalWindowTypes, AppDispatchType, RootStateType } from '../scripts/types';
import actionModalWindowData from '../actions/actionModalWindowData';
import { actionAddNote, actionEditNote } from '../actions/actionNotes';
import generateId from '../scripts/generateId';

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
function EditMessage() {
    return <div style={{color: 'green', fontWeight: 700}}>Saved!</div>
}

let ModalWindow = () => {

    let { data:modalWindowData, visibility: modalWindowVisibility } = useSelector((state: RootStateType ) => state.modalWindow);
    // let noteData = useSelector((state: RootStateType) => state.notes);
    // let formDataStore = noteData[modalWindow.] || defaultFormData;
    // console.log(formDataStore);
    // let formDataStore: formDataTypes = defaultFormData;
    // if(modalWindow.index >= 0) {
    //     formDataStore = { 
    //         name: noteData[modalWindow.index].name,
    //         category: noteData[modalWindow.index].category,
    //         description: noteData[modalWindow.index].description,
    //     }
    //     //setFormData(formDataStore);
    // }
    //if(modalWindow.index === -1) formDataStore = defaultFormData;
    //console.log(formDataStore);

    let dispatch = useDispatch<AppDispatchType>();
console.log(modalWindowData);    
    let classStr:string = modalWindowVisibility ? '' : 'hidden';

    let [nameEmptyMessage, setNameEmpty] = useState(false);
    let [formData, setFormData] = useState(modalWindowData);
    useEffect(() => {
        setFormData(modalWindowData);
    }, [modalWindowData]);

console.log(formData);
    function change(e: eventType) {
        //alert();
        let element = e.target as HTMLFormElement;
        let data = {...formData, [element.name]: element.value}
        //alert(data);
        setFormData(data);
        setNameEmpty(false);
    }

    function close(e: eventType) {
        e.preventDefault();
        //let resetData = {data: {...defaultFormData, id: -1}};
        setFormData(defaultFormData);

        actionModalWindowData(dispatch, {data: {...defaultFormData}});
        actionModalWindowVisibility(dispatch, false);
        setNameEmpty(false);
    }

    function submit(e: eventType) {
        e.preventDefault();

        let { name, category, description }: formDataTypes = formData;

        if(!name) {
            setNameEmpty(true);
        }else {
            let newFormData = {
                id: modalWindowData.id,
                name,
                created: 0,
                category,
                description,
                archived: 0,
            };

            if(!+category) {
                newFormData.category = randomCategory(1, 3).toString();
            }
            
            //alert(JSON.stringify(newFormData));
            //actionModalWindowData(dispatch, modalWindow.index);
            if(!modalWindowData.id) {
                newFormData.id = generateId();
                newFormData.created = +new Date();
                actionAddNote(dispatch, newFormData);
            }else {
                
                //console.log(newFormData);
                actionEditNote(dispatch, newFormData);
                actionModalWindowVisibility(dispatch, false);
            }
            setFormData(defaultFormData);
            //else alert(modalWindowData.id);
            //setFormData(defaultFormData);
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
                        <button>{(!modalWindowData.id) ? 'Add' : 'Edit'}</button>
                        {(nameEmptyMessage) ? <NameEmptyMessage /> : null}
                        {/*(editMessage) ? <EditMessage /> : null*/}
                        <button onClick={close}>Close</button>
                    </div>
                </form>
            </div>
            <div className={`modal-bg ${classStr}`}></div>
        </React.Fragment>
    );
};

export default ModalWindow;