import type { Locator, Page } from '@playwright/test';
import type { FailedLoginData, LoginData, ForgottenPWData, ModifyData } from '../test-data/types';

export class CustomerProfilePage {
  readonly name: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly ProfileLink: Locator;
  readonly newpassword: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.ProfileLink = page.getByRole('link', { name: /Profile/i });
    this.name = page.getByLabel('First name');
    this.phone = page.getByLabel('Phone number');
    this.email = page.getByLabel('Email address');
    this.newpassword = page.getByLabel('New password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async ModifyAccount(data: ModifyData): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.ProfileLink.click();
  }

  async modifypw(data: ModifyData): Promise<void> { 
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.ProfileLink.click();
}
