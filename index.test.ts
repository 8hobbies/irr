import {describe, expect, test} from '@jest/globals';
import {computeIrr} from './index';

describe('computeIrr function', () => {
    test('empty input', () => {
        expect(computeIrr([])).toStrictEqual([]);
    });
});
