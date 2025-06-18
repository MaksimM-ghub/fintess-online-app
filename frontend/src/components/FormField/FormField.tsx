import { FC, ReactNode } from "react";

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
  classWrapper,
  className,
  htmlFor,
  children,
  errorMessage,
}) => {
  return (
    <div className={`label-wrapper ${classWrapper}`}>
      {children}
      <label htmlFor={htmlFor} className={className}>{title}</label>
      {errorMessage && <p className="">{errorMessage}</p>}
    </div>
  );
};

export default FormField;
