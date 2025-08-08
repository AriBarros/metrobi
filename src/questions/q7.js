import { getMaxValue } from '../../utils/index.js';

const carrotTypes = [{ kg: 5, price: 100 }, { kg: 7, price: 150 }, { kg: 3, price: 70 }];
const capacity = 36;

console.log('Max value:', getMaxValue(carrotTypes, capacity));
