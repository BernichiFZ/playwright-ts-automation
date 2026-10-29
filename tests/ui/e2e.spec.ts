import { test, expect } from '../../src/fixtures';

test('registers, rejects an incorrect password, resets it, and logs in', async ({
  page,
  registerPage,
  registerData,
  loginPage,
  forgotpwPage,
  forgottenpwData,
}) => {
  const email = `e2e-${Date.now()}@example.com`;
  const user = { ...registerData, email };

  await page.goto('https://practicesoftwaretesting.com/');
  await registerPage.signInLink.click();
  await registerPage.registerLink.click();
  await registerPage.firstName.fill(user.firstName);
  await registerPage.lastName.fill(user.lastName);
  await registerPage.dateOfBirth.fill(user.dateOfBirth);
  await registerPage.country.selectOption(user.countryCode);
  await registerPage.postalCode.fill(user.postalCode);
  await registerPage.houseNumber.fill(user.houseNumber);
  await page.getByLabel('Street').fill('Main Street');
  await page.getByLabel('City').fill('Casablanca');
  await page.getByLabel('State').fill('Casablanca');
  await registerPage.phone.fill(user.phone);
  await registerPage.email.fill(user.email);
  await registerPage.password.fill(user.password);
  await registerPage.submitButton.click();
  await expect(page).toHaveURL(/\/auth\/login$/);

  await loginPage.Failedlogin({
    email,
    password: 'IncorrectPassword123!',
  });
  await expect(page.getByText(/invalid email or password|login failed/i)).toBeVisible();

  await page.goto('https://practicesoftwaretesting.com/');
  await registerPage.signInLink.click();
  await page.getByRole('link', { name: /forgot/i }).click();
  await forgotpwPage.email.fill(email);
  const resetResponsePromise = page.waitForResponse(
    (response) =>
      response.url().endsWith('/users/forgot-password') &&
      response.request().method() === 'POST',
  );
  await forgotpwPage.submitButton.click();
  const resetResponse = await resetResponsePromise;
  expect(resetResponse.ok()).toBeTruthy();
  expect(await resetResponse.json()).toMatchObject({ success: true });

  await loginPage.login({
    email,
    password: forgottenpwData.newpassword,
  });
  await expect(page).toHaveURL(/\/account/);
});