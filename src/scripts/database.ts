import newId from './generateId';

const database = [
    {
        id: newId(),
        name: 'Note 1',
        created: 1649754825569,
        category: 3,
        description: 'Description 1',
        archived: 1,
    },
    {
        id: newId(),
        name: 'Note 2',
        created: 1649755000107,
        category: 1,
        description: 'Description 2',
        archived: 0,
    },
    {
        id: newId(),
        name: 'Note 3',
        created: 1649755000107,
        category: 2,
        description: 'Description 3',
        archived: 0,
    },
    {
        id: newId(),
        name: 'Note 4',
        created: 1649755000107,
        category: 2,
        description: 'Description 4',
        archived: 1,
    },
    {
        id: newId(),
        name: 'Note 5',
        created: 1649755000107,
        category: 2,
        description: 'Description 5',
        archived: 0,
    },
    {
        id: newId(),
        name: 'Note 6',
        created: 1649755000107,
        category: 2,
        description: 'Description 6',
        archived: 0,
    },
    {
        id: newId(),
        name: 'Note 7',
        created: 1649755000107,
        category: 2,
        description: 'Description 7',
        archived: 0,
    },
];

export default database;
