let categories:string[] = ['Random','Idea','Random Thought','Task'];

let randomCategory = (min: number, max: number) => {
    let rand = Math.random();
    return Math.floor(rand * (max - min) + min);
}

export { categories, randomCategory };