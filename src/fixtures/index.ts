import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { buildLoginData, buildFailedLoginData, buildRegistrationData } from '../utils/data-factory';
import type { FailedLoginData, LoginData, RegistrationData } from '../test-data/types';

type Fixtures = {
  registerPage: RegisterPage;
  registerData: RegistrationData;
  loginData: LoginData;
  failedloginData : FailedLoginData;
  loginPage: LoginPage;
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
});

test.afterEach(async ({ page }, testInfo) => {
  if (process.env.KEEP_BROWSER_OPEN === '1') {
    testInfo.setTimeout(0);
    await page.pause();
  }
});

export { expect };
