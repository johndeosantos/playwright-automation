
import { Page, Locator } from '@playwright/test';

export class CoffeeCartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly promotionMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.nameInput = page.getByLabel('Name');
    this.emailInput = page.getByLabel('Email');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.promotionMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );
  }

  async navigate() {
    await this.page.goto('https://coffee-cart.app/');
  }

  coffeeCup(coffeeName: string): Locator {
    const testName = coffeeName.replace(' ', '_');
    return this.page.locator(`[data-test="${testName}"]`);
  }

  async addCoffeeToCart(coffeeName: string) {
    await this.coffeeCup(coffeeName).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async enterPaymentDetails(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async submitPayment() {
    await this.submitButton.click();
  }

  async acceptPromotion() {
    await this.page.getByRole('button', { name: 'Yes, of course!' }).click();
  }

  async declinePromotion() {
    await this.page.getByRole('button', { name: "Nah, I'll skip." }).click();
  }

  async expectPromotionVisible() {
    await this.promotionMessage.waitFor({ state: 'visible' });
  }

  async expectPromotionHidden() {
    await this.promotionMessage.waitFor({ state: 'hidden' });
  }
  
  async rightClickCoffee(coffeeName: string) {
    await this.coffeeCup(coffeeName).click({ button: 'right' });
  }

  async confirmAddToCart() {
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async cancelAddToCart() {
    await this.page.getByRole('button', { name: 'No' }).click();
  }

  async getCartCount() {
    return this.page.locator('.list-item').count();
  }

  async doubleClickCoffeeName(coffeeName: string) {
    await this.page.getByRole('heading', { name: coffeeName }).dblclick();
  }

}
