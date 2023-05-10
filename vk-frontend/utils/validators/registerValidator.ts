import * as Yup from 'yup';

export const registerValidator = Yup.object({
  email: Yup.string().email('Неправильный формат почты').required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле').min(8, 'Минимум 8 символов'),

  name: Yup.string().required('Обязательное поле').min(2, 'Минимум 2 символа'),
  city: Yup.string().required('Обязательное поле').min(1, 'Минимум 1 символов'),
  edu: Yup.string().min(3, 'Минимум 3 символа'),
  dob: Yup.date().required('Обязательное поле')
});