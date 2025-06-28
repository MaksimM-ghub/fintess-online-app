import { FC, ReactNode } from "react";
import "./FormField.scss"

interface FormFieldProps {
  title?: string;
  classWrapper?: string
  className?: string;
  htmlFor?: string;
  children: ReactNode;
  errorMessage?: string;
}

const FormField: FC<FormFieldProps> = ({
  title,
  classWrapper = "",
  className = "",
  htmlFor,
  children,
  errorMessage,
}) => {
  return (
    <div className={`form-field__wrapper ${classWrapper}`}>
      {children}
      <label htmlFor={htmlFor} className={className}>{title}</label>
      {errorMessage && <p className="form-field__error">{errorMessage}</p>}
    </div>
  );
};

export default FormField;
