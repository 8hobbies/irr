import { describe, expect, test } from '@jest/globals'
import { computeIrr } from './index'

describe('computeIrr function', () => {
  test('empty input', () => {
    expect(computeIrr([])).toStrictEqual([])
  })
  test('one input', () => {
    expect(computeIrr([1])).toStrictEqual([])
  })
})
