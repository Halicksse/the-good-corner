import CreateOrUpdateAdForm from "../components/CreateOrUpdateAdForm";
import { useCreateNewAdMutation } from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";

const NewAdFormPage = () => {
  const [createNewAd] = useCreateNewAdMutation({
    refetchQueries: [GET_ALL_ADS],
  });
  return (
    <CreateOrUpdateAdForm defaultValues={{}} submitToBackend={createNewAd} />
  );
};

export default NewAdFormPage;
