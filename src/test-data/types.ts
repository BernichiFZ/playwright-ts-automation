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

export type FailedLoginData = {
  email: string;
  password: string;         
};

export type ForgottenPWData = { 
  email: string;
  newpassword: string;
};

export type ModifyData = {  
  name: string;
  phone: string;
  email: string;
  newpassword: string;
};