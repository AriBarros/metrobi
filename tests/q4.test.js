import test from 'node:test';
import assert from 'node:assert/strict';
import { isBracketsBalanced } from '../utils/index.js';

test('isBracketsBalanced - should return true for valid cases', () => {
    assert.equal(isBracketsBalanced('{[]}'), true);
    assert.equal(isBracketsBalanced('([]{})'), true);
    assert.equal(isBracketsBalanced(''), true);
});

test('isBracketsBalanced - should return false for invalid cases', () => {
    assert.equal(isBracketsBalanced('{(])}'), false);
    assert.equal(isBracketsBalanced('{([)]}'), false);
    assert.equal(isBracketsBalanced('((('), false);
    assert.equal(isBracketsBalanced('())'), false);
});
