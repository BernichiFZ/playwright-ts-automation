import type { Locator, Page } from '@playwright/test';
import type { FailedLoginData, LoginData, ForgottenPWData } from '../test-data/types';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly signInLink: Locator;

  constructor(private readonly page: Page) {
    this.signInLink = page.getByRole('link', { name: /sign in|se connecter/i });
    this.email = page.getByLabel('Email address');
    this.password = page.getByLabel('Password *', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Login' });
  }

  async login(data: LoginData): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.signInLink.click();
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.submitButton.click();
  }

  async Failedlogin(data: FailedLoginData): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.signInLink.click();
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.submitButton.click();
  }

  async loginwithnewpassword(data: ForgottenPWData): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.signInLink.click();
    await this.email.fill(data.email);
    await this.password.fill(data.newpassword);
    await this.submitButton.click();
  }
}
