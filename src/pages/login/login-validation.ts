import * as yup from 'yup';

const loginSchema = yup.object().shape({
  login: yup
    .string()
    .required()
    .matches(/^\S+\S+$/, 'Email address must not contain leading or trailing whitespace')
    .matches(/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*/, 'username')
    .matches(/@/, 'Email address must contain an "@" symbol separating local part and domain name')
    .matches(
      /@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'Email address must contain a domain name (e.g., example.com)'
    )
    .email('Email address must be properly formatted (e.g., user@example.com)'),
});

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8, 'Password too short')
    .max(16, 'Password too long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z)')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter (a-z)')
    .matches(/[0-9]/, 'Password must contain at least one digit (0-9)')
    .matches(/[[!@#$%^&*\]]/, 'Password must contain at least one special character (e.g., !@#$%^&*)')
    .matches(/^\S+\S+$/, 'Password must not contain leading or trailing whitespace'),
});

export function loginValidation(login: yup.InferType<typeof loginSchema>) {
  try {
    const validate = loginSchema.validateSync(login);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function passwordValidation(password: yup.InferType<typeof passwordSchema>) {
  try {
    const validate = passwordSchema.validateSync(password);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

console.log(loginValidation({ login: 'grs@mail.ru' }));
console.log(passwordValidation({ password: 'SGHFGsHJK@KJ1' }));
