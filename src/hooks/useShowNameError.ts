import { useState } from 'react';

function useShowNameError() {
    let [showError, setShowError] = useState<boolean>(false);

    function customFunction() {
        setShowError(!showError);
    }
    return [showError, customFunction] as const;
}

export default useShowNameError;
