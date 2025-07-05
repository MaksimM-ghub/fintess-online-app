import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import TextField from "@mui/material/TextField";
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
        <TextField
          {...register("email")}
          id="standard-search"
          label="Email"
          type="search"
          variant="standard"
          className="auth-form__input"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          {...register("password")}
          id="standard-search"
          label="Пароль"
          type="search"
          variant="standard"
          className="auth-form__input"
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
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
