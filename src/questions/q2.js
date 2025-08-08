import { printWithDelay } from "../../utils/index.js";

// Write an async javascript function that writes every item in any given array with 1, 2, 4, 8, etc., seconds apart.

const items = ['a', 'b', 'c', 'd'];

await printWithDelay(items, (item) => {
    console.log(`${new Date().toISOString()} → ${item}`);
});