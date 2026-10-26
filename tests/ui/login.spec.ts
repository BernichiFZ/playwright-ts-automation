import { test, expect } from '../../src/fixtures';

test('AC-LOG-02 @smoke fails to log in with invalid credentials', async ({
  page,
  loginPage,
  failedloginData,
}) => {
  await loginPage.Failedlogin(failedloginData);
  await expect(page.getByText(/invalid email or password|login failed/i)).toBeVisible();
});

test('AC-LOG-01 @smoke logs in a registered customer', async ({
  page,
  loginPage,
  loginData,
}) => {
  await loginPage.login(loginData);
  await expect(page).toHaveURL(/\/account/);
});
