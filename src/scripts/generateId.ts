let generateId = (id = 0) => () => id++;
let newId = generateId();
export default newId;