import * as Yup from 'yup';

export const loginValidator = Yup.object({
  email: Yup.string().email('Неправильный формат почты').required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});