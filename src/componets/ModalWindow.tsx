import React from 'react';
import '../styles/ModalWindow.css';
import categories from '../scripts/categories';

let options = categories.map(el => <option>{el}</option>);

let ModalWindow = () => {
    return (
        <React.Fragment>
            <div className='modal-window hidden'>
                <form>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' id='name' value='' placeholder='Enter the name' />
                    </div>
                    <div>
                        <label>Choose category:</label>
                        <select>
                            {options}
                        </select>
                    </div>
                    <div>
                        <label>Choose date:</label>
                        <div className='dates'>
                            <span>From: </span><input type='date' />
                            <span>To: </span><input type='date' />
                        </div>
                    </div>
                    <div>
                        <textarea placeholder='Description'></textarea>
                    </div>
                    <div>
                        <button>Add</button>
                        <button>Close</button>
                    </div>
                </form>
            </div>
            <div className="modal-bg hidden"></div>
        </React.Fragment>
    );
};

export default ModalWindow;