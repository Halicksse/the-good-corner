import { SubmitHandler, useForm } from "react-hook-form";
import { useConfirmEmailMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const ConfirmEmailPage = () => {
  const [confirmEmail] = useConfirmEmailMutation();
  const navigate = useNavigate();
  const { code } = useParams();
  type Inputs = {
    code: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    confirmEmail({
      variables: { codeByUser: data.code },
      onCompleted: () => {
        navigate("/");
        toast.success("Email was confirmed, please login");
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
      {errors.code && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};
export default ConfirmEmailPage;