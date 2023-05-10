import React, { TextareaHTMLAttributes } from 'react';
import { useField } from 'formik';
import styles from './TextareaField.module.scss';
import FieldError from '@/components/formError';

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: String
}
const TextareaField: React.FC<TextareaFieldProps> = ({...props}) => {
  const [field, {error, touched}] = useField(props)

  return (
    <div className={styles.main}>
      <textarea className={styles.input} {...field} {...props} id={field.name} />
      {error && touched ?
        <FieldError>{error}</FieldError>: null}
    </div>
  );
};

export default TextareaField;
