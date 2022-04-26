const categories:Array<{name: string, color: string}> = [
    {name: 'Random', color: ''},
    {name: 'Idea', color: 'indigo'},
    {name: 'Random Thought', color: 'rosybrown'},
    {name: 'Task', color: 'teal'}
];

function getCategoryColor(ind: number) {
    return categories[ind].color;
}
function getCategoryName(ind: number) {
    return categories[ind].name;
}

function randomCategory(category: number, nums: number[]) {
    const [min, max] = nums;
    let random = Math.round(Math.random() * (max - min) + min);
    
    if(random === category) {
        random = randomCategory(category, nums);
    }
    
    return random;
}

export { categories, randomCategory, getCategoryColor, getCategoryName };
