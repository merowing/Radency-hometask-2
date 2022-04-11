import { useState } from 'react';

function useShowModalWindow() {
    let [modalShow, setModalHide] = useState<boolean>(false);

    function customFunction() {
        setModalHide(!modalShow);
    }
    return [modalShow, customFunction] as const;
}

export default useShowModalWindow;
