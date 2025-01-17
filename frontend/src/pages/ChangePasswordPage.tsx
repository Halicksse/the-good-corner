import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useChangePasswordMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";

const ChangePasswordPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const { code } = useParams();
  const navigate = useNavigate();
  type Inputs = {
    code: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    changePassword({
      variables: { code: data.code, password: data.password },
      onCompleted: () => {
        navigate("/");
        toast.success("Password has been changed");
      },
      onError: () => {
        toast.error("Error");
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={code}
        placeholder="code"
        {...register("code", { required: true })}
      />
      {errors.password && <span>This field is required</span>}
      <br />

      <input
        placeholder="password"
        type="password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>This field is required</span>}
      <br />

      <input type="submit" />
    </form>
  );
};

export default ChangePasswordPage;
