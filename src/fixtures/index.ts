import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { buildRegistrationData } from '../utils/data-factory';
import type { RegistrationData } from '../test-data/types';

type Fixtures = {
  registerPage: RegisterPage;
  registerData: RegistrationData;
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  registerData: async ({}, use) => {
    await use(buildRegistrationData());
  },
});

export { expect };
