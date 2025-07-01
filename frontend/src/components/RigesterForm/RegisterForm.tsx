import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api/api";
import { queryClient } from "../../services/api/queryClient";
import FormField from "../FormField/FormField";
import { Button } from "../Button/Button";

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
type RegisterUserType = Omit<RegisterFormType, "confirmPassword">;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutate = useMutation({
    mutationFn: (registerData: RegisterUserType) => api.register(registerData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["fetchMe"] });
    },
  }, queryClient);

const onSubmit = (data: RegisterFormType) => {
  const { confirmPassword, ...registerData } = data;
  registerMutate.mutate(registerData);
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form__form">
      <div className="auth-form__inner">
        <FormField
          htmlFor="name"
          title="Имя"
          className="label-primary"
          errorMessage={errors.name?.message}
        >
          <input
            id="name"
            {...register("name")}
            type="text"
            className="input-reset input-primary auth-form__input"
          />
        </FormField>
        <FormField
          htmlFor="surname"
          title="Фамилия"
          className="label-primary"
          errorMessage={errors.surname?.message}
        >
          <input
            id="surname"
            {...register("surname")}
            type="text"
            className="input-reset input-primary auth-form__input"
          />
        </FormField>
        <FormField
          title="Email"
          className="label-primary"
          errorMessage={errors.email?.message}
        >
          <input
            {...register("email")}
            type="email"
            className="input-reset input-primary auth-form__input"
          />
        </FormField>
        <FormField
          title="Пароль"
          className="label-primary"
          errorMessage={errors.password?.message}
        >
          <input
            {...register("password")}
            type="password"
            className="input-reset input-primary auth-form__input"
          />
        </FormField>
        <FormField
          title="Подтвердите пароль"
          className="label-primary"
          errorMessage={errors.confirmPassword?.message}
        >
          <input
            {...register("confirmPassword")}
            type="password"
            className="input-reset input-primary auth-form__input"
          />
        </FormField>
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
