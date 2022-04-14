function datesFromDescription(desc: string) {
    let dates = desc.match(/\d{1,2}\/\d{1,2}\/\d{4}/g) || [];
    return dates.join(', ');
}

function maxLettersString(element: HTMLElement, itemText: string) {
    element.style.whiteSpace = 'nowrap';
    let divWidth = element.clientWidth;
    element.removeAttribute('style');
    
    let contentLength = itemText.length;
    if(divWidth > element.clientWidth) {
        let letterWidth = Math.ceil(divWidth / contentLength);
        let lettersInOneLine = Math.ceil(element.clientWidth / letterWidth) - 3;
        itemText = itemText.substring(0, lettersInOneLine) + '...';
    }
    return itemText;
}

function getDate(dateNumber: number) {
    let listOfMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(dateNumber);
    
    let day = date.getDate().toString();
    let month = listOfMonth[date.getMonth()];
    let year = date.getFullYear();

    if(+day < 10) day = '0' + day;

    return `${month} ${day}, ${year}`;
}

export { datesFromDescription, maxLettersString, getDate };
