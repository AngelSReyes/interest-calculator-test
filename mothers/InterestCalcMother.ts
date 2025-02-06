import { InterestCalcModel } from "../models/InterestCalcModel";

//Class providing test data for interest calculation.
export class InterestCalcTestData {
    static yearlyInterestDetails(): InterestCalcModel {
        return {
            amountInput: "1000",
            rate: "2",
            duration: "Yearly",
            expectedInterest: "20.00",
            expectedTotal: "1020.00"
        };
    }

    static monthlyInterestDetails(): InterestCalcModel {
        return {
            amountInput: "20142",
            rate: "8",
            duration: "Monthly",
            expectedInterest: "134.28",
            expectedTotal: "20276.28"
        };
    }

    static dailyInterestDetails(): InterestCalcModel {
        return {
            amountInput: "1500",
            rate: "7",
            duration: "Daily",
            expectedInterest: "0.29",
            expectedTotal: "1500.29"
        };
    }
}