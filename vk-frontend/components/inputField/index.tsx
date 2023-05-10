import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import styles from "./InputField.module.scss";
import FieldError from "@/components/formError";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: String;
  placeholder: String;
  name: String;
};
const InputField: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
  const [field, { error, touched }] = useField(props);

  return (
    <div className={styles.main}>
      <label className={styles.label}>{props.label}</label>
      <input
        className={styles.input}
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && touched ? <FieldError>{error}</FieldError> : null}
    </div>
  );
};

export default InputField;
