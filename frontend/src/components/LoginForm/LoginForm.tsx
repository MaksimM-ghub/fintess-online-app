import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button/Button";
import FormField from "../FormField/FormField";
import { api } from "../../services/api/api";
import { queryClient } from "../../services/api/queryClient";

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

  const loginMutate = useMutation({
    mutationFn: api.login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["FetchMe"] });
    },
  });

  const onSubmit = (data: loginType) => {
    loginMutate.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="auth-form__wrapper">
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
            className="input-reset input-primary"
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
            className="input-reset input-primary"
          />
        </FormField>
        <Button
          isLoading={loginMutate.isPending}
          className="btn-reset btn-primary"
        >
          Войти
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
