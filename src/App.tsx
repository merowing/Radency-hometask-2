import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Table from './componets/Table';
import Buttons from './componets/Buttons';
import ModalWindow from './componets/ModalWindow';

let App = () => {
  return (
    <React.Fragment>
        <Table />
        <Buttons />
        <Table type='stats' />
        <ModalWindow />
    </React.Fragment>
  );
}

export default App;
