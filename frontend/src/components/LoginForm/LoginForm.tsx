import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import FormField from "../FormField/FormField";
import { login } from "../../services/api/api";
import { queryClient } from "../../services/api/queryClient";
import { setIsAuthOpen } from "../../store/isVisibleSlice/isVisibleSlice";
import { useDispatch } from "react-redux";
import { useCustomMutation } from "../../hooks/useMutation";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Неверный формат почты" })
    .nonempty("Поле обязательное для заполнения"),
  password: z.string().nonempty("Поле обязательное для заполнения"),
});

type loginType = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const loginMutation = useCustomMutation({
    mutationFn: login,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["fetchMe"] });
        dispatch(setIsAuthOpen(false));
      },
    },
  });

  const onSubmit = (data: loginType) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form__form">
      <div className="auth-form__inner">
        <FormField
          htmlFor="email"
          title="Email"
          className="label-primary"
          errorMessage={errors.email?.message}
        >
          <input
            id="email"
            {...register("email")}
            type="text"
            className="input-reset input-primary auth-form__input"
          />
        </FormField>
        <FormField
          htmlFor="password"
          title="Пароль"
          className="label-primary"
          errorMessage={errors.password?.message}
        >
          <input
            id="password"
            {...register("password")}
            type="password"
            className="input-reset input-primary auth-form__input"
          />
        </FormField>
        {loginMutation.isError && (
          <p className="auth-form__error">
            {(loginMutation.error as Error).message}
          </p>
        )}
        <Button
          isLoading={loginMutation.isPending}
          className="btn-reset btn-primary auth-form__btn"
        >
          Войти
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
