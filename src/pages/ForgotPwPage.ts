import type { Locator, Page } from '@playwright/test';
import type { ForgottenPWData, LoginData } from '../test-data/types';

export class ForgotpwPage {
  readonly email: Locator;
  readonly submitButton: Locator;
  readonly ForgotpwLink: Locator;

  constructor(private readonly page: Page) {
    this.ForgotpwLink = page.getByRole('link', { name: /Forgot your Password/i });
    this.email = page.getByLabel('Email address');
    this.submitButton = page.getByRole('button', { name: 'Set New Password' });
  }


  async forgotPassword(data: ForgottenPWData): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    await this.ForgotpwLink.click();
    await this.email.fill(data.email);
    await this.submitButton.click();
  }
}
