import test from 'node:test';
import assert from 'node:assert/strict';
import { highestSafeFloor } from '../utils/index.js';

test('highestSafeFloor returns the correct threshold', () => {
    for (const thr of [0, 1, 25, 73, 99, 100]) {
        const breaks = (floor) => floor > thr;
        assert.equal(highestSafeFloor(breaks, 100), thr);
    }
});

test('highestSafeFloor uses ≤14 drops in the worst case (100 floors, 2 eggs)', () => {
    let calls = 0;
    const threshold = 37;
    const breaks = (floor) => {
        calls += 1;
        return floor > threshold;
    };
    highestSafeFloor(breaks, 100);
    assert.ok(calls <= 14, `expected ≤14 drops, got ${calls}`);
});
