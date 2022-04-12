import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/ModalWindow.css';

import { categories, randomCategory } from '../scripts/categories';
import actionModalWindowVisibility from '../actions/actionModalWindowVisibility';
import { eventType, formDataType, AppDispatchType, RootStateType } from '../scripts/types';

let defaultFormData: formDataType = {
    name: '',
    category: 0,
    description: '',
}

let options = categories.map((el, i) => <option key={'option-' + i} value={i}>{el}</option>);

function EmptyNameMessage() {
    return <div style={{color: 'red'}}>* Name can not be empty!</div>
}

let ModalWindow = () => {

    let stateModalWindow = useSelector((state: RootStateType ) => state.modalWindowVisiblity);
    let dispatch = useDispatch<AppDispatchType>();
    
    let classStr:string = stateModalWindow ? '' : 'hidden';

    let [nameEmpty, setNameEmpty] = useState(false);
    let [formData, setFormData] = useState(defaultFormData);

    function change(e: eventType) {
        let element = e.target as HTMLFormElement;
        let obj:formDataType = {...formData, [element.name]: element.value,}
        setFormData(obj);
        setNameEmpty(false);
    }

    function close(e: eventType) {
        e.preventDefault();
        setFormData(defaultFormData);
        
        actionModalWindowVisibility(dispatch, false);
        setNameEmpty(false);
    }

    function submit(e: eventType) {
        e.preventDefault();
        let { name, category }: { name:string, category:number } = formData;
        if(!name) {
            setNameEmpty(true);
        }else {
            if(category) {
                formData.category = randomCategory(1, 3);
            }
            alert(JSON.stringify(formData));
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
                        <button>Add</button>
                        {(nameEmpty) ? <EmptyNameMessage /> : null}
                        <button onClick={close}>Close</button>
                    </div>
                </form>
            </div>
            <div className={`modal-bg ${classStr}`}></div>
        </React.Fragment>
    );
};

export default ModalWindow;