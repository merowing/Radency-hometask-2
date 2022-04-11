import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
//import logo from './logo.svg';
import './App.css';
import Table from './componets/Table';
import Buttons from './componets/Buttons';
import ModalWindow from './componets/ModalWindow';
import useShowModalWindow from './hooks/useShowModalWindow';

let App = () => {
  let [modalState, setToggleModalWindow] = useShowModalWindow();
  
  function toggleShowModal() {
    setToggleModalWindow();
  }

  return (
    <React.Fragment>
        <Table />
        <Buttons toggleShowModal={toggleShowModal}/>
        <Table type='stats' />
        <ModalWindow modalState={modalState} toggleShowModal={toggleShowModal} />
    </React.Fragment>
  );
}

export default App;
