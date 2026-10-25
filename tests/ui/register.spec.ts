import { test, expect } from '../../src/fixtures';

test('AC-LOG-01 @smoke logs in a registered customer', async ({
  page,
  registerPage,
  registerData,
}) => {
  await registerPage.registerCustomer(registerData);
  await expect(page).toHaveURL(/\/auth\/login$/);
});
