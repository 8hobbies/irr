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

import { Matrix, EigenvalueDecomposition } from 'ml-matrix'

/**
 * Generates the companion matrix from given coefficients.
 *
 * @param p - Coefficients of the polynomial, from the lowest order to the highest order. The
 * coefficient of the highest is assumed to be 1.
 * @returns The companion matrix.
 */
function computeCompanionMatrix (p: number[]): Matrix {
  const matrix = Matrix.zeros(p.length, p.length)
  matrix.setRow(matrix.rows - 1, p.map(i => -i))
  for (let i = 0; i < matrix.rows - 1; ++i) {
    matrix.set(i, i + 1, 1)
  }
  return matrix
}

/**
 * Computes the internal rate of return (IRR) of the given cash flows. The result may not be unique.
 * The function only returns reasonable IRRs, i.e., IRRs that are real non-negative numbers.
 *
 * @param cashFlows - The cash flow of each period.
 * @returns An array of IRRs.
 */
export function computeIrr (cashFlows: number[]): number[] {
  // Not enough cashFlow entries, returns nothing.
  if (cashFlows.length <= 1) {
    return []
  }

  // The last period cash flow cannot be undefined, otherwise the cashFlow array would be empty.
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const lastPeriodCashFlow = cashFlows.at(-1)!
  const cm = computeCompanionMatrix(cashFlows.slice(0, -1).map(i => i / lastPeriodCashFlow))
  return new EigenvalueDecomposition(cm).realEigenvalues.map(i => 1 / i - 1).filter(i => (i >= 0))
}
