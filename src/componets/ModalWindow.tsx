import React, { useRef, useState } from 'react';
import '../styles/ModalWindow.css';
import categories from '../scripts/categories';
import { getData, setData } from '../scripts/modalWindowFormData';

let options = categories.map((el, i) => <option key={'option-' + i} value={i}>{el}</option>);

type functionType = () => void;
type eventType = React.FormEvent<EventTarget>;

let ModalWindow:React.FC<{modalState:boolean, toggleShowModal:functionType}> = ({modalState, toggleShowModal}) => {
    
    let classStr:string = modalState ? '' : 'hidden';
    let formRef = useRef<HTMLFormElement>(null);

    let [nameEmpty, setNameEmpty] = useState(false);

    function close(e: eventType) {
        e.preventDefault();
        formRef.current?.reset();
        toggleShowModal();
    }
    function submit(e: eventType) {
        e.preventDefault();
        let form = e.target as HTMLFormElement;
        let nameVal = (form[0] as HTMLFormElement).value;
        
        setData();
        if(!nameVal) {
            setNameEmpty(nameEmpty = true);
        }else {
            setData(form);
        }
        console.log(getData());
    }
    function checkNameValue() {
        if(nameEmpty) setNameEmpty(!nameEmpty);
    }
    function EmptyNameMessage() {
        return <div style={{color: 'red'}}>* Name can not be empty!</div>
    }

    return (
        <React.Fragment>
            <div className={`modal-window ${classStr}`}>
                <form onSubmit={submit} ref={formRef}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' id='name' name='Name' defaultValue='' onClick={checkNameValue} placeholder='Enter the name' />
                    </div>
                    <div>
                        <label>Choose category:</label>
                        <select name='Category'>
                            {options}
                        </select>
                    </div>
                    <div>
                        <label>Choose date:</label>
                        <div className='dates'>
                            <span>From: </span><input type='date' name='dateFrom' />
                            <span>To: </span><input type='date' name='dateTo' />
                        </div>
                    </div>
                    <div>
                        <textarea placeholder='Description' name='Description'></textarea>
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