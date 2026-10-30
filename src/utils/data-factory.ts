import type { FailedLoginData, RegistrationData, ForgottenPWData } from '../test-data/types';
import { LoginData } from '../test-data/types'; 

export function buildRegistrationData(
  overrides: Partial<RegistrationData> = {},
): RegistrationData {
  const unique = Date.now();
  return {
    firstName: 'Test',
    lastName: 'User',
    dateOfBirth: '1990-01-15',
    countryCode: 'MA',
    postalCode: '75000',
    houseNumber: '56',
    phone: '0612345678',
    email: `user@example.com`,
    password: 'KaliKali2003BN@@@',
    ...overrides,
  };
}

export function buildLoginData(
  overrides: Partial<LoginData> = {},
): LoginData {
  return {
    email: `user@example.com`,
    password: 'KaliKali2003BN@@@',
    ...overrides,
  };
} 

export function buildFailedLoginData(
  overrides: Partial<FailedLoginData> = {},
): FailedLoginData {
  return {
    email: `user@example.com`,
    password: 'IncorrectPassword123!',
    ...overrides,
  };
}

export function buildForgottenpwData(
  overrides: Partial<FailedLoginData> = {},
): ForgottenPWData{
  return {
    email: `useruser@example.com`,
    newpassword: 'welcome02',
    ...overrides,
  };
}
  
export function buildModificationData(
  overrides: Partial<RegistrationData> = {},
): RegistrationData {
  const unique = Date.now();
  return {
    firstName: 'Test',
    lastName: 'User',
    dateOfBirth: '1990-01-15',
    countryCode: 'MA',
    postalCode: '75000',
    houseNumber: '56',
    phone: '0612345678',
    email: `user@example.com`,
    password: 'KaliKali2003BN@@@',
    ...overrides,
  };
}