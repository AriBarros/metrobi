import test from 'node:test';
import assert from 'node:assert/strict';
import { printWithDelay } from "../utils/index.js";

test('printWithDelay - correct order', async () => {
    const calls = [];
    const items = ['a', 'b', 'c'];

    const start = Date.now();
    await printWithDelay(items, (val) => calls.push(val));
    const duration = Date.now() - start;

    assert.deepEqual(calls, items);

    assert.ok(duration >= 6800, `Long time: ${duration}ms`);
});
