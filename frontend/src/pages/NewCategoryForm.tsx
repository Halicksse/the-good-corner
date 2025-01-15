import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
};

const NewCategoryFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post("http://localhost:3000/categories", data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Titre de la catégorie:
          <br />
          <input
            className="text-field"
            {...register("title", {
              minLength: { value: 2, message: "Minimum 2 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
        <input type="submit" className="button" />
      </form>
    </>
  );
};

export default NewCategoryFormPage;
