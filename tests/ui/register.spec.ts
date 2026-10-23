import { test, expect } from '../../src/fixtures';

test('AC-REG-02 @smoke registers a customer with a unique email', async ({
  page,
  registerPage,
  registerData,
}) => {
  await registerPage.registerCustomer(registerData);
  await expect(page).toHaveURL(/\/auth\/login$/);
});

test.afterEach(async ({ page }, testInfo) => {
  if (process.env.KEEP_BROWSER_OPEN === '1') {
    testInfo.setTimeout(0);
    await page.pause();
  }
});
