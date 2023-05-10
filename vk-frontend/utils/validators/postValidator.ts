import * as Yup from 'yup';

export const postValidator = Yup.object({
  content: Yup.string().required('Обязательное поле').min(10, 'Минимум 10 символов'),
  attachments: Yup.array(),
});