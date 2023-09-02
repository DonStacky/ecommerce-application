export interface UserValidation {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  birthDate: boolean;
}

export type UserValidateResaultIndex = 'firstName' | 'lastName' | 'email' | 'birthDate';

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

export type PasswordValidateResaultIndex = 'oldPassword' | 'newPassword' | 'repeatPassword';

export type PasswordValidateResault =
  | string
  | {
      title: string;
    };
