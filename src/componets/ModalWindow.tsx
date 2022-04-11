import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import '../styles/ModalWindow.css';
import categories from '../scripts/categories';
//import { getData, setData } from '../scripts/modalWindowFormData';
import actionModalWindowVisibility from '../actions/actionModalWindowVisibility';

let options = categories.map((el, i) => <option key={'option-' + i} value={i}>{el}</option>);

type functionType = () => void;
type eventType = React.FormEvent<EventTarget>;

let ModalWindow:React.FC<{modalState:boolean, toggleShowModal:functionType}> = ({modalState, toggleShowModal}) => {

    let stateModalWindow = useSelector((state: RootState ) => state.modalWindowVisiblity);
    let dispatch = useDispatch<AppDispatch>();
    
    let classStr:string = stateModalWindow ? '' : 'hidden';

    let [nameEmpty, setNameEmpty] = useState(false);

    interface formDataObject {
        name: string;
        category: number;
        description: string;
        [key: string]: string | number;
    }
    let defaultFormData: formDataObject = {
        name: '',
        category: 0,
        description: '',
    }
    let [formData, setFormData] = useState(defaultFormData);
    function change(e: eventType) {
        let element = e.target as HTMLFormElement;
        let obj:formDataObject = {...formData, [element.name]: element.value,}
        setFormData(obj);
        setNameEmpty(false);
    }

    function close(e: eventType) {
        e.preventDefault();
        setFormData(defaultFormData);
        //toggleShowModal();
        actionModalWindowVisibility(dispatch, false);
        setNameEmpty(false);
    }
    function submit(e: eventType) {
        e.preventDefault();
        let { name }: { name:string } = formData;
        if(!name) {
            setNameEmpty(true);
        }else {
            alert(JSON.stringify(formData));
        }
    }
    
    function EmptyNameMessage() {
        return <div style={{color: 'red'}}>* Name can not be empty!</div>
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