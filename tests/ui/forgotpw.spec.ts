import { test, expect } from '../../src/fixtures';

test('AC-LOG-02 @smoke change password', async ({
  page,
  forgotpwPage,
  forgottenpwData,
}) => {
  await forgotpwPage.forgotPassword(forgottenpwData);
});

test('AC-LOG-01 @smoke logs in with new password', async ({
  page,
  loginPage,
  forgottenpwData,
}) => {
  await loginPage.loginwithnewpassword(forgottenpwData);
  await expect(page).toHaveURL(/\/account/);
});