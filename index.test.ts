import { describe, expect, test } from '@jest/globals'
import { computeIrr } from './index'

describe('computeIrr function', () => {
  test('empty input', () => {
    expect(computeIrr([])).toStrictEqual([])
  })
  test('one input', () => {
    expect(computeIrr([1])).toStrictEqual([])
  })
  test('two solvable inputs', () => {
    expect(computeIrr([-1, 2])).toStrictEqual([1])
  })
  test('two unsolvable inputs', () => {
    expect(computeIrr([-1, -1])).toStrictEqual([])
  })
  test('three solvable inputs', () => {
    expect(computeIrr([-1, 1, 2])).toStrictEqual([1])
  })
  test('three unsolvable inputs', () => {
    expect(computeIrr([-1, -1, -2])).toStrictEqual([])
  })
})
