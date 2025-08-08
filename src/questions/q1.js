import { findDuplicates, findDuplicatesAsObject } from '../../utils/index.js';

// Write a javascript function that finds the duplicate items in any given array.

const numbers = [1, 2, 3, 2, 4, 5, 1, 1, 6, 4];
console.log('Duplicates (numbers):', findDuplicates(numbers));

const strings = ['a', 'b', 'a', 'c', 'b', 'b'];
console.log('Duplicates (strings):', findDuplicates(strings));

const users = [
    { id: 1 },
    { id: 2 },
    { id: 1 },
    { id: 3 },
    { id: 2 },
    { id: 2 }
];
console.log(
    'Duplicates (objects):',
    findDuplicatesAsObject(users, u => u.id)
);
