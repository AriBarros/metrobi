import { isBracketsBalanced } from '../../utils/index.js';

const examples = [
    '{[]}',
    '{(])}',
    '{([)]}',
    '([]{})',
    '(((',
    '())',
    ''
];

for (const str of examples) {
    console.log(`${str} -> ${isBracketsBalanced(str)}`);
}
