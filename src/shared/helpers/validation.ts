import * as yup from 'yup';

const minAgeMilisec = 410240376000;

const firstNameSchema = yup.object().shape({
  title: yup
    .string()
    .required('Please enter your first name. First name field is required')
    .matches(
      /^([a-zA-Zа-яА-Я]+ )*[a-zA-Zа-яА-Я]+$/,
      'First name should not contain any special symbols or numbers. First name must not contain leading or trailing whitespace'
    ),
});

const lastNameSchema = yup.object().shape({
  title: yup
    .string()
    .required('Please enter your last name. Last name field is required')
    .matches(
      /^([a-zA-Zа-яА-Я]+ )*[a-zA-Zа-яА-Я]+$/,
      'Last name should not contain any special symbols or numbers. Last name must not contain leading or trailing whitespace'
    ),
});

const loginSchema = yup.object().shape({
  title: yup
    .string()
    .required('Email addres is required')
    .matches(/^\S+$/, 'Email address must not contain leading or trailing whitespace')
    .matches(
      /^[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+)*/,
      'Email address must contain correct username'
    )
    .matches(/@/, 'Email address must contain an "@" symbol separating local part and domain name')
    .matches(
      /@([a-z0-9]([a-z0-9]{0,61}[-a-z0-9])?\.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'Email address must contain a domain name (e.g., example.com)'
    )
    .email('Email address must be properly formatted (e.g., user@example.com)'),
});

const birthDateSchema = yup.object().shape({
  title: yup.date().max(new Date(Date.now() - minAgeMilisec), 'You must be older than 13 y.o.'),
});

const passwordSchema = yup.object().shape({
  title: yup
    .string()
    .required('Password is required')
    .min(8, 'Password too short')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z)')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter (a-z)')
    .matches(/[0-9]/, 'Password must contain at least one digit (0-9)')
    .matches(/[\W_]/, 'Password must contain at least one special character (e.g., !@#$%^&*-)')
    .matches(/^\S+\S+$/, 'Password must not contain leading or trailing whitespace'),
});

const oldPasswordSchema = yup.object().shape({
  title: yup.string().required('Password is required'),
});

export function firstNameValidation(firstName: yup.InferType<typeof firstNameSchema>) {
  try {
    const validate = firstNameSchema.validateSync(firstName);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function lastNameValidation(lastName: yup.InferType<typeof lastNameSchema>) {
  try {
    const validate = lastNameSchema.validateSync(lastName);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function loginValidation(login: yup.InferType<typeof loginSchema>) {
  try {
    const validate = loginSchema.validateSync(login);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

export function birthDateValidation(birthDate: yup.InferType<typeof birthDateSchema>) {
  try {
    const validate = birthDateSchema.validateSync(birthDate);
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

export function oldPasswordValidation(oldPassword: yup.InferType<typeof oldPasswordSchema>) {
  try {
    const validate = oldPasswordSchema.validateSync(oldPassword);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}
