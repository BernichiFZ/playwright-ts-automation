export type RegistrationData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryCode: string;
  postalCode: string;
  houseNumber: string;
  phone: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;         
};