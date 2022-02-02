import React from "react";
import ErrorMessage from "./ErrorMessage";
import styles from "./FormField.module.css";

const FormField = ({
  labelText,
  type,
  name,
  register,
  validator,
  error,
  errorType,
  errorMessage,
}) => {
  return (
    <div className={styles.form_field_group}>
      <label htmlFor={name}>{labelText} </label>
      <input
        type={type || "text"}
        name={name}
        id={name}
        {...register(name, validator)}
      />
      {error && <ErrorMessage type={errorType} message={errorMessage} />}
    </div>
  );
};

export default FormField;
