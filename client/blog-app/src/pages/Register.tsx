import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Not valid email format." }),
  password: z
    .string()
    .min(6, { message: "Password at least 6 characters." })
    .max(12, { message: "Password at most 12 characters" }),
});
type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: FieldValues) => {
    axios.post("/api/user", data).then((res) => {
      if (res.status === 200) {
        sessionStorage.set("user", JSON.stringify(res.data));
        sessionStorage.set("token", res.headers["x-auth-token"]);
        navigate("/");
      }
    });
  };

  return (
    <div className="auth">
      <h1>Register</h1>
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
          {...register("email")}
          id="email"
          type="text"
          className="form-control"
          placeholder="Email"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}

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

        <button type="submit">Register</button>
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
