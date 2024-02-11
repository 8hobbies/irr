// Copyright 2023-2024 Hong Xu <hong@topbug.net>
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

import { Matrix, EigenvalueDecomposition } from "ml-matrix";

/**
 * Generates the companion matrix from given coefficients.
 *
 * @param p - Coefficients of the polynomial, from the lowest order to the highest order. The
 * coefficient of the highest is assumed to be 1.
 * @returns The companion matrix.
 */
function computeCompanionMatrix(p: number[]): Matrix {
  const matrix = Matrix.zeros(p.length, p.length);
  matrix.setRow(
    matrix.rows - 1,
    p.map((i) => -i),
  );
  for (let i = 0; i < matrix.rows - 1; ++i) {
    matrix.set(i, i + 1, 1);
  }
  return matrix;
}

/**
 * Computes the Internal Rate of Return (IRR) of the given cash flows. There may be multiple valid
 * IRR results. NaN and infinite results are filtered out.
 *
 * @param cashFlows - The cash flow of each period.
 * @returns An array of IRRs.
 */
export function computeIrr(cashFlows: number[]): number[] {
  if (cashFlows.includes(NaN)) {
    return [];
  }

  // Strip zeros at the beginning and end of cash flows.
  const notZero = (i: number): boolean => i !== 0;
  const firstNonZero = cashFlows.findIndex(notZero);
  if (firstNonZero === -1) {
    // no non-zero in cash flow
    return [];
  }
  cashFlows = cashFlows.slice(firstNonZero);
  // Now cashFlows must contain a non-zero element because the code above has already filtered out
  // the situation in which cashFlows does not contain non-zeros.
  cashFlows = cashFlows.slice(0, cashFlows.findLastIndex(notZero) + 1);

  // Not enough cashFlow entries, returns nothing.
  if (cashFlows.length <= 1) {
    return [];
  }

  // The last period cash flow cannot be undefined, otherwise the cashFlow array would be empty.
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const lastPeriodCashFlow = cashFlows.at(-1)!;
  const cm = computeCompanionMatrix(
    cashFlows.slice(0, -1).map((i) => i / lastPeriodCashFlow),
  );
  const eigenvalues = new EigenvalueDecomposition(cm);
  return eigenvalues.realEigenvalues
    .filter((_, index) => eigenvalues.imaginaryEigenvalues[index] === 0) // no imaginary part
    .map((i) => 1 / i - 1)
    .filter((i) => !isNaN(i) && isFinite(i));
}

/**
 * Computes and returns the Net Present Value (NPV) of the given cash flows and discount rate.
 *
 * @param cashFlows - The cash flow of each period.
 * @param rate - The discount rate.
 * @returns The NPV. NaN if no solution.
 */
export function computeNpv(cashFlows: number[], rate: number): number {
  if (cashFlows.length === 0) {
    return NaN;
  }

  if (rate <= 0) {
    return NaN;
  }

  let result = cashFlows[0];
  let discount = 1;
  for (const cashFlow of cashFlows.slice(1)) {
    discount *= 1 + rate;
    result += cashFlow / discount;
  }
  return result;
}
