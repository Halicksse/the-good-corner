import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [registerMutation] = useRegisterMutation();
  const navigate = useNavigate();
  type Inputs = {
    login: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
    registerMutation({
      variables: { data: { email: data.login, password: data.password } },
      onCompleted: (result) => {
        console.log("result", result);
        navigate("/login");
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={"john.doe@gmail.com"}
          placeholder="email"
          {...register("login", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input
          defaultValue={"example"}
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
};

export default RegisterPage;
