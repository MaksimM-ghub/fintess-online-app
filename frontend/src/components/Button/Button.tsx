import { FC, ReactNode, MouseEventHandler } from "react";
import LoaderBtn from "../LoaderBtn/LoaderBtn";

interface IButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
  className: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      disabled={isDisabled}
      className={`btn-reset ${className}`}
      onClick={onClick}
    >
      {isLoading ? <LoaderBtn /> : children}
    </button>
  );
};
