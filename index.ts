import { Matrix, EigenvalueDecomposition } from 'ml-matrix';

/**
 * Generates the companion matrix from given coefficients.
 *
 * @param p - Coefficients of the polynomial, from the lowest order to the highest order. The
 * coefficient of the highest is assumed to be 1.
 */
function computeCompanionMatrix(p: number[]): Matrix {
    let matrix = Matrix.zeros(p.length, p.length);
    matrix.setRow(matrix.rows - 1, p.map(i => -i));
    for (let i = 0; i < matrix.rows - 1; ++ i) {
        matrix.set(i, i + 1, 1);
    }
    return matrix
}

/**
 * Computes the internal rate of return (IRR) of the given cash flows. The result may not be unique.
 * The function only returns reasonable IRRs, i.e., IRRs that are real non-negative numbers.
 *
 * @param cashFlows - The cash flow of each period.
 */
export function computeIrr(cashFlows: number[]): number[] {
    // If last period cash flow is undefined, it means the cashFlow array is empty.
    const lastPeriodCashFlow = cashFlows.at(-1)
    if (lastPeriodCashFlow === undefined) {
        return []
    }
    const cm = computeCompanionMatrix(cashFlows.slice(0, -1).map(i => i / lastPeriodCashFlow))
    return new EigenvalueDecomposition(cm).realEigenvalues.map(i => 1 / i - 1).filter(i => (i >= 0))
}
