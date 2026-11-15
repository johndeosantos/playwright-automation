
import { test, expect } from '../fixtures/test-fixtures';
import { coffeeData } from '../test-data/coffee-data';

test('should complete a coffee purchase successfully', async ({ page, coffeeCartPage }) => {
  // Arrange: Open the Coffee Cart application
  await coffeeCartPage.navigate();

  // Act: Add a coffee to the cart
  await coffeeCartPage.addCoffeeToCart(coffeeData.product.name);

  // Act: Proceed to checkout
  await coffeeCartPage.proceedToCheckout();

  // Act: Enter payment details
  await coffeeCartPage.enterPaymentDetails(
    coffeeData.customer.name,
    coffeeData.customer.email
  );

  // Act: Submit payment details
  await coffeeCartPage.submitPayment();

  // Assert: Verify successful purchase
  await expect(
    page.getByText('Thanks for your purchase. Please check your email for payment.')
  ).toBeVisible();
});

test('should display and accept the promotion', async ({ coffeeCartPage }) => {
  await coffeeCartPage.navigate();

  for (const coffee of coffeeData.promotionTestProducts) {
    await coffeeCartPage.addCoffeeToCart(coffee);
  }

  await coffeeCartPage.expectPromotionVisible();

  await coffeeCartPage.acceptPromotion();

  await coffeeCartPage.expectPromotionHidden();
});

test('should allow the customer to decline the promotion', async ({ coffeeCartPage }) => {
  await coffeeCartPage.navigate();

  for (const coffee of coffeeData.promotionTestProducts) {
    await coffeeCartPage.addCoffeeToCart(coffee);
  }

  await coffeeCartPage.expectPromotionVisible();

  await coffeeCartPage.declinePromotion();

  await coffeeCartPage.expectPromotionHidden();
});

test('should open add-to-cart dialog when right-clicking a coffee', async ({ coffeeCartPage }) => {
  await coffeeCartPage.navigate();

  await coffeeCartPage.rightClickCoffee('Cappuccino');

  await expect(
    coffeeCartPage.page.getByText('Add Cappuccino to the cart?')
  ).toBeVisible();
});

test('should add coffee to cart when confirming the right-click dialog', async ({ coffeeCartPage }) => {
  await coffeeCartPage.navigate();

  await coffeeCartPage.rightClickCoffee('Cappuccino');

  await coffeeCartPage.confirmAddToCart();

  await expect(
    coffeeCartPage.page.locator('.list-item')
  ).toContainText('Cappuccino');
});

test('should cancel adding coffee when clicking No in the right-click dialog', async ({ coffeeCartPage }) => {
  await coffeeCartPage.navigate();

  await coffeeCartPage.rightClickCoffee('Cappuccino');

  await coffeeCartPage.cancelAddToCart();

  await expect(
    coffeeCartPage.page.getByText('Add Cappuccino to the cart?')
  ).toBeHidden();
});

test('should translate coffee name to Chinese when double-clicked', async ({ coffeeCartPage }) => {
  await coffeeCartPage.navigate();

  await coffeeCartPage.doubleClickCoffeeName('Cappuccino');

  await expect(
    coffeeCartPage.page.getByRole('heading', { name: '卡布奇诺' })
  ).toBeVisible();
});

test('should display promotion only after adding the third coffee', async ({ coffeeCartPage }) => {
  await coffeeCartPage.navigate();

  // Add the first coffee
  await coffeeCartPage.addCoffeeToCart(coffeeData.promotionTestProducts[0]);
  await coffeeCartPage.expectPromotionHidden();

  // Add the second coffee
  await coffeeCartPage.addCoffeeToCart(coffeeData.promotionTestProducts[1]);
  await coffeeCartPage.expectPromotionHidden();

  // Add the third coffee
  await coffeeCartPage.addCoffeeToCart(coffeeData.promotionTestProducts[2]);
  await coffeeCartPage.expectPromotionVisible();
});