// Valid interest rates.
export const validRates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;

//Type representing a valid interest rate.
export type Rate = `${typeof validRates[number]}`;

//Type representing the duration for interest calculation.
export type Duration = 'Daily' | 'Monthly' | 'Yearly';

// Interface representing the interest calculation model.
export interface InterestCalcModel {
    amountInput: string;
    rate: Rate;
    duration: Duration;
    expectedInterest: string;
    expectedTotal: string;
}