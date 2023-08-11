import * as yup from 'yup';

const loginSchema = yup.object().shape({
  login: yup
    .string()
    .required('Name is required')
    .matches(/^\S+\S+$/, 'недопустимые пробелы')
    .matches(/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*/, 'username')
    .matches(/@/, 'отсутствует @')
    .matches(
      /@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'domen'
    )
    .email('wrong email'),
});

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required('password is required')
    .min(8, 'Too short')
    .max(16, 'Too long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z)')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter (a-z)')
    .matches(/[0-9]/, 'Password must contain at least one digit (0-9)')
    .matches(/[[!@#$%^&*\]]/, 'Password must contain at least one special character (e.g., !@#$%^&*)')
    .matches(/^\S+\S+$/, 'недопустимые пробелы'),
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
