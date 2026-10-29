import type { Locator, Page } from '@playwright/test';
import type { ForgottenPWData, LoginData } from '../test-data/types';

export class ForgotpwPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly ForgotpwLink: Locator;

  constructor(private readonly page: Page) {
    this.ForgotpwLink = page.getByRole('link', { name: /forgot-password|mot de passe oublié/i });
    this.email = page.getByLabel('Email address');
    this.password = page.getByLabel('Password *', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Set New Password' });
  }


  async forgotPassword(data: ForgottenPWData): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.ForgotpwLink.click();
    await this.email.fill(data.email);
    await this.password.fill(data.newpassword);
    await this.submitButton.click();
  }
}
