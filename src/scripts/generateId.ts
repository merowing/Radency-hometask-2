const generateId = (id = 0) => () => id++;
const newId = generateId();

export default newId;
