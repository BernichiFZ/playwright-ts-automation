import type { Locator, Page } from '@playwright/test';
import type { RegistrationData } from '../test-data/types';

export class RegisterPage {
  readonly signInLink: Locator;
  readonly registerLink: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dateOfBirth: Locator;
  readonly country: Locator;
  readonly postalCode: Locator;
  readonly houseNumber: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.signInLink = page.getByRole('link', { name: /sign in|se connecter/i });
    this.registerLink = page.getByRole('link', { name: /register your account|enregistrez votre compte/i });
    this.firstName = page.getByLabel('First name');
    this.lastName = page.getByLabel('Last name');
    this.dateOfBirth = page.getByLabel(/date of birth/i);
    this.country = page.getByLabel('Country');
    this.postalCode = page.getByLabel('Postal code');
    this.houseNumber = page.getByLabel('House number');
    this.phone = page.getByLabel('Phone');
    this.email = page.getByLabel('Email address');
    this.password = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Register' });
  }

  async registerCustomer(data: RegistrationData): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.signInLink.click();
    await this.registerLink.click();
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.dateOfBirth.fill(data.dateOfBirth);
    await this.country.selectOption(data.countryCode);
    await this.postalCode.fill(data.postalCode);
    await this.houseNumber.fill(data.houseNumber);
    await this.phone.fill(data.phone);
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.page.waitForTimeout(500);
    await this.submitButton.click();
  }
}
