import { useForm, SubmitHandler } from "react-hook-form";
import { useForgotPasswordMutation } from "../generated/graphql-types";

const ForgotPasswordPage = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  type Inputs = {
    email: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    forgotPassword({ variables: { userEmail: data.email } });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="email" {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default ForgotPasswordPage;