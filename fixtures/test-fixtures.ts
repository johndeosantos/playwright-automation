
import { test as base, expect } from '@playwright/test';
import { CoffeeCartPage } from '../pages/CoffeeCartPage';

type Fixtures = {
  coffeeCartPage: CoffeeCartPage;
};

export const test = base.extend<Fixtures>({
  coffeeCartPage: async ({ page }, use) => {
    const coffeeCartPage = new CoffeeCartPage(page);

    await use(coffeeCartPage);
  },
});

export { expect };
