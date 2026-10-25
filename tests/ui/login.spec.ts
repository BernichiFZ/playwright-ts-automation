import { test, expect } from '../../src/fixtures';

test('AC-LOG-01 @smoke logs in a registered customer', async ({
  page,
  loginPage,
  loginData,
}) => {
  await loginPage.login(loginData);
  await expect(page).toHaveURL(/\/account/);
});
