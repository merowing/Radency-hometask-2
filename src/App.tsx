import React from 'react';
import Table from './componets/Table';
import Buttons from './componets/Buttons';
import ModalWindow from './componets/ModalWindow';

const App = () => {
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
