import { Page, Locator } from "@playwright/test";

// Page Object Model for the Interest Calculator page.
export class InterestCalcPage {
  private page: Page;
  private header: Locator;
  private amountInput: Locator;
  private interestRateDropdown: Locator;
  private interestRateDropdownContent: Locator;
  private durationDropdown: Locator;
  private calculateButton: Locator;
  private interestAmount: Locator;
  private totalAmount: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define locators
    this.header = page.locator('h1:has-text("Interest Calculator")');
    this.amountInput = page.locator('#amount');
    this.interestRateDropdown = page.locator('div.dropdown button:has-text("Select Interest Rate")');
    this.interestRateDropdownContent = this.interestRateDropdown.locator('..').locator('.dropdown-content');
    this.durationDropdown = page.locator('#duration');
    this.calculateButton = page.locator('button:has-text("Calculate")');
    this.interestAmount = page.locator('h3#interestAmount');
    this.totalAmount = page.locator('h2#totalAmount');
  }

  // Navigate to the Interest Calculator page
  async navigate() {
    await this.page.goto("/");
  }

  // Check if the Interest Calculator page is loaded
  async isPageLoaded() {
    return await this.header.isVisible();
  }

  // Scroll to the specified element
  private async scrollToElement(element: Locator) {
    await element.scrollIntoViewIfNeeded();
  }

  // Enter the amount in the input field
  async enterAmount(amount: string) {
    await this.amountInput.fill(amount);
  }

  // Select the specified interest rate
  async selectInterestRate(rate: string) {
    await this.scrollToElement(this.interestRateDropdown);
    await this.interestRateDropdown.click();
    await this.interestRateDropdownContent.locator(`input[type="checkbox"][value="${rate}%"]`).check();
  }

  // Select the duration from the dropdown
  async selectDuration(duration: string) {
    await this.durationDropdown.selectOption({ label: duration });
  }

  // Click the Calculate button
  async clickCalculate() {
    await this.calculateButton.click();
  }

  // Get the calculated interest amount
  async getInterestAmount(): Promise<string | null> {
    return await this.interestAmount.textContent();
  }

  // Get the total amount with interest
  async getTotalAmount(): Promise<string | null> {
    return await this.totalAmount.textContent();
  }

  // Get the count of checked interest rate checkboxes
  async getInterestRateCheckedCount(): Promise<number> {
    return await this.interestRateDropdownContent.locator('input[type="checkbox"]:checked').count();
  }
}
