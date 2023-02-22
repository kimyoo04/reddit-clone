import { useRouter } from "next/router";
import { ISignUpForm } from "@type/signup";
import { useForm } from "react-hook-form";
import ErrorMsg from "@components/TextField/ErrorMsg";
import { TextField } from "@components/TextField";
import Link from "next/link";
import axios from "axios";

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ISignUpForm>({
    defaultValues: {},
  });

  const onValid = async (data: ISignUpForm) => {
    if (data.password !== data.passwordCheck) {
      console.error("passwordCheck!");
      setError("passwordCheck", { message: "Password are not the same" });
    }

    try {
      const response = await axios.post(`/auth/signup`, {
        username: data.username,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      console.log(response);
    } catch (error: any) {
      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          setError(key as "email" | "username" | "phone" | "password", {
            message: value,
          });
        });
      };

      const errorMessage: { [key: string]: string } = error.response.data;
      console.log(errorMessage);
      setErrors(errorMessage);
      return;
    }

    router.replace("/signin");
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <TextField
        id="email"
        label="email"
        error={errors.email?.message as string}
        inputProps={{
          ...register("email", {
            required: "Email is required",
            validate: {
              onlyEmail: (value) => {
                return (
                  [
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  ].every((pattern) => pattern.test(value)) ||
                  "Only emails allowed"
                );
              },
              notGmail: (value) => {
                return (
                  [/^((?!@g(oogle)?mail\.com).)*$/i].every((pattern) =>
                    pattern.test(value)
                  ) || "gmail is not allowed"
                );
              },
            },
          }),
        }}
      />

      <TextField
        id="username"
        label="username"
        error={errors.username?.message as string}
        inputProps={{
          ...register("username", {
            required: "username is required",
          }),
        }}
      />

      <TextField
        id="phone"
        label="phone"
        type="tel"
        error={errors.phone?.message as string}
        inputProps={{
          ...register("phone", {
            onChange: (e) => {
              if (e.target.value.length === 10) {
                reset({
                  phone: e.target.value.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "$1-$2-$3"
                  ),
                });
              }
              if (e.target.value.length === 13) {
                reset({
                  phone: e.target.value
                    .replace(/-/g, "")
                    .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
                });
              }
            },
            required: "Phone number is required",
            pattern: {
              value: /^\d{3}-\d{3,4}-\d{4}$/,
              message: "Only phone number allowed",
            },
          }),
        }}
      />

      <TextField
        id="password"
        label="password"
        type="password"
        error={errors.password?.message as string}
        inputProps={{
          ...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Your password have to be longer than 5.",
            },
            maxLength: {
              value: 16,
              message: "Your password have to be shorter than 17.",
            },
          }),
        }}
      />

      <TextField
        id="passwordCheck"
        label="passwordCheck"
        type="password"
        error={errors.passwordCheck?.message as string}
        inputProps={{
          ...register("passwordCheck", {
            required: "Checking password is required",
          }),
        }}
      />

      <ErrorMsg>{errors?.extraError?.message}</ErrorMsg>

      <div className="flex items-center justify-between mt-4">
        <Link href="/signin">
          <span>Sign in</span>
        </Link>
        <button type="submit">Sign up</button>
      </div>
    </form>
  );
}
