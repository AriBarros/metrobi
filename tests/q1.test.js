import test from 'node:test';
import assert from 'node:assert/strict';
import { findDuplicates, findDuplicatesAsObject } from '../utils/index.js';

test('findDuplicates – numbers', () => {
    assert.deepEqual(findDuplicates([1, 2, 3, 2, 4, 5, 1, 1, 6, 4]), [2, 1, 4]);
    assert.deepEqual(findDuplicates([1, 1, 1]), [1]);
    assert.deepEqual(findDuplicates([]), []);
    assert.deepEqual(findDuplicates([NaN, NaN, 1]), [NaN]);
});

test('findDuplicates – strings', () => {
    assert.deepEqual(findDuplicates(['a', 'b', 'a', 'c', 'b', 'b']), ['a', 'b']);
    assert.deepEqual(findDuplicates(['x']), []);
});

test('findDuplicatesAsObject – objects', () => {
    const users = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 2 }, { id: 2 }];
    const dups = findDuplicatesAsObject(users, u => u.id);
    assert.deepEqual(dups.map(u => u.id), [1, 2]);
});
