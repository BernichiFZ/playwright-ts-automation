import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ForgotpwPage } from '../pages/ForgotPwPage';
import { buildLoginData, buildFailedLoginData, buildRegistrationData, buildForgottenpwData } from '../utils/data-factory';
import type { FailedLoginData, LoginData, RegistrationData, ForgottenPWData } from '../test-data/types';

type Fixtures = {
  registerPage: RegisterPage;
  registerData: RegistrationData;
  loginData: LoginData;
  failedloginData : FailedLoginData;
  loginPage: LoginPage;
  forgotpwPage: ForgotpwPage;
  forgottenpwData: ForgottenPWData;
  };

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  registerData: async ({}, use) => {
    await use(buildRegistrationData());
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));      
  },
  loginData: async ({}, use) => {
    await use(buildLoginData());
  },
  failedloginData: async ({}, use) => {
    await use(buildFailedLoginData());
  },
  forgotpwPage: async ({ page }, use) => {
    await use(new ForgotpwPage(page));
  }, 
  forgottenpwData: async ({}, use) => {
    await use(buildForgottenpwData());
  }
});

test.afterEach(async ({ page }, testInfo) => {
  if (process.env.KEEP_BROWSER_OPEN === '1') {
    testInfo.setTimeout(0);
    await page.pause();
  }
});

export { expect };
