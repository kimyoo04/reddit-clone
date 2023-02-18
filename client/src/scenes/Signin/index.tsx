import { useRouter } from "next/router";
import { ISignInForm } from "@type/signin";
import { useForm } from "react-hook-form";
import ErrorMsg from "@components/TextField/ErrorMsg";
import { TextField } from "@components/TextField";
import Link from "next/link";
import axios from "axios";

export default function Signin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignInForm>({
    defaultValues: {},
  });

  const onValid = async (data: ISignInForm) => {
    let response;
    try {
      response = await axios.post("http://localhost:4000/api/auth/signin", {
        email: data.email,
        password: data.password,
      });
    } catch (error: any) {
      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          setError(key as "email" | "password", {
            message: value,
          });
        });
      };

      const errorMessage: { [key: string]: string } = error.response.data;
      console.log(errorMessage);
      setErrors(errorMessage);
      return;
    }

    console.log(response);
    router.replace("/");
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

      <ErrorMsg>{errors?.extraError?.message}</ErrorMsg>

      <div className="flex items-center justify-between mt-4">
        <Link href="/signup">
          <span>Sign Up</span>
        </Link>
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
}
