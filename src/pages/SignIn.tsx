import { useContext, useState } from "react";
import { Alert, Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { getInputProps } from "../utils/helpers";
import { signInSchema } from "../schemas/signInSchemas";
import { authServices } from "../services/authService";
import { authContext } from "../contexts/authContext";
import type { LoginData } from "../types/loginData";

export default function SignIn() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(authContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  async function signIn(values: LoginData) {
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const data = await authServices.signIn(values);

      // VERIFY: console.log(data) once to confirm the token is at data.data.token
      localStorage.setItem("token", data.data.token);
      setIsLoggedIn(true);
      setSuccessMsg(data.message);
      navigate("/");
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
        </div>

        <Input
          {...register("email")}
          {...getInputProps("email", "Email")}
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message as string}
        />

        <Input
          {...register("password")}
          {...getInputProps("password", "Password")}
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message as string}
        />

        <Button
          isLoading={isLoading}
          color="primary"
          variant="solid"
          type="submit"
        >
          Sign In
        </Button>

        <p>
          Don't have an account? <Link to="/signup">Sign up now</Link>
        </p>

        {errorMsg && (
          <Alert
            hideIcon
            color="danger"
            title={errorMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}

        {successMsg && (
          <Alert
            hideIcon
            color="success"
            title={successMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}
      </div>
    </form>
  );
}
