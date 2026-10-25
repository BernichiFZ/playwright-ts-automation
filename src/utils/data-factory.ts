import type { RegistrationData } from '../test-data/types';
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
    email: `user+${unique}@example.com`,
    password: 'KaliKali2003@§%',
    ...overrides,
  };
}

export function buildLoginData(
  overrides: Partial<LoginData> = {},
): LoginData {
  return {
    email: `useruser@example.com`,
    password: 'KaliKali2003BN@@@',
    ...overrides,
  };
} 