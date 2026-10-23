import { randomBytes } from 'node:crypto';
import type { RegistrationData } from '../test-data/types';

export function buildRegistrationData(
  overrides: Partial<RegistrationData> = {},
): RegistrationData {
  const unique = Date.now();
  const password = `Tst!${randomBytes(16).toString('hex')}a7`;

  return {
    firstName: 'Test',
    lastName: 'User',
    dateOfBirth: '1990-01-15',
    countryCode: 'MA',
    postalCode: '10000',
    houseNumber: '56',
    phone: '0612345678',
    email: `user+${unique}@example.com`,
    password,
    ...overrides,
  };
}