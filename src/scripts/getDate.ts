let listOfMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function getDate(dateNumber: number) {
    let date = new Date(dateNumber);
    
    let day = date.getDate().toString();
    let month = listOfMonth[date.getMonth()];
    let year = date.getFullYear();

    if(+day < 10) day = '0' + day;

    return `${month} ${day}, ${year}`;
}
