import test from 'node:test';
import assert from 'node:assert/strict';
import { getMaxValue } from '../utils/index.js';

test('getMaxValue – example from prompt', () => {
    const carrotTypes = [{ kg: 5, price: 100 }, { kg: 7, price: 150 }, { kg: 3, price: 70 }];
    const capacity = 36;
    assert.equal(getMaxValue(carrotTypes, capacity), 840);
});

test('getMaxValue – zero or invalid capacity', () => {
    assert.equal(getMaxValue([{ kg: 1, price: 10 }], 0), 0);
    assert.equal(getMaxValue([], 10), 0);
});

test('getMaxValue – combination beats greedy by density', () => {
    const types = [{ kg: 4, price: 5 }, { kg: 5, price: 6 }];
    assert.equal(getMaxValue(types, 9), 11);
});

test('getMaxValue – multiple optimal combos', () => {
    const types = [{ kg: 6, price: 90 }, { kg: 10, price: 150 }, { kg: 15, price: 220 }];
    assert.equal(getMaxValue(types, 30), 450);
});
