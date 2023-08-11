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
  password: yup.string().min(8, 'Too short').required('password is required'),
});

export default function loginValidation(login: yup.InferType<typeof loginSchema>) {
  try {
    const validate = loginSchema.validateSync(login);
    return validate;
  } catch (error) {
    return (error as Error).message;
  }
}

console.log(loginValidation({ login: 'grs@mail.ru', password: '123456789' }));
