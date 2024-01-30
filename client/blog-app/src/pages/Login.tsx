import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import axios from "axios";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  password: z
    .string()
    .min(6, { message: "Password at least 6 characters." })
    .max(12, { message: "Password at most 12 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    const input = {
      username: data.username,
      password: data.password,
    };
    const res = await axios.post("/api/auth", input);
    sessionStorage.setItem("user", JSON.stringify(input));
    sessionStorage.setItem("token", res.data);
    navigate("/");
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username")}
          id="username"
          type="text"
          className="form-control"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-danger">{errors.username.message}</p>
        )}

        <input
          {...register("password")}
          id="password"
          type="password"
          className="form-control"
          placeholder="Password"
          autoComplete="on"
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}

        <button type="submit">Login</button>
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
