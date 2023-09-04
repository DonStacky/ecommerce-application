export interface UserValidation {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  birthDate: boolean;
}

export type UserValidateResultIndex = 'firstName' | 'lastName' | 'email' | 'birthDate';

export type UserValidateResault =
  | string
  | {
      title?: string | Date;
    };

export interface PasswordValidation {
  oldPassword: boolean;
  newPassword: boolean;
  repeatPassword: boolean;
}

export type PasswordValidateResultIndex = 'oldPassword' | 'newPassword' | 'repeatPassword';

export type PasswordValidateResult =
  | string
  | {
      title: string;
    };

export interface AddressValidation {
  country: boolean;
  postalCode: boolean;
  city: boolean;
  street: boolean;
}

export type AddressValidateResultIndex = 'country' | 'postalCode' | 'city' | 'street';

export type AddressValidateResult =
  | string
  | {
      title: string;
    };

export type AddressType = 'Shipping address' | 'Billing address';
export type AddressData = ['Shipping address', 'Billing address'];
