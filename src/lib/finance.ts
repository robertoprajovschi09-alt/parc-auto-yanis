/*
 * Orientative financing math, shared by cards, the vehicle page and the
 * /finantare calculator. One formula everywhere — no made-up numbers.
 * The rate is an example and every UI that shows a result labels it as such.
 */
export const FINANCE = {
  /** Example annual interest rate (DAE-like) used for estimates. */
  annualRate: 0.089,
  defaultDownPct: 20,
  defaultMonths: 60,
  minMonths: 12,
  maxMonths: 84,
  minDownPct: 15,
  maxDownPct: 50,
} as const;

/** Standard annuity formula. Returns the monthly payment, rounded to whole €. */
export function monthlyPayment(
  price: number,
  downPct: number = FINANCE.defaultDownPct,
  months: number = FINANCE.defaultMonths,
  annualRate: number = FINANCE.annualRate,
) {
  const principal = price * (1 - downPct / 100);
  const r = annualRate / 12;
  if (r === 0) return Math.round(principal / months);
  return Math.round((principal * r) / (1 - Math.pow(1 + r, -months)));
}
