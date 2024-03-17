// Copyright 2023-2024 Hong Xu <hong@8hobbies.com>
//
// Licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { describe, expect, test } from "@jest/globals";
import { computeIrr, computeNpv } from "./index";

describe("computeIrr function", () => {
  test("input containing NaN", () => {
    expect(computeIrr([NaN])).toStrictEqual([]);
    expect(computeIrr([NaN, 1])).toStrictEqual([]);
    expect(computeIrr([NaN, 1, 2])).toStrictEqual([]);
  });
  test("empty input", () => {
    expect(computeIrr([])).toStrictEqual([]);
  });
  test("one input", () => {
    expect(computeIrr([1])).toStrictEqual([]);
    expect(computeIrr([-1])).toStrictEqual([]);
  });
  test("two solvable inputs", () => {
    expect(computeIrr([-1, 2])).toStrictEqual([1]);
  });
  test("two unsolvable inputs", () => {
    expect(computeIrr([-1, Infinity])).toStrictEqual([]);
  });
  test("three solvable inputs", () => {
    expect(computeIrr([-1, 1, 2])).toStrictEqual([1]);
  });
  test("three unsolvable inputs", () => {
    expect(computeIrr([-1, -1, -2])).toStrictEqual([]);
  });
  test("large solvable inputs", () => {
    computeIrr([-1000, Array<number>(30).fill(20), 1020].flat()).forEach(
      (elem) => {
        expect(elem).toBeCloseTo(0.02);
      },
    );
  });
  test("all zero inputs", () => {
    expect(computeIrr([0])).toStrictEqual([]);
    expect(computeIrr([0, 0])).toStrictEqual([]);
  });
  test("unsolvable with trailing zero inputs", () => {
    expect(computeIrr([-1, Infinity, 0])).toStrictEqual([]);
  });
  test("solvable with trailing zero inputs", () => {
    expect(computeIrr([-1, 2, 0])).toStrictEqual([1]);
  });
  test("unsolvable with leading zero inputs", () => {
    expect(computeIrr([0, -1, Infinity])).toStrictEqual([]);
  });
  test("solvable with leading zero inputs", () => {
    expect(computeIrr([0, -1, 2])).toStrictEqual([1]);
  });
  test("unsolvable with leading and trailing zero inputs", () => {
    expect(computeIrr([0, -1, Infinity, 0])).toStrictEqual([]);
  });
  test("solvable with leading and trailing zero inputs", () => {
    expect(computeIrr([0, -1, 2, 0])).toStrictEqual([1]);
  });
  test("solvable with solutions including numbers less than -100%", () => {
    expect(computeIrr([1, 1])).toHaveLength(0);
  });
});

describe("computeNpv function", () => {
  test("empty cashflow", () => {
    expect(computeNpv([], 0.1)).toBe(NaN);
  });
  test("negative rate", () => {
    expect(computeNpv([1], -0.1)).toBe(NaN);
  });
  test("one cashflow inputs", () => {
    expect(computeNpv([1], 0.1)).toBe(1);
  });
  test("two cashflow inputs", () => {
    expect(computeNpv([-3, 3], 0.5)).toBe(-1);
  });
  test("NaN in cashflow", () => {
    expect(computeNpv([NaN, 3], 0.5)).toBe(NaN);
  });
});
