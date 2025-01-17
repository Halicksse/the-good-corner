import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql-types";
import { GET_USER_INFO } from "../graphql/queries";
const LoginPage = ({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [login] = useLoginMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
  });
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
    login({
      variables: { data: { email: data.login, password: data.password } },
      onCompleted: () => {
        setShowLogin(false);
        navigate("/");
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  return (
    <div className="loginModalContainer">
      <div className="loginModalContent">
        <div className="titleAndButtonContainer">
          <h2>Login</h2>
          <div
            onClick={() => {
              setShowLogin(false);
            }}
            className="close"
          >
            X
          </div>
        </div>
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
        <Link
          onClick={() => {
            setShowLogin(false);
          }}
          to="/forgotPassword"
        >
          Mot de passe oublié
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
