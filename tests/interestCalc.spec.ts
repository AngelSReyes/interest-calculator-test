import { test, expect, Page } from "@playwright/test";
import { InterestCalcPage } from "../pages/InterestCalcPage";
import { InterestCalcTestData } from "../mothers/InterestCalcMother";
import { InterestCalcModel } from "../models/InterestCalcModel";

// Constants
const missingFieldTests = ['amount', 'duration', 'rate', 'all'];
const calculationTests = [
  { name: "yearly", testData: InterestCalcTestData.yearlyInterestDetails() },
  { name: "monthly", testData: InterestCalcTestData.monthlyInterestDetails() },
  { name: "daily", testData: InterestCalcTestData.dailyInterestDetails() }
];

// Helper function to check missing field dialog and validate the alert message
async function checkMissingFieldDialog(
  page: Page, 
  calculator: InterestCalcPage, 
  testData: InterestCalcModel,
  missingField: string
) {
  let dialogAppeared = false;

  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toMatch(/Please fill in all fields\./);
    dialogAppeared = true;
    await dialog.accept();
  });

  if (missingField !== 'all') {
    if (missingField !== 'amount') await calculator.enterAmount(testData.amountInput);
    if (missingField !== 'rate') await calculator.selectInterestRate(testData.rate);
    if (missingField !== 'duration') await calculator.selectDuration(testData.duration);
  }

  await calculator.clickCalculate(); 
  expect(dialogAppeared).toBeTruthy();
}

test.describe("Interest Calculator Tests", () => {
  let calculator: InterestCalcPage;

  test.beforeEach(async ({ page }) => {
    calculator = new InterestCalcPage(page);
    await calculator.navigate();
    expect(await calculator.isPageLoaded()).toBeTruthy();
  });

  // Interest Calculation Tests
  calculationTests.forEach(({ name, testData }) => {
    test(`should calculate ${name} interest correctly`, async () => {
      await calculator.enterAmount(testData.amountInput);
      await calculator.selectInterestRate(testData.rate);
      await calculator.selectDuration(testData.duration);
      await calculator.clickCalculate();
    
      const interest = await calculator.getInterestAmount();
      const total = await calculator.getTotalAmount();
    
      expect(interest).toBe(`Interest Amount: ${testData.expectedInterest}`);
      expect(total).toBe(`Total Amount with Interest: ${testData.expectedTotal}`);
    });
  });

  // Missing Field Error Tests
  missingFieldTests.forEach((field) => {
    const testDescription = field === 'all'
      ? 'should show error if all fields are left empty'
      : `should show error if ${field} field is left empty`;

    test(testDescription, async ({ page }) => {
      /* 
        BUG: The application does not show the dialog when a field is left empty or not modified.
        - duration not modified: defaulted to daily and the calculation is done.
        - rate not modified: error dialog not shown, nothing happens when "Calculate" is clicked.
        - no fields entered or modified: error dialog not shown, nothing happens when "Calculate" is clicked.
        Confirm requirements with the BA and raise with the development team.
      */
      const testData = InterestCalcTestData.monthlyInterestDetails();
      await checkMissingFieldDialog(page, calculator, testData, field);
    });
  });

  // Single Interest Rate Selection Test
  test("should allow selecting only one interest rate at a time", async ({ page }) => {
    const testDataYearly = InterestCalcTestData.yearlyInterestDetails();
    const testDataMonthly = InterestCalcTestData.monthlyInterestDetails();
  
    // Select interest rate and verify only one checkbox is checked
    await calculator.selectInterestRate(testDataYearly.rate);
    let checkedBoxes = await calculator.getInterestRateCheckedCount();
    expect(checkedBoxes).toBe(1);
  
    // Select a different interest rate and verify only one checkbox remains checked
    await calculator.selectInterestRate(testDataMonthly.rate);
    checkedBoxes = await calculator.getInterestRateCheckedCount();
    expect(checkedBoxes).toBe(1);
  });
});
