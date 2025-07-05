import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api, register as registerUser } from "../../services/api/api";
import { queryClient } from "../../services/api/queryClient";
import { Button } from "../Button/Button";
import { useCustomMutation } from "../../hooks/useMutation";
import TextField from "@mui/material/TextField";

type ServerError = {
  message: string;
};

const registerSchema = z
  .object({
    name: z.string().nonempty("Поле обязательное для заполнения"),
    surname: z.string().nonempty("Поле обязательное для заполнения"),
    email: z.string().email({ message: "Неверный формат почты" }),
    password: z
      .string()
      .min(6, { message: "Пароль должен быть не менее 6 символов" })
      .nonempty("Не указан пароль"),
    confirmPassword: z.string().nonempty("Поле обязательное для заполнения"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormType = z.infer<typeof registerSchema>;
export type RegisterUserType = Omit<RegisterFormType, "confirmPassword">;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutate = useCustomMutation<void, RegisterUserType, ServerError>(
    {
      mutationFn: registerUser,
      options: {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["fetchMe"] });
        },
        onError(error) {
          console.error("Ошибка регистрации:", error.message);
        },
      },
    }
  );

  const onSubmit = (data: RegisterFormType) => {
    const { confirmPassword, ...registerData } = data;
    registerMutate.mutate(registerData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form__form">
      <div className="auth-form__inner">
        <TextField
          {...register("name")}
          id="standard-search"
          label="Имя"
          type="search"
          variant="standard"
          className="auth-form__input"
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        <TextField
          {...register("surname")}
          id="standard-search"
          label="Фамилия"
          type="search"
          variant="standard"
          className="input-reset auth-form__input"
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        <TextField
          {...register("email")}
          id="standard-search"
          label="Почта"
          type="search"
          variant="standard"
          className="input-reset auth-form__input"
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        <TextField
          {...register("password")}
          id="standard-search"
          label="Пароль"
          type="search"
          variant="standard"
          className="input-reset auth-form__input"
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        <TextField
          {...register("confirmPassword")}
          id="standard-search"
          label="Подтвердите пароль"
          type="search"
          variant="standard"
          className="input-reset auth-form__input"
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        {registerMutate.isError && (
          <p className="auth-form__error">{registerMutate.error.message}</p>
        )}
        <Button
          isLoading={registerMutate.isPending}
          className="btn-reset btn-primary auth-form__btn"
        >
          Создать аккаунт
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
