function datesFromDescription(desc: string) {
    const dates = desc.match(/\d{1,2}\/\d{1,2}\/\d{4}/g) || [];
    return dates.join(', ');
}

function maxLettersString(element: HTMLElement) {
    let itemText = element.innerText;
    element.style.whiteSpace = 'nowrap';
    const divWidth = element.clientWidth;
    element.removeAttribute('style');
    
    let contentLength = itemText.length;
    if(divWidth > element.clientWidth) {
        const letterWidth = Math.ceil(divWidth / contentLength);
        const lettersInOneLine = Math.ceil(element.clientWidth / letterWidth) - 3;
        itemText = itemText.substring(0, lettersInOneLine) + '...';
    }
    return itemText;
}

function getDate(dateNumber: number) {
    const listOfMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(dateNumber);
    
    let day = date.getDate().toString();
    const month = listOfMonth[date.getMonth()];
    const year = date.getFullYear();

    if(+day < 10) day = '0' + day;

    return `${month} ${day}, ${year}`;
}

export { datesFromDescription, maxLettersString, getDate };
