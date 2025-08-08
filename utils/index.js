export function findDuplicates(arr) {
    const freq = new Map();
    const out = [];

    for (const item of arr) {
        const count = (freq.get(item) || 0) + 1;
        freq.set(item, count);
        if (count === 2) out.push(item);
    }

    return out;
}

export function findDuplicatesAsObject(arr, keyFn) {
    const freq = new Map();
    const out = [];
    for (const item of arr) {
        const key = keyFn(item);
        const count = (freq.get(key) || 0) + 1;
        freq.set(key, count);
        if (count === 2) out.push(item);
    }
    return out;
}

export async function printWithDelay(arr, logger) {
    let delay = 1000;
    for (const item of arr) {
        await new Promise(resolve => setTimeout(resolve, delay));
        logger(item);
        delay *= 2;
    }
}

export function isBracketsBalanced(str) {
    const stack = [];
    const pairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (const char of str) {
        if (['(', '[', '{'].includes(char)) {
            stack.push(char);
        } else if ([')', ']', '}'].includes(char)) {
            if (stack.pop() !== pairs[char]) return false;
        }
    }

    return stack.length === 0;
}

export function highestSafeFloor(breaks, floors = 100) {
    let step = Math.ceil((-1 + Math.sqrt(1 + 8 * floors)) / 2);
    let current = step;
    let previous = 0;

    while (current <= floors && !breaks(current)) {
        step -= 1;
        previous = current;
        current += step;
    }

    const upper = Math.min(current, floors);
    for (let f = previous + 1; f <= upper; f++) {
        if (breaks(f)) return f - 1;
    }
    return upper;
}

export function getMaxValue(carrotTypes, capacity) {
    if (!Array.isArray(carrotTypes) || capacity <= 0) return 0;

    const valid = carrotTypes.filter(t => Number.isFinite(t.kg) && t.kg > 0 && Number.isFinite(t.price) && t.price >= 0);
    if (valid.length === 0) return 0;

    const dp = Array(capacity + 1).fill(0);

    for (let c = 1; c <= capacity; c++) {
        let best = dp[c];
        for (const { kg, price } of valid) {
            if (kg <= c) best = Math.max(best, dp[c - kg] + price);
        }
        dp[c] = best;
    }
    return dp[capacity];
}

