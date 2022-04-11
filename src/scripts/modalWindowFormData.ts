let data:{[key: string]: any} = {};

function setData(event?: HTMLFormElement) {
    if(!event) {
        data = {};
    }else {
        let formData = new FormData(event);
        let obj = Object.fromEntries(formData);

        data = {...obj, 'Created': +new Date()};
    }
}
function getData() {
    return data;
}

export { getData, setData };
