let categories:Array<{name: string, color: string}> = [
    {name: 'Random', color: ''},
    {name: 'Idea', color: 'indigo'},
    {name: 'Random Thought', color: 'rosybrown'},
    {name: 'Task', color: 'teal'}
];

function getCategoryColor(ind:string) {
    return categories[+ind].color;
}
function getCategoryName(ind:string) {
    return categories[+ind].name;
}

function randomCategory(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

export { categories, randomCategory, getCategoryColor, getCategoryName };